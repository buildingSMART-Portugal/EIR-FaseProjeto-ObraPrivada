// Prints ../_site/index.html (PT) and ../_site/en/index.html (EN) to PDF with headless Chromium.
// Pass 1 prints once to find which page every chapter lands on; pass 2 prints again with those
// page numbers filled into the table of contents.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { PDFDocument, PDFName, PDFDict, PDFArray, PDFRef } from 'pdf-lib';
import { LANGS } from './build.mjs';
import { startServer } from './serve.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.resolve(here, '..', '_site');

if (!fs.existsSync(path.join(SITE, 'index.html'))) {
  console.error('Run `npm run build` first.');
  process.exit(1);
}

// PDF names are stored with #xx escapes; decode them back to UTF-8 element ids.
function decodePdfName(name) {
  const raw = name.asString().replace(/^\//, '');
  const bytes = [];
  for (let i = 0; i < raw.length; i++) {
    if (raw[i] === '#' && /^[0-9a-f]{2}$/i.test(raw.slice(i + 1, i + 3))) {
      bytes.push(parseInt(raw.slice(i + 1, i + 3), 16));
      i += 2;
    } else bytes.push(raw.charCodeAt(i));
  }
  const text = Buffer.from(bytes).toString('utf8');
  try {
    return decodeURIComponent(text); // Chromium percent-encodes non-ASCII ids
  } catch {
    return text;
  }
}

// Map of named destination (element id) -> 1-based page number.
async function destinationPages(bytes) {
  const doc = await PDFDocument.load(bytes);
  const pageRefs = doc.getPages().map((p) => p.ref.toString());
  const result = {};
  const record = (name, dest) => {
    if (dest instanceof PDFRef) dest = doc.context.lookup(dest);
    if (dest instanceof PDFDict) dest = dest.lookup(PDFName.of('D'));
    if (!(dest instanceof PDFArray)) return;
    const idx = pageRefs.indexOf(dest.get(0).toString());
    if (idx >= 0) result[name] = idx + 1;
  };
  const dests = doc.catalog.lookupMaybe(PDFName.of('Dests'), PDFDict);
  if (dests) for (const [k, v] of dests.entries()) record(decodePdfName(k), v);

  const walk = (node) => {
    const names = node.lookupMaybe(PDFName.of('Names'), PDFArray);
    if (names) for (let i = 0; i + 1 < names.size(); i += 2) {
      const key = names.lookup(i);
      record(key.decodeText ? key.decodeText() : String(key), names.get(i + 1));
    }
    const kids = node.lookupMaybe(PDFName.of('Kids'), PDFArray);
    if (kids) for (let i = 0; i < kids.size(); i++) walk(kids.lookup(i, PDFDict));
  };
  const tree = doc.catalog.lookupMaybe(PDFName.of('Names'), PDFDict)?.lookupMaybe(PDFName.of('Dests'), PDFDict);
  if (tree) walk(tree);
  return result;
}

const server = await startServer(SITE, 0);
const port = server.address().port;
const browser = await chromium.launch();
const page = await browser.newPage();
await page.emulateMedia({ media: 'print', colorScheme: 'light' });

const options = { preferCSSPageSize: true, printBackground: true, outline: true, tagged: true };

try {
  for (const cfg of Object.values(LANGS)) {
    await page.goto(`http://127.0.0.1:${port}/${cfg.dir}`, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => (img.onload = img.onerror = r)))));
    });

    const draft = await page.pdf(options);
    const pages = await destinationPages(draft);
    const filled = await page.evaluate((pages) => {
      let n = 0;
      document.querySelectorAll('.ptoc a[data-id]').forEach((a) => {
        const p = pages[a.dataset.id];
        if (p) {
          a.querySelector('.pn').textContent = p;
          n++;
        }
      });
      return n;
    }, pages);

    const final = await PDFDocument.load(await page.pdf(options));
    final.setTitle(await page.title(), { showInWindowTitleBar: true });
    final.setAuthor('buildingSMART Portugal');
    final.setSubject(await page.$eval('meta[name="description"]', (m) => m.content));
    final.setLanguage(cfg.htmlLang);
    final.setCreator('EIR site build (Chromium)');
    const file = path.join(SITE, 'pdf', cfg.pdf);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, await final.save());
    const total = await page.evaluate(() => document.querySelectorAll('.ptoc a[data-id]').length);
    console.log(`${cfg.pdf}: ${final.getPageCount()} pages, TOC page numbers ${filled}/${total}`);
  }
} finally {
  await browser.close();
  server.close();
}
