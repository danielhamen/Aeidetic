// Page.tsx
"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
  CSSProperties,
} from "react";
import { flushSync } from "react-dom";
import { Flex, AppHeader, AppIcon } from "api/components/web";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
} from "framer-motion";
import clsx from "clsx";

function Header() {
  return (
    <AppHeader
      title="Tidy"
      icon={<AppIcon name="category" />}
      showUserMenu={true}
    />
  );
}

type ContainerID = string;
type PlacementPosition = "only" | "first" | "middle" | "last";

interface PlacementRule {
  allowedPositions: PlacementPosition[];
  groupSize?: { min?: number; max?: number };
}

interface VSprite {
  id: string;
  src: string;
  dimensions: { x: number; y: number };
  anchors: { bottom: number };
  placement: PlacementRule;
}

interface VItem {
  id: string;
  sprite: VSprite;
  type: "hanging" | "sitting" | "stacked" | "mounted";
  location: "open" | "locked" | "fridge";
  meta: Record<string, string | number | boolean | undefined>;
  placeable: boolean;
}

interface VContainer {
  id: ContainerID;
  type: "hanging" | "sitting" | "stacked" | "mounted";
  sprite: VSprite;
  max: number;
  x: number;
  y: number;
}

///////////////////////
// Sprite Registry  //
///////////////////////

const SpriteRegistry = {
  Items: {
    Bottles: {
      spit0btl00: {
        id: "spit0btl00",
        src: "/tidy/asset_item_bottle_01.webp",
        dimensions: { x: 50.56, y: 120.6 },
        anchors: { bottom: -24 },
        placement: {
          allowedPositions: ["only"],
          groupSize: { min: 1, max: 1 },
        },
      } as VSprite,
      spit0btl01: {
        id: "spit0btl01",
        src: "/tidy/asset_item_bottle_02.webp",
        dimensions: { x: 50.56, y: 120.6 },
        anchors: { bottom: -24 },
        placement: {
          allowedPositions: ["only"],
          groupSize: { min: 1, max: 1 },
        },
      } as VSprite,
      spit0btl02: {
        id: "spit0btl02",
        src: "/tidy/asset_item_bottle_03.webp",
        dimensions: { x: 50.56, y: 120.6 },
        anchors: { bottom: -24 },
        placement: {
          allowedPositions: ["only"],
          groupSize: { min: 1, max: 1 },
        },
      } as VSprite,
      spit0btl03: {
        id: "spit0btl03",
        src: "/tidy/asset_item_bottle_04.webp",
        dimensions: { x: 50.56, y: 120.6 },
        anchors: { bottom: -24 },
        placement: {
          allowedPositions: ["only"],
          groupSize: { min: 1, max: 1 },
        },
      } as VSprite,
      spit0btl04: {
        id: "spit0btl04",
        src: "/tidy/asset_item_bottle_05.webp",
        dimensions: { x: 50.56, y: 120.6 },
        anchors: { bottom: -24 },
        placement: {
          allowedPositions: ["only"],
          groupSize: { min: 1, max: 1 },
        },
      } as VSprite,
    },
  },
  Containers: {
    Sitting: {
      left: {
        id: "spri1sit00l",
        src: "/tidy/asset_container_shelf_01_left.webp",
        dimensions: { x: 256, y: 256 },
        anchors: { bottom: 0 },
        placement: { allowedPositions: ["first"], groupSize: { min: 2 } },
      } as VSprite,
      mid: {
        id: "spri1sit00e",
        src: "/tidy/asset_container_shelf_01_center.webp",
        dimensions: { x: 256, y: 256 },
        anchors: { bottom: 0 },
        placement: { allowedPositions: ["middle"], groupSize: { min: 3 } },
      } as VSprite,
      right: {
        id: "spri1sit00r",
        src: "/tidy/asset_container_shelf_01_right.webp",
        dimensions: { x: 256, y: 256 },
        anchors: { bottom: 0 },
        placement: { allowedPositions: ["last"], groupSize: { min: 2 } },
      } as VSprite,
      single: {
        id: "spri1sit00s",
        src: "/tidy/asset_container_shelf_01_single.webp",
        dimensions: { x: 256, y: 256 },
        anchors: { bottom: 0 },
        placement: {
          allowedPositions: ["only"],
          groupSize: { min: 1, max: 1 },
        },
      } as VSprite,
    },
  },
  getRandomItem(): VSprite {
    const collect = (o: unknown): VSprite[] => {
      if (
        typeof o === "object" &&
        o !== null &&
        "src" in o &&
        "dimensions" in o
      ) {
        return [o as VSprite];
      }
      if (typeof o === "object" && o !== null) {
        return Object.values(o).flatMap(collect);
      }
      return [];
    };
    const all = collect(this.Items);
    if (!all.length) throw new Error("No items in registry");
    return all[Math.floor(Math.random() * all.length)];
  },
};

