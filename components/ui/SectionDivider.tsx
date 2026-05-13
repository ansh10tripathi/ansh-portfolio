export function SectionDivider() {
  return (
    <div aria-hidden style={{ position: 'relative' }}>
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, var(--border-accent) 30%, var(--border-accent) 70%, transparent 100%)',
          margin: '0 auto',
        }}
      />
    </div>
  );
}
