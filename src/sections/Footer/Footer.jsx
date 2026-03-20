import styles from './FooterStyles.module.css';
import Reveal from '../../common/Reveal';
import { contactContent } from '../../content/siteContent';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <section id="contact" className={styles.container}>
      <Reveal className={styles.panel} variant="fade">
        <p className={styles.eyebrow}>Contact</p>
        <h2>{contactContent.heading}</h2>
        <p className={styles.description}>{contactContent.text}</p>
        <div className={styles.actions}>
          {contactContent.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={styles.actionLink}
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className={styles.copyright}>
          &copy; {year} Brian Kim.
          <br />
          All rights reserved.
        </p>
      </Reveal>
    </section>
  );
}

export default Footer;
