import styles from './ProjectsStyles.module.css';
import ProjectCard from '../../common/ProjectCard';
import madcommunity from '../../assets/madcommunity.png';
import musentiment from '../../assets/musentiment.png';
import neatpso from '../../assets/neatpso.png';
import rlstock from '../../assets/rlstock.png';

function Projects() {
  const projects = [
    {
      src: madcommunity,
      link: 'https://github.com/briankim31415/MAD-Community',
      title: 'MAD-Community',
      summary:
        'Designed a configurable multi-agent debate framework that routes LLM agents through community-based network topologies and staged judging to improve answer quality.',
      outcome:
        "Developed prompt templates, network presets, and evaluation tooling that improved benchmark accuracy by 39% over the paper's GPT-4 baseline while reducing model cost with GPT-4o mini agents.",
    },
    {
      src: neatpso,
      link: 'https://github.com/briankim31415/NEAT-PSO',
      title: 'NEAT-PSO: Hybrid CNN Architecture Evolution',
      summary:
        'Built a hybrid neural architecture search pipeline that combines NEAT-style topology evolution with multi-objective particle swarm optimization for CNN design on CIFAR-10.',
      outcome:
        'Optimized for both classification error and parameter efficiency, producing evolved architectures whose best individuals delivered roughly 2x the accuracy of the weakest candidates over 50 generations.',
    },
    {
      src: rlstock,
      title: 'Reinforcement Learning Trading Agent Exploration',
      summary:
        'Developed a deep reinforcement learning research pipeline for equity trading using CNN-based feature extraction with A2C, PPO, DDPG, and ensemble strategies.',
      outcome:
        'Benchmarked strategies with return, volatility, and Sharpe ratio, and the CNN-augmented ensemble outperformed four major market indices from January 2018 through January 2023.',
    },
    {
      src: musentiment,
      link: 'https://github.com/jeeminhan/MuSentiment',
      title: 'MuSentiment',
      summary:
        'Built an end-to-end analysis pipeline that scraped Billboard, Genius, Spotify, and CDC datasets to study how lyrical sentiment in popular music tracks with public health indicators.',
      outcome:
        'Applied NLTK sentiment analysis, regression modeling, and trend visualizations across 1,500 Billboard Hot 100 songs, earning 2nd place in the 2021 Texas A&M Datathon Data Synthesis Challenge.',
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
