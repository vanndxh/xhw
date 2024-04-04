/**
 * @file 毛玻璃组件
 */
import React from "react";

interface Props {
  /**
   * @description 内部内容
   */
  children?: React.ReactNode;
  /**
   * @description 宽度
   * @default auto
   */
  width?: string;
  /**
   * @description 高度
   * @default auto
   */
  height?: string;
  /**
   * @description 背景模糊度
   * @default 8
   */
  blurDegree?: number;
  /**
   * @description 圆角度
   * @default 0
   */
  borderRadius?: number;
  /**
   * @description 白底透明度: 0-完成透明 1-完全白底（可以当正常card用）
   * @default 0.5
   */
  bgOpacity?: number;
}

function TransparentCard(props: Props) {
  const { children, width, height, blurDegree, borderRadius, bgOpacity } =
    props;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: width || "auto",
        height: height || "auto",
        backdropFilter: `blur(${blurDegree || 8}px)`,
        borderRadius: borderRadius || 0,
        background:
          bgOpacity || bgOpacity === 0
            ? `rgba(255, 255, 255, ${bgOpacity})`
            : `rgba(255, 255, 255, 0.5)`,
      }}
    >
      {children}
    </div>
  );
}

export default TransparentCard;
