import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Flex } from "../layout/Flex";
import { Text } from "../core/Text";
import { useTime } from "api/hooks/useTime";
import "mathquill/build/mathquill.css";

export type Axis2D = "x" | "y";
export type Axis3D = "x" | "y" | "z";

export type Vector2D<A, B> = [A, B];
export type Vector3D<A, B, C> = [A, B, C];

// --- Types for MathQuill component ---

interface MathFieldInstance {
  el: () => HTMLElement;
  latex: () => string;
}

interface EditableMathFieldProps {
  // Allow null/undefined so that our type matches react-mathquill's propTypes.
  latex: string | null | undefined;
  mathquillDidMount: (mathField: MathFieldInstance) => void;
  onChange: (mathField: MathFieldInstance) => void;
}

type EditableMathFieldComponent = React.ComponentType<EditableMathFieldProps>;

// Lazy-load MathQuill's EditableMathField component
const MathQuillLoader = async (): Promise<EditableMathFieldComponent> => {
  const { EditableMathField } = await import("react-mathquill");
  return EditableMathField as EditableMathFieldComponent;
};

export function MathInput() {
  const [latex, setLatex] = useState<string>("\\frac{1}{\\sqrt{2}}\\cdot 2");
  const [MathFieldComponent, setMathFieldComponent] =
    useState<EditableMathFieldComponent | null>(null);
  const mathFieldRef = useRef<MathFieldInstance | null>(null);

  useEffect(() => {
    MathQuillLoader().then((EditableMathField) => {
      setMathFieldComponent(() => EditableMathField);
    });
  }, []);

  useEffect(() => {
    if (mathFieldRef.current) {
      const mqEl = mathFieldRef.current.el();
      const handleKeyDown = () => {
        // keydown handler logic (if needed)
      };
      mqEl.addEventListener("keydown", handleKeyDown);
      return () => mqEl.removeEventListener("keydown", handleKeyDown);
    }
  }, [MathFieldComponent]);

  if (!MathFieldComponent) {
    return <p>Loading MathQuill...</p>;
  }

  return (
    <MathFieldComponent
      latex={latex}
      mathquillDidMount={(mathField: MathFieldInstance) => {
        mathFieldRef.current = mathField;
      }}
      onChange={(mathField: MathFieldInstance) => {
        setLatex(mathField.latex());
      }}
    />
  );
}

export function ChartError({ error }: { error: string }) {
  return (
    <Flex grow justify="center" align="center">
      <Text color="red-600" font="mono">
        {error}
      </Text>
    </Flex>
  );
}

export interface ChartProps {
  title?: ReactNode;
  width: number;
  height: number;
  plane?: ReactNode;
}

export function Chart({ title, plane, width, height }: ChartProps) {
  return (
    <Flex
      className="relative p-0 bg-white border border-black m-auto"
      style={{ width, height }}
    >
      {title ? (
        <Flex
          className="absolute top-4 left-0 w-full"
          direction="row"
          justify="center"
        >
          {title}
        </Flex>
      ) : null}
      <Flex className="w-full h-full">{plane}</Flex>
    </Flex>
  );
}

const Colors = {
  BLUE: "#0000FF",
  RED: "#FF0000",
  GREEN: "#00FF00",
  YELLOW: "#FFFF00",
  PURPLE: "#800080",
  BLACK: "#000000",
};

export interface PlottedStyle {
  color?: string;
  width?: number;
  opacity?: number;
  style?: "dashed" | "dotted" | "solid";
}

/** Displays single point on graph */
export interface Point extends PlottedStyle {
  x: number;
  y: number;
}

/** Displays a function independent of x (e.g. y=sin(x)) */
export interface FunctionY extends PlottedStyle {
  y: (x: number) => number;
}

/** Displays a function independent of y (e.g. x=cos(y)) */
export interface FunctionX extends PlottedStyle {
  x: (y: number) => number;
}

/** Displays a vector field */
export interface VectorField extends PlottedStyle {
  v: (x: number, y: number) => Vector2D<number, number>;
  /** Distance between vectors */
  step?: number;
}

/** Creates a shape based on a recursive algorithm */
export interface RecursiveFunction extends PlottedStyle {
  x0: number;
  y0: number;
  xn: (xp: number, yp: number, i: number) => number;
  yn: (xp: number, yp: number, i: number) => number;
  n?: number;
}

export type Plottable =
  | Point
  | FunctionY
  | FunctionX
  | VectorField
  | RecursiveFunction;

export interface CartesianProps extends ChartProps {
  data?: Plottable[];
}

/**
 * The Cartesian component sets up a WebGL2 context on a canvas,
 * draws a Cartesian plane (axes) and then plots each item in `data`.
 */
