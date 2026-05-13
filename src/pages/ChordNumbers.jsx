import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  generateChordChart,
  KEY_ROOTS,
  MODES,
} from '../features/chordNumbers/chartGenerator';
import styles from './ChordNumbers.module.css';

const COPY_RESET_DELAY = 1400;

async function copyChartToClipboard(result) {
  if (navigator.clipboard?.write && window.ClipboardItem) {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([result.clipboardHtml], { type: 'text/html' }),
          'text/plain': new Blob([result.text], { type: 'text/plain' }),
        }),
      ]);
      return;
    } catch {
      // Fall through to plain text. Some browsers expose write() but block HTML.
    }
  }

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(result.text);
    return;
  }

  throw new Error('Clipboard access is unavailable.');
}

function ChordNumbers() {
  const [input, setInput] = useState('');
  const [keyRoot, setKeyRoot] = useState('C');
  const [mode, setMode] = useState('major');
  const [copyStatus, setCopyStatus] = useState('idle');
  const [copyError, setCopyError] = useState('');
  const result = useMemo(
    () => generateChordChart(input, { keyRoot, mode }),
    [input, keyRoot, mode],
  );

  const handleCopy = useCallback(async () => {
    try {
      await copyChartToClipboard(result);
      setCopyStatus('copied');
      setCopyError('');
    } catch {
      setCopyStatus('error');
      setCopyError('Clipboard unavailable');
    }
  }, [result]);

  useEffect(() => {
    if (copyStatus !== 'copied') {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setCopyStatus('idle');
    }, COPY_RESET_DELAY);

    return () => window.clearTimeout(timeout);
  }, [copyStatus]);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a className={styles.homeLink} href="/">
          Home
        </a>
        <div className={styles.titleBlock}>
          <h1>Chord Numbers</h1>
        </div>
        <div className={styles.controls} aria-label="Chart settings">
          <label className={styles.control}>
            <span>Key</span>
            <select value={keyRoot} onChange={(event) => setKeyRoot(event.target.value)}>
              {KEY_ROOTS.map((root) => (
                <option key={root} value={root}>
                  {root}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.control}>
            <span>Mode</span>
            <select value={mode} onChange={(event) => setMode(event.target.value)}>
              {MODES.map((modeOption) => (
                <option key={modeOption.value} value={modeOption.value}>
                  {modeOption.label}
                </option>
              ))}
            </select>
          </label>
          <button className={styles.copyButton} type="button" onClick={handleCopy}>
            {copyStatus === 'copied' ? 'Copied' : 'Copy Chart'}
          </button>
        </div>
      </header>

      <section className={styles.workspace} aria-label="Chord chart converter">
        <label className={styles.panel}>
          <span className={styles.panelTitle}>Input</span>
          <textarea
            className={styles.input}
            value={input}
            spellCheck="false"
            onChange={(event) => setInput(event.target.value)}
          />
        </label>

        <div className={styles.panel}>
          <div className={styles.panelTitle}>Preview</div>
          <pre
            className={styles.preview}
            aria-label="Generated Nashville number chart preview"
            dangerouslySetInnerHTML={{ __html: result.html }}
          />
        </div>

        <div className={`${styles.panel} ${styles.lyricsPanel}`}>
          <div className={styles.panelTitle}>Lyrics</div>
          <pre className={styles.preview} aria-label="Lyrics-only preview">
            {result.lyricsText}
          </pre>
        </div>
      </section>

      <div className={styles.statusRow} aria-live="polite">
        {copyError ? <p className={styles.copyError}>{copyError}</p> : null}
        {result.warnings.length > 0 ? (
          <section className={styles.warnings} aria-label="Preview warnings">
            <h2>Warnings</h2>
            <ul>
              {result.warnings.map((warning, index) => (
                <li key={`${warning.lineNumber}-${warning.message}-${index}`}>
                  Line {warning.lineNumber}: {warning.message}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </main>
  );
}

export default ChordNumbers;
