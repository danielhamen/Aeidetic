import React from "react";

export interface ImageProps {
  src: string;
}

export function Image({ src }: ImageProps) {
  return <img src={src} />;
}
