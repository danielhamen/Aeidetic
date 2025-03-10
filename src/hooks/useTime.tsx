"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

// Create the context with a default value
const TimeContext = createContext<number | undefined>(undefined);

export const TimeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [time, setTime] = useState(() => Math.floor(Date.now() / 1000));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Math.floor(Date.now() / 1000)); // Update time every second
    }, 20);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return <TimeContext.Provider value={time}>{children}</TimeContext.Provider>;
};

// Custom hook to consume the time
export const useTime = (): number => {
  const time = useContext(TimeContext);
  if (time === undefined) {
    throw new Error("useTime must be used within a <TimeProvider>");
  }
  return time;
};
