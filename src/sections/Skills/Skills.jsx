import styles from './SkillsStyles.module.css';
import checkMarkIcon from '../../assets/checkmark-dark.svg';
import Reveal from '../../common/Reveal';
import { skillGroups } from '../../content/siteContent';

function Skills() {
  return (
    <section id="capabilities" className={styles.container}>
      <Reveal className={styles.headingBlock} variant="fade">
        <p className={styles.eyebrow}>Capabilities</p>
        <h2>Built for research depth, systems thinking, and pragmatic delivery.</h2>
        <p className={styles.lead}>
          A working toolkit across modeling, simulation, infrastructure, and engineering
          execution.
        </p>
      </Reveal>
      <div className={styles.groups}>
        {skillGroups.map((group, groupIndex) => (
          <Reveal
            key={group.title}
            as="article"
            className={styles.group}
            delayMs={Math.min(groupIndex * 60, 180)}
          >
            <div className={styles.groupHeader}>
              <h3>{group.title}</h3>
              <p className={styles.groupDescription}>{group.description}</p>
            </div>
            <div className={styles.skillList}>
              {group.skills.map((skill, skillIndex) => (
                <Reveal
                  key={skill}
                  as="span"
                  className={styles.pillReveal}
                  variant="scale"
                  delayMs={Math.min(skillIndex * 40, 160)}
                >
                  <span className={styles.pill}>
                    <img src={checkMarkIcon} alt="" aria-hidden="true" />
                    <span>{skill}</span>
                  </span>
                </Reveal>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Skills;
