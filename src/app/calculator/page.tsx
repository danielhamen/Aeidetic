"use client";
import { Flex } from "api/components/web/layout/Flex";
import React, { useEffect, useState } from "react";
import { Chart, Plottable, MathInput } from "api/components/web/data/Chart";
import { H2 } from "api/components/web/display/Heading";

const unitVector: (x: number, y: number) => [number, number] = (
  x: number,
  y: number,
) => [x / Math.sqrt(x ** 2 + y ** 2), y / Math.sqrt(x ** 2 + y ** 2)];

function CalculatorContent() {
  const [data, setData] = useState<Plottable[]>([]);

  useEffect(() => {
    setData([
      { x: 10, y: 5, width: 8, color: "#FF0000" },
      { y: (x: number) => x ** 2, width: 8, color: "#FF0000" },
      { x: (y: number) => Math.sqrt(y), width: 8 },
      {
        v: (x: number, y: number) => unitVector(x, y),
      },
    ]);
  }, []);

  return (
    <Flex grow direction="row" justify="center">
      <Flex direction="column" className="w-full border-r border-gray-400">
        <MathInput />
        <Chart.Cartesian data={data} width={600} height={600} />
      </Flex>
      <Flex direction="column" className="w-[500px]">
        <H2>Variables</H2>
      </Flex>
    </Flex>
  );
}

export default function Page() {
  return (
    <Flex>
      <CalculatorContent />
    </Flex>
  );
}
