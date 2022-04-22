import React, { useEffect } from "react";
import styled from "styled-components";
import { micromark } from "micromark";
import { gfm, gfmHtml } from "micromark-extension-gfm";
import { matchMdLink, replaceMentionLinks } from "./utils";
import sanitizeHtml from "sanitize-html";
import markdownStyle from "../styles/markdown";

const Wrapper = styled.div`
  font-size: 16px;
  ${markdownStyle};
`;

export default function MicromarkMd({ md = "", allowTags }) {
  const linkMd = matchMdLink(replaceMentionLinks(md));
  const displayContent = linkMd.replace(/\n+/g, function (ns) {
    if (ns.length === 1) return "  " + ns;
    return ns;
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/prism.js";
    document.body.appendChild(script);
  }, []);

  const html = micromark(displayContent, {
    allowDangerousHtml: true,
    extensions: [gfm()],
    htmlExtensions: [gfmHtml()],
  });

  const cleanHtml = sanitizeHtml(html, {
    allowedTags:
      allowTags ??
      sanitizeHtml.defaults.allowedTags.concat(["img", "iframe", "br"]),
    allowedAttributes: {
      img: ["src", "size", "width", "height"],
      iframe: ["src", "width", "height"],
      a: ["href", "rel", "target"],
      "*": ["class"],
      td: ["align"],
      th: ["align"],
    },
  });

  return (
    <Wrapper
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
