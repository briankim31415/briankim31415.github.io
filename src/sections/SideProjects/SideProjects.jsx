import Reveal from '../../common/Reveal';
import { sideProjects } from '../../content/siteContent';
import styles from './SideProjectsStyles.module.css';

function SideProjects() {
  return (
    <section id="side-projects" className={styles.container}>
      <Reveal className={styles.headingBlock} variant="fade">
        <p className={styles.eyebrow}>Side Projects</p>
        <h2>Small tools and experiments built around real workflows.</h2>
        <p className={styles.lead}>
          Lightweight projects that sit outside the main portfolio but are useful enough
          to keep within reach.
        </p>
      </Reveal>

      <div className={styles.projectsGrid}>
        {sideProjects.map((project, index) => (
          <Reveal key={project.title} delayMs={Math.min(index * 60, 180)}>
            <a className={styles.projectCard} href={project.link}>
              <div className={styles.cardHeader}>
                <p className={styles.kicker}>Tool</p>
                <h3>{project.title}</h3>
              </div>
              <p className={styles.summary}>{project.summary}</p>
              {project.proofChips?.length ? (
                <ul className={styles.chips}>
                  {project.proofChips.map((chip) => (
                    <li key={chip}>{chip}</li>
                  ))}
                </ul>
              ) : null}
              <span className={styles.linkHint}>Open project -&gt;</span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default SideProjects;
