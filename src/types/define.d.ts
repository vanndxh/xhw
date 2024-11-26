declare module "*.jpeg";

declare module "*.less" {
  const content: { [className: string]: string };
  export default content;
}

declare type ObjectType = Record<string, any>;

declare const prettyLog: Function;


