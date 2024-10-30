import DOMPurify from "dompurify";

export default function HtmlContentRenderer({ content }: { content: string }) {
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <span
      className="prose prose-ol:list-decimal prose-ol:pl-5 prose-li:pl-1 prose-li:my-1 text-default-700"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
}
