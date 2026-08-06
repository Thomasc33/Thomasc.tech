/**
 * The shared skeleton rig: joint names, bone topology, and the pose cycle.
 *
 * Both SkeletonFigure (the ambient Hero figure) and AnonymizationLoop draw from
 * this, so a change to the rig lands in both instead of drifting.
 *
 * Coordinates are in the 200x280 viewBox the SVGs share.
 */

export const JOINT_KEYS = [
  'head', 'neck',
  'shoulderL', 'shoulderR',
  'elbowL', 'elbowR',
  'wristL', 'wristR',
  'pelvis',
  'hipL', 'hipR',
  'kneeL', 'kneeR',
  'ankleL', 'ankleR',
];

export const BONES = [
  ['head', 'neck'],
  ['neck', 'shoulderL'], ['neck', 'shoulderR'],
  ['shoulderL', 'elbowL'], ['elbowL', 'wristL'],
  ['shoulderR', 'elbowR'], ['elbowR', 'wristR'],
  ['neck', 'pelvis'],
  ['pelvis', 'hipL'], ['pelvis', 'hipR'],
  ['hipL', 'kneeL'], ['kneeL', 'ankleL'],
  ['hipR', 'kneeR'], ['kneeR', 'ankleR'],
];

export const POSES = [
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

/**
 * The joints that carry the most identifying signal.
 *
 * Re-identification from skeleton data leans on anthropometry — how wide the
 * shoulders are relative to the hips, how long the forearms and shins are — so
 * these are the extremities whose *offsets* give a person away, as opposed to
 * the spine, which mostly describes what the body is doing.
 */
export const IDENTIFYING_JOINTS = [
  'shoulderL', 'shoulderR',
  'elbowL', 'elbowR',
  'wristL', 'wristR',
  'hipL', 'hipR',
  'kneeL', 'kneeR',
  'ankleL', 'ankleR',
];

/**
 * Retarget a pose onto a different body.
 *
 * Scales each joint's offset from the pelvis — horizontally to change build,
 * vertically to change limb length — which is what motion retargeting does in
 * spirit: the action survives because the topology and relative timing are
 * untouched, while the proportions that identify the person do not.
 *
 * This is an illustration of the idea, not an implementation of PMR.
 */
export const retarget = (pose, { build = 0.72, limb = 1.14 } = {}) => {
  const [px, py] = pose.pelvis;
  return Object.fromEntries(
    Object.entries(pose).map(([key, [x, y]]) => [
      key,
      [px + (x - px) * build, py + (y - py) * limb],
    ])
  );
};
