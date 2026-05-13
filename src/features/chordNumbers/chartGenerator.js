export const KEY_ROOTS = [
  'C',
  'C#',
  'Db',
  'D',
  'D#',
  'Eb',
  'E',
  'F',
  'F#',
  'Gb',
  'G',
  'G#',
  'Ab',
  'A',
  'A#',
  'Bb',
  'B',
];

export const MODES = [
  { value: 'major', label: 'Major' },
  { value: 'minor', label: 'Minor' },
];

const NOTE_TO_SEMITONE = {
  C: 0,
  'C#': 1,
  Db: 1,
  D: 2,
  'D#': 3,
  Eb: 3,
  E: 4,
  F: 5,
  'F#': 6,
  Gb: 6,
  G: 7,
  'G#': 8,
  Ab: 8,
  A: 9,
  'A#': 10,
  Bb: 10,
  B: 11,
};

const FLAT_DEGREES = ['1', 'b2', '2', 'b3', '3', '4', 'b5', '5', 'b6', '6', 'b7', '7'];
const SHARP_DEGREES = ['1', '#1', '2', '#2', '3', '4', '#4', '5', '#5', '6', '#6', '7'];
const CHART_MARKERS = new Set(['|', '||', ':|', '|:', '%']);
const NO_CHORD_MARKERS = new Set(['N.C.', 'NC', 'N.C', 'n.c.', 'nc', 'n.c']);
const TRAILING_PUNCTUATION = new Set([',', '.', ':', ';', '!', '?']);
const QUALITY_WORDS = [
  'maj',
  'Maj',
  'MAJ',
  'min',
  'Min',
  'MIN',
  'dim',
  'Dim',
  'DIM',
  'aug',
  'Aug',
  'AUG',
  'sus',
  'Sus',
  'SUS',
  'add',
  'Add',
  'ADD',
  'no',
  'No',
  'NO',
];

