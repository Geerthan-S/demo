export function Marquee({ items }: { items: string[] }) {
  const content = [...items, ...items, ...items];

  return (
    <div className="industrial-marquee" aria-label="Trusted clients">
      <div className="industrial-marquee__track">
        {content.map((item, index) => (
          <span className="industrial-marquee__item" key={`${item}-${index}`}>
            {item}
            <span>+</span>
          </span>
        ))}
      </div>
    </div>
  );
}

