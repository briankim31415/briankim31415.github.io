function ProjectCard({ src, link, h3, p1, p2 }) {
  const content = (
    <>
      <div>
        <h3>{h3}</h3>
        <p>{p1}</p>
        <p>{p2}</p>
      </div>
      <img className={link ? 'hover' : ''} src={src} alt={`${h3} logo`} />
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
