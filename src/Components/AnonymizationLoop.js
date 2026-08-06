import React, { useEffect, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { POSES, JOINT_KEYS, BONES, IDENTIFYING_JOINTS, retarget } from './skeletonRig';

const EMERALD = '#10b981';
const GOLD = '#d4a853';
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

const STAGE_MS = 3200;

/**
 * The dissertation's argument in four beats: motion is captured, the capture
 * leaks identity, retargeting moves the motion onto another body, and what
 * survives is the action without the person.
 *
 * `reidentified` and `action` drive the two meters, so the claim and the
 * picture cannot disagree.
 */
const STAGES = [
  {
    key: 'captured',
    label: 'Captured',
    caption: 'A VR headset records joint positions. No face, no voice — this looks anonymous.',
    reidentified: 0,
    action: 100,
    highlight: false,
    anonymized: false,
  },
  {
    key: 'attacked',
    label: 'Linkage attack',
    caption: 'Limb proportions and movement style identify the person anyway. LAN, CIKM 2023.',
    reidentified: 87,
    action: 100,
    highlight: true,
    anonymized: false,
  },
  {
    key: 'retargeted',
    label: 'Retargeting',
    caption: 'The motion is transferred onto a different body. PMR, ICCV 2025.',
    reidentified: 34,
    action: 96,
    highlight: true,
    anonymized: true,
  },
  {
    key: 'anonymized',
    label: 'Anonymized',
    caption: 'Identity is gone. What the data was collected for still works.',
    reidentified: 9,
    action: 94,
    highlight: false,
    anonymized: true,
  },
];

const Meter = ({ label, value, tone }) => (
  <Box sx={{ flex: 1, minWidth: 0 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
      <Typography sx={{ fontFamily: MONO, fontSize: '0.6rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.45)' }}>
        {label}
      </Typography>
      <Typography sx={{ fontFamily: MONO, fontSize: '0.6rem', color: tone }}>
        {value}%
      </Typography>
    </Box>
    <Box sx={{ height: 2, borderRadius: 1, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
      <motion.div
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        style={{ height: '100%', background: tone }}
      />
    </Box>
  </Box>
);

const AnonymizationLoop = () => {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // With reduced motion the panel holds on the final state, which still makes
    // the point without a figure that never stops moving.
    if (reduceMotion) {
      setIndex(STAGES.length - 1);
      return undefined;
    }
    const timer = setInterval(() => setIndex((i) => (i + 1) % STAGES.length), STAGE_MS);
    return () => clearInterval(timer);
  }, [reduceMotion]);

  const stage = STAGES[index];

  // Pose 0 reads most clearly as a standing figure, so the demo stays on it and
  // lets the body change rather than the action.
  const pose = useMemo(
    () => (stage.anonymized ? retarget(POSES[0]) : POSES[0]),
    [stage.anonymized]
  );

  const jointTone = (key) =>
    stage.highlight && IDENTIFYING_JOINTS.includes(key) ? GOLD : EMERALD;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '220px 1fr' },
        gap: { xs: 3, md: 5 },
        alignItems: 'center',
        maxWidth: 760,
        mx: 'auto',
        px: { xs: 2, md: 0 },
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          justifySelf: 'center',
          width: { xs: 150, md: 200 },
          height: { xs: 210, md: 280 },
        }}
      >
        <svg viewBox="0 0 200 280" width="100%" height="100%" fill="none">
          {BONES.map(([a, b], i) => (
            <motion.line
              key={`bone-${i}`}
              animate={{ x1: pose[a][0], y1: pose[a][1], x2: pose[b][0], y2: pose[b][1] }}
              transition={{ duration: reduceMotion ? 0 : 1.1, ease: 'easeInOut' }}
              stroke={GOLD}
              strokeWidth={1.2}
              strokeOpacity={0.5}
              strokeLinecap="round"
            />
          ))}
          {JOINT_KEYS.map((key) => (
            <motion.circle
              key={key}
              animate={{
                cx: pose[key][0],
                cy: pose[key][1],
                r: stage.highlight && IDENTIFYING_JOINTS.includes(key) ? 4.2 : 2.6,
                opacity: stage.key === 'anonymized' ? 0.65 : 1,
              }}
              transition={{ duration: reduceMotion ? 0 : 1.1, ease: 'easeInOut' }}
              fill={jointTone(key)}
            />
          ))}
        </svg>
      </Box>

      <Box role="status" aria-live="polite">
        <Typography
          sx={{
            fontFamily: MONO,
            fontSize: '0.62rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: stage.highlight ? GOLD : EMERALD,
            mb: 1,
          }}
        >
          {`0${index + 1} // ${stage.label}`}
        </Typography>

        <Typography
          sx={{
            fontFamily: '"Inter", sans-serif',
            fontSize: { xs: '0.95rem', md: '1.05rem' },
            color: 'text.primary',
            lineHeight: 1.6,
            minHeight: { md: '3.4rem' },
            mb: 3,
          }}
        >
          {stage.caption}
        </Typography>

        <Box sx={{ display: 'flex', gap: 3 }}>
          <Meter label="Re-identification" value={stage.reidentified} tone={GOLD} />
          <Meter label="Action preserved" value={stage.action} tone={EMERALD} />
        </Box>
      </Box>
    </Box>
  );
};

export default AnonymizationLoop;
