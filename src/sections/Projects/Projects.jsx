import styles from './ProjectsStyles.module.css';
import ProjectCard from '../../common/ProjectCard';
import madcommunity from '../../assets/madcommunity.png';
import neatpso from '../../assets/neatpso.png';
import rlstock from '../../assets/rlstock.png';

function Projects() {
  const projects = [
    {
      src: madcommunity,
      link: 'https://github.com/briankim31415/MAD-Community',
      title: 'MAD-Community',
      summary:
        'Built a multi-agent debate framework that organizes LLM agents into interconnected communities and refines answers through directed graph debate stages.',
      outcome:
        "Used prompt engineering and network design to improve accuracy by 39% over the paper's GPT-4 baseline while running on cheaper GPT-4o mini agents.",
    },
    {
      src: neatpso,
      link: 'https://github.com/briankim31415/NEAT-PSO',
      title: 'NEAT-PSO: Hybrid CNN Architecture Evolution',
      summary:
        'Developed a hybrid architecture search workflow that combines NeuroEvolution of Augmenting Topologies with Particle Swarm Optimization for CNN design.',
      outcome:
        'Optimized for lower error and better parameter efficiency, doubling accuracy between the best and worst individuals over 50 generations on CIFAR-10.',
    },
    {
      src: rlstock,
      title: 'Reinforcement Learning Trading Agent Exploration',
      summary:
        'Built a deep reinforcement learning trading workflow that combines CNNs with A2C, PPO, DDPG, and ensemble strategies.',
      outcome:
        'Compared Sharpe ratio, return, and volatility, and the CNN-backed ensemble outperformed four major market indices from January 2018 to January 2023.',
    },
  ];

  return (
    <section id="projects" className={styles.container}>
      <h1 className="sectionTitle">Projects</h1>
      <div className={styles.projectsContainer}>
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            src={project.src}
            link={project.link}
            h3={project.title}
            p1={project.summary}
            p2={project.outcome}
          />
        ))}
      </div>
    </section>
  );
}

export default Projects;
