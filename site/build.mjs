// Builds the bilingual EIR website from EIR.md (PT) and EIR-EN.md (EN).
// The markdown files stay the single source of truth; this script only adds
// layout, navigation and print styling. Output goes to ../_site.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import GithubSlugger from 'github-slugger';
import * as cheerio from 'cheerio';
import YAML from 'yaml';
import { createGit, documentVersion } from './git.mjs';
import { normalize, sameContent } from './changes.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const out = path.join(root, '_site');

export const REPO_URL = 'https://github.com/buildingSMART-Portugal/EIR-FaseProjeto-ObraPrivada';
export const SITE_URL = 'https://buildingsmart-portugal.github.io/EIR-FaseProjeto-ObraPrivada/';

// Everything language-specific lives here.
export const LANGS = {
  pt: {
    source: 'EIR.md',
    history: ['EIR.md'], // file names used in older versions, newest first
    paths: ['EIR.md', 'Imagens', 'IDS'], // what counts as a change to this language's document
    dir: '',
    changes: 'alteracoes/',
    htmlLang: 'pt-PT',
    locale: 'pt-PT',
    label: 'PT',
    name: 'Português',
    pdf: 'EIR-PT.pdf',
    t: {
      org: 'buildingSMART Portugal',
      kicker: 'Requisitos de Troca de Informação',
      title: 'EIR para a fase de projeto de uma obra privada',
      short: 'EIR · Fase de projeto · Obra privada',
      lead: 'Exemplo de requisitos de troca de informação para a fase de projeto de um edifício multifamiliar em Lisboa, em conformidade com a EN ISO 19650-2.',
      version: 'Versão',
      page: 'Página',
      of: 'de',
      date: 'Data',
      license: 'Licença',
      download: 'Descarregar PDF',
      contents: 'Índice',
      skip: 'Saltar para o conteúdo',
      language: 'Idioma',
      github: 'Ver no GitHub',
      authors: 'Autores',
      cite: 'Como citar',
      copy: 'Copiar',
      copied: 'Copiado',
      colophon: 'Ficha técnica',
      webVersion: 'Versão web',
      source: 'Código-fonte',
      sheet: 'Google Sheets',
      folder: 'Google Drive',
      openFull: 'Abrir imagem em tamanho real',
      top: 'Voltar ao topo',
      footer: 'Documento publicado pela buildingSMART Portugal sob licença MIT.',
      history: 'Histórico de versões',
      historyLead: 'Compare duas versões do documento. As alterações são calculadas automaticamente a partir do histórico do repositório.',
      backToDoc: 'Voltar ao documento',
      from: 'De',
      to: 'Para',
      versions: 'Versões',
      draft: 'versão de trabalho',
      draftNote: 'Alterações posteriores à versão',
      latest: 'atual',
      added: 'Adicionado',
      removed: 'Removido',
      changed: 'Alterado',
      noChanges: 'Sem alterações de conteúdo entre estas versões.',
      counts: { sec: ['secção alterada', 'secções alteradas'], mod: ['alterado', 'alterados'], add: ['adicionado', 'adicionados'], del: ['removido', 'removidos'] },
      start: 'Início do documento',
      viewSection: 'ver secção',
      rawDiff: 'Diferenças no GitHub',
      compareWith: 'Alterações face à',
      loading: 'A comparar…',
      revisions: 'Histórico de revisões',
      commit: 'Commit',
      notes: 'Notas da versão',
      firstVersion: 'Primeira versão publicada neste repositório.',
    },
  },
  en: {
    source: 'EIR-EN.md',
    history: ['EIR-EN.md', 'EIR-EN'],
    paths: ['EIR-EN.md', 'Images', 'IDS-EN'],
    dir: 'en/',
    changes: 'en/changes/',
    htmlLang: 'en',
    locale: 'en-GB',
    label: 'EN',
    name: 'English',
    pdf: 'EIR-EN.pdf',
    t: {
      org: 'buildingSMART Portugal',
      kicker: 'Exchange Information Requirements',
      title: 'EIR for the design phase of a private construction project',
      short: 'EIR · Design phase · Private construction',
      lead: 'Example of exchange information requirements for the design phase of a multi-family building in Lisbon, in accordance with EN ISO 19650-2.',
      version: 'Version',
      page: 'Page',
      of: 'of',
      date: 'Date',
      license: 'Licence',
      download: 'Download PDF',
      contents: 'Contents',
      skip: 'Skip to content',
      language: 'Language',
      github: 'View on GitHub',
      authors: 'Authors',
      cite: 'How to cite',
      copy: 'Copy',
      copied: 'Copied',
      colophon: 'Credits',
      webVersion: 'Web version',
      source: 'Source',
      sheet: 'Google Sheets',
      folder: 'Google Drive',
      openFull: 'Open full-size image',
      top: 'Back to top',
      footer: 'Published by buildingSMART Portugal under the MIT licence.',
      history: 'Version history',
      historyLead: 'Compare two versions of the document. Changes are computed automatically from the repository history.',
      backToDoc: 'Back to the document',
      from: 'From',
      to: 'To',
      versions: 'Versions',
      draft: 'working draft',
      draftNote: 'Changes made after version',
      latest: 'current',
      added: 'Added',
      removed: 'Removed',
      changed: 'Changed',
      noChanges: 'No content changes between these versions.',
      counts: { sec: ['section changed', 'sections changed'], mod: ['changed', 'changed'], add: ['added', 'added'], del: ['removed', 'removed'] },
      start: 'Start of the document',
      viewSection: 'view section',
      rawDiff: 'Differences on GitHub',
      compareWith: 'Changes since',
      loading: 'Comparing…',
      revisions: 'Revision history',
      commit: 'Commit',
      notes: 'Release notes',
      firstVersion: 'First version published in this repository.',
    },
  },
};

