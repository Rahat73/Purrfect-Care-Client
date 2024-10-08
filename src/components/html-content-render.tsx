import DOMPurify from "dompurify";

export default function HtmlContentRenderer({ content }: { content: string }) {
  const sanitizedContent = DOMPurify.sanitize(content);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
}
