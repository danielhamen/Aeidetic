"use client";

import React, { FC, ReactNode, useState, useRef, useEffect } from "react";
import { Flex } from "api/components/layout/Flex";
import { Icon } from "api/components/icon/Icon";
import { Button } from "api/components/input/Button";
import { Text } from "api/components/core/Text";
import { useDocument, DocumentProvider } from "./lib/CoreUI/UIDocument";
import { LexemeNode } from "./lib/Types/LexemeNode";

export function CursorLayer() {
  const document = useDocument();
  if (!document) return null;
  return <Flex grow className={`absolute z-30`}></Flex>;
}

export function Layout() {
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
