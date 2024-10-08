import DOMPurify from "dompurify";

export default function HtmlContentRenderer({ content }: { content: string }) {
  const sanitizedContent = DOMPurify.sanitize(content);

  return <span dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
}
