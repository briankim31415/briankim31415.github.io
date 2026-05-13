import styles from './SectionNav.module.css';

function SectionNav({ sections, activeSection }) {
  return (
    <div className={styles.wrap}>
      <nav className={styles.nav} aria-label="Section navigation">
        <div className={styles.scroller}>
          <ul>
            {sections.map((section) => {
              const isActive = activeSection === section.id;

              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={isActive ? styles.active : ''}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className={styles.desktopLabel}>{section.label}</span>
                    <span className={styles.mobileLabel}>{section.shortLabel}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default SectionNav;
