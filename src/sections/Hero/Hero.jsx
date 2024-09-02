import styles from './HeroStyles.module.css';
import heroImg from '../../assets/pfp.png';
import linkedinIcon from '../../assets/linkedin-dark.svg';
import githubIcon from '../../assets/github-dark.svg';
import resume from '../../assets/Brian Kim_Resume.pdf';

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
					>
						<img
							src={linkedinIcon}
							alt='LinkedIn icon'
						/>
					</a>
					<a
						href='https://github.com/briankim31415'
						target='_blank'
					>
						<img
							src={githubIcon}
							alt='GitHub icon'
						/>
					</a>
				</span>
				<p className={styles.description}>
					Master's student in Software Engineering and Systems at UT
					Austin focusing on AI/ML systems.
				</p>
				<a
					className={styles.description}
					href='/src/personal_ad/index.html'
				>
					Personal Ad
				</a>
				<a
					href={resume}
					target='_blank'
					onClick={(e) => {
						e.preventDefault();
						setTimeout(() => {
							window.open(resume, '_blank');
						}, 100);
					}}
				>
					<button className='hover'>Resume</button>
				</a>
			</div>
		</section>
	);
}

export default Hero;
