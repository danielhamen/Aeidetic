"use client";
import React from "react";
import { Landing, LandingSection } from "../types";
import { Flex, H1, Divider, H2, Button, H4, P } from "api/components/web";
import clsx from "clsx";

export function LandingCard({ section }: { section: LandingSection }) {
  return (
    <Flex
      direction="column"
      className="bg-white rounded-xl shadow-lg p-6 w-[360px] h-[320px] transition duration-200 ease-in-out transform hover:scale-105 hover:shadow-2xl cursor-pointer"
    >
      <H2 font="regular" className="text-center mb-4">
        {section.title}
      </H2>
      <Flex grow className="list-disc px-4">
        {section.points.map((point, index) => {
          return (
            <P
              className="list-item pl-2"
              fontSize={15}
              textColor={"gray-500"}
              key={index}
            >
              {point}
            </P>
          );
        })}
      </Flex>
      <Flex align="center" justify="center" className="mt-6">
        <a href={section.href}>
          <Button buttonStyle="link">{section.linkText ?? "Continue"}</Button>
        </a>
      </Flex>
    </Flex>
  );
}

export interface LandingViewProps {
  landing?: Landing;
}

export function LandingView({ landing }: LandingViewProps) {
  if (!landing) return null;
  return (
    <Flex
      className="p-8 mt-16"
      align="center"
      justify="center"
      direction="column"
    >
      <H1 font="regular" className="mb-2">
        {landing.title}
      </H1>
      <H4 font="regular" color="gray-600" className="mb-4">
        {landing.subtitle}
      </H4>
      <Divider maxSize={260} margin={32} />
      <Flex direction="row" className="mt-8 gap-8 flex-wrap justify-center">
        {landing.sections.map((section, index) => {
          return <LandingCard key={index} section={section} />;
        })}
      </Flex>
    </Flex>
  );
}
