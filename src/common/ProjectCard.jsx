import styles from './ProjectCard.module.css';

function ProjectCard({ project, featured = false }) {
  const Tag = project.link ? 'a' : 'article';

  const content = (
    <>
      <div className={styles.copy}>
        <div className={styles.header}>
          <p className={styles.kicker}>{featured ? 'Featured case study' : 'Project'}</p>
          <h3>{project.title}</h3>
        </div>
        {project.proofChips?.length ? (
          <ul className={styles.chips}>
            {project.proofChips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
        ) : null}
        <div className={styles.body}>
          <p>{project.summary}</p>
          <p className={styles.outcome}>{project.outcome}</p>
        </div>
        {project.link ? <span className={styles.linkHint}>View project -&gt;</span> : null}
      </div>
      <div className={styles.visual}>
        <img src={project.image} alt={`${project.title} preview`} />
      </div>
    </>
  );

  if (!project.link) {
    return <article className={`${styles.card} ${featured ? styles.featured : styles.compact}`}>{content}</article>;
  }

  return (
    <Tag
      className={`${styles.card} ${featured ? styles.featured : styles.compact}`}
      href={project.link}
      target="_blank"
      rel="noreferrer"
    >
      {content}
    </Tag>
  );
}

export default ProjectCard;
