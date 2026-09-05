/**
 * Glossary tooltip for Dutch-specific terminology. Uses <abbr> so the
 * definition is exposed to assistive tech and on hover/focus without JS —
 * non-Dutch-speaking users shouldn't have to leave the page to follow along.
 */
export function Term({ children, definition }: { children: React.ReactNode; definition: string }) {
  return (
    <abbr
      title={definition}
      tabIndex={0}
      className="cursor-help font-medium text-ink-900 underline decoration-dotted decoration-accent-400 underline-offset-4 no-underline-skip"
    >
      {children}
    </abbr>
  );
}
