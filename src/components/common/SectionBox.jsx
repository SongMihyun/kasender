function SectionBox({ id, children }) {
  return (
    <section id={id} className="sectionBox">
      {children}
    </section>
  );
}

export default SectionBox;