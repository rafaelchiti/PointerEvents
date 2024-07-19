"use client";
import { useSpring, animated } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";

export default function Home() {
  const [styles, api] = useSpring(() => ({
    x: 0,
    y: 0,
  }));

  const bind = useGesture({
    onDrag: ({ event, offset: [x, y] }) => {
      const hoveredElement = document.elementFromPoint(x, y);

      if (
        hoveredElement &&
        hoveredElement.getAttribute("data-capture-events") === "true"
      ) {
        const fakeMouseEvent = new PointerEvent("pointermove", {
          clientX: x,
          clientY: y,
          bubbles: true,
          cancelable: true,
        });
        hoveredElement.dispatchEvent(fakeMouseEvent);
      }

      api.start({ x, y });
    },
  });

  return (
    <div className="size-full p-4 relative touch-none">
      {/* Drop Zone */}
      <div
        data-capture-events="true"
        onMouseMove={() => {
          console.log(":: Mouse Move (Drop Zone)");
        }}
        onPointerMove={() => {
          console.log(":: Pointer Move (Drop Zone)");
        }}
        className="absolute right-2 bottom-2 size-32 bg-red-200 pointer-events-auto"
      />

      {/* Draggable lil box */}
      <animated.div
        {...bind()}
        style={styles}
        className="size-10 bg-violet-500 rounded-sm touch-none"
      />
    </div>
  );
}
