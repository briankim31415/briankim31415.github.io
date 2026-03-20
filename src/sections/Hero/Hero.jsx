import styles from './HeroStyles.module.css';
import heroImg from '../../assets/pfp.png';
import linkedinIcon from '../../assets/linkedin-dark.svg';
import githubIcon from '../../assets/github-dark.svg';
import resume from '../../assets/Resume_Brian Kim.pdf';

function Hero() {
	return (
		<section
			id='hero'
			className={styles.container}
		>
			<div className={styles.colorModeContainer}>
				<img
					className={styles.hero}
					src={heroImg}
					alt='Profile picture of Brian Kim'
				/>
			</div>
			<div className={styles.info}>
				<h1>Brian Kim</h1>
				<h2>Software Engineer</h2>
				<span>
					<a
						href='https://www.linkedin.com/in/briankim31415/'
						target='_blank'
						rel='noreferrer'
					>
						<img
							src={linkedinIcon}
							alt='LinkedIn icon'
						/>
					</a>
					<a
						href='https://github.com/briankim31415'
						target='_blank'
						rel='noreferrer'
					>
						<img
							src={githubIcon}
							alt='GitHub icon'
						/>
					</a>
				</span>
				<p className={styles.description}>
					UT Austin MSE graduate building AI/ML, simulation, and privacy-focused systems.
				</p>
				<a
					href={resume}
					target='_blank'
					rel='noreferrer'
				>
					<button className='hover'>Resume</button>
				</a>
			</div>
		</section>
	);
}

export default Hero;
