/**
 * @file Markdown渲染组件
 */
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkDirective from "remark-directive";
import remarkDirectiveReHype from "remark-directive-rehype";
import { styled } from "styled-components";

const StyledReactMarkdown = styled(ReactMarkdown)`
  width: "100%";
  overflow: hidden;

  .katex-html {
    display: none;
  }
`;

interface Props {
  children: string;
}

export default function Markdown(props: Props) {
  const { children } = props;

  const remarkPlugins = [remarkGfm, remarkMath, remarkDirective, remarkDirectiveReHype];
  const rehypePlugins = [rehypeKatex];

  const components = {
    h1: ({ node, ...props }) => (
      <h1 id={props.children} {...props}>
        {props.children}
      </h1>
    ),
    h2: ({ node, ...props }) => (
      <h2 id={props.children} {...props}>
        {props.children}
      </h2>
    ),
    h3: ({ node, ...props }) => (
      <h3 id={props.children} {...props}>
        {props.children}
      </h3>
    ),
    h4: ({ node, ...props }) => (
      <h4 id={props.children} {...props}>
        {props.children}
      </h4>
    ),
    h5: ({ node, ...props }) => (
      <h5 id={props.children} {...props}>
        {props.children}
      </h5>
    ),
    h6: ({ node, ...props }) => (
      <h6 id={props.children} {...props}>
        {props.children}
      </h6>
    ),
  } as any;

  return (
    <StyledReactMarkdown remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins} components={components}>
      {children}
    </StyledReactMarkdown>
  );
}
