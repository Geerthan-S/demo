export function SectionLabel({ value }: { value: string }) {
  return (
    <aside className="section-label" aria-hidden="true">
      <span>{value}</span>
    </aside>
  );
}

