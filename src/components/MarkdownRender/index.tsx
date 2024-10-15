/**
 * @file Markdown渲染组件
 */
import React from "react";

interface Props {
  children: string;
}

export default function MarkdownRender(props: Props) {
  const { children } = props;
  return <div>{children}</div>;
}
