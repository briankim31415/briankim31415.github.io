import styles from './HeroStyles.module.css';
import heroImg from '../../assets/brian-headshot.webp';
import Reveal from '../../common/Reveal';
import { heroContent } from '../../content/siteContent';

function Hero() {
	return (
		<section id='hero' className={styles.container}>
			<div className={styles.info}>
				<Reveal as='p' variant='fade' className={styles.eyebrow}>
					Digital Twins / Full-Stack / Simulation / AI
				</Reveal>
				<Reveal as='h1' delayMs={30}>
					{heroContent.name}
				</Reveal>
				<Reveal as='p' className={styles.role} delayMs={70}>
					{heroContent.role}
				</Reveal>
				<Reveal as='p' className={styles.description} delayMs={110}>
					{heroContent.description}
				</Reveal>
				<div className={styles.proofGrid}>
					{heroContent.proofChips.map((chip, index) => (
						<Reveal
							key={chip}
							as='span'
							className={styles.proofChip}
							variant='scale'
							delayMs={Math.min(index * 50, 180)}
						>
							{chip}
						</Reveal>
					))}
				</div>
				<Reveal as='div' className={styles.actions} delayMs={160}>
					<a
						className={styles.primaryAction}
						href={heroContent.cta.href}
						target='_blank'
						rel='noreferrer'
					>
						{heroContent.cta.label}
					</a>
					<a className={styles.secondaryAction} href='#projects'>
						Explore Work
					</a>
					<div className={styles.socials}>
						{heroContent.socialLinks.map((link) => (
							<a
								key={link.label}
								href={link.href}
								target='_blank'
								rel='noreferrer'
								className={styles.socialLink}
								aria-label={link.label}
								title={link.label}
							>
								<img src={link.icon} alt='' aria-hidden='true' />
							</a>
						))}
					</div>
				</Reveal>
			</div>
			<Reveal as='div' className={styles.visual} variant='scale' delayMs={190}>
				<div className={styles.frame}>
					<p className={styles.frameLabel}>Austin, TX</p>
					<img
						className={styles.hero}
						src={heroImg}
						alt='Headshot of Brian Kim'
					/>
				</div>
			</Reveal>
		</section>
	);
}

export default Hero;
