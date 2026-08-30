"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const frameCount = 120;
const frameCropTop = 430;

export function DashboardRotation() {
  const frames = useMemo(
    () =>
      Array.from(
        { length: frameCount },
        (_, index) => `/dashboard/${String(index + 1).padStart(4, "0")}.webp`,
      ),
    [],
  );
  const [activeMode, setActiveMode] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrame = useRef<number | null>(null);
  const lastTick = useRef(0);
  const loadedFrames = useRef<Set<number>>(new Set([0]));
  const frameImages = useRef<HTMLImageElement[]>([]);
  const currentFrame = useRef(0);

  useEffect(() => {
    let active = true;

    frameImages.current = frames.map((src, index) => {
      const image = new window.Image();

      const markLoaded = async () => {
        try {
          await image.decode();
        } catch {
          // Cached WebP frames can reject decode in some browsers; complete is enough.
        }

        if (active && image.complete && image.naturalWidth > 0) {
          loadedFrames.current.add(index);

          if (index === 0) {
            drawFrame(image);
          }
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
      frameImages.current = [];
    };
  }, [frames]);

  useEffect(() => {
    let active = true;

    function animate(timestamp: number) {
      if (!active) {
        return;
      }

      if (timestamp - lastTick.current > 115) {
        const nextFrame = getNextLoadedFrame(currentFrame.current, frames.length, loadedFrames.current);
        const nextImage = frameImages.current[nextFrame];

        if (nextImage?.complete && nextImage.naturalWidth > 0) {
          currentFrame.current = nextFrame;
          drawFrame(nextImage);
        }

        lastTick.current = timestamp;
      }

      animationFrame.current = window.requestAnimationFrame(animate);
    }

    animationFrame.current = window.requestAnimationFrame(animate);

    return () => {
      active = false;

      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [frames.length]);

  function drawFrame(image: HTMLImageElement) {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    const croppedHeight = image.naturalHeight - frameCropTop;

    if (canvas.width !== image.naturalWidth || canvas.height !== croppedHeight) {
      canvas.width = image.naturalWidth;
      canvas.height = croppedHeight;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(
      image,
      0,
      frameCropTop,
      image.naturalWidth,
      croppedHeight,
      0,
      0,
      canvas.width,
      canvas.height,
    );
  }

  return (
    <section className="rivotDashboard" aria-labelledby="dashboard-title">
      <div className="rivotDashboardCopy">
        <p>Connectivity</p>
        <h2 id="dashboard-title">Intelligence, always in view.</h2>
        <span>Smart tech that keeps you in control, informed, and in sync.</span>
      </div>

      <div className="rivotDashboardModes" aria-label="Dashboard features">
        {dashboardModes.map((mode, index) => (
          <button
            type="button"
            className={activeMode === index ? "active" : ""}
            onClick={() => setActiveMode(index)}
            key={mode.title}
          >
            <i aria-hidden="true">{mode.icon}</i>
            <b>{mode.title}</b>
            <small>{mode.copy}</small>
          </button>
        ))}
      </div>

      <div className="rivotDashboardStage" aria-hidden="true">
        <canvas ref={canvasRef} width="2048" height="1536" />
      </div>

      <style>{`
        .rivotDashboard {
          position: relative;
          display: grid;
          justify-items: center;
          min-height: auto;
          overflow: hidden;
          padding: clamp(40px, 4.5vw, 64px) clamp(18px, 4vw, 70px) clamp(24px, 3vw, 42px);
          background: linear-gradient(180deg, #ffffff 0%, #f4f4f4 100%);
          color: #111;
        }

        .rivotDashboardCopy {
          position: relative;
          z-index: 2;
          display: grid;
          justify-items: center;
          width: min(100%, 1120px);
          margin: 0 auto;
          text-align: center;
        }

        .rivotDashboardCopy p {
          margin: 0 0 10px;
          color: #ef7430;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: .12em;
          line-height: 1.2;
          text-transform: uppercase;
        }

        .rivotDashboardCopy h2 {
          margin: 0;
          color: #050505;
          font-size: clamp(36px, 4.2vw, 46px);
          font-weight: 900;
          line-height: .95;
          letter-spacing: -.055em;
          white-space: nowrap;
        }

        .rivotDashboardCopy span {
          display: block;
          max-width: 440px;
          margin-top: 10px;
          color: #505b66;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.45;
        }

        .rivotDashboardModes {
          position: relative;
          z-index: 3;
          display: flex;
          justify-content: center;
          gap: clamp(10px, 1.2vw, 16px);
          width: max-content;
          max-width: 100%;
          margin: clamp(14px, 1.8vw, 22px) auto 0;
          padding: 12px;
          border-radius: 28px;
          background: rgba(255, 255, 255, .55);
          box-shadow: 0 24px 60px rgba(17, 17, 17, .06);
          backdrop-filter: blur(12px);
        }

        .rivotDashboardModes button {
          display: grid;
          justify-items: center;
          gap: 6px;
          width: 92px;
          min-height: 88px;
          padding: 10px 9px;
          border: 0;
          border-radius: 16px;
          background: rgba(255, 255, 255, .8);
          color: #111;
          font: inherit;
          cursor: pointer;
          box-shadow: 0 16px 40px rgba(17, 17, 17, .08);
          transition:
            background .2s ease,
            color .2s ease,
            transform .2s ease,
            box-shadow .2s ease;
        }

        .rivotDashboardModes button.active {
          background: #ef7430;
          color: #fff;
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(239, 116, 48, .24);
        }

        .rivotDashboardModes i {
          display: grid;
          width: 28px;
          height: 28px;
          place-items: center;
          border-radius: 50%;
          background: rgba(239, 116, 48, .12);
          color: #ef7430;
          font-style: normal;
          font-size: 15px;
          font-weight: 900;
        }

        .rivotDashboardModes button.active i {
          background: rgba(255, 255, 255, .18);
          color: #fff;
        }

        .rivotDashboardModes b {
          font-size: 11px;
          font-weight: 900;
          line-height: 1.1;
        }

        .rivotDashboardModes small {
          color: currentColor;
          font-size: 8px;
          font-weight: 700;
          line-height: 1.2;
          opacity: .7;
        }

        .rivotDashboardStage {
          position: relative;
          z-index: 1;
          width: min(100%, 760px);
          margin-top: clamp(4px, .8vw, 10px);
          background: transparent;
          box-shadow: none;
          pointer-events: none;
        }

        .rivotDashboardStage::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 70%;
          z-index: -1;
          width: 70%;
          height: 26%;
          border-radius: 50%;
          background: rgba(17, 17, 17, .16);
          filter: blur(70px);
          transform: translate(-50%, -50%);
        }

        .rivotDashboardStage canvas {
          display: block;
          width: 100%;
          height: auto;
          user-select: none;
          filter: drop-shadow(0 20px 26px rgba(17, 17, 17, .18));
        }

        @media (max-width: 900px) {
          .rivotDashboardCopy h2 {
            white-space: normal;
          }

          .rivotDashboardModes {
            flex-wrap: wrap;
          }

          .rivotDashboardModes button {
            width: 92px;
            min-height: 86px;
          }

          .rivotDashboardStage {
            width: min(100%, 680px);
          }
        }

        @media (max-width: 560px) {
          .rivotDashboard {
            padding-top: 36px;
          }

          .rivotDashboardModes {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            width: min(100%, 320px);
            padding: 10px;
            border-radius: 22px;
          }

          .rivotDashboardModes button {
            width: auto;
            min-height: 76px;
            border-radius: 16px;
          }

          .rivotDashboardStage {
            width: 100%;
            margin-top: 18px;
          }
        }
      `}</style>
    </section>
  );
}

const dashboardModes = [
  {
    icon: "N",
    title: "Navigation",
    copy: "Never get lost again.",
  },
  {
    icon: "B",
    title: "Brake Alert",
    copy: "Signals hard braking.",
  },
  {
    icon: "C",
    title: "Calls",
    copy: "Ride-aware alerts.",
  },
  {
    icon: "S",
    title: "Sync",
    copy: "Connected ride data.",
  },
];

function getNextLoadedFrame(currentFrame: number, totalFrames: number, loadedFrames: Set<number>) {
  for (let offset = 1; offset < totalFrames; offset += 1) {
    const nextFrame = (currentFrame + offset) % totalFrames;

    if (loadedFrames.has(nextFrame)) {
      return nextFrame;
    }
  }

  return currentFrame;
}
