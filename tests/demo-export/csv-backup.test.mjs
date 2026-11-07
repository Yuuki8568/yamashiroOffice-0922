import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import * as O from '../../packages/web/public/demos/order-workshop/core.js';
import * as W from '../../packages/web/public/demos/order-workshop/workflow.js';
import * as S from '../../packages/web/public/demos/shift-workshop/core.js';

// Parse fields independently, including quoted commas, quotes and embedded newlines.
function parseCsv(text) {
  assert.equal(text[0], '\uFEFF');
  const rows = []; let row = [], cell = '', quoted = false;
  for (let i = 1; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (quoted && text[i + 1] === '"') { cell += '"'; i++; }
      else quoted = !quoted;
    } else if (!quoted && c === ',') { row.push(cell); cell = ''; }
    else if (!quoted && c === '\r' && text[i + 1] === '\n') {
      row.push(cell); rows.push(row); row = []; cell = ''; i++;
    } else cell += c;
  }
  assert.equal(quoted, false);
  row.push(cell); rows.push(row); return rows;
}
function order(reason) {
  const base = W.upgrade(O.preset());
  const state = O.approve(base, 'tea', O.analyse(base, base.products[0]).qty);
  state.orders[0].reason = reason;
  return O.validateSaved(JSON.parse(JSON.stringify(state)));
}
function shift(name) {
  const state = S.preset();
  state.staff[0].name = name;
  state.assignments = [S.assignment(state.staff[0].id, state.start, 'early', state.staff[0].role)];
  assert.deepEqual(S.inputErrors(state), []);
  assert.deepEqual(S.validate(state), []);
  return state;
}
const dangerous = ['=1+1', '+1', '-1', '@SUM(1)', ' =1+1', '\n=1+1',
  '\t文字', '\r文字', '\n文字', '＝1+1', '＋1', '－1', '＠SUM(1)', '　＝1+1'];
for (const value of dangerous) {
  test('both CSV exports protect imported cell prefix ' + JSON.stringify(value), () => {
    const o = parseCsv(O.orderCsv(order(value)));
    const s = parseCsv(S.csv(shift(value)));
    assert.equal(o[1][7], "'" + value);
    assert.equal(s[1][2], "'" + value);
    assert.equal(o[1].length, 8);
    assert.equal(s[1].length, 7);
  });
}
test('CSV keeps Japanese, embedded separators, quotes and line breaks within one cell', () => {
  const value = '山代, "確認"\n2行目;=1+1';
  const o = parseCsv(O.orderCsv(order(value)));
  const s = parseCsv(S.csv(shift(value)));
  assert.equal(o.length, 2); assert.equal(s.length, 2);
  assert.equal(o[1][7], value); assert.equal(s[1][2], value);
  assert.equal(o[1][3], String(O.preset().products[0].cost));
});
test('order JSON backup restores approved orders, mobile settings and exact CSV bytes', async () => {
  const original = order('架空の復元確認');
  original.mobile.reminder = '19:30';
  const dir = await mkdtemp(path.join(tmpdir(), 'demo-order-roundtrip-'));
  try {
    const file = path.join(dir, 'backup.json');
    await writeFile(file, JSON.stringify(original), 'utf8');
    const restored = W.upgrade(O.validateSaved(JSON.parse(await readFile(file, 'utf8'))));
    assert.deepEqual(restored, original);
    assert.equal(O.orderCsv(restored), O.orderCsv(original));
    assert.equal(O.remainingBudget(restored), O.remainingBudget(original));
  } finally { await rm(dir, { recursive: true, force: true }); }
});
test('shift JSON backup preserves generated assignments, preferences and CSV bytes', async () => {
  const original = S.preset();
  original.preferences[original.staff[0].id + '|' + original.start] = 'off';
  const generated = S.generate(original);
  assert.deepEqual(generated.errors, []);
  original.assignments = generated.assignments;
  const dir = await mkdtemp(path.join(tmpdir(), 'demo-shift-roundtrip-'));
  try {
    const file = path.join(dir, 'backup.json');
    await writeFile(file, JSON.stringify(original), 'utf8');
    const restored = JSON.parse(await readFile(file, 'utf8'));
    assert.deepEqual(S.inputErrors(restored), []);
    assert.deepEqual(S.validate(restored), []);
    assert.deepEqual(restored, original);
    assert.equal(S.csv(restored), S.csv(original));
    assert.deepEqual(S.metrics(restored), S.metrics(original));
    const csv = path.join(dir, 'shift.csv');
    await writeFile(csv, S.csv(restored), 'utf8');
    const bytes = await readFile(csv);
    assert.deepEqual([...bytes.subarray(0, 3)], [0xef, 0xbb, 0xbf]);
    assert.equal(parseCsv(bytes.toString('utf8')).length, restored.assignments.length + 1);
  } finally { await rm(dir, { recursive: true, force: true }); }
});
