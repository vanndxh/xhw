/// <reference types="react-scripts" />

/** css module config */
declare module "*.less" {
  const content: { [className: string]: string };
  export default content;
}