const SECTION_HEADING_RE = /^\[([^\]]+)\](?:\s*(?:x([2-9]\d*)|\(x([2-9]\d*)\)))?\s*$/;
const REPEAT_MARKER_RE = /^(?:x([2-9]\d*)|\(x([2-9]\d*)\))$/;
const ROOT_RE = /^([A-G])([#b]?)(.*)$/u;
const BASS_NOTE_RE = /^([A-G])([#b]?)$/;
const HTML_ESCAPE_RE = /[&<>]/g;

const escapeHtml = (value) =>
  value.replace(HTML_ESCAPE_RE, (character) => {
    if (character === '&') {
      return '&amp;';
    }

    if (character === '<') {
      return '&lt;';
    }

    return '&gt;';
  });

const isBlank = (line) => /^\s*$/.test(line);

function expandTabs(line) {
  let column = 0;
  let output = '';

  for (const character of line) {
    if (character === '\t') {
      const spaces = 4 - (column % 4);
      output += ' '.repeat(spaces);
      column += spaces;
    } else {
      output += character;
      column += 1;
    }
  }

  return output;
}

function normalizeInput(input) {
  const normalized = input.replace(/\r\n?/g, '\n');
  const lines = normalized.split('\n').map((text, index) => ({
    text: expandTabs(text),
    lineNumber: index + 1,
  }));

  let firstContentLine = 0;
  let lastContentLine = lines.length - 1;

  while (firstContentLine < lines.length && isBlank(lines[firstContentLine].text)) {
    firstContentLine += 1;
  }

  while (lastContentLine >= firstContentLine && isBlank(lines[lastContentLine].text)) {
    lastContentLine -= 1;
  }

  if (firstContentLine > lastContentLine) {
    return [];
  }

  return lines.slice(firstContentLine, lastContentLine + 1);
}

function parseRepeatMarker(token) {
  const match = token.match(REPEAT_MARKER_RE);

  if (!match) {
    return null;
  }

  return Number(match[1] || match[2]);
}

function parseSectionHeading(line) {
  const match = line.match(SECTION_HEADING_RE);

  if (!match) {
    return null;
  }

  const headingText = match[1];
  const repeatCount = Number(match[2] || match[3] || 1);
  const bracketEnd = line.indexOf(']');
  const canonicalHeading = headingText.trim().toLowerCase();

  return {
    original: line,
    base: line.slice(0, bracketEnd + 1),
    canonicalHeading: canonicalHeading || null,
    repeatCount,
  };
}

function parseSections(lines) {
  const sections = [];
  let currentSection = {
    heading: null,
    body: [],
    implicit: true,
  };

  lines.forEach((line) => {
    const heading = parseSectionHeading(line.text);

    if (!heading) {
      currentSection.body.push(line);
      return;
    }

    if (!currentSection.implicit || currentSection.body.length > 0) {
      sections.push(currentSection);
    }

    currentSection = {
      heading: {
        ...heading,
        lineNumber: line.lineNumber,
      },
      body: [],
      implicit: false,
    };
  });

  if (!currentSection.implicit || currentSection.body.length > 0) {
    sections.push(currentSection);
  }

  return sections;
}

function tokenizeLine(line) {
  const tokens = [];
  const tokenRe = /\S+/g;
  let match = tokenRe.exec(line);

  while (match) {
    tokens.push({
      value: match[0],
      start: match.index,
      end: match.index + match[0].length,
    });
    match = tokenRe.exec(line);
  }

  return tokens;
}

function normalizeSemitone(value) {
  return ((value % 12) + 12) % 12;
}

function getDegree(note, keyRoot) {
  const keySemitone = NOTE_TO_SEMITONE[keyRoot] ?? NOTE_TO_SEMITONE.C;
  const noteSemitone = NOTE_TO_SEMITONE[`${note.root}${note.accidental}`];
  const interval = normalizeSemitone(noteSemitone - keySemitone);
  const degrees = note.accidental === '#' ? SHARP_DEGREES : FLAT_DEGREES;

  return degrees[interval];
}

function consumeDigits(value, startIndex) {
  let index = startIndex;

  while (index < value.length && /\d/.test(value[index])) {
    index += 1;
  }

  return index;
}

function isValidQuality(quality) {
  if (quality === '') {
    return true;
  }

  if (quality.includes('♭') || quality.includes('♯')) {
    return false;
  }

  let index = 0;

  while (index < quality.length) {
    const word = QUALITY_WORDS.find((candidate) => quality.startsWith(candidate, index));

    if (word) {
      index += word.length;
      continue;
    }

    const character = quality[index];

    if (character === 'm' || character === 'M' || character === '+' || character === '°' || character === 'ø') {
      index += 1;
      continue;
    }

    if (/\d/.test(character)) {
      index = consumeDigits(quality, index);
      continue;
    }

    if (character === '#' || character === 'b') {
      const nextIndex = consumeDigits(quality, index + 1);

      if (nextIndex === index + 1) {
        return false;
      }

      index = nextIndex;
      continue;
    }

    if (character === '(') {
      const closeIndex = quality.indexOf(')', index + 1);

      if (closeIndex === -1) {
        return false;
      }

      const innerQuality = quality.slice(index + 1, closeIndex);

      if (!innerQuality || !isValidQuality(innerQuality)) {
        return false;
      }

      index = closeIndex + 1;
      continue;
    }

    return false;
  }

  return true;
}

function normalizeQualityShorthand(quality) {
  if (quality.startsWith('°')) {
    return `dim${quality.slice(1)}`;
  }

  if (quality.startsWith('ø7')) {
    return `m7b5${quality.slice(2)}`;
  }

  if (quality.startsWith('ø')) {
    return `m7b5${quality.slice(1)}`;
  }

  if (quality.startsWith('+')) {
    return `aug${quality.slice(1)}`;
  }

  return quality;
}

function parseNote(value) {
  const match = value.match(BASS_NOTE_RE);

  if (!match) {
    return null;
  }

  return {
    root: match[1],
    accidental: match[2] || '',
  };
}

function convertChordCore(core, keyRoot) {
  const slashParts = core.split('/');

  if (slashParts.length > 2 || slashParts.some((part) => part === '')) {
    return null;
  }

  const [mainChord, bassNote] = slashParts;
  const match = mainChord.match(ROOT_RE);

  if (!match) {
    return null;
  }

  const [, root, accidental = '', quality = ''] = match;

  if (!isValidQuality(quality)) {
    return null;
  }

  const convertedQuality = normalizeQualityShorthand(quality);
  const convertedRoot = getDegree({ root, accidental }, keyRoot);

  if (!bassNote) {
    return `${convertedRoot}${convertedQuality}`;
  }

  const parsedBassNote = parseNote(bassNote);

  if (!parsedBassNote) {
    return null;
  }

  return `${convertedRoot}${convertedQuality}/${getDegree(parsedBassNote, keyRoot)}`;
}

export function convertChordToken(token, options = {}) {
  const keyRoot = options.keyRoot || 'C';

  if (CHART_MARKERS.has(token) || NO_CHORD_MARKERS.has(token) || parseRepeatMarker(token)) {
    return {
      recognized: true,
      lineCompatible: true,
      converted: token,
      strong: false,
      type: 'marker',
    };
  }

  let core = token;
  let trailingPunctuation = '';

  while (core && TRAILING_PUNCTUATION.has(core.at(-1))) {
    trailingPunctuation = `${core.at(-1)}${trailingPunctuation}`;
    core = core.slice(0, -1);
  }

  if (!core || CHART_MARKERS.has(core) || NO_CHORD_MARKERS.has(core) || parseRepeatMarker(core)) {
    return {
      recognized: false,
      lineCompatible: false,
      converted: token,
      strong: false,
      type: 'unknown',
    };
  }

  if (core.startsWith('(') && core.endsWith(')')) {
    const innerCore = core.slice(1, -1);

    if (!innerCore || parseRepeatMarker(core)) {
      return {
        recognized: false,
        lineCompatible: false,
        converted: token,
        strong: false,
        type: 'unknown',
      };
    }

    const convertedInnerCore = convertChordCore(innerCore, keyRoot);

    if (!convertedInnerCore) {
      return {
        recognized: false,
        lineCompatible: false,
        converted: token,
        strong: false,
        type: 'unknown',
      };
    }

    return {
      recognized: true,
      lineCompatible: true,
      converted: `(${convertedInnerCore})${trailingPunctuation}`,
      strong: true,
      type: 'chord',
    };
  }

  const convertedCore = convertChordCore(core, keyRoot);

  if (!convertedCore) {
    return {
      recognized: false,
      lineCompatible: false,
      converted: token,
      strong: false,
      type: 'unknown',
    };
  }

  return {
    recognized: true,
    lineCompatible: true,
    converted: `${convertedCore}${trailingPunctuation}`,
    strong: true,
    type: 'chord',
  };
}

function lineCanBeChordOnly(line, options) {
  const tokens = tokenizeLine(line);

  if (tokens.length === 0) {
    return false;
  }

  return tokens.every((token) => convertChordToken(token.value, options).lineCompatible);
}

function createPlainLine(text, type = 'lyric') {
  return {
    text,
    type,
    segments: [{ text, strong: false }],
  };
}

function processChordLine(line, options, warnings) {
  const tokens = tokenizeLine(line.text);
  const convertedTokens = tokens.map((token) => ({
    ...token,
    result: convertChordToken(token.value, options),
  }));
  const segments = [];
  let outputLength = 0;

  convertedTokens.forEach((token, index) => {
    if (!token.result.recognized) {
      warnings.push({
        lineNumber: line.lineNumber,
        message: `Unrecognized chord token "${token.value}" preserved.`,
      });
    }

    const nextToken = convertedTokens[index + 1];

    if (nextToken && token.result.type === 'chord') {
      const availableColumns = nextToken.start - token.start;

      if (token.result.converted.length > availableColumns) {
        warnings.push({
          lineNumber: line.lineNumber,
          message: `Converted token "${token.value}" overlaps token "${nextToken.value}".`,
        });
      }
    }

    if (outputLength < token.start) {
      const spacer = ' '.repeat(token.start - outputLength);
      segments.push({ text: spacer, strong: false });
      outputLength = token.start;
    }

    segments.push({
      text: token.result.converted,
      strong: token.result.strong,
    });
    outputLength += token.result.converted.length;
  });

  if (outputLength < line.text.length) {
    segments.push({
      text: ' '.repeat(line.text.length - outputLength),
      strong: false,
    });
  }

  return {
    text: segments.map((segment) => segment.text).join(''),
    type: 'chord',
    segments,
  };
}

function processSection(section, options, warnings) {
  const bodyLines = [];
  let expectedLine = 'chord';

  section.body.forEach((line) => {
    if (isBlank(line.text)) {
      bodyLines.push(createPlainLine(line.text, 'blank'));
      return;
    }

    if (expectedLine === 'afterChord' && !lineCanBeChordOnly(line.text, options)) {
      bodyLines.push(createPlainLine(line.text, 'lyric'));
      expectedLine = 'chord';
      return;
    }

    bodyLines.push(processChordLine(line, options, warnings));
    expectedLine = 'afterChord';
  });

  return {
    ...section,
    headingLine: section.heading ? createPlainLine(section.heading.original, 'heading') : null,
    bodyLines,
  };
}

function normalizeComparisonLine(line) {
  const withoutApostrophes = line.trim().replace(/['’]/g, '');
  const withoutHyphenBreaks = withoutApostrophes.replace(/[-–—]/g, ' ');
  const withoutOrdinaryPunctuation = withoutHyphenBreaks.replace(/[^A-Za-z0-9#/\s]/g, ' ');

  return withoutOrdinaryPunctuation.replace(/\s+/g, ' ').trim().toLowerCase();
}

function getComparisonLines(lines) {
  return lines
    .map((line, index) => ({
      index,
      value: normalizeComparisonLine(line.text),
    }))
    .filter((line) => line.value !== '');
}

function comparisonSignature(lines) {
  const comparisonLines = getComparisonLines(lines);

  if (comparisonLines.length === 0) {
    return null;
  }

  return JSON.stringify(comparisonLines.map((line) => line.value));
}

function chunksMatch(values, chunkSize, repeatCount) {
  for (let repeatIndex = 1; repeatIndex < repeatCount; repeatIndex += 1) {
    for (let valueIndex = 0; valueIndex < chunkSize; valueIndex += 1) {
      if (values[valueIndex] !== values[repeatIndex * chunkSize + valueIndex]) {
        return false;
      }
    }
  }

  return true;
}

function getTrailingBlankLines(lines) {
  let lastContentIndex = lines.length - 1;

  while (lastContentIndex >= 0 && isBlank(lines[lastContentIndex].text)) {
    lastContentIndex -= 1;
  }

  return lines.slice(lastContentIndex + 1);
}

function updateHeadingRepeat(section, repeatCount) {
  return {
    ...section,
    headingLine: createPlainLine(
      `${section.heading.base} x${section.heading.repeatCount * repeatCount}`,
      'heading',
    ),
  };
}

function collapseWithinSection(section) {
  if (!section.heading) {
    return section;
  }

  const comparisonLines = getComparisonLines(section.bodyLines);

  if (comparisonLines.length < 2) {
    return section;
  }

  const values = comparisonLines.map((line) => line.value);

  for (let repeatCount = comparisonLines.length; repeatCount >= 2; repeatCount -= 1) {
    if (comparisonLines.length % repeatCount !== 0) {
      continue;
    }

    const chunkSize = comparisonLines.length / repeatCount;

    if (!chunksMatch(values, chunkSize, repeatCount)) {
      continue;
    }

    const firstChunkEndIndex = comparisonLines[chunkSize - 1].index;
    const bodyLines = [
      ...section.bodyLines.slice(0, firstChunkEndIndex + 1),
      ...getTrailingBlankLines(section.bodyLines),
    ];

    return {
      ...updateHeadingRepeat(section, repeatCount),
      bodyLines,
    };
  }

  return section;
}

function preserveOuterBlankLines(lines) {
  const firstContentIndex = lines.findIndex((line) => !isBlank(line.text));

  if (firstContentIndex === -1) {
    return lines;
  }

  let lastContentIndex = lines.length - 1;

  while (lastContentIndex >= 0 && isBlank(lines[lastContentIndex].text)) {
    lastContentIndex -= 1;
  }

  return [...lines.slice(0, firstContentIndex), ...lines.slice(lastContentIndex + 1)];
}

function collapseRepeatedSections(sections) {
  const references = new Map();

  return sections.map((section) => {
    const canonicalHeading = section.heading?.canonicalHeading;
    const signature = comparisonSignature(section.bodyLines);

    if (!canonicalHeading || !signature) {
      return section;
    }

    if (!references.has(canonicalHeading)) {
      references.set(canonicalHeading, signature);
      return section;
    }

    if (references.get(canonicalHeading) !== signature) {
      return section;
    }

    return {
      ...section,
      bodyLines: preserveOuterBlankLines(section.bodyLines),
    };
  });
}

function renderLineHtml(line) {
  return line.segments
    .map((segment) => {
      const escapedText = escapeHtml(segment.text);

      return segment.strong ? `<strong>${escapedText}</strong>` : escapedText;
    })
    .join('');
}

function flattenSections(sections) {
  return sections.flatMap((section) => {
    if (!section.headingLine) {
      return section.bodyLines;
    }

    return [section.headingLine, ...section.bodyLines];
  });
}

function collapseInteriorBlankLines(lines) {
  const normalizedLines = [];

  lines.forEach((line) => {
    if (!isBlank(line.text)) {
      normalizedLines.push(line);
      return;
    }

    if (normalizedLines.at(-1)?.type === 'blank') {
      return;
    }

    normalizedLines.push(createPlainLine('', 'blank'));
  });

  return normalizedLines;
}

function trimBlankLines(lines) {
  let firstContentIndex = 0;
  let lastContentIndex = lines.length - 1;

  while (firstContentIndex < lines.length && lines[firstContentIndex].type === 'blank') {
    firstContentIndex += 1;
  }

  while (lastContentIndex >= firstContentIndex && lines[lastContentIndex].type === 'blank') {
    lastContentIndex -= 1;
  }

  return lines.slice(firstContentIndex, lastContentIndex + 1);
}

function buildLyricsText(outputLines) {
  const lyricsLines = outputLines.filter((line) => line.type === 'lyric' || line.type === 'blank');

  return collapseInteriorBlankLines(
    trimBlankLines(lyricsLines),
  )
    .map((line) => line.text)
    .join('\n');
}

export function buildClipboardHtml(bodyHtml) {
  return `<pre style="font-family: Courier New, monospace; white-space: pre;">${bodyHtml}</pre>`;
}

export function generateChordChart(input, options = {}) {
  const normalizedOptions = {
    keyRoot: KEY_ROOTS.includes(options.keyRoot) ? options.keyRoot : 'C',
    mode: options.mode === 'minor' ? 'minor' : 'major',
  };
  const warnings = [];
  const lines = normalizeInput(input);

  if (lines.length === 0) {
    return {
      text: '',
      lyricsText: '',
      html: '',
      clipboardHtml: buildClipboardHtml(''),
      warnings,
    };
  }

  const sections = collapseRepeatedSections(
    parseSections(lines)
      .map((section) => processSection(section, normalizedOptions, warnings))
      .map(collapseWithinSection),
  );
  const outputLines = collapseInteriorBlankLines(flattenSections(sections));
  const text = outputLines.map((line) => line.text).join('\n');
  const lyricsText = buildLyricsText(outputLines);
  const html = outputLines.map(renderLineHtml).join('\n');

  return {
    text,
    lyricsText,
    html,
    clipboardHtml: buildClipboardHtml(html),
    warnings,
  };
}
