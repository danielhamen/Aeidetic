"use client";
import { Flex } from "api/components/web/layout/Flex";
import { useTime } from "api/hooks/useTime";
import React, { useContext, useEffect, useState } from "react";

const ClockContext = React.createContext<ClockContextProps | null>(null);

function ClockProvider({ children }: { children: React.ReactNode }) {
  const [currentTime, setCurrentTime] = useState<number>(useTime());
  const [radius, setRadius] = useState(300);
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
        radius,
        setRadius,
      }}
    >
      {children}
    </ClockContext.Provider>
  );
}

interface ClockContextProps {
  currentTime: number;
  setCurrentTime: (time: number) => void;
  currentHour: number;
  currentMinute: number;
  currentSecond: number;
  radius: number;
  setRadius: (radius: number) => void;
}

function useClock(): ClockContextProps {
  const context = useContext(ClockContext);
  if (!context) {
    throw new Error("useClock must be used within a ClockProvider");
  }
  return context;
}

function IntervalDash({
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

interface HandProps extends React.HTMLAttributes<HTMLDivElement> {
  angle: number;
  length: number;
}

function Hand({ angle, length, ...props }: HandProps) {
  return (
    <Flex
      {...props}
      className={`bg-red-100 rounded-full absolute ${props.className ?? ""}`}
      style={{
        width: length,
        height: 8,
        rotate: `${angle - (90 % 360)}deg`,
        left: "50%",
        top: "50%",
        transformOrigin: "left center",
        translate: "0 -50%", // Center the left part at (50%, 50%)
        ...props.style,
      }}
    />
  );
}

/**
 * Creates the ticks and numbers
 */
function Contour() {
  const { radius } = useClock();
  const [iterMap] = useState(() => new Array(60).fill(null));

  return (
    <>
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
          const number = 12 - ((i / 5 + 6) % 12);
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
              {number}
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
    </>
  );
}

function Clock() {
  const { currentHour, currentMinute, currentSecond, radius } = useClock();
  const toAngle = (v: number, max: number) => (v / max) * 360;
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

      <Contour />
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
