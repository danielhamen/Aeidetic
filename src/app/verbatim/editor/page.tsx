"use client";

import { Flex } from "api/components/web/layout/Flex";
import { useDocument, DocumentProvider } from "./lib/CoreUI/UIDocument";

function Layout() {
  const document = useDocument();
  if (!document) return null;

  const DocumentLayer = document.documentContent.documentLayers.DocumentLayer;
  const ContentLayer = document.documentContent.documentLayers.ContentLayer;
  const CursorLayer = document.documentContent.documentLayers.CursorLayer;
  return (
    <Flex direction="column" className="w-full relative">
      {CursorLayer}
      {ContentLayer}
      {DocumentLayer}
    </Flex>
  );
}

export default function Page() {
  return (
    <Flex
      direction="row"
      justify="center"
      className="p-8"
      style={{ position: "relative" }}
    >
      <DocumentProvider>
        <Layout />
      </DocumentProvider>
    </Flex>
  );
}
