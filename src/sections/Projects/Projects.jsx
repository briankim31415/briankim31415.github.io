import styles from './ProjectsStyles.module.css'
import Viberr from '../../assets/viberr.png'
import ProjectCard from '../../common/ProjectCard';

function Projects() {
  return (
    <section id="projects" className={styles.container}>
        <h1 className="sectionTitle">Projects</h1>
        <div className={styles.projectsContainer}>
            <ProjectCard 
                src={Viberr} 
                link="https://github.com/briankim31415/GhibliCycleGAN" 
                h3='Project 1' 
                p='Style Transform Model'
            />
            <ProjectCard 
                src={Viberr} 
                link="https://github.com/briankim31415/GhibliCycleGAN" 
                h3='Project 2' 
                p='Some project 1'
            />
            <ProjectCard 
                src={Viberr} 
                link="https://github.com/briankim31415/GhibliCycleGAN" 
                h3='Project 3' 
                p='Some project 2'
            />
        </div>
    </section>
  )
}

export default Projects;