export function Cartesian({ data, ...props }: CartesianProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const time = useTime();
  const [error, setError] = useState<string | null>(null);
  // center of view in Cartesian coordinates
  const [anchor] = useState<Vector2D<number, number>>([0, 0]);
  // pixels per Cartesian unit
  const [scale, setScale] = useState<Vector2D<number, number>>([24, 24]);
  // additional pan offset in pixels
  const [offset, setOffset] = useState<Vector2D<number, number>>([30, 60]);
  // device pixel ratio
  const [devicePixelRatio] = useState<number>(2);

  // --- Helper: simple hex color parser ---
  function parseColor(
    color: string | undefined,
    opacity = 1,
  ): [number, number, number, number] {
    if (!color) {
      return [1, 1, 1, opacity];
    }
    if (color.startsWith("#") && (color.length === 7 || color.length === 4)) {
      let r: number, g: number, b: number;
      if (color.length === 7) {
        r = parseInt(color.substring(1, 3), 16);
        g = parseInt(color.substring(3, 5), 16);
        b = parseInt(color.substring(5, 7), 16);
      } else {
        r = parseInt(color[1] + color[1], 16);
        g = parseInt(color[2] + color[2], 16);
        b = parseInt(color[3] + color[3], 16);
      }
      return [r / 255, g / 255, b / 255, opacity];
    }
    return [1, 1, 1, opacity];
  }

  useEffect(() => {
    if (!canvasRef.current) {
      setError("Canvas element not found");
      return;
    }
    if (!data) {
      setError("No data provided");
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setError("2D context not supported");
      return;
    }

    const displayWidth = props.width;
    const displayHeight = props.height;
    const rasterizedWidth = displayWidth * devicePixelRatio;
    const rasterizedHeight = displayHeight * devicePixelRatio;

    // Set up high-res canvas.
    canvas.width = rasterizedWidth;
    canvas.height = rasterizedHeight;
    canvas.style.width = displayWidth + "px";
    canvas.style.height = displayHeight + "px";
    ctx.scale(devicePixelRatio, devicePixelRatio);

    // Compute effective view center (in Cartesian coordinates).
    const effectiveAnchorX = anchor[0] + offset[0] / scale[0];
    const effectiveAnchorY = anchor[1] - offset[1] / scale[1];

    // Helper: convert a Cartesian (x,y) to canvas coordinates.
    function toCanvas(x: number, y: number) {
      const cx = displayWidth / 2 + (x - effectiveAnchorX) * scale[0];
      const cy = displayHeight / 2 - (y - effectiveAnchorY) * scale[1];
      return { cx, cy };
    }

    const visibleWidth = displayWidth / scale[0];
    const visibleHeight = displayHeight / scale[1];
    const minX = effectiveAnchorX - visibleWidth / 2;
    const maxX = effectiveAnchorX + visibleWidth / 2;
    const minY = effectiveAnchorY - visibleHeight / 2;
    const maxY = effectiveAnchorY + visibleHeight / 2;

    // --- Draw Axes ---
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(128,128,128)";
    ctx.setLineDash([]);

    if (0 >= minY && 0 <= maxY) {
      const start = toCanvas(minX, 0);
      const end = toCanvas(maxX, 0);
      ctx.beginPath();
      ctx.moveTo(start.cx, start.cy);
      ctx.lineTo(end.cx, end.cy);
      ctx.stroke();
    }
    if (0 >= minX && 0 <= maxX) {
      const start = toCanvas(0, minY);
      const end = toCanvas(0, maxY);
      ctx.beginPath();
      ctx.moveTo(start.cx, start.cy);
      ctx.lineTo(end.cx, end.cy);
      ctx.stroke();
    }

    // --- Draw Plottables ---
    const applyStyle = (d: PlottedStyle) => {
      if (!d.color) {
        const colorValues = Object.values(Colors);
        d.color = colorValues[Math.floor(Math.random() * colorValues.length)];
      }
      if (d.width === undefined) d.width = 1;
      if (d.opacity === undefined) d.opacity = 1;
      if (!d.style) d.style = "solid";
      const [r, g, b, a] = parseColor(d.color, d.opacity);
      ctx.strokeStyle = `rgba(${Math.round(r * 255)}, ${Math.round(
        g * 255,
      )}, ${Math.round(b * 255)}, ${a})`;
      ctx.fillStyle = ctx.strokeStyle;
      ctx.lineWidth = d.width;
      if (d.style === "dashed") {
        ctx.setLineDash([10, 5]);
      } else if (d.style === "dotted") {
        ctx.setLineDash([2, 3]);
      } else {
        ctx.setLineDash([]);
      }
    };

    data.forEach((d) => {
      // FunctionY: sample along x.
      if (typeof (d as FunctionY).y === "function") {
        const func = d as FunctionY;
        const sampleCount = displayWidth;
        ctx.beginPath();
        for (let i = 0; i < sampleCount; i++) {
          const t = i / (sampleCount - 1);
          const x = minX + t * (maxX - minX);
          const y = func.y(x);
          const { cx, cy } = toCanvas(x, y);
          if (i === 0) ctx.moveTo(cx, cy);
          else ctx.lineTo(cx, cy);
        }
        applyStyle(d);
        ctx.stroke();
      }
      // FunctionX: sample along y.
      else if (typeof (d as FunctionX).x === "function") {
        const func = d as FunctionX;
        const sampleCount = displayHeight;
        ctx.beginPath();
        for (let i = 0; i < sampleCount; i++) {
          const t = i / (sampleCount - 1);
          const y = minY + t * (maxY - minY);
          const x = func.x(y);
          const { cx, cy } = toCanvas(x, y);
          if (i === 0) ctx.moveTo(cx, cy);
          else ctx.lineTo(cx, cy);
        }
        applyStyle(d);
        ctx.stroke();
      }
      // Point.
      else if (
        typeof (d as Point).x === "number" &&
        typeof (d as Point).y === "number"
      ) {
        const pt = d as Point;
        const { cx, cy } = toCanvas(pt.x, pt.y);
        applyStyle(d);
        ctx.beginPath();
        const radius = d.width ? d.width / 2 : 2.5;
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      // VectorField.
      else if ((d as VectorField).v) {
        const vf = d as VectorField;
        const step = vf.step ?? 4;
        applyStyle(d);
        for (let x = minX; x <= maxX; x += step) {
          for (let y = minY; y <= maxY; y += step) {
            const vec = vf.v(x, y);
            const start = toCanvas(x, y);
            const end = toCanvas(x + vec[0], y + vec[1]);
            ctx.beginPath();
            ctx.moveTo(start.cx, start.cy);
            ctx.lineTo(end.cx, end.cy);
            ctx.stroke();
          }
        }
      }
      // RecursiveFunction.
      else if (
        typeof (d as RecursiveFunction).x0 === "number" &&
        typeof (d as RecursiveFunction).y0 === "number" &&
        typeof (d as RecursiveFunction).xn === "function" &&
        typeof (d as RecursiveFunction).yn === "function"
      ) {
        const { x0, y0, xn, yn, n } = d as RecursiveFunction;
        const steps = n || 100;
        let xPrev = x0;
        let yPrev = y0;
        ctx.beginPath();
        const startPt = toCanvas(xPrev, yPrev);
        ctx.moveTo(startPt.cx, startPt.cy);
        for (let i = 1; i < steps; i++) {
          const xNew = xn(xPrev, yPrev, i);
          const yNew = yn(xPrev, yPrev, i);
          const { cx, cy } = toCanvas(xNew, yNew);
          ctx.lineTo(cx, cy);
          xPrev = xNew;
          yPrev = yNew;
        }
        applyStyle(d);
        ctx.stroke();
      }
    });
  }, [
    data,
    anchor,
    scale,
    offset,
    props.width,
    props.height,
    time,
    devicePixelRatio,
  ]);

  // --- Pan handling ---
  function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    const mouseUp = () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
    };
    const mouseMove = () => {
      setOffset([offset[0] + 1, offset[1]]);
    };
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
    e.preventDefault();
    e.stopPropagation();
  }

  function handleWheel(e: React.WheelEvent<HTMLCanvasElement>) {
    if (e.shiftKey) {
      setScale([Math.max(Math.min(e.deltaX / 2 + scale[0], 100), 1), scale[1]]);
    } else if (e.ctrlKey) {
      setScale([scale[0], Math.max(Math.min(e.deltaY / 2 + scale[1], 100), 1)]);
    } else {
      const delta = Math.max(e.deltaX, e.deltaY) / 2;
      setScale([
        Math.max(Math.min(delta + scale[0], 100), 1),
        Math.max(Math.min(delta + scale[1], 100), 1),
      ]);
    }
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <Chart
      {...props}
      plane={
        <Flex grow className="relative">
          {error ? (
            <ChartError error={error} />
          ) : (
            <canvas
              ref={canvasRef}
              width={props.width}
              height={props.height}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
            />
          )}
        </Flex>
      }
    />
  );
}

Cartesian.displayName = "Chart:Cartesian";

export interface PolarProps {
  children?: ReactNode;
}

export function Polar({ children }: PolarProps) {
  return <Flex>{children}</Flex>;
}

Polar.displayName = "Chart:Polar";

Chart.Cartesian = Cartesian;
Chart.Polar = Polar;
