"use client";
import { Flex } from "api/components/layout/Flex";
import { useTime } from "api/hooks/useTime";
import React, { useContext, useEffect, useState } from "react";

export const ClockContext = React.createContext<ClockContextProps | null>(null);

export function ClockProvider({ children }: { children: React.ReactNode }) {
  const [currentTime, setCurrentTime] = useState<number>(useTime());
  const [currentHour, setCurrentHour] = useState(0);
  const [currentMinute, setCurrentMinute] = useState(0);
  const [currentSecond, setCurrentSecond] = useState(0);
  useEffect(() => {
    const t = currentTime % 86400; // Keep within one day
    setCurrentHour((t / 3600) % 8);
    setCurrentMinute((t / 60) % 60);
    setCurrentSecond(t % 60);
  }, [currentTime]);

  return (
    <ClockContext.Provider
      value={{
        currentTime,
        setCurrentTime,
        currentHour,
        currentMinute,
        currentSecond,
      }}
    >
      {children}
    </ClockContext.Provider>
  );
}

export interface ClockContextProps {
  currentTime: number;
  setCurrentTime: (time: number) => void;
  currentHour: number;
  currentMinute: number;
  currentSecond: number;
}

export function useClock(): ClockContextProps {
  const context = useContext(ClockContext);
  if (!context) {
    throw new Error("useClock must be used within a ClockProvider");
  }
  return context;
}

export function IntervalDash({
  angle,
  x,
  y,
  width = 4,
  height = 16,
}: {
  angle: number;
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  return (
    <Flex
      className={`absolute bg-black`}
      style={{
        width: width,
        height: height,
        top: y,
        left: x - width / 2,
        transformOrigin: "top center",
        transform: `rotate(${angle}deg)`,
      }}
    />
  );
}

export interface HandProps extends React.HTMLAttributes<HTMLDivElement> {
  angle: number;
  length: number;
}

export function Hand({ angle, length, ...props }: HandProps) {
  angle %= 360;
  if (angle === 0) angle = 360;

  angle -= 90;

  return (
    <Flex
      {...props}
      className={`bg-red-100 rounded-full absolute ${props.className ?? ""}`}
      style={{
        width: length,
        height: 8,
        rotate: `${angle}deg`,
        left: "50%",
        top: "50%",
        transformOrigin: "left center",
        translate: "0 -50%", // Center the left part at (50%, 50%)
        ...props.style,
      }}
    />
  );
}

export function Clock() {
  const { currentHour, currentMinute, currentSecond } = useClock();
  const toAngle = (v: number, max: number) => (v / max) * 360;
  const radius = 300;
  const [iterMap] = useState<null[]>(new Array(60).fill(null));
  return (
    <Flex
      className={`relative outline-gray-300 bg-red-300 rounded-full`}
      style={{
        width: radius * 2,
        outlineWidth: 16,
        outlineStyle: "solid",
        height: radius * 2,
      }}
      align="center"
      justify="center"
    >
      {/* Center dot */}
      <Flex className={`size-2 bg-white rounded-full absolute z-20`} />

      {/* Second */}
      <Hand
        angle={toAngle(currentSecond, 60)}
        length={radius}
        className="z-10"
      />

      {/* Minute */}
      <Hand
        angle={toAngle(currentMinute, 60)}
        length={(radius * 1) / 3}
        className="z-10"
      />

      {/* Hour */}
      <Hand
        angle={toAngle(currentHour, 12)}
        length={(radius * 1) / 2}
        className="z-10"
      />

      {/* Icon */}
      <span className="absolute top-1/4">aeidetic</span>

      {iterMap.map((_, i) => {
        if (i % 5 === 0) {
          const fontSize = 30;
          const r = radius;
          const angle = (i / -60) * 360 - 180;

          // Additional offset from the rim normal to the circumference
          const dx = Math.cos((Math.PI / 180) * (angle + 90)) * (radius / 10);
          const dy = Math.sin((Math.PI / 180) * (angle + 90)) * (radius / 10);
          const x = r * Math.sin((i / 60) * Math.PI * 2) + r + dx;
          const y = r * Math.cos((i / 60) * Math.PI * 2) + r + dy;
          return (
            <span
              key={i}
              className="absolute"
              style={{
                left: x,
                top: y,
                fontSize: fontSize,
                transform: "translate(-50%, -50%)",
              }}
            >
              {12 - ((i / 5 + 6) % 12)}
            </span>
          );
        } else {
          const angle = (i / -60) * 360 - 180;
          const x = radius * Math.sin((i / 60) * Math.PI * 2) + radius;
          const y = radius * Math.cos((i / 60) * Math.PI * 2) + radius;
          return (
            <IntervalDash
              angle={angle}
              x={x}
              y={y}
              width={3}
              height={7}
              key={i}
            />
          );
        }
      })}
    </Flex>
  );
}

export default function Page() {
  return (
    <Flex align="center" justify="center" grow>
      <ClockProvider>
        <Clock />
      </ClockProvider>
    </Flex>
  );
}
