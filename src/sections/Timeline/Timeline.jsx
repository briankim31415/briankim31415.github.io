import { useEffect, useRef, useState } from 'react';
import Reveal from '../../common/Reveal';
import { timelineItems } from '../../content/siteContent';
import styles from './TimelineStyles.module.css';

function Timeline() {
  const itemRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const entriesByIndex = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          entriesByIndex.set(index, entry);
        });

        const nextActive = timelineItems
          .map((_, index) => ({
            index,
            entry: entriesByIndex.get(index),
          }))
          .filter(({ entry }) => entry?.isIntersecting)
          .sort(
            (entryA, entryB) =>
              entryB.entry.intersectionRatio - entryA.entry.intersectionRatio ||
              entryA.entry.boundingClientRect.top - entryB.entry.boundingClientRect.top,
          )[0];

        if (nextActive) {
          setActiveIndex(nextActive.index);
        }
      },
      {
        rootMargin: '-18% 0px -38% 0px',
        threshold: [0.22, 0.4, 0.6, 0.78],
      },
    );

    itemRefs.current.forEach((item) => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => observer.disconnect();
  }, []);

  const progress =
    timelineItems.length <= 1
      ? '100%'
      : `${Math.max(18, ((activeIndex + 1) / timelineItems.length) * 100)}%`;

  return (
    <section id="timeline" className={styles.container}>
      <Reveal className={styles.headingBlock} variant="fade">
        <p className={styles.eyebrow}>Career Timeline</p>
        <h2>Research, engineering, and academic work in one continuous arc.</h2>
        <p className={styles.lead}>
          A concise view of how simulation, privacy, and systems work have shaped the
          projects above.
        </p>
      </Reveal>

      <div className={styles.timelineShell}>
        <div className={styles.spine} aria-hidden="true">
          <span className={styles.spineTrack} />
          <span
            className={styles.spineFill}
            style={{ '--timeline-progress': progress }}
          />
        </div>

        <div className={styles.items}>
          {timelineItems.map((item, index) => (
            <Reveal
              key={`${item.title}-${item.timeframe}`}
              as="article"
              revealRef={(node) => {
                itemRefs.current[index] = node;
              }}
              className={`${styles.item} ${index === activeIndex ? styles.active : ''}`}
              delayMs={Math.min(index * 60, 180)}
            >
              <div className={styles.itemHeader}>
                <div className={styles.itemMeta}>
                  <span className={styles.kindLabel}>{item.kind}</span>
                  <h3>{item.title}</h3>
                  <p className={styles.organization}>
                    {item.organization} | {item.location}
                  </p>
                </div>
                <p className={styles.timeframe}>{item.timeframe}</p>
              </div>

              <ul className={styles.bullets}>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Timeline;
