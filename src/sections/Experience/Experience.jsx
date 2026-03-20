import styles from './ExperienceStyles.module.css';

const experiences = [
  {
    role: 'Software Engineer',
    organization: 'UT Computational Visualization Center',
    location: 'Austin, TX',
    timeframe: 'May 2025 - Present',
    highlights: [
      'Built a Python simulation platform around NVIDIA Sionna-RT for ray-traced urban radio-wave propagation.',
      'Automated OpenStreetMap, ArcGIS, and Blender workflows to generate digital twin scenes in Unreal Engine 5.',
      'Ran real-time assessment pipelines covering dataset generation and ResNet-18 training.',
      'Trained an Infinite-GAN neural SDE on TACC with 400+ W&B GPU-hours for urban movement generation.',
    ],
  },
  {
    role: 'Graduate Research Assistant',
    organization: 'UT Center for Identity',
    location: 'Austin, TX',
    timeframe: 'September 2023 - May 2025',
    highlights: [
      'Published four peer-reviewed papers with Dr. Suzanne Barber, including two first-author publications.',
      'Served as a teaching assistant across three undergraduate and graduate courses in information security and privacy.',
      'Supported two senior capstone teams on the PrivacyCheck project with onboarding, planning, and development.',
    ],
  },
  {
    role: 'Cybersecurity Intern',
    organization: 'United States Automobile Association',
    location: 'San Antonio, TX',
    timeframe: 'May 2023 - August 2023',
    highlights: [
      'Migrated eight legacy Detica rulesets to SAS to support fraud-detection system decommissioning.',
      'Worked with onsite and offshore teams to refine matching logic and reduce false positives.',
    ],
  },
];

function Experience() {
  return (
    <section id="experience" className={styles.container}>
      <h1 className="sectionTitle">Experience</h1>
      <div className={styles.cards}>
        {experiences.map((experience) => (
          <article key={`${experience.role}-${experience.organization}`} className={styles.card}>
            <div className={styles.header}>
              <div>
                <h3>{experience.role}</h3>
                <p className={styles.organization}>
                  {experience.organization} | {experience.location}
                </p>
              </div>
              <p className={styles.timeframe}>{experience.timeframe}</p>
            </div>
            <ul className={styles.highlights}>
              {experience.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Experience;
