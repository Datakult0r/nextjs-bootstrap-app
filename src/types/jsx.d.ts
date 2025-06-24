/// <reference types="react" />

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: React.HTMLAttributes<HTMLDivElement>;
      h2: React.HTMLAttributes<HTMLHeadingElement>;
      p: React.HTMLAttributes<HTMLParagraphElement>;
      section: React.HTMLAttributes<HTMLElement>;
      img: React.ImgHTMLAttributes<HTMLImageElement>;
    }
  }
}

export {};
