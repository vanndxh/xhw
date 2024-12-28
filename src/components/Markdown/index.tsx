/**
 * @file Markdown渲染组件
 */
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkDirective from "remark-directive";
import remarkDirectiveReHype from "remark-directive-rehype";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button, message, Space, Tag } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import styles from "./index.module.less";

interface Props {
  children: string;
}

export default function Markdown(props: Props) {
  const { children } = props;

  const remarkPlugins = [remarkGfm, remarkMath, remarkDirective, remarkDirectiveReHype];
  const rehypePlugins = [rehypeKatex];

  const components = {
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <div className={styles["code-block"]}>
          <SyntaxHighlighter language={match[1]} PreTag="div" {...props} className={styles["code-highlight"]}>
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>

          <Space size={0} className={styles["code-action"]}>
            <Tag style={{ margin: 0 }}>{match[1]}</Tag>
            <CopyToClipboard text={String(children).replace(/\n$/, "")} onCopy={() => message.success("复制成功")}>
              <Button icon={<CopyOutlined />} size="small" style={{ borderRadius: 4 }} />
            </CopyToClipboard>
          </Space>
        </div>
      ) : (
        <span className={styles["inline-code"]}>{children}</span>
      );
    },
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
    <ReactMarkdown
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins}
      components={components}
      className={styles["react-markdown"]}
    >
      {children}
    </ReactMarkdown>
  );
}
