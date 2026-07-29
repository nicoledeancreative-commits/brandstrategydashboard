import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = ["p", "strong", "em", "ul", "li", "br"];

/** Sanitizes rich-text HTML down to the tag set the editor/preview actually support. */
export function sanitizeRichText(html: string): string {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR: [] });
}

/** True if a stored field already looks like the HTML the TipTap editor produces. */
function looksLikeHtml(text: string): boolean {
  return /^\s*<[a-z][\s\S]*>/i.test(text);
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inlineToHtml(text: string): string {
  return escapeHtml(text).replace(
    /\*\*(.+?)\*\*|_(.+?)_/g,
    (_match, bold: string | undefined, italic: string | undefined) =>
      bold !== undefined ? `<strong>${bold}</strong>` : `<em>${italic}</em>`
  );
}

/**
 * Converts the old markdown-lite format (`**bold**`, `_italic_`, `- bullet` lines) that
 * fields were stored as before the WYSIWYG editor, into the same HTML shape TipTap now
 * produces — so pre-existing content keeps rendering/editing correctly.
 */
function legacyPlainTextToHtml(text: string): string {
  if (!text) return "";
  const lines = text.split("\n");
  const blocks: string[] = [];
  let listBuf: string[] = [];
  const flushList = () => {
    if (listBuf.length) {
      blocks.push(`<ul>${listBuf.map((l) => `<li>${inlineToHtml(l)}</li>`).join("")}</ul>`);
      listBuf = [];
    }
  };
  for (const line of lines) {
    const bulletMatch = /^\s*-\s+(.*)$/.exec(line);
    if (bulletMatch) {
      listBuf.push(bulletMatch[1]);
      continue;
    }
    flushList();
    if (line.trim() !== "") {
      blocks.push(`<p>${inlineToHtml(line)}</p>`);
    }
  }
  flushList();
  return blocks.join("");
}

/** Returns sanitized HTML ready to feed into the TipTap editor or render read-only. */
export function toDisplayHtml(text: string): string {
  if (!text) return "";
  return sanitizeRichText(looksLikeHtml(text) ? text : legacyPlainTextToHtml(text));
}
