import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildClipboardHtml,
  convertChordToken,
  generateChordChart,
} from '../src/features/chordNumbers/chartGenerator.js';

test('converts chord lines while preserving lyric lines and columns', () => {
  const result = generateChordChart('[Verse]\n    C       G\nLyric line');

  assert.equal(result.text, '[Verse]\n    1       5\nLyric line');
  assert.equal(result.lyricsText, 'Lyric line');
  assert.equal(result.warnings.length, 0);
  assert.match(result.html, /<strong>1<\/strong>\s+<strong>5<\/strong>/);
});

test('expands tabs to four-column spaces in output', () => {
  const result = generateChordChart('C\tG');

  assert.equal(result.text, '1   5');
});

test('maps natural minor degrees while preserving chord quality', () => {
  const tokens = ['Am', 'C', 'E', 'Em', 'Bb', 'B', 'F', 'G'];
  const converted = tokens.map((token) => convertChordToken(token, { keyRoot: 'A', mode: 'minor' }).converted);

  assert.deepEqual(converted, ['1m', 'b3', '5', '5m', 'b2', '2', 'b6', 'b7']);
});

test('preserves chord modifiers, shorthand qualities, punctuation, and slash bass notes', () => {
  const tokens = ['CMaj7', 'C°7', 'Cø', 'C+7', 'G/B', '(Am7).'];
  const converted = tokens.map((token) => convertChordToken(token, { keyRoot: 'C' }).converted);

  assert.deepEqual(converted, ['1Maj7', '1dim7', '1m7b5', '1aug7', '5/7', '(6m7).']);
});

test('preserves unrecognized chord-line tokens with non-blocking warnings', () => {
  const result = generateChordChart('Capo 2\nlyric line');

  assert.equal(result.text, 'Capo 2\nlyric line');
  assert.deepEqual(
    result.warnings.map((warning) => warning.message),
    ['Unrecognized chord token "Capo" preserved.', 'Unrecognized chord token "2" preserved.'],
  );
});

test('keeps bar markers standalone and warns for attached bar markers', () => {
  const result = generateChordChart('| G |\nlyric\n|G');

  assert.equal(result.text, '| 5 |\nlyric\n|G');
  assert.deepEqual(result.warnings, [
    {
      lineNumber: 3,
      message: 'Unrecognized chord token "|G" preserved.',
    },
  ]);
});

test('collapses duplicated content inside a section and multiplies heading repeats', () => {
  const result = generateChordChart('[Chorus] (x2)\nC\nWords\nC\nWords');

  assert.equal(result.text, '[Chorus] x4\n1\nWords');
  assert.equal(result.lyricsText, 'Words');
});

test('collapses later repeated sections while preserving their headings', () => {
  const result = generateChordChart('[Chorus]\nC\nWords\n\n[Chorus] (x2)\nC\nWords');

  assert.equal(result.text, '[Chorus]\n1\nWords\n\n[Chorus] (x2)');
  assert.equal(result.lyricsText, 'Words');
});

test('builds lyrics-only text without headings or chord lines', () => {
  const result = generateChordChart('[Verse]\nC        G\nLine one\nAm       F\nLine two');

  assert.equal(result.lyricsText, 'Line one\nLine two');
});

test('preserves interior lyric spacing without leading or trailing blank lines', () => {
  const result = generateChordChart('\n[Verse]\nC\nLine one\n\nG\nLine two\n\n');

  assert.equal(result.lyricsText, 'Line one\n\nLine two');
});

test('limits interior blank gaps in chord and lyric output to one empty row', () => {
  const result = generateChordChart('[Verse]\nC\nLine one\n\n\n\nG\nLine two');

  assert.equal(result.text, '[Verse]\n1\nLine one\n\n5\nLine two');
  assert.equal(result.lyricsText, 'Line one\n\nLine two');
});

test('collapses whitespace-only blank rows to a clean empty row', () => {
  const result = generateChordChart('[Verse]\nC\nLine one\n   \n\t\nG\nLine two');

  assert.equal(result.text, '[Verse]\n1\nLine one\n\n5\nLine two');
  assert.equal(result.lyricsText, 'Line one\n\nLine two');
});

test('limits lyric gaps after chord lines are filtered out', () => {
  const result = generateChordChart('[Verse]\nC\nLine one\n\nG\n\nLine two');

  assert.equal(result.text, '[Verse]\n1\nLine one\n\n5\n\nLine two');
  assert.equal(result.lyricsText, 'Line one\n\nLine two');
});

test('escapes clipboard HTML and bolds only converted chord tokens', () => {
  const result = generateChordChart('C\n<lyric & text>');

  assert.equal(result.text, '1\n<lyric & text>');
  assert.equal(
    result.clipboardHtml,
    buildClipboardHtml('<strong>1</strong>\n&lt;lyric &amp; text&gt;'),
  );
});
