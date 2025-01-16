import styles from './ProjectsStyles.module.css'
import ProjectCard from '../../common/ProjectCard';
import madcommunity from '../../assets/madcommunity.png'
import neatpso from '../../assets/neatpso.png'
import rlstock from '../../assets/rlstock.png'
import musentiment from '../../assets/musentiment.png'

function Projects() {
  return (
    <section id="projects" className={styles.container}>
        <h1 className="sectionTitle">Projects</h1>
        <div className={styles.projectsContainer}>
            <ProjectCard 
                src={madcommunity} 
                link="https://github.com/briankim31415/MAD-Community" 
                h3='MAD-Community'
                p1='MAD-Community is an innovative Multi-Agent Debate framework designed to enhance the problem-solving capabilities of Large Language Models (LLMs). The project organizes LLM agents into interconnected communities, where agents collaboratively debate and refine responses through a directed graph network structure. Using system prompt engineering techniques, the framework ensures high-quality and concise debate outcomes.'
                p2='The optimized network design achieved a 39% accuracy improvement compared to a GPT-4-based model from the original benchmark study, utilizing cost-efficient GPT-4o mini agents. This project demonstrates the potential of multi-agent architectures in advancing LLM performance while minimizing operational costs.'
            />
            <ProjectCard 
                src={neatpso} 
                link="https://github.com/briankim31415/NEAT-PSO" 
                h3='NEAT-PSO: Hybrid CNN Architecture Evolution'
                p1='NEAT-PSO is a hybrid neural network architecture evolution framework that combines NeuroEvolution of Augmenting Topologies (NEAT) with Particle Swarm Optimization (PSO) to enhance the performance and efficiency of convolutional neural networks (CNNs). The project employs multi-objective PSO to optimize NEAT hyperparameters, focusing on minimizing error rates and improving parameter efficiency.'
                p2='This approach demonstrated significant performance gains, achieving double the accuracy of the fittest individual compared to the worst individual over 50 generations on the CIFAR-10 image classification benchmark. NEAT-PSO showcases the power of hybrid evolutionary algorithms in advancing neural network design.'
            />
            <ProjectCard 
                src={rlstock} 
                h3='Reinforcement Learning Trading Agent Exploration'
                p1='Reinforcement Learning Trading Agent Exploration focuses on leveraging deep reinforcement learning (RL) techniques for stock trading. The project developed a custom RL model that integrates convolutional neural networks (CNNs) with established frameworks to analyze and execute trading strategies. The performance of RL algorithms, including A2C, PPO, DDPG, and their ensemble, was evaluated using financial metrics such as Sharpe ratio, return, and volatility.'
                p2='The ensemble model, enhanced with CNNs, achieved superior performance, outperforming four major market indices over a five-year period (January 2018 to January 2023). This project highlights the potential of RL-based trading systems in financial market applications.'
            />
            <ProjectCard 
                src={musentiment} 
                link="https://github.com/jeeminhan/MuSentiment" 
                h3='MuSentiment'
                p1='MuSentiment is a data-driven project that explores the relationship between music sentiment and societal trends. The project analyzed the lyrics of 1,500 Billboard Hot 100 songs from 2006 to 2020 using NLTK sentiment analysis on web-scraped data. Yearly sentiment trends were then compared with CDC depression and drug usage data to uncover potential correlations.'
                p2='This project earned 2nd place in the 2021 TAMU Datathon Data Synthesis Challenge, demonstrating its innovative approach to combining sentiment analysis and public health data for uncovering meaningful insights.'
            />
        </div>
    </section>
  )
}

export default Projects;