"use client";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function FocusCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [targetRect, setTargetRect] = useState(null);
  const [hovering, setHovering] = useState(false);

  const rotateControls = useAnimation();

  // 🧭 Track mouse position
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // 🎯 Detect hover targets
  useEffect(() => {
    const handleHover = (e) => {
      const el = e.target.closest("[data-focusable]");
      if (el) {
        setTargetRect(el.getBoundingClientRect());
        setHovering(true);
      } else {
        setTargetRect(null);
        setHovering(false);
      }
    };
    document.addEventListener("mouseover", handleHover);
    document.addEventListener("mouseout", handleHover);
    return () => {
      document.removeEventListener("mouseover", handleHover);
      document.removeEventListener("mouseout", handleHover);
    };
  }, []);

  // 🎞️ Rotation control (spin when idle, stop on hover)
  useEffect(() => {
    if (!hovering) {
      rotateControls.start({
        rotate: 360,
        transition: {
          duration: 8,
          ease: "linear",
          repeat: Infinity,
        },
      });
    } else {
      rotateControls.stop();
      rotateControls.set({ rotate: 0 });
    }
  }, [hovering, rotateControls]);

  const baseSize = 40;
  const dotSize = 8;

  const expanded = targetRect
    ? {
        x: targetRect.left + targetRect.width / 2,
        y: targetRect.top + targetRect.height / 2,
        w: targetRect.width,
        h: targetRect.height,
      }
    : null;

  return (
    <>
      {/* Center dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{ x: pos.x - dotSize / 2, y: pos.y - dotSize / 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div
          className="bg-white rounded-full"
          style={{ width: dotSize, height: dotSize }}
        />
      </motion.div>

      {/* Corners */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          x: hovering
            ? expanded.x - expanded.w / 2
            : pos.x - baseSize / 2,
          y: hovering
            ? expanded.y - expanded.h / 2
            : pos.y - baseSize / 2,
          width: hovering ? expanded.w : baseSize,
          height: hovering ? expanded.h : baseSize,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
        }}
        style={{ transformOrigin: "center" }}
      >
        {/* Rotation layer */}
        <motion.div
          animate={rotateControls}
          style={{ width: "100%", height: "100%", position: "relative" }}
        >
          {["tl", "tr", "bl", "br"].map((corner) => (
            <div
              key={corner}
              className="absolute w-4 h-4 border-white"
              style={{
                borderWidth: "3px",
                padding:"2px",
                ...(corner === "tl" && {
                  top: 0,
                  left: 0,
                  borderRight: "none",
                  borderBottom: "none",
                }),
                ...(corner === "tr" && {
                  top: 0,
                  right: 0,
                  borderLeft: "none",
                  borderBottom: "none",
                }),
                ...(corner === "bl" && {
                  bottom: 0,
                  left: 0,
                  borderRight: "none",
                  borderTop: "none",
                }),
                ...(corner === "br" && {
                  bottom: 0,
                  right: 0,
                  borderLeft: "none",
                  borderTop: "none",
                }),
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}
