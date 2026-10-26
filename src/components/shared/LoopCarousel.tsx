"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/scroll";

/* --------------------------------------------------------------------------
   LoopCarousel — an endless row of cards that glides on its own and can
   also be scrolled by hand: dragged with the mouse, swiped on touch, or
   scrolled sideways on a trackpad. Children are the list twice, the
   second marked [data-loop-copy]; whenever the scroll passes one full
   copy it jumps back by that width, so the loop never ends. Auto-gliding
   pauses on hover, focus and while (and shortly after) the visitor
   scrolls. Styles: ".loop-carousel" in globals.css.
   -------------------------------------------------------------------------- */
export default function LoopCarousel({
  children,
  duration = 70,
  className = "",
  trackClassName = "",
}: {
  children: ReactNode;
  /** Seconds for one full copy to glide past */
  duration?: number;
  className?: string;
  trackClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const copy = el?.querySelector<HTMLElement>("[data-loop-copy]");
    const first = copy?.previousElementSibling as HTMLElement | null;
    if (!el || !copy || !first) return;

    const reduce = prefersReducedMotion();
    let loopW = 0;
    let start = 0;
    const measure = () => {
      start = first.offsetLeft;
      loopW = copy.offsetLeft - first.offsetLeft;
    };
    measure();

    // Keep the scroll inside [start - 1, start + loopW) by jumping a copy
    const wrap = () => {
      if (loopW <= 0) return;
      if (el.scrollLeft >= start + loopW) el.scrollLeft -= loopW;
      else if (el.scrollLeft <= 0) el.scrollLeft += loopW;
    };

    const drag = { active: false, moved: false, x: 0, scroll: 0, id: -1 };
    let pos = el.scrollLeft;
    let hover = false;
    let focus = false;
    let holdUntil = 0;
    let visible = false;
    let raf = 0;
    let last = 0;

    const hold = (ms: number) => {
      holdUntil = Math.max(holdUntil, performance.now() + ms);
    };

    const frame = (now: number) => {
      raf = 0;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      const paused = reduce || hover || focus || drag.active || now < holdUntil;
      if (paused) {
        pos = el.scrollLeft;
      } else if (loopW > 0) {
        pos += (loopW / duration) * dt;
        if (pos >= start + loopW) pos -= loopW;
        el.scrollLeft = pos;
      }
      if (visible) raf = requestAnimationFrame(frame);
    };
    const run = () => {
      if (!raf && visible) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    };

    // ---- Mouse drag (touch and trackpads scroll natively) ----
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") {
        hold(2500);
        return;
      }
      if (e.button !== 0) return;
      drag.active = true;
      drag.moved = false;
      drag.x = e.clientX;
      drag.scroll = el.scrollLeft;
      drag.id = e.pointerId;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!drag.active || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) > 5) {
        drag.moved = true;
        el.dataset.dragging = "true";
        el.setPointerCapture(e.pointerId);
      }
      if (!drag.moved) return;
      el.scrollLeft = drag.scroll - dx;
      if (loopW > 0 && (el.scrollLeft >= start + loopW || el.scrollLeft <= 0)) {
        const before = el.scrollLeft;
        wrap();
        drag.scroll += el.scrollLeft - before;
      }
    };
    const endDrag = (e: PointerEvent) => {
      if (!drag.active || e.pointerId !== drag.id) return;
      drag.active = false;
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      delete el.dataset.dragging;
      hold(1500);
    };
    // A drag must not also open the card it started on
    const onClick = (e: MouseEvent) => {
      if (drag.moved) {
        e.preventDefault();
        e.stopPropagation();
        drag.moved = false;
      }
    };

    const onScroll = () => wrap();
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) hold(1800);
    };
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hover = true;
    };
    const onLeave = () => {
      hover = false;
    };
    const onFocusIn = () => {
      focus = true;
    };
    const onFocusOut = (e: FocusEvent) => {
      if (!el.contains(e.relatedTarget as Node | null)) focus = false;
    };
    const onTouchMove = () => hold(2500);
    const onDragStart = (e: DragEvent) => e.preventDefault();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) run();
    });
    io.observe(el);

    const ro = new ResizeObserver(() => {
      measure();
      wrap();
    });
    ro.observe(first);

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("click", onClick, true);
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    el.addEventListener("dragstart", onDragStart);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("click", onClick, true);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
      el.removeEventListener("dragstart", onDragStart);
    };
  }, [duration]);

  return (
    // Sideways gestures scroll the row natively instead of the page (Lenis)
    <div ref={ref} data-lenis-prevent-horizontal className={`loop-carousel ${className}`}>
      <div className={`flex w-max ${trackClassName}`}>{children}</div>
    </div>
  );
}
