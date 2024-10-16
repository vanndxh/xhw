/**
 * @file Markdown渲染组件
 */
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkDirective from "remark-directive";
import remarkDirectiveReHype from "remark-directive-rehype";
import { styled } from "styled-components";

const StyledReactMarkdown = styled(ReactMarkdown)`
  .katex-html {
    display: none;
  }
`;

interface Props {
  children: string;
}

export default function MarkdownRender(props: Props) {
  const { children } = props;

  const remarkPlugins = [remarkGfm, remarkMath, remarkDirective, remarkDirectiveReHype];
  const rehypePlugins = [rehypeKatex];
  const components = {};

  return (
    <StyledReactMarkdown remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins} components={components}>
      {children}
    </StyledReactMarkdown>
  );
}
