import styles from './EducationStyles.module.css';

const education = [
  {
    degree: 'MSE, Software Engineering & Systems',
    school: 'The University of Texas at Austin',
    timeframe: 'May 2025',
    detail: "Thesis: Do Privacy Policies Align with Users' Privacy Values?",
  },
  {
    degree: 'BSEE, Software Engineering & Design',
    school: 'The University of Texas at Austin',
    timeframe: 'May 2023',
    detail: 'GPA: 3.73/4.0',
  },
];

function Education() {
  return (
    <section id="education" className={styles.container}>
      <h1 className="sectionTitle">Education</h1>
      <div className={styles.cards}>
        {education.map((item) => (
          <article key={item.degree} className={styles.card}>
            <div className={styles.header}>
              <h3>{item.degree}</h3>
              <p className={styles.timeframe}>{item.timeframe}</p>
            </div>
            <p>{item.school}</p>
            <p className={styles.detail}>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Education;
