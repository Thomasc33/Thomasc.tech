import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Box } from '@mui/material';
import { POSES, JOINT_KEYS, BONES } from './skeletonRig';

const EMERALD = '#10b981';
const GOLD = '#d4a853';

const CYCLE_SECONDS = 14;

const SkeletonFigure = ({ opacity = 0.18, size = 360 }) => {
  const isFluid = size === '100%' || typeof size === 'string';
  const prefersReduced = useReducedMotion();

  const jointKeyframes = useMemo(() => {
    const map = {};
    JOINT_KEYS.forEach((key) => {
      map[key] = {
        cx: [...POSES.map((p) => p[key][0]), POSES[0][key][0]],
        cy: [...POSES.map((p) => p[key][1]), POSES[0][key][1]],
      };
    });
    return map;
  }, []);

  const boneKeyframes = useMemo(() =>
    BONES.map(([a, b]) => ({
      x1: [...POSES.map((p) => p[a][0]), POSES[0][a][0]],
      y1: [...POSES.map((p) => p[a][1]), POSES[0][a][1]],
      x2: [...POSES.map((p) => p[b][0]), POSES[0][b][0]],
      y2: [...POSES.map((p) => p[b][1]), POSES[0][b][1]],
    })),
  []);

  const transition = useMemo(() => ({
    duration: CYCLE_SECONDS,
    repeat: Infinity,
    ease: 'easeInOut',
    times: [0, 0.25, 0.5, 0.75, 1],
  }), []);

  const restPose = POSES[0];

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        opacity,
        zIndex: 0,
        animation: prefersReduced ? 'none' : 'skeletonFloat 6s ease-in-out infinite',
      }}
    >
      <svg
        width={isFluid ? '100%' : size}
        height={isFluid ? '100%' : size * 1.3}
        viewBox="0 0 200 280"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <radialGradient id="jointGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={EMERALD} stopOpacity="0.9" />
            <stop offset="60%" stopColor={EMERALD} stopOpacity="0.4" />
            <stop offset="100%" stopColor={EMERALD} stopOpacity="0" />
          </radialGradient>
        </defs>

        {BONES.map(([a, b], i) => (
          prefersReduced ? (
            <line
              key={`bone-${i}`}
              x1={restPose[a][0]} y1={restPose[a][1]}
              x2={restPose[b][0]} y2={restPose[b][1]}
              stroke={GOLD}
              strokeWidth={1.2}
              strokeOpacity={0.55}
              strokeLinecap="round"
            />
          ) : (
            <motion.line
              key={`bone-${i}`}
              animate={boneKeyframes[i]}
              transition={transition}
              stroke={GOLD}
              strokeWidth={1.2}
              strokeOpacity={0.55}
              strokeLinecap="round"
            />
          )
        ))}

        {JOINT_KEYS.map((key) => (
          prefersReduced ? (
            <circle
              key={key}
              cx={restPose[key][0]} cy={restPose[key][1]}
              r={2.6}
              fill={EMERALD}
            />
          ) : (
            <motion.circle
              key={key}
              animate={{
                cx: jointKeyframes[key].cx,
                cy: jointKeyframes[key].cy,
              }}
              transition={transition}
              r={2.6}
              fill={EMERALD}
            />
          )
        ))}
      </svg>
    </Box>
  );
};

export default SkeletonFigure;