// ---------------------------------------------------------------------------
// Shared metadata (authors, DOI, citation) from CITATION.cff and README.md

function readMeta() {
  const cff = YAML.parse(fs.readFileSync(path.join(root, 'CITATION.cff'), 'utf8'));
  const authors = (cff.authors || []).map((a) => ({
    name: `${a['given-names'] ?? ''} ${a['family-names'] ?? ''}`.trim(),
    affiliation: a.affiliation || '',
    orcid: a.orcid || '',
  }));
  const doi = cff.identifiers?.find((i) => i.type === 'doi')?.value || cff.doi || '';
  const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
  const citation = readme.split(/^## Citation\s*$/m)[1]?.trim().split(/\n\s*\n/)[0]?.trim() || '';
  return { authors, doi, citation, license: cff.license || 'MIT' };
}

// ---------------------------------------------------------------------------
// Markdown -> structured HTML

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function splitNumber(text) {
  const m = text.match(/^(\d+(?:\.\d+)*\.?)\s+(.*)$/);
  return m ? { num: m[1], title: m[2] } : { num: '', title: text };
}

function renderDoc(lang) {
  const cfg = LANGS[lang];
  const prefix = cfg.dir ? '../' : '';
  const src = fs.readFileSync(path.join(root, cfg.source), 'utf8');

  const slugger = new GithubSlugger();
  const md = new MarkdownIt({ html: true, linkify: true, typographer: false }).use(anchor, {
    slugify: (s) => slugger.slug(s),
    level: [1, 2, 3, 4, 5, 6],
  });
  const $ = cheerio.load(md.render(src), null, false);

  // 1. Version line ("# V1.1.3 - 2025/11/19") becomes metadata.
  let version = '';
  let date = '';
  $('h1').each((_, el) => {
    const m = $(el).text().trim().match(/^V(\d[\d.]*)\s*[-–]\s*(.+)$/i);
    if (m && !version) {
      version = m[1];
      date = m[2].trim();
      $(el).remove();
    }
  });

  // 2. Drop the hand-written table of contents (an h1 followed only by a list of #links).
  $('h1').each((_, el) => {
    const next = $(el).next();
    if (next.is('ul') && next.find('a').length && next.find('a').toArray().every((a) => ($(a).attr('href') || '').startsWith('#'))) {
      const after = next.next();
      if (!after.length || after.is('h1')) {
        next.remove();
        $(el).remove();
      }
    }
  });

  // 3. Links: GitHub-style anchors are case-insensitive; we are not.
  $('a[href]').each((_, el) => {
    const a = $(el);
    let href = (a.attr('href') || '').trim();
    if (href.startsWith('#')) {
      try { href = '#' + decodeURIComponent(href.slice(1)); } catch { /* keep as is */ }
      a.attr('href', href.toLowerCase());
    } else if (/^https?:\/\//.test(href)) {
      a.attr('target', '_blank').attr('rel', 'noopener');
      a.addClass('ext');
      if (/docs\.google\.com\/spreadsheets/.test(href)) a.addClass('gsheet');
      if (/drive\.google\.com/.test(href)) a.addClass('gdrive');
      a.text(a.text().trim());
    } else if (!href.startsWith('mailto:')) {
      a.attr('href', prefix + href.replace(/^\//, ''));
      if (/\.ids$/i.test(href)) a.attr('download', '');
    }
  });

  // Lists made only of Google Sheets links become cards.
  $('ul').each((_, ul) => {
    const items = $(ul).children('li');
    if (items.length && items.toArray().every((li) => $(li).children('a.gsheet').length === 1 && $(li).text().trim() === $(li).children('a').text().trim())) {
      $(ul).addClass('resource-list');
      items.each((_, li) => {
        const a = $(li).children('a');
        a.html(
          `<span class="res-icon" aria-hidden="true">${ICONS.sheet}</span><span class="res-text"><span class="res-title">${esc(a.text())}</span><span class="res-kind">${cfg.t.sheet} ↗</span></span><span class="res-url">${esc(a.attr('href'))}</span>`,
        );
      });
    }
  });
  $('a.gdrive').each((_, el) => {
    const a = $(el);
    if (a.parent().is('p') && a.parent().children().length === 1) {
      a.addClass('drive-link').html(`<span class="res-icon" aria-hidden="true">${ICONS.folder}</span><span>${cfg.t.folder} ↗</span><span class="res-url">${esc(a.attr('href'))}</span>`);
    }
  });

  // 4. Images -> figures with captions; paths made relative to the page.
  $('img').each((_, el) => {
    const img = $(el);
    const srcAttr = (img.attr('src') || '').replace(/^\//, '');
    img.attr('src', prefix + srcAttr);
    const caption = img.attr('title') || img.attr('alt') || '';
    img.removeAttr('title');
    const p = img.parent('p');
    const fig = `<figure><a class="fig-link" href="${esc(prefix + srcAttr)}" target="_blank" rel="noopener" title="${esc(cfg.t.openFull)}">${$.html(img)}</a>${caption ? `<figcaption>${esc(caption)}</figcaption>` : ''}</figure>`;
    if (p.length && p.children().length === 1 && p.text().trim() === '') p.replaceWith(fig);
    else img.replaceWith(fig);
  });

  // 5. Tables get a scroll wrapper; HTML-table group rows get a class.
  $('table').each((_, el) => {
    $(el).wrap('<div class="table-wrap"></div>');
    $(el).find('tbody th[colspan]').closest('tr').addClass('group-row');
    // Information container names (OBG-BSP-ZZ-...pdf) should never wrap mid-name.
    $(el).find('td').each((_, td) => {
      if (/^[A-Z0-9]{2,}(-[A-Z0-9]{2,}){5,}\.\w+$/.test($(td).text().trim())) $(td).addClass('fname');
    });
  });

  // 6. Notes and examples (italic-only paragraphs starting with NOTA/NOTE/EXEMPLO/EXAMPLE).
  $('p').each((_, el) => {
    const p = $(el);
    if (p.children().length === 1 && p.children('em').length === 1 && p.text().trim() === p.children('em').text().trim()) {
      if (/^(NOTA|NOTE|EXEMPLO|EXAMPLE)\b/i.test(p.text().trim())) p.addClass('note');
    }
  });

  // 7. Wrap each h1 into a chapter <section>.
  const top = $.root().children().toArray();
  let html = '';
  let current = null;
  const flush = () => {
    if (current) html += `<section class="chapter${current.cls}" aria-labelledby="${esc(current.id)}">${current.body}</section>`;
  };
  for (const node of top) {
    if (node.type === 'tag' && node.name === 'h1') {
      flush();
      const id = $(node).attr('id');
      const cls = /^(glossário|glossary)$/.test(id) ? ' glossary' : /^(apêndices|appendixes|appendices)$/.test(id) ? ' appendices' : '';
      current = { id, cls, body: '' };
    }
    if (current) current.body += $.html(node);
    else html += $.html(node);
  }
  flush();
  const $$ = cheerio.load(html, null, false);

  // 8. Glossary: group "**Term**" paragraphs with their definitions.
  $$('section.glossary').each((_, sec) => {
    const children = $$(sec).children().toArray();
    let rebuilt = '';
    let group = null;
    const isTerm = (n) => {
      const p = $$(n);
      return p.is('p') && p.children().length === 1 && p.children('strong').length === 1 && p.text().trim() === p.children('strong').text().trim();
    };
    const close = () => {
      if (group) rebuilt += `<div class="term"><dt>${group.term}</dt><dd>${group.body}</dd></div>`;
      group = null;
    };
    for (const n of children) {
      if (isTerm(n)) {
        close();
        group = { term: $$(n).children('strong').html(), body: '' };
      } else if (group && !$$(n).is('h1')) {
        const p = $$(n);
        if (p.is('p') && !group.body && /^[A-Z]{2,5}\s*\(/.test(p.text().trim())) p.addClass('abbr');
        group.body += $$.html(n);
      } else {
        close();
        rebuilt += $$.html(n);
        if ($$(n).is('h1')) rebuilt += '<dl class="terms">';
      }
    }
    close();
    rebuilt += '</dl>';
    $$(sec).html(rebuilt);
  });

  // 9. Heading list (for TOC and PT<->EN mapping), number badges and permalinks.
  const headings = [];
  $$('h1, h2, h3, h4').each((_, el) => {
    const h = $$(el);
    const text = h.text().trim();
    const level = Number(el.name[1]);
    headings.push({ id: h.attr('id'), level, text });
    if (level <= 3) {
      const { num, title } = splitNumber(text);
      if (num) h.html(`<span class="num">${esc(num)}</span> ${esc(title)}`);
    }
    if (level >= 2) h.append(`<a class="anchor" href="#${esc(h.attr('id'))}" aria-hidden="true" tabindex="-1">#</a>`);
  });

  return { html: $$.html(), headings, version, date };
}

// ---------------------------------------------------------------------------
// Page template

const ICONS = {
  download: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>',
  github: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>',
  history: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/></svg>',
  menu: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  sheet: '<svg viewBox="0 0 24 24" width="22" height="22"><rect x="3" y="2" width="18" height="20" rx="2.5" fill="#1e8e3e"/><path d="M7 8h10v9H7z" fill="none" stroke="#fff" stroke-width="1.6"/><path d="M7 11h10M7 14h10M11 8v9" stroke="#fff" stroke-width="1.6"/></svg>',
  folder: '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M2.5 6.5A2 2 0 0 1 4.5 4.5h5l2 2.2h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2Z" fill="#f4b400"/></svg>',
  orcid: '<svg viewBox="0 0 24 24" width="14" height="14"><circle cx="12" cy="12" r="11" fill="#a6ce39"/><path fill="#fff" d="M8.2 7.2a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8ZM7.5 8.6h1.4v9.2H7.5Zm3.4 0h3.7c3.5 0 5.1 2.5 5.1 4.6 0 2.3-1.8 4.6-5.1 4.6h-3.7Zm1.4 1.3v6.6h2.2c3.2 0 3.8-2.4 3.8-3.3 0-1.5-.9-3.3-3.8-3.3Z"/></svg>',
};

function formatDate(raw, locale, month = 'long') {
  const m = String(raw || '').match(/(\d{4})[/-](\d{1,2})[/-](\d{1,2})/);
  if (!m) return raw || '';
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month, year: 'numeric', timeZone: 'UTC' }).format(d);
}

const monthYear = (iso) => {
  const m = String(iso || '').match(/^(\d{4})-(\d{2})/);
  return m ? `${m[2]}/${m[1]}` : '';
};

function tocHtml(headings, cls) {
  const items = headings.filter((h) => h.level <= 2);
  let html = `<ol class="${cls}">`;
  let open = false;
  for (const h of items) {
    const { num, title } = splitNumber(h.text);
    const label = `${num ? `<span class="num">${esc(num)}</span>` : ''}<span class="t">${esc(title)}</span>`;
    const link = `<a href="#${esc(h.id)}" data-id="${esc(h.id)}">${label}<span class="pn"></span></a>`;
    if (h.level === 1) {
      if (open) html += '</ol></li>';
      html += `<li class="l1">${link}<ol>`;
      open = true;
    } else {
      html += `<li class="l2">${link}</li>`;
    }
  }
  if (open) html += '</ol></li>';
  return html.replace(/<ol><\/ol>/g, '') + '</ol>';
}

function authorsHtml(meta) {
  return `<ul class="authors">${meta.authors
    .map(
      (a) =>
        `<li><span class="a-name">${esc(a.name)}${a.orcid ? ` <a class="orcid" href="${esc(a.orcid)}" target="_blank" rel="noopener" aria-label="ORCID ${esc(a.name)}">${ICONS.orcid}</a>` : ''}</span>${a.affiliation ? `<span class="a-aff">${esc(a.affiliation)}</span>` : ''}</li>`,
    )
    .join('')}</ul>`;
}

// Relative path from a page directory ('' | 'en/' | 'alteracoes/' | 'en/changes/') to the site root.
const up = (dir) => '../'.repeat(dir.split('/').filter(Boolean).length);

function head({ lang, title, description, base, canonical, alternate, extra = '' }) {
  const cfg = LANGS[lang];
  return `<!doctype html>
<html lang="${cfg.htmlLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${SITE_URL}${canonical}">
<link rel="alternate" hreflang="${LANGS[alternate.lang].htmlLang}" href="${SITE_URL}${alternate.path}">
<link rel="icon" href="${base}assets/brand/favicon-64.png" type="image/png">
<link rel="apple-touch-icon" href="${base}assets/brand/apple-touch-icon.png">
<link rel="stylesheet" href="${base}assets/fonts.css">
<link rel="stylesheet" href="${base}assets/style.css">
${extra}<script>document.documentElement.classList.add('js')</script>
</head>`;
}

function topbar({ lang, base, here, otherPath, home, version, menu }) {
  const cfg = LANGS[lang];
  const t = cfg.t;
  const other = lang === 'pt' ? 'en' : 'pt';
  const links = { [lang]: './', [other]: up(here) + otherPath || './' };
  const langSwitch = ['pt', 'en']
    .map((l) => {
      const c = LANGS[l];
      return `<a href="${links[l]}" lang="${c.htmlLang}" hreflang="${c.htmlLang}" title="${c.name}"${l === lang ? ' aria-current="true"' : ' data-switch'}>${c.label}</a>`;
    })
    .join('');
  return `<a class="skip" href="#content">${t.skip}</a>
<header class="topbar">
  ${menu ? `<button class="menu-btn" type="button" aria-controls="sidebar" aria-expanded="false">${ICONS.menu}<span>${t.contents}</span></button>` : ''}
  <a class="brand" href="${home}">
    <picture class="brand-logo">
      <source srcset="${base}assets/brand/bspt-logo-white.png" media="(prefers-color-scheme: dark)">
      <img src="${base}assets/brand/bspt-logo.png" alt="${t.org}" width="1400" height="274">
    </picture>
    <span class="brand-text"><span class="brand-doc">${t.short}</span></span>
  </a>
  <div class="actions">
    <nav class="lang-switch" aria-label="${t.language}">${langSwitch}</nav>
    <a class="btn btn-primary" href="${base}pdf/${cfg.pdf}" download="${pdfName(lang, version)}">${ICONS.download}<span>${t.download}</span></a>
    <a class="icon-btn" href="${REPO_URL}" target="_blank" rel="noopener" aria-label="${t.github}" title="${t.github}">${ICONS.github}</a>
  </div>
</header>`;
}

const pdfName = (lang, v) => `EIR-ObraPrivada-v${v.version}-${LANGS[lang].label}.pdf`;

function versionBadge(lang, v) {
  return v.draft ? ` <span class="badge badge-draft" title="${esc(`${LANGS[lang].t.draftNote} ${v.base || ''}`.trim())}">${LANGS[lang].t.draft}</span>` : '';
}

function revisionTable(lang, versions) {
  const t = LANGS[lang].t;
  const rows = [...versions]
    .reverse()
    .map((v) => `<tr><td>${esc(v.label)}${v.draft ? ` <span class="muted">(${t.draft})</span>` : ''}</td><td>${esc(formatDate(v.date, LANGS[lang].locale))}</td><td><code>${esc(v.commit || '')}</code></td></tr>`)
    .join('');
  return `<table class="revisions"><thead><tr><th>${t.version}</th><th>${t.date}</th><th>${t.commit}</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function page(lang, doc, other, meta, v, versions) {
  const cfg = LANGS[lang];
  const t = cfg.t;
  const base = up(cfg.dir);
  const dateFmt = formatDate(v.date, cfg.locale);
  const pdfHref = `${base}pdf/${cfg.pdf}`;
  const doiUrl = meta.doi ? `https://doi.org/${meta.doi}` : '';
  const footer = `${t.page} " counter(page) " ${t.of} " counter(pages) " | ${t.short} | v${v.version}${v.draft && v.commit ? ` (${v.commit})` : ''}`;
  const coverVersion = `v${v.version} ${monthYear(v.date)}`;
  const altIds = other.doc.headings.map((h) => h.id);
  const sameShape =
    altIds.length === doc.headings.length && other.doc.headings.every((h, i) => h.level === doc.headings[i].level);
  const historyHref = up(cfg.dir) + cfg.changes;

  const metaList = `
      <dl class="meta">
        <div><dt>${t.version}</dt><dd>${esc(v.version)}${versionBadge(lang, v)}</dd></div>
        <div><dt>${t.date}</dt><dd>${esc(dateFmt)}</dd></div>
        ${v.draft && v.commit ? `<div><dt>${t.commit}</dt><dd><a href="${REPO_URL}/commit/${esc(v.commit)}" target="_blank" rel="noopener"><code>${esc(v.commit)}</code></a></dd></div>` : ''}
        ${meta.doi ? `<div><dt>DOI</dt><dd><a href="${doiUrl}" target="_blank" rel="noopener">${esc(meta.doi)}</a></dd></div>` : ''}
        <div><dt>${t.license}</dt><dd>${esc(meta.license)}</dd></div>
      </dl>`;

  return `${head({
    lang,
    title: `${t.title} · v${v.version} — buildingSMART Portugal`,
    description: t.lead,
    base,
    canonical: cfg.dir,
    alternate: { lang: other.lang, path: LANGS[other.lang].dir },
    extra: `<style>@page { @top-right { content: url("${base}assets/brand/header-logo.svg"); } @bottom-left { content: "${footer}"; } }</style>\n`,
  })}
<body>
${topbar({ lang, base, here: cfg.dir, otherPath: LANGS[other.lang].dir, home: './', version: v, menu: true })}

<div class="layout">
  <aside id="sidebar" class="sidebar" aria-label="${t.contents}">
    <p class="sidebar-title">${t.contents}</p>
    <nav>${tocHtml(doc.headings, 'toc')}</nav>
    <a class="sidebar-history" href="${historyHref}">${ICONS.history}<span>${t.history}</span></a>
  </aside>
  <div class="scrim" hidden></div>

  <main id="content">
    <header class="cover">
      <img class="cover-bg print-only" src="${base}assets/brand/cover-bg.svg" alt="">
      <img class="cover-logo print-only" src="${base}assets/brand/bspt-logo.png" alt="${t.org}">
      <div class="cover-band" aria-hidden="true"></div>
      <p class="kicker">${t.org} · ${t.kicker}</p>
      <div class="cover-text">
        <h1 class="doc-title">${esc(t.title)}</h1>
        <p class="cover-version print-only">${esc(coverVersion)}${v.draft ? ` · ${t.draft}` : ''}</p>
        ${meta.doi ? `<p class="cover-doi print-only">DOI ${esc(meta.doi)}</p>` : ''}
      </div>
      <p class="lead">${esc(t.lead)}</p>
      ${metaList}
      <div class="cover-actions screen-only">
        <a class="btn btn-primary" href="${pdfHref}" download="${pdfName(lang, v)}">${ICONS.download}<span>${t.download}</span></a>
        <a class="btn" href="${historyHref}">${ICONS.history}<span>${t.history}</span></a>
        <a class="btn" href="${REPO_URL}/blob/main/${cfg.source}" target="_blank" rel="noopener">${ICONS.github}<span>${t.github}</span></a>
      </div>
    </header>

    <section class="colophon print-only">
      <h2>${t.colophon}</h2>
      <h3>${t.authors}</h3>
      ${authorsHtml(meta)}
      ${meta.citation ? `<h3>${t.cite}</h3><p class="citation">${esc(meta.citation)}</p>` : ''}
      <p><strong>${t.webVersion}:</strong> <a href="${SITE_URL}${cfg.dir}">${SITE_URL}${cfg.dir}</a><br>
      <strong>${t.history}:</strong> <a href="${SITE_URL}${cfg.changes}">${SITE_URL}${cfg.changes}</a><br>
      <strong>${t.source}:</strong> <a href="${REPO_URL}">${REPO_URL}</a></p>
    </section>

    <nav class="print-toc print-only" aria-label="${t.contents}">
      <h2>${t.contents}</h2>
      ${tocHtml(doc.headings, 'ptoc')}
    </nav>

    <section class="print-revisions print-only">
      ${versions.length ? `<h3>${t.revisions}</h3>${revisionTable(lang, versions)}` : ''}
    </section>

    <article class="doc">
${doc.html}
    </article>

    <section class="credits screen-only" id="credits">
      <h2>${t.authors}</h2>
      ${authorsHtml(meta)}
      ${
        meta.citation
          ? `<h2>${t.cite}</h2>
      <div class="cite-box"><p class="citation" id="citation">${esc(meta.citation)}</p><button class="btn btn-small copy-btn" type="button" data-copy="#citation" data-done="${t.copied}">${t.copy}</button></div>`
          : ''
      }
    </section>

    <footer class="site-footer screen-only">
      <p>${t.footer} <a href="${REPO_URL}" target="_blank" rel="noopener">GitHub</a>${doiUrl ? ` · <a href="${doiUrl}" target="_blank" rel="noopener">DOI ${esc(meta.doi)}</a>` : ''} · <a href="${historyHref}">${t.history}</a></p>
      <a class="to-top" href="#content">${t.top} ↑</a>
    </footer>
  </main>
</div>
<script>window.EIR=${JSON.stringify({ lang, altIds: sameShape ? altIds : null, ids: doc.headings.map((h) => h.id) })}</script>
<script src="${base}assets/app.js" defer></script>
</body>
</html>
`;
}

// ---------------------------------------------------------------------------
// Version history page

const notesMd = new MarkdownIt({ html: false, linkify: true });

function changesPage(lang, v, versions, docIds) {
  const cfg = LANGS[lang];
  const t = cfg.t;
  const other = lang === 'pt' ? 'en' : 'pt';
  const here = cfg.changes;
  const base = up(here);
  const docHref = base + cfg.dir || './';
  const newestFirst = [...versions].reverse();

  const options = newestFirst
    .map((x) => `<option value="${esc(x.id)}">v${esc(x.label)}${x.draft ? ` (${t.draft})` : ''} · ${esc(formatDate(x.date, cfg.locale, 'short'))}</option>`)
    .join('');

  const timeline = newestFirst
    .map((x, i) => {
      const prev = newestFirst[i + 1];
      const links = [
        prev ? `<a href="?from=${encodeURIComponent(prev.id)}&amp;to=${encodeURIComponent(x.id)}#compare">${t.compareWith} v${esc(prev.label)}</a>` : `<span class="muted">${t.firstVersion}</span>`,
        `<a href="${REPO_URL}/tree/${esc(x.ref)}" target="_blank" rel="noopener">GitHub ↗</a>`,
        x.pdf ? `<a href="${esc(x.pdf)}">PDF ↓</a>` : '',
      ].filter(Boolean);
      return `<li class="v-item${x.draft ? ' is-draft' : ''}">
        <div class="v-head"><span class="v-num">v${esc(x.label)}</span>${i === 0 ? `<span class="badge">${t.latest}</span>` : ''}${x.draft ? `<span class="badge badge-draft">${t.draft}</span>` : ''}<time datetime="${esc(x.date)}">${esc(formatDate(x.date, cfg.locale))}</time>${x.commit ? `<code class="v-commit">${esc(x.commit)}</code>` : ''}</div>
        ${x.notes ? `<div class="v-notes">${notesMd.render(x.notes)}</div>` : ''}
        <div class="v-links">${links.join('<span aria-hidden="true"> · </span>')}</div>
      </li>`;
    })
    .join('');

  const data = {
    lang,
    versions: versions.map((x) => ({ id: x.id, label: x.label, ref: x.ref, draft: !!x.draft })),
    docHref,
    docIds,
    repo: REPO_URL,
    t: {
      added: t.added, removed: t.removed, changed: t.changed, noChanges: t.noChanges, counts: t.counts,
      start: t.start, viewSection: t.viewSection, loading: t.loading,
    },
  };

  return `${head({
    lang,
    title: `${t.history} · ${t.short} — buildingSMART Portugal`,
    description: t.historyLead,
    base,
    canonical: here,
    alternate: { lang: other, path: LANGS[other].changes },
  })}
<body class="page-changes">
${topbar({ lang, base, here, otherPath: LANGS[other].changes, home: docHref, version: v, menu: false })}

<main id="content" class="page-main">
  <header class="page-head">
    <a class="back" href="${docHref}">← ${t.backToDoc}</a>
    <p class="kicker">${t.org} · ${t.short}</p>
    <h1 class="page-title">${t.history}</h1>
    <p class="lead">${t.historyLead}</p>
  </header>

  <section class="compare" id="compare" aria-label="${t.history}">
    <form class="compare-form" onsubmit="return false">
      <label><span>${t.from}</span><select id="from">${options}</select></label>
      <span class="arrow" aria-hidden="true">→</span>
      <label><span>${t.to}</span><select id="to">${options}</select></label>
      <a class="btn btn-small gh-compare" id="gh-compare" href="${REPO_URL}/commits/main" target="_blank" rel="noopener">${ICONS.github}<span>${t.rawDiff}</span></a>
    </form>
    <p class="summary" id="summary" aria-live="polite"></p>
  </section>

  <div class="diff" id="diff"></div>

  <section class="versions">
    <h2>${t.versions}</h2>
    <ol class="timeline">${timeline}</ol>
  </section>

  <footer class="site-footer">
    <p>${t.footer} <a href="${REPO_URL}" target="_blank" rel="noopener">GitHub</a></p>
    <a class="to-top" href="#content">${t.top} ↑</a>
  </footer>
</main>
<script>window.CHANGES=${JSON.stringify(data).replace(/</g, '\\u003c')}</script>
<script src="${base}assets/diff.min.js" defer></script>
<script src="${base}assets/changes.js" defer></script>
</body>
</html>
`;
}

// ---------------------------------------------------------------------------
// Build

// Static (non-variable) fonts: Chromium embeds variable fonts in PDFs as Type 3
// glyphs, which render poorly in some viewers, so we ship one file per weight.
const FONT_FACES = [
  { family: 'Inter', pkg: '@fontsource/inter', file: 'inter', weights: [400, 500, 600, 700, 800], styles: ['normal'] },
  { family: 'Inter', pkg: '@fontsource/inter', file: 'inter', weights: [400, 600], styles: ['italic'] },
  { family: 'JetBrains Mono', pkg: '@fontsource/jetbrains-mono', file: 'jetbrains-mono', weights: [400, 500], styles: ['normal'] },
];
const SUBSETS = {
  'latin-ext':
    'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF',
  latin:
    'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD',
};

function writeFonts() {
  let css = '/* Generated by build.mjs */\n';
  for (const f of FONT_FACES)
    for (const style of f.styles)
      for (const weight of f.weights)
        for (const [subset, range] of Object.entries(SUBSETS)) {
          const name = `${f.file}-${subset}-${weight}-${style}.woff2`;
          fs.copyFileSync(path.join(here, 'node_modules', f.pkg, 'files', name), path.join(out, 'assets', 'fonts', name));
          css += `@font-face{font-family:'${f.family}';font-style:${style};font-weight:${weight};font-display:swap;src:url(fonts/${name}) format('woff2');unicode-range:${range}}\n`;
        }
  fs.writeFileSync(path.join(out, 'assets', 'fonts.css'), css);
}

function copyDir(from, to) {
  if (!fs.existsSync(from)) return;
  fs.cpSync(from, to, { recursive: true });
}

// Release notes and PDF assets from GitHub Releases (optional: skipped when offline).
async function fetchReleases() {
  const slug = REPO_URL.replace('https://github.com/', '');
  try {
    const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'eir-site-build' };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const res = await fetch(`https://api.github.com/repos/${slug}/releases?per_page=100`, { headers, signal: AbortSignal.timeout(8000) });
    if (!res.ok) return {};
    const list = await res.json();
    return Object.fromEntries(list.filter((r) => !r.draft).map((r) => [r.tag_name, { notes: r.body || '', assets: r.assets || [] }]));
  } catch {
    return {};
  }
}

// Every released version (tag) of one language, oldest first, plus the working draft if any.
function collectVersions(git, lang, current, releases) {
  const cfg = LANGS[lang];
  const pdfRe = new RegExp(`(^|[-_])${cfg.label}([-_.]|$).*\\.pdf$|(^|[-_])${cfg.label}\\.pdf$`, 'i');
  const list = [];
  for (const tag of git.tags()) {
    const md = git.show(tag.tag, cfg.history);
    if (!md) continue; // this language did not exist yet
    const last = git.lastChange(tag.tag, cfg.paths);
    const rel = releases[tag.tag];
    list.push({
      id: tag.tag,
      label: tag.version,
      ref: tag.tag,
      date: last?.date || '',
      commit: last?.short || '',
      md,
      notes: rel?.notes || '',
      pdf: rel?.assets.find((a) => pdfRe.test(a.name))?.browser_download_url || '',
    });
  }
  if (current.draft) {
    list.push({
      id: 'draft',
      label: current.version,
      ref: git.available ? git.run('rev-parse', 'HEAD') : 'main',
      date: current.date,
      commit: current.commit || '',
      md: fs.readFileSync(path.join(root, cfg.source), 'utf8'),
      draft: true,
    });
  }
  return list;
}

export async function build() {
  const meta = readMeta();
  const docs = { pt: renderDoc('pt'), en: renderDoc('en') };
  const git = createGit(root);
  if (git.shallow) console.warn('warning: shallow Git clone, version history is incomplete (use fetch-depth: 0)');
  const releases = git.available ? await fetchReleases() : {};

  const versions = {};
  const history = {};
  for (const lang of Object.keys(LANGS)) {
    let v = documentVersion(git, root, LANGS[lang], sameContent);
    if (v.version === 'dev' && docs[lang].version) {
      // No release tags yet: fall back to a "# V1.2.3 - 2025/01/31" line in the markdown, if present.
      v = { version: docs[lang].version, draft: false, date: docs[lang].date.replace(/\//g, '-'), commit: null };
    }
    versions[lang] = v;
    history[lang] = collectVersions(git, lang, v, releases);
  }

  // Clean the output but keep previously generated PDFs (pdf.mjs regenerates them).
  fs.mkdirSync(out, { recursive: true });
  for (const entry of fs.readdirSync(out)) if (entry !== 'pdf') fs.rmSync(path.join(out, entry), { recursive: true, force: true });
  fs.mkdirSync(path.join(out, 'assets', 'fonts'), { recursive: true });

  for (const lang of Object.keys(LANGS)) {
    const cfg = LANGS[lang];
    const other = lang === 'pt' ? 'en' : 'pt';
    const html = page(lang, docs[lang], { lang: other, doc: docs[other] }, meta, versions[lang], history[lang]);
    fs.mkdirSync(path.join(out, cfg.dir), { recursive: true });
    fs.writeFileSync(path.join(out, cfg.dir, 'index.html'), html);

    // Version history page + one JSON per version with the comparable blocks.
    const dataDir = path.join(out, cfg.changes, 'data');
    fs.mkdirSync(dataDir, { recursive: true });
    for (const x of history[lang]) fs.writeFileSync(path.join(dataDir, `${x.id}.json`), JSON.stringify(normalize(x.md)));
    const ids = docs[lang].headings.map((h) => h.id);
    fs.writeFileSync(path.join(out, cfg.changes, 'index.html'), changesPage(lang, versions[lang], history[lang], ids));
  }

  // Static assets
  for (const f of ['style.css', 'app.js', 'changes.js']) fs.copyFileSync(path.join(here, 'src', f), path.join(out, 'assets', f));
  copyDir(path.join(here, 'src', 'brand'), path.join(out, 'assets', 'brand'));
  // Chromium sizes images in @page margin boxes by their intrinsic size, so the running-header
  // logo is a high-resolution PNG wrapped in an SVG with a physical size.
  const logo = fs.readFileSync(path.join(here, 'src', 'brand', 'bspt-logo.png')).toString('base64');
  fs.writeFileSync(
    path.join(out, 'assets', 'brand', 'header-logo.svg'),
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="38mm" height="7.44mm" viewBox="0 0 1400 274"><image width="1400" height="274" xlink:href="data:image/png;base64,${logo}"/></svg>`,
  );
  fs.copyFileSync(path.join(here, 'node_modules', 'diff', 'dist', 'diff.min.js'), path.join(out, 'assets', 'diff.min.js'));
  writeFonts();

  // Content referenced from the markdown
  for (const d of ['Imagens', 'Images', 'IDS', 'IDS-EN']) copyDir(path.join(root, d), path.join(out, d));
  fs.mkdirSync(path.join(out, 'pdf'), { recursive: true });
  fs.writeFileSync(path.join(out, '.nojekyll'), '');
  fs.writeFileSync(path.join(out, 'version.json'), JSON.stringify(versions, null, 2));

  const warn = docs.pt.headings.length !== docs.en.headings.length;
  for (const lang of Object.keys(LANGS)) {
    const v = versions[lang];
    console.log(
      `${LANGS[lang].label}: v${v.version}${v.draft ? ' (working draft)' : ''} · ${v.date}${v.commit ? ` · ${v.commit}` : ''} · ${docs[lang].headings.length} headings · ${history[lang].length} versions in history`,
    );
  }
  if (warn) console.warn('warning: PT/EN heading structure differs; the language switch will fall back to the top of the page');
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await build();
