function SectionTitle({ label, title, description }) {
  return (
    <div className="sectionTitle">
      <span>{label}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export default SectionTitle;