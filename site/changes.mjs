// Turns a version of EIR.md / EIR-EN.md into a list of comparable "blocks" (headings,
// paragraphs, list items, table rows), each tagged with the section it belongs to.
// The browser (src/changes.js) diffs two of these lists to show what changed.

import * as cheerio from 'cheerio';
import GithubSlugger from 'github-slugger';

const ENTITIES = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ' };

function inline(s) {
  return s
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '[$1]') // images
    .replace(/\[([^\]]*)\]\(([^)\s]*)(?:\s+"[^"]*")?\)/g, (_, text, url) => {
      const t = text.replace(/\s+/g, ' ').trim();
      if (url.startsWith('#') || !url) return t;
      return t === url || !t ? url : `${t} (${url})`;
    })
    .replace(/<br\s*\/?>/gi, ' / ')
    .replace(/<\/?[a-z][^>]*>/gi, '')
    .replace(/&[a-z#0-9]+;/gi, (e) => ENTITIES[e] ?? e)
    .replace(/(\*\*|__)(.+?)\1/g, '$2')
    .replace(/(^|[\s(])\*(\S(?:[^*]*\S)?)\*(?=$|[\s.,;:)])/g, '$1$2')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\\([\\`*_{}[\]()#+\-.!|])/g, '$1')
    .replace(/\\$/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function htmlTablesToRows(md) {
  return md.replace(/<table[\s\S]*?<\/table>/gi, (html) => {
    const $ = cheerio.load(html, null, false);
    return $('tr')
      .toArray()
      .map((tr) => {
        const cells = $(tr)
          .children('th, td')
          .toArray()
          .map((c) => {
            const cell = $(c).clone();
            cell.find('br').replaceWith(' / ');
            cell.find('li').each((_, li) => $(li).prepend(' • ').append(' '));
            return cell.text().replace(/\s+/g, ' ').trim();
          });
        return `| ${cells.join(' | ')} |`;
      })
      .join('\n');
  });
}

/**
 * @returns {{ sections: {id, title, path}[], blocks: {s, k, t}[] }}
 *   k: h = heading, p = paragraph, li = list item, q = quote/code box, row = table row
 */
export function normalize(md) {
  const lines = htmlTablesToRows(md.replace(/\r\n?/g, '\n')).split('\n');
  const slugger = new GithubSlugger();
  const sections = [{ id: '', title: '', path: [] }];
  const blocks = [];
  const stack = [];
  let current = 0;
  let skip = false;

  for (const raw of lines) {
    const line = raw.trim();
    const h = line.match(/^(#{1,6})\s+(.*?)\s*#*$/);
    if (h) {
      const level = h[1].length;
      const title = inline(h[2]);
      const id = slugger.slug(h[2]);
      if (/^V\d+(\.\d+)*\s*[-–]/i.test(title)) continue; // old hand-written version line
      skip = level === 1 && /^(índice|indice|content|contents|table of contents)$/i.test(title); // hand-written TOC
      if (skip) continue;
      stack.length = level - 1;
      stack[level - 1] = title;
      sections.push({ id, title, path: stack.slice(0, -1).filter(Boolean) });
      current = sections.length - 1;
      blocks.push({ s: current, k: 'h', t: title });
      continue;
    }
    if (skip || !line) continue;
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line)) continue; // horizontal rule
    if (/^\|[\s:|-]*-{3,}[\s:|-]*\|?$/.test(line)) continue; // table separator

    let k = 'p';
    let t;
    if (/^\|.*\|$/.test(line)) {
      k = 'row';
      t = line
        .slice(1, -1)
        .split('|')
        .map((c) => inline(c))
        .join(' | ');
    } else if (/^([*+-]|\d+[.)])\s+/.test(line)) {
      k = 'li';
      t = inline(line.replace(/^([*+-]|\d+[.)])\s+/, ''));
    } else if (line.startsWith('>')) {
      k = 'q';
      t = inline(line.replace(/^>\s?/, ''));
    } else {
      t = inline(line);
    }
    if (t && t.replace(/[|\s]/g, '')) blocks.push({ s: current, k, t });
  }
  return { sections, blocks };
}

/** True when two markdown versions have the same content once formatting is ignored. */
export function sameContent(a, b) {
  const x = normalize(a).blocks;
  const y = normalize(b).blocks;
  return x.length === y.length && x.every((blk, i) => blk.k === y[i].k && blk.t === y[i].t);
}
