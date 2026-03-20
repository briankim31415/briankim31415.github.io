function ProjectCard({ src, link, h3, p1, p2 }) {
  const content = (
    <>
      <img className={link ? 'hover' : ''} src={src} alt={`${h3} logo`} />
      <h3>{h3}</h3>
      <p>{p1}</p>
      <p>{p2}</p>
    </>
  );

  if (!link) {
    return <article>{content}</article>;
  }

  return (
    <a href={link} target="_blank" rel="noreferrer">
      {content}
    </a>
  );
}

export default ProjectCard;
