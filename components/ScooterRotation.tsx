"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ScooterRotationProps = {
  className?: string;
};

const frameCount = 120;

export function ScooterRotation({ className }: ScooterRotationProps) {
  const frames = useMemo(
    () =>
      Array.from(
        { length: frameCount },
        (_, index) => `/grayscooty/${String(index + 1).padStart(4, "0")}.webp`,
      ),
    [],
  );
  const [frame, setFrame] = useState(0);
  const currentFrame = useRef(0);
  const displayedFrame = useRef(0);
  const lastPointerX = useRef<number | null>(null);
  const pendingFrame = useRef(0);
  const animationFrame = useRef<number | null>(null);
  const loadedFrames = useRef<Set<number>>(new Set([0]));
  const preloadedImages = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let active = true;

    preloadedImages.current = frames.map((src, index) => {
      const image = new window.Image();

      const markLoaded = async () => {
        try {
          await image.decode();
        } catch {
          // Some browsers can reject decode for cached frames; complete is enough.
        }

        if (active && image.complete && image.naturalWidth > 0) {
          loadedFrames.current.add(index);
        }
      };

      image.onload = markLoaded;
      image.src = src;

      if (image.complete) {
        void markLoaded();
      }

      return image;
    });

    return () => {
      active = false;
      preloadedImages.current = [];
    };
  }, [frames]);

  useEffect(() => {
    return () => {
      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  function queueFrameUpdate(nextFrame: number) {
    pendingFrame.current = getClosestLoadedFrame(nextFrame);

    if (animationFrame.current !== null) {
      return;
    }

    animationFrame.current = window.requestAnimationFrame(() => {
      setFrame(pendingFrame.current);
      displayedFrame.current = pendingFrame.current;
      animationFrame.current = null;
    });
  }

  function getClosestLoadedFrame(targetFrame: number) {
    const normalizedFrame =
      (Math.round(targetFrame) + frames.length) % frames.length;

    if (loadedFrames.current.has(normalizedFrame)) {
      return normalizedFrame;
    }

    for (let offset = 1; offset < frames.length; offset += 1) {
      const previousFrame =
        (normalizedFrame - offset + frames.length) % frames.length;
      const nextFrame = (normalizedFrame + offset) % frames.length;

      if (loadedFrames.current.has(previousFrame)) {
        return previousFrame;
      }

      if (loadedFrames.current.has(nextFrame)) {
        return nextFrame;
      }
    }

    return displayedFrame.current;
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    lastPointerX.current = event.clientX;
    currentFrame.current = frame;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (lastPointerX.current === null) {
      return;
    }

    const movement = event.clientX - lastPointerX.current;
    lastPointerX.current = event.clientX;
    currentFrame.current =
      (currentFrame.current + movement / 5 + frames.length) % frames.length;

    queueFrameUpdate(Math.round(currentFrame.current) % frames.length);
  }

  function handlePointerEnd(event: React.PointerEvent<HTMLDivElement>) {
    lastPointerX.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <div
      className="rivotRotationStage"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
    >
      <img
        src={frames[frame]}
        alt="RIVOT NX100 grey scooter"
        className={className}
        draggable={false}
        decoding="async"
      />
    </div>
  );
}
