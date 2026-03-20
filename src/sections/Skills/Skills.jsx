import styles from './SkillsStyles.module.css';
import checkMarkIcon from '../../assets/checkmark-dark.svg';
import SkillList from '../../common/SkillList';

function Skills() {
  const skillGroups = [
    {
      title: 'Programming',
      skills: ['Python', 'Java', 'SAS', 'SQL', 'C++'],
    },
    {
      title: 'Machine Learning',
      skills: [
        'PyTorch',
        'TensorFlow',
        'scikit-learn',
        'NumPy',
        'Reinforcement Learning',
        'OpenAI API',
        'Codex',
      ],
    },
    {
      title: 'Infrastructure',
      skills: ['Linux', 'Git', 'Slurm (HPC)', 'Weights & Biases'],
    },
    {
      title: 'Simulation / Graphics',
      skills: [
        'Blender',
        'Unreal Engine 5',
        'PyGame',
        'NVIDIA Sionna-RT',
        'OpenStreetMap',
        'ArcGIS',
      ],
    },
  ];

  return (
    <section id="skills" className={styles.container}>
      <h1 className="sectionTitle">Skills</h1>
      <div className={styles.groups}>
        {skillGroups.map((group) => (
          <div key={group.title} className={styles.group}>
            <h3>{group.title}</h3>
            <div className={styles.skillList}>
              {group.skills.map((skill) => (
                <SkillList key={skill} src={checkMarkIcon} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
