import styles from './Reveal.module.css';
import useReveal from '../hooks/useReveal';

function Reveal({
  as: Component = 'div',
  children,
  variant = 'up',
  delayMs = 0,
  className = '',
  style,
  revealRef,
  ...props
}) {
  const { ref, isVisible, reducedMotion } = useReveal();

  const handleRef = (node) => {
    ref.current = node;

    if (typeof revealRef === 'function') {
      revealRef(node);
      return;
    }

    if (revealRef) {
      revealRef.current = node;
    }
  };

  const revealClasses = [
    styles.reveal,
    styles[variant],
    isVisible || reducedMotion ? styles.visible : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component
      ref={handleRef}
      className={revealClasses}
      style={{
        '--reveal-delay': `${delayMs}ms`,
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Reveal;
