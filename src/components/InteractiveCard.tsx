"use client";

import React, { useState, useRef, useCallback, forwardRef, useImperativeHandle } from "react";

interface InteractiveCardProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

const InteractiveCard = forwardRef<any, InteractiveCardProps>(
  (
    {
      children,
      className = "",
      as = "div",
      href,
      target,
      rel,
      onClick,
      ...rest
    },
    ref
  ) => {
    const [isActive, setIsActive] = useState(false);
    const [ripple, setRipple] = useState<{ x: number; y: number; key: number } | null>(null);
    const rippleCounter = useRef(0);
    const localRef = useRef<any>(null);

    useImperativeHandle(ref, () => localRef.current);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        // Create ripple effect at click position
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        rippleCounter.current += 1;
        setRipple({ x, y, key: rippleCounter.current });

        // Toggle active state for the gradient border
        setIsActive((prev) => !prev);

        // Call original onClick if any
        if (onClick) onClick(e);
      },
      [onClick]
    );

    const handleRippleEnd = useCallback(() => {
      setRipple(null);
    }, []);

    const cardClass = `interactive-card ${isActive ? "card-active" : ""} ${className}`.trim();

    const sharedProps = {
      ...rest,
      className: cardClass,
      onClick: handleClick,
      ref: localRef,
    };

    const rippleEl = ripple ? (
      <span
        key={ripple.key}
        className="card-ripple"
        style={{
          left: ripple.x - 50,
          top: ripple.y - 50,
          width: 100,
          height: 100,
        }}
        onAnimationEnd={handleRippleEnd}
      />
    ) : null;

    if (as === "a") {
      return (
        <a
          {...(sharedProps as any)}
          href={href}
          target={target}
          rel={rel}
        >
          {children}
          {rippleEl}
        </a>
      );
    }

    return (
      <div {...(sharedProps as any)}>
        {children}
        {rippleEl}
      </div>
    );
  }
);

InteractiveCard.displayName = "InteractiveCard";

export default InteractiveCard;
