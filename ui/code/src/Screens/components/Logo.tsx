import React from "react";

interface LogoProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  transparent?: boolean;
  variant?: "light" | "dark";
}

const Logo = ({
  width = "100%",
  height = "auto",
  className = "",
  transparent = false,
  variant = "light",
}: LogoProps) => {
  const isDark = variant === "dark";

  return (
    <div className={className} style={{ width, height, maxWidth: 400 }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 160"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <defs>
          {/* Bar Gradients */}
          <linearGradient id="barGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isDark ? "#60A5FA" : "#3B82F6"} />
            <stop offset="100%" stopColor={isDark ? "#2563EB" : "#2563EB"} />
          </linearGradient>

          <linearGradient id="barGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isDark ? "#34D399" : "#10B981"} />
            <stop offset="100%" stopColor={isDark ? "#059669" : "#059669"} />
          </linearGradient>

          <linearGradient id="barGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isDark ? "#818CF8" : "#6366F1"} />
            <stop offset="100%" stopColor={isDark ? "#4F46E5" : "#4F46E5"} />
          </linearGradient>

          {/* Text Gradient */}
          <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              stopColor={isDark ? "#E2E8F0" : "#1E293B"}
            />
            <stop
              offset="100%"
              stopColor={isDark ? "#CBD5E1" : "#334155"}
            />
          </linearGradient>

          {/* Trend Line */}
          <linearGradient id="trendLine" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop
              offset="0%"
              stopColor={isDark ? "#34D399" : "#10B981"}
              stopOpacity={0.7}
            />
            <stop
              offset="100%"
              stopColor={isDark ? "#60A5FA" : "#3B82F6"}
              stopOpacity={1}
            />
          </linearGradient>

          {/* Glow */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={2} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Shadow */}
          <filter id="shadow" x="-5%" y="-5%" width="115%" height="125%">
            <feDropShadow
              dx={0}
              dy={isDark ? 4 : 2}
              stdDeviation={isDark ? 6 : 3}
              floodColor={isDark ? "#000000" : "#1E293B"}
              floodOpacity={isDark ? 0.45 : 0.12}
            />
          </filter>
        </defs>

        {/* Background Card */}
        {!transparent && (
          <rect
            x={8}
            y={8}
            width={384}
            height={144}
            rx={16}
            ry={16}
            fill={isDark ? "#0B1437" : "#F8FAFC"}
            filter="url(#shadow)"
          />
        )}

        {/* Icon Circle */}
        <circle
          cx={72}
          cy={80}
          r={42}
          fill={
            transparent
              ? "transparent"
              : isDark
              ? "#0F1C4D"
              : "#EFF6FF"
          }
          filter={isDark ? "url(#glow)" : undefined}
        />

        {/* Bars */}
        <rect x={48} y={88} width={10} height={24} rx={3} fill="url(#barGrad1)" />
        <rect x={62} y={72} width={10} height={40} rx={3} fill="url(#barGrad3)" />
        <rect x={76} y={58} width={10} height={54} rx={3} fill="url(#barGrad2)" />

        {/* Trend Line */}
        <polyline
          points="46,90 56,82 68,78 80,60 92,52"
          fill="none"
          stroke="url(#trendLine)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={isDark ? "url(#glow)" : undefined}
        />

        {/* Arrow Head */}
        <polygon
          points="92,48 97,55 89,56"
          fill={isDark ? "#34D399" : "#10B981"}
        />

        {/* Title */}
        <text
          x={130}
          y={75}
          fontFamily="'Segoe UI', 'Helvetica Neue', sans-serif"
          fontWeight={700}
          fontSize={32}
          fill="url(#textGrad)"
          letterSpacing={-0.5}
        >
          <tspan>Sales</tspan>
          <tspan fill={isDark ? "#60A5FA" : "#3B82F6"}>
            {" "}
            Lytics
          </tspan>
        </text>

        {/* Tagline */}
        <text
          x={132}
          y={103}
          fontFamily="'Segoe UI', 'Helvetica Neue', sans-serif"
          fontWeight={400}
          fontSize={13}
          fill={isDark ? "#94A3B8" : "#64748B"}
          letterSpacing={3.5}
        >
          ANALYTICS &amp; INSIGHTS
        </text>

        {/* Accent Lines */}
        <rect
          x={132}
          y={112}
          width={52}
          height={2.5}
          rx={1.25}
          fill="url(#barGrad2)"
          opacity={0.7}
        />
        <rect
          x={188}
          y={112}
          width={24}
          height={2.5}
          rx={1.25}
          fill="url(#barGrad1)"
          opacity={0.45}
        />
      </svg>
    </div>
  );
};

export default Logo;