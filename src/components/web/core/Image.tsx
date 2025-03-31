import React from "react";
import NextImage from "next/image";

export interface ImageProps {
  src: string;
  alt: string;
}

export function Image({ src, alt }: ImageProps) {
  return <NextImage alt={alt} src={src} />;
}
