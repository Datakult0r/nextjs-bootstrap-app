/// <reference types="next" />

declare module 'next/image' {
  import { ImageProps as NextImageProps } from 'next/dist/client/image';
  
  const Image: React.FC<NextImageProps>;
  export default Image;
}
