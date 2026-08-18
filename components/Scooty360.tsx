"use client";

import { PointerEvent, useMemo, useRef, useState } from "react";

const frameCount = 120;

export function Scooty360() {
  const frames = useMemo(
    () =>
      Array.from(
        { length: frameCount },
        (_, index) => `/grayscooty/${String(index + 1).padStart(4, "0")}.webp`,
      ),
    [],
  );
  const [frame, setFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartFrame = useRef(0);

  const updateFrame = (clientX: number) => {
    const delta = clientX - dragStartX.current;
    const steps = Math.round(delta / 8);
    const nextFrame = (dragStartFrame.current + steps) % frameCount;
    setFrame(nextFrame < 0 ? nextFrame + frameCount : nextFrame);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStartX.current = event.clientX;
    dragStartFrame.current = frame;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return;
    }

    updateFrame(event.clientX);
  };

  const stopDragging = () => setIsDragging(false);

  return (
    <div
      className="scooty360"
      role="img"
      aria-label="360 degree RIVOT NX100 scooter view"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onPointerLeave={stopDragging}
    >
      <img src={frames[frame]} alt="" draggable={false} />
    </div>
  );
}
