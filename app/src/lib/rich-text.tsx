import React from "react";

/** Toggles a `**bold**` / `_italic_` marker around the current textarea selection. Returns the new value + selection range. */
export function applyInlineMarker(
  el: HTMLTextAreaElement,
  value: string,
  marker: string
): { value: string; start: number; end: number } | null {
  const start = el.selectionStart;
  const end = el.selectionEnd;
  if (start === end) return null;
  const mLen = marker.length;
  const before = value.slice(0, start);
  const sel = value.slice(start, end);
  const after = value.slice(end);
  const hasOuter = before.slice(-mLen) === marker && after.slice(0, mLen) === marker;
  const hasInner = sel.length >= 2 * mLen && sel.slice(0, mLen) === marker && sel.slice(-mLen) === marker;
  if (hasOuter) {
    return {
      value: before.slice(0, -mLen) + sel + after.slice(mLen),
      start: start - mLen,
      end: end - mLen,
    };
  }
  if (hasInner) {
    return {
      value: before + sel.slice(mLen, -mLen) + after,
      start,
      end: end - 2 * mLen,
    };
  }
  return {
    value: before + marker + sel + marker + after,
    start: start + mLen,
    end: end + mLen,
  };
}

/** Toggles `- ` bullet prefixes across the line(s) touching the current selection/caret. */
export function applyBulletToggle(
  el: HTMLTextAreaElement,
  value: string
): { value: string; start: number; end: number } {
  const start = el.selectionStart;
  const end = el.selectionEnd;
  const lineStart = value.lastIndexOf("\n", start - 1) + 1;
  let lineEnd = value.indexOf("\n", end);
  if (lineEnd === -1) lineEnd = value.length;
  const block = value.slice(lineStart, lineEnd);
  const lines = block.split("\n");
  const contentLines = lines.filter((l) => l.trim() !== "");
  const allBulleted = contentLines.length > 0 && contentLines.every((l) => /^\s*-\s+/.test(l));
  const newLines = lines.map((l) => {
    if (l.trim() === "") return l;
    if (allBulleted) return l.replace(/^\s*-\s+/, "");
    return /^\s*-\s+/.test(l) ? l : "- " + l;
  });
  const newBlock = newLines.join("\n");
  const newVal = value.slice(0, lineStart) + newBlock + value.slice(lineEnd);
  const delta = newBlock.length - block.length;
  return { value: newVal, start: lineStart, end: lineEnd + delta };
}

function formatInline(text: string): React.ReactNode[] {
  if (!text) return [text];
  const nodes: React.ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|_(.+?)_/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1] !== undefined) nodes.push(<strong key={key++}>{m[1]}</strong>);
    else nodes.push(<em key={key++}>{m[2]}</em>);
    last = re.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/** Renders bold/italic inline markup and bullet lines as React nodes, matching the prototype's live-preview formatting. */
export function formatBlock(text: string): React.ReactNode {
  if (!text) return null;
  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  let listBuf: string[] = [];
  let key = 0;
  const flushList = () => {
    if (listBuf.length) {
      blocks.push(
        <ul key={key++} style={{ margin: "4px 0", paddingLeft: "18px" }}>
          {listBuf.map((l, i) => (
            <li key={i} style={{ marginBottom: "4px" }}>
              {formatInline(l)}
            </li>
          ))}
        </ul>
      );
      listBuf = [];
    }
  };
  lines.forEach((line) => {
    const bulletMatch = /^\s*-\s+(.*)$/.exec(line);
    if (bulletMatch) {
      listBuf.push(bulletMatch[1]);
    } else {
      flushList();
      if (line.trim() === "") {
        blocks.push(<div key={key++} style={{ height: "8px" }} />);
      } else {
        blocks.push(<div key={key++}>{formatInline(line)}</div>);
      }
    }
  });
  flushList();
  return blocks;
}
