import styles from './ProjectsStyles.module.css';
import ProjectCard from '../../common/ProjectCard';
import Reveal from '../../common/Reveal';
import { projects } from '../../content/siteContent';

function Projects() {
  const featuredProject = projects.find((project) => project.featured);
  const secondaryProjects = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className={styles.container}>
      <Reveal className={styles.headingBlock} variant="fade">
        <p className={styles.eyebrow}>Selected Work</p>
        <h2>Systems work that moves between research depth and practical delivery.</h2>
        <p className={styles.lead}>
          A focused slice of recent work across multi-agent systems, architecture search,
          reinforcement learning, and large-scale analysis pipelines.
        </p>
      </Reveal>

      {featuredProject ? (
        <Reveal className={styles.featured} delayMs={50}>
          <ProjectCard project={featuredProject} featured />
        </Reveal>
      ) : null}

      <div className={styles.projectsGrid}>
        {secondaryProjects.map((project, index) => (
          <Reveal key={project.title} delayMs={Math.min(index * 60, 180)}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Projects;
