import React from "react";
import { FontRegistry } from "./__font";

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`h-full w-full p-0 m-0 grow ${FontRegistry.regular.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className={`antialiased flex flex-col h-full w-full p-0 m-0 grow`}>
        {children}
      </body>
    </html>
  );
}
