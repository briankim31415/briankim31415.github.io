import styles from './SkillsStyles.module.css';
import checkMarkIcon from '../../assets/checkmark-dark.svg';
import SkillList from '../../common/SkillList';

function Skills() {
  return (
    <section id="skills" className={styles.container}>
      <h1 className="sectionTitle">Skills</h1>
      <div className={styles.skillList}>
        <SkillList src={checkMarkIcon} skill="OpenAI API" />
        <SkillList src={checkMarkIcon} skill="PyTorch" />
        <SkillList src={checkMarkIcon} skill="TensorFlow" />
        <SkillList src={checkMarkIcon} skill="Scikit-Learn" />
        <SkillList src={checkMarkIcon} skill="Linux" />
      </div>
      <hr />
      <div className={styles.skillList}>
        <SkillList src={checkMarkIcon} skill="Python" />
        <SkillList src={checkMarkIcon} skill="Java" />
        <SkillList src={checkMarkIcon} skill="SAS/SQL" />
        <SkillList src={checkMarkIcon} skill="C/C++" />
        <SkillList src={checkMarkIcon} skill="LaTeX" />
      </div>
    </section>
  );
}

export default Skills;