// Version history page: compares two versions of the document, block by block,
// and shows additions, removals and word-level edits grouped by section.
(() => {
  const C = window.CHANGES;
  const D = window.Diff;
  if (!C || !D) return;

  const $ = (s) => document.querySelector(s);
  const fromSel = $('#from');
  const toSel = $('#to');
  const out = $('#diff');
  const summary = $('#summary');
  const gh = $('#gh-compare');
  const order = C.versions.map((v) => v.id);
  const byId = Object.fromEntries(C.versions.map((v) => [v.id, v]));

  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  // Table rows are stored as "cell | cell | cell".
  const fmt = (s) => esc(s).replace(/ \| /g, '<span class="sep" aria-hidden="true"> │ </span>');

  const cache = new Map();
  const load = (id) => {
    if (!cache.has(id)) cache.set(id, fetch(`data/${encodeURIComponent(id)}.json`).then((r) => r.json()));
    return cache.get(id);
  };

  // ---- defaults from the URL (?from=v1.1.2&to=v1.1.3), else previous → latest
  const params = new URLSearchParams(location.search);
  const valid = (id) => order.includes(id);
  const qFrom = params.get('from');
  let to = valid(params.get('to')) ? params.get('to') : order[order.length - 1];
  // A version that does not exist in this language (e.g. older than the English text) → the oldest one.
  let from = valid(qFrom) ? qFrom : qFrom ? order[0] : order[Math.max(0, order.indexOf(to) - 1)];
  if (from === to) {
    const i = order.indexOf(to);
    if (i > 0) from = order[i - 1];
    else if (order.length > 1) to = order[1];
  }
  fromSel.value = from;
  toSel.value = to;

  // ---- similarity used to decide whether a removed + added pair is "the same block, edited"
  const words = (s) => new Set(s.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean));
  function similarity(a, b) {
    const A = words(a);
    const B = words(b);
    if (!A.size && !B.size) return 1;
    let common = 0;
    for (const w of A) if (B.has(w)) common++;
    return common / Math.max(A.size, B.size);
  }

  // Pair blocks from a removed run with blocks from the following added run.
  function pairRuns(removed, added, ops) {
    let j = 0;
    for (const r of removed) {
      let match = -1;
      for (let k = j; k < Math.min(added.length, j + 6); k++) {
        if (added[k].k === r.k && similarity(r.t, added[k].t) >= 0.4) {
          match = k;
          break;
        }
      }
      if (match === -1) {
        ops.push({ type: 'del', a: r });
        continue;
      }
      for (; j < match; j++) ops.push({ type: 'add', b: added[j] });
      ops.push({ type: 'mod', a: r, b: added[match] });
      j = match + 1;
    }
    for (; j < added.length; j++) ops.push({ type: 'add', b: added[j] });
  }

  function compare(A, B) {
    const parts = D.diffArrays(
      A.blocks.map((b) => `${b.k}\u0000${b.t}`),
      B.blocks.map((b) => `${b.k}\u0000${b.t}`),
    );
    const ops = [];
    let ia = 0;
    let ib = 0;
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      const n = p.count ?? p.value.length;
      if (!p.added && !p.removed) {
        ia += n;
        ib += n;
        continue;
      }
      let removed = [];
      let added = [];
      if (p.removed) {
        removed = A.blocks.slice(ia, (ia += n));
        if (parts[i + 1]?.added) {
          const m = parts[++i].count ?? parts[i].value.length;
          added = B.blocks.slice(ib, (ib += m));
        }
      } else {
        added = B.blocks.slice(ib, (ib += n));
        if (parts[i + 1]?.removed) {
          const m = parts[++i].count ?? parts[i].value.length;
          removed = A.blocks.slice(ia, (ia += m));
        }
      }
      pairRuns(removed, added, ops);
    }
    return ops;
  }

  function wordDiff(a, b) {
    return D.diffWordsWithSpace(a, b)
      .map((p) => (p.added ? `<ins>${fmt(p.value)}</ins>` : p.removed ? `<del>${fmt(p.value)}</del>` : fmt(p.value)))
      .join('');
  }

  function sectionOf(op, A, B) {
    return op.b ? B.sections[op.b.s] : A.sections[op.a.s];
  }

  function sectionHeader(sec) {
    const path = sec.path.length ? `<span class="d-path">${sec.path.map(esc).join(' › ')}</span>` : '';
    const title = sec.title ? esc(sec.title) : esc(C.t.start);
    const link = sec.id && C.docIds.includes(sec.id) ? ` <a class="d-link" href="${C.docHref}#${encodeURIComponent(sec.id)}">${esc(C.t.viewSection)} →</a>` : '';
    return `<header class="d-head">${path}<h3>${title}${link}</h3></header>`;
  }

  function render(ops, A, B) {
    if (!ops.length) {
      out.innerHTML = `<p class="d-empty">${esc(C.t.noChanges)}</p>`;
      summary.textContent = '';
      return;
    }
    const groups = [];
    for (const op of ops) {
      const sec = sectionOf(op, A, B);
      const key = sec.id || sec.title;
      const last = groups[groups.length - 1];
      if (last && last.key === key) last.ops.push(op);
      else groups.push({ key, sec, ops: [op] });
    }
    const counts = { add: 0, del: 0, mod: 0 };
    ops.forEach((o) => counts[o.type]++);
    const keys = new Set(groups.map((g) => g.key));
    const n = (k, v) => `${v} ${esc(C.t.counts[k][v === 1 ? 0 : 1])}`;
    summary.innerHTML =
      `<span><strong>${keys.size}</strong> ${esc(C.t.counts.sec[keys.size === 1 ? 0 : 1])}</span>` +
      `<span class="pill pill-mod">${n('mod', counts.mod)}</span>` +
      `<span class="pill pill-add">${n('add', counts.add)}</span>` +
      `<span class="pill pill-del">${n('del', counts.del)}</span>`;

    const label = { add: C.t.added, del: C.t.removed, mod: C.t.changed };
    out.innerHTML = groups
      .map(
        (g) =>
          `<section class="d-sec">${sectionHeader(g.sec)}${g.ops
            .map((op) => {
              const kind = (op.b || op.a).k;
              const body = op.type === 'mod' ? wordDiff(op.a.t, op.b.t) : fmt((op.b || op.a).t);
              return `<div class="d-op d-${op.type} k-${kind}"><span class="d-tag">${esc(label[op.type])}</span><div class="d-text">${body}</div></div>`;
            })
            .join('')}</section>`,
      )
      .join('');
  }

  async function update(push) {
    from = fromSel.value;
    to = toSel.value;
    if (order.indexOf(from) > order.indexOf(to)) [from, to] = [to, from];
    fromSel.value = from;
    toSel.value = to;
    const q = `?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
    if (push) history.replaceState(null, '', q + location.hash);
    gh.href = `${C.repo}/compare/${byId[from].ref}...${byId[to].ref}`;
    document.querySelectorAll('.lang-switch a[data-switch]').forEach((a) => {
      a.href = a.getAttribute('href').split('?')[0] + q;
    });
    if (from === to) {
      out.innerHTML = `<p class="d-empty">${esc(C.t.noChanges)}</p>`;
      summary.textContent = '';
      return;
    }
    summary.textContent = C.t.loading;
    out.setAttribute('aria-busy', 'true');
    try {
      const [A, B] = await Promise.all([load(from), load(to)]);
      if (fromSel.value !== from || toSel.value !== to) return; // a newer selection is in flight
      render(compare(A, B), A, B);
    } catch (e) {
      summary.textContent = String(e);
    } finally {
      out.removeAttribute('aria-busy');
    }
  }

  fromSel.addEventListener('change', () => update(true));
  toSel.addEventListener('change', () => update(true));
  update(false);
})();
