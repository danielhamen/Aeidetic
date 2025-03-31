// import React, { ComponentProps } from "react";
// import { Stack } from "./../Layout/Stack.tsx";
// import { Flex } from "./../Layout/Flex.tsx";
// import { ResizeHandle } from "./../Misc/ResizeHandle.tsx";

// export namespace Sidebar {
//   export interface PanelProps extends ComponentProps<"div"> {
//     children?: React.ReactNode;
//     resizable?: boolean;
//     minWidth?: number;
//     width?: number;
//     maxWidth?: number;
//   }

//   export function Panel({
//     children,
//     resizable,
//     minWidth = 0,
//     width = 300,
//     maxWidth,
//     ...props
//   }: PanelProps) {
//     return (
//       <Flex
//         {...props}
//         direction="row"
//         style={{
//           minWidth: minWidth,
//           width: width,
//           maxWidth: maxWidth,
//         }}
//       >
//         <Stack>{children}</Stack>
//         <ResizeHandle style={{ marginLeft: "auto" }} />
//       </Flex>
//     );
//   }

//   export interface ItemProps {
//     title: string;
//   }

//   export function Item(props: ItemProps) {
//     return (
//       <div>
//         <span>{props.title}</span>
//       </div>
//     );
//   }

//   export interface SpacerProps {}

//   export function Spacer(props: SpacerProps) {
//     return <div></div>;
//   }

//   export interface DividerProps {}

//   export function Divider(props: DividerProps) {
//     return <div></div>;
//   }

//   export interface DetailsProps {}

//   export function Details(props: DetailsProps) {
//     return <div></div>;
//   }
// }
