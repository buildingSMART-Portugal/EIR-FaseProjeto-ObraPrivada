// Version information derived from Git.
//
// A release is a tag named vX.Y.Z (create it from GitHub → Releases → "Draft a new release").
// Between releases the document is labelled automatically from the commits, e.g. "1.1.3+2"
// (2 commits changed this language's content since v1.1.3), with the date and hash of the
// latest change. Nobody needs to edit a version number by hand.

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

export function createGit(root) {
  const run = (...args) =>
    execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 * 1024 * 1024 }).trim();
  const ok = (...args) => {
    try {
      run(...args);
      return true;
    } catch {
      return false;
    }
  };

  const available = ok('rev-parse', '--git-dir');
  const shallow = available && run('rev-parse', '--is-shallow-repository') === 'true';

  /** All release tags vX.Y.Z, oldest first. */
  function tags() {
    if (!available) return [];
    return run('tag', '-l', 'v*', '--sort=v:refname')
      .split('\n')
      .filter((t) => /^v\d+\.\d+\.\d+$/.test(t))
      .map((tag) => ({ tag, version: tag.slice(1), commit: run('rev-list', '-n', '1', tag) }));
  }

  /** File contents at a given ref (first existing name wins), or null. */
  function show(ref, names) {
    for (const name of names) {
      try {
        return run('show', `${ref}:${name}`);
      } catch {
        /* try next */
      }
    }
    return null;
  }

  /** Latest commit (hash + ISO date) that touched `paths`, up to `ref`. */
  function lastChange(ref, paths) {
    const out = available ? run('log', '-1', '--format=%H%x09%cs', ref, '--', ...paths) : '';
    if (!out) return null;
    const [commit, date] = out.split('\t');
    return { commit, short: commit.slice(0, 7), date };
  }

  function countSince(tag, paths) {
    return Number(run('rev-list', '--count', `${tag}..HEAD`, '--', ...paths));
  }

  const isAncestor = (a, b) => ok('merge-base', '--is-ancestor', a, b);

  return { available, shallow, run, tags, show, lastChange, countSince, isAncestor };
}

/**
 * Version of one language's document.
 * @param git        result of createGit()
 * @param lang       { source, history: [file names], paths: [content paths] }
 * @param sameContent (oldMarkdown, newMarkdown) => boolean — ignores formatting-only differences
 */
export function documentVersion(git, root, lang, sameContent) {
  const today = new Date().toISOString().slice(0, 10);
  if (!git.available) return { version: 'dev', draft: true, date: today, commit: null, base: null };

  const head = git.run('rev-parse', 'HEAD');
  const last = git.lastChange('HEAD', lang.paths);
  const base = git
    .tags()
    .filter((t) => git.isAncestor(t.commit, head))
    .at(-1);

  if (!base) {
    return { version: 'dev', draft: true, date: last?.date || today, commit: last?.short || null, base: null };
  }

  const current = fs.readFileSync(path.join(root, lang.source), 'utf8');
  const atTag = git.show(base.tag, lang.history);
  const commits = git.countSince(base.tag, lang.paths);
  const assets = lang.paths.filter((p) => p !== lang.source);
  const assetsChanged = assets.length > 0 && git.run('diff', '--name-only', base.tag, '--', ...assets) !== '';
  const changed = !atTag || !sameContent(atTag, current) || assetsChanged;

  if (!changed) {
    const released = git.lastChange(base.tag, lang.paths);
    return { version: base.version, draft: false, date: released?.date || today, commit: released?.short || null, base: base.version, tag: base.tag };
  }
  return {
    version: `${base.version}+${commits || 'dev'}`,
    draft: true,
    date: commits ? last?.date || today : today,
    commit: commits ? last?.short : null,
    base: base.version,
    tag: base.tag,
  };
}
