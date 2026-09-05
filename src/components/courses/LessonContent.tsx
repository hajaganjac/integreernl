import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function LessonContent({ content }: { content: string }) {
  return (
    <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:text-ink-900 prose-h2:text-xl prose-h3:text-lg prose-a:text-brand-600 prose-strong:text-ink-900 prose-blockquote:border-brand-300 prose-blockquote:text-body-muted prose-table:text-sm prose-thead:border-ink-200 prose-code:text-brand-700 prose-code:bg-brand-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-ink-900">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
