function Button({ children, variant = "primary", onClick, href, target }) {
  const className = `button button-${variant}`;

  if (href) {
    return (
      <a className={className} href={href} target={target} rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;