/////////////////////////////
// Context & Provider      //
/////////////////////////////

interface TidyContextManager {
  level: number;
  containers: VContainer[];
  itemMap: Record<ContainerID, VItem[]>;
  setItemMap: (m: Record<ContainerID, VItem[]>) => void;
  tileSize: number;
  grid: { rows: number; cols: number };
}

const TidyContext = createContext<TidyContextManager | null>(null);

export default function Page() {
  return (
    <TidyProvider>
      <PageLayout />
    </TidyProvider>
  );
}

function TidyProvider({ children }: { children: ReactNode }) {
  const [level, setLevel] = useState<number>();
  const [containers, setContainers] = useState<VContainer[]>([]);
  const [itemMap, setItemMap] = useState<Record<ContainerID, VItem[]>>({});
  const tileSize = 32 / 0.25;
  const grid = { rows: 6, cols: 6 };
  const maxShelfWidth = 5;

  // initialize level
  useEffect(() => {
    setLevel(1);
  }, []);

  // build layout + leave one empty spot per shelf
  useEffect(() => {
    if (level !== 1) return;

    const newContainers: VContainer[] = [];
    for (let y = 0; y < grid.rows; y++) {
      let x = 0;
      while (x < grid.cols) {
        const remaining = grid.cols - x;
        const length =
          1 + Math.floor(Math.random() * Math.min(maxShelfWidth, remaining));

        for (let dx = 0; dx < length; dx++) {
          const pos: PlacementPosition =
            length === 1
              ? "only"
              : dx === 0
                ? "first"
                : dx === length - 1
                  ? "last"
                  : "middle";

          const choices = Object.values(
            SpriteRegistry.Containers.Sitting,
          ).filter((spr) => {
            const r = spr.placement;
            if (!r.allowedPositions.includes(pos)) return false;
            const gs = r.groupSize;
            if (gs?.min != null && length < gs.min) return false;
            if (gs?.max != null && length > gs.max) return false;
            return true;
          });

          if (!choices.length) {
            throw new Error(`No sprite for ${pos}@${length}`);
          }

          newContainers.push({
            id: `r${y}c${x + dx}`,
            type: "sitting",
            sprite: choices[Math.floor(Math.random() * choices.length)],
            max: 3,
            x: x + dx,
            y,
          });
        }
        x += length;
      }
    }
    setContainers(newContainers);

    // leave one empty slot per container
    const map: Record<ContainerID, VItem[]> = {};
    newContainers.forEach((c) => {
      const fillCount = Math.max(0, c.max - 1);
      map[c.id] = Array(fillCount)
        .fill(0)
        .map(() => ({
          id: crypto.randomUUID(),
          location: "open",
          placeable: true,
          sprite: SpriteRegistry.getRandomItem(),
          type: c.type,
          meta: {},
        }));
    });
    setItemMap(map);
  }, [level]);

  if (level === undefined) return <Flex>Loading…</Flex>;

  return (
    <TidyContext.Provider
      value={{ level, containers, itemMap, setItemMap, tileSize, grid }}
    >
      {children}
    </TidyContext.Provider>
  );
}

function useGame() {
  const ctx = useContext(TidyContext);
  if (!ctx) throw new Error("useGame must be used within TidyProvider");
  return ctx;
}

//////////////////////////
// SpriteRenderer       //
//////////////////////////

function SpriteRenderer({
  sprite,
  style,
}: {
  sprite: VSprite;
  style?: CSSProperties;
}) {
  return (
    <Image
      src={sprite.src}
      alt={sprite.id}
      width={sprite.dimensions.x}
      height={sprite.dimensions.y}
      style={style}
      className="pointer-events-none select-none"
    />
  );
}

//////////////////////////
// DraggableItem        //
//////////////////////////

function DraggableItem({
  item,
  idx,
  containerId,
  gridRef,
}: {
  item: VItem;
  idx: number;
  containerId: string;
  gridRef: React.RefObject<HTMLDivElement>;
}) {
  const { tileSize, itemMap, setItemMap, containers } = useGame();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // compute in-shelf offset
  const offset = (() => {
    const arr = itemMap[containerId] || [];
    if (arr.length === 1) return 0;
    if (arr.length === 2) return ((idx === 0 ? -1 : 1) * tileSize) / 8;
    return ((idx - 1) * tileSize) / 4;
  })();

  return (
    <motion.div
      style={{
        position: "absolute",
        zIndex: 20,
        width: item.sprite.dimensions.x * 0.5,
        height: item.sprite.dimensions.y * 0.5,
        bottom: -item.sprite.anchors.bottom,
        left: `calc(50% + ${offset}px)`,
        x,
        y,
        touchAction: "none",
      }}
      drag
      dragConstraints={gridRef}
      dragElastic={0} // no bounce on release
      dragMomentum={false}
      whileDrag={{ scale: 1.1 }}
      transition={{
        x: { type: "spring", stiffness: 500, damping: 30 },
        y: { type: "spring", stiffness: 500, damping: 30 },
      }}
      onDragEnd={(_, info) => {
        const rect = gridRef.current!.getBoundingClientRect();
        const col = Math.floor((info.point.x - rect.left) / tileSize);
        const row = Math.floor((info.point.y - rect.top) / tileSize);
        const target = containers.find((c) => c.x === col && c.y === row);
        const srcArr = itemMap[containerId] || [];

        if (target && srcArr.find((i) => i.id === item.id)) {
          const tgtArr = itemMap[target.id] || [];
          if (tgtArr.length < target.max) {
            // compute insertion index
            const cellLeft = rect.left + col * tileSize;
            const relX = info.point.x - cellLeft;
            const idxPos = Math.floor((relX / tileSize) * (tgtArr.length + 1));
            const insertionIndex = Math.max(0, Math.min(idxPos, tgtArr.length));

            // update state **immediately**
            const newSrc = srcArr.filter((i) => i.id !== item.id);
            const newTgt = [
              ...tgtArr.slice(0, insertionIndex),
              item,
              ...tgtArr.slice(insertionIndex),
            ];
            flushSync(() => {
              setItemMap({
                ...itemMap,
                [containerId]: newSrc,
                [target.id]: newTgt,
              });
            });

            // reset drag offset instantly
            x.set(0);
            y.set(0);
            return;
          }
        }

        // invalid drop → snap back
        animate(x, 0, { type: "spring", stiffness: 500, damping: 30 });
        animate(y, 0, { type: "spring", stiffness: 500, damping: 30 });
      }}
    >
      <SpriteRenderer
        sprite={item.sprite}
        style={{
          width: item.sprite.dimensions.x * 0.5,
          height: item.sprite.dimensions.y * 0.5,
        }}
      />
    </motion.div>
  );
}

//////////////////////////
// Container (Shelf + Items)
//////////////////////////

function Container({ container, gridRef }) {
  const { itemMap, tileSize } = useGame();
  const items = itemMap[container.id] || [];

  return (
    <>
      {/* shelf art */}
      <div
        className="absolute z-10"
        style={{
          width: tileSize,
          height: tileSize,
          bottom: 0,
          left: 0,
        }}
      >
        <SpriteRenderer sprite={container.sprite} />
      </div>

      {/* items */}
      {items.map((it, i) => (
        <DraggableItem
          key={it.id}
          item={it}
          idx={i}
          containerId={container.id}
          gridRef={gridRef}
        />
      ))}
    </>
  );
}

//////////////////////////
// GameLayout
//////////////////////////

function GameLayout() {
  const { containers, grid, tileSize } = useGame();
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={gridRef}
      className="game-grid bg-orange-100 select-none"
      style={{
        position: "relative",
        width: grid.cols * tileSize,
        height: grid.rows * tileSize,
      }}
    >
      {containers.map((c) => (
        <div
          key={c.id}
          style={{
            position: "absolute",
            left: c.x * tileSize,
            bottom: (grid.rows - 1 - c.y) * tileSize,
            width: tileSize,
            height: tileSize,
          }}
        >
          <Container container={c} gridRef={gridRef} />
        </div>
      ))}
    </div>
  );
}

//////////////////////////
// Page & Layout
//////////////////////////

function PageLayout() {
  return (
    <Flex grow className="overflow-hidden">
      <Header />
      <Flex grow>
        <MainLayout />
      </Flex>
    </Flex>
  );
}

function MainLayout() {
  return (
    <Flex grow align="center" className="p-8">
      <Flex
        direction="row"
        className="w-fit h-full bg-gray-100 rounded-lg py-6 px-2 overflow-hidden"
        justify="center"
        align="end"
      >
        <GameLayout />
      </Flex>
    </Flex>
  );
}
