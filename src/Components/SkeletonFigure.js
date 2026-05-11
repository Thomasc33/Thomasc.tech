import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Box } from '@mui/material';

const EMERALD = '#10b981';
const GOLD = '#d4a853';

const POSES = [
  {
    head: [100, 30], neck: [100, 56],
    shoulderL: [78, 64], shoulderR: [122, 64],
    elbowL: [66, 100], elbowR: [134, 100],
    wristL: [58, 134], wristR: [142, 134],
    pelvis: [100, 130],
    hipL: [86, 148], hipR: [114, 148],
    kneeL: [82, 198], kneeR: [118, 198],
    ankleL: [78, 248], ankleR: [122, 248],
  },
  {
    head: [98, 30], neck: [100, 56],
    shoulderL: [78, 66], shoulderR: [122, 64],
    elbowL: [58, 92], elbowR: [136, 78],
    wristL: [42, 118], wristR: [142, 50],
    pelvis: [100, 132],
    hipL: [86, 148], hipR: [114, 148],
    kneeL: [76, 196], kneeR: [126, 200],
    ankleL: [60, 244], ankleR: [138, 246],
  },
  {
    head: [102, 30], neck: [100, 56],
    shoulderL: [80, 66], shoulderR: [124, 62],
    elbowL: [70, 102], elbowR: [136, 96],
    wristL: [80, 132], wristR: [148, 124],
    pelvis: [100, 130],
    hipL: [88, 148], hipR: [114, 148],
    kneeL: [92, 196], kneeR: [108, 200],
    ankleL: [98, 248], ankleR: [116, 248],
  },
  {
    head: [100, 28], neck: [100, 56],
    shoulderL: [76, 64], shoulderR: [124, 66],
    elbowL: [62, 94], elbowR: [134, 102],
    wristL: [50, 60], wristR: [152, 132],
    pelvis: [100, 130],
    hipL: [86, 148], hipR: [114, 148],
    kneeL: [86, 200], kneeR: [120, 196],
    ankleL: [98, 248], ankleR: [134, 244],
  },
];

const JOINT_KEYS = [
  'head', 'neck',
  'shoulderL', 'shoulderR',
  'elbowL', 'elbowR',
  'wristL', 'wristR',
  'pelvis',
  'hipL', 'hipR',
  'kneeL', 'kneeR',
  'ankleL', 'ankleR',
];

const BONES = [
  ['head', 'neck'],
  ['neck', 'shoulderL'], ['neck', 'shoulderR'],
  ['shoulderL', 'elbowL'], ['elbowL', 'wristL'],
  ['shoulderR', 'elbowR'], ['elbowR', 'wristR'],
  ['neck', 'pelvis'],
  ['pelvis', 'hipL'], ['pelvis', 'hipR'],
  ['hipL', 'kneeL'], ['kneeL', 'ankleL'],
  ['hipR', 'kneeR'], ['kneeR', 'ankleR'],
];

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
