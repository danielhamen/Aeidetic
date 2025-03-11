import React from "react";
import { Paragraph, Code, Title, Fancy, Heading } from "./__font";

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full w-full p-0 m-0 grow`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />

        {/* Include Tailwind via CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body
        className={`${Paragraph.variable} ${Code.variable} ${Title.variable} ${Fancy.variable} ${Heading.variable} antialiased flex flex-col h-full w-full p-0 m-0 grow`}
      >
        {children}
      </body>
    </html>
  );
}
