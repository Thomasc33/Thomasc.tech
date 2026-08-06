/**
 * The biography facts, in one place.
 *
 * These used to be written out three times — inline in pages/about.js, again in
 * public/about.md, and a third time in the <noscript> block of public/index.html
 * — which is how the ACR end date came to disagree with LinkedIn and how the
 * Graduate Research Assistant entry ended up as both "2025" and "May 2025".
 *
 * Dates are not stored here. They are read from src/Data/experience.json, which
 * is what the rendered site uses, so the two can no longer disagree.
 */

const experience = require('../../src/Data/experience.json');

const DISSERTATION = Object.freeze({
  title: 'Preserving User Privacy on Skeleton-Based Motion Data',
  degree: 'Ph.D.',
  field: 'Computing and Information Systems',
  institution: 'University of North Carolina at Charlotte',
  conferred: 'May 2026',
});

const CURRENT_ROLE = Object.freeze({
  organization: 'Incerta Intelligence',
  description:
    'Defense contracts focused on multimodal fusion for explainable and auditable decision support, building AI systems for mission-critical applications where transparency and accountability are requirements rather than features.',
});

const RESEARCH = Object.freeze({
  hook:
    'Skeleton-based motion data — the stick-figure body tracking produced by VR headsets, depth cameras, and pose estimators — looks anonymous. It is not. Limb proportions encode who you are structurally; the way you move encodes it dynamically. Published results re-identify individuals from skeleton sequences alone at over 80% accuracy, and infer gender at over 87%.',
  framing:
    'Thomas Carr’s dissertation, Preserving User Privacy on Skeleton-Based Motion Data, builds both sides of that problem: the attacks that demonstrate the leak, and the defenses that close it while keeping the data useful for its intended purpose.',
  contributions: Object.freeze([
    { name: 'LAN (Linkage Attack Neural Network)', text: 'a Siamese classifier that re-identifies individuals across skeleton sequences.', venue: 'CIKM 2023' },
    { name: 'PMR (Privacy-centric Deep Motion Retargeting)', text: 'adversarially trained retargeting that suppresses identity while preserving action.', venue: 'ICCV 2025' },
    { name: 'Explanation-based anonymization', text: 'explainable-AI techniques that localize and mask the privacy-sensitive joints.', venue: 'PAKDD 2025' },
    { name: 'DisentangledTMR', text: 'factorized-transformer retargeting with explicit identity/action disentanglement.', venue: 'ECCV 2026' },
    { name: 'MIRAGE', text: 'causal, streaming anonymization at 262 FPS with no target skeleton required.', venue: '' },
    { name: 'AEGIS', text: 'the first skeleton-motion anonymizer with a formal user-level (ε,δ)-differential privacy guarantee.', venue: '' },
  ]),
});

const EDUCATION = Object.freeze([
  {
    degree: 'Ph.D., Computing and Information Systems',
    where: 'UNC Charlotte',
    years: '2023 – May 2026',
    note: `Dissertation: ${DISSERTATION.title}.`,
  },
  { degree: 'M.S., Computer Science', where: 'UNC Charlotte', years: '2022', note: '' },
  { degree: 'B.S., Computer Science', where: 'UNC Charlotte', years: '2019 – 2021', note: '' },
]);

// Keys match `organization` in experience.json exactly; the lookup below fails
// loudly rather than silently dropping a role if one is renamed.
// `as` is how the organization reads in prose, where experience.json's value is
// either too long ("University of North Carolina at Charlotte") or carries a
// qualifier that only makes sense in a CV table ("ViBot (Startup)").
const PRIOR_BLURBS = Object.freeze([
  { organization: 'ACR Technologies', blurb: 'AI-enhanced intraoperative neural-monitoring communications platform.' },
  { organization: 'University of North Carolina at Charlotte', as: 'UNC Charlotte', blurb: 'privacy-preserving motion analysis, bias and fairness in ML.' },
  { organization: 'MDcentric Technology', blurb: 'real-time asset tracking across 30,000+ devices.' },
  { organization: 'ViBot (Startup)', as: 'ViBot', blurb: 'engagement platform serving 125,000 daily users.' },
]);

const roleFor = (organization) => {
  const match = experience.find((e) => e.organization === organization);
  if (!match) {
    throw new Error(`bio.js: no entry in experience.json for organization "${organization}"`);
  }
  return match;
};

/** Prior roles with their titles and timeframes resolved from experience.json. */
const priorExperience = () =>
  PRIOR_BLURBS.map(({ organization, as, blurb }) => {
    const role = roleFor(organization);
    return { title: role.title, organization: as || organization, timeframe: role.timeframe, blurb };
  });

/** The current role, with its timeframe resolved from experience.json. */
const currentRole = () => {
  const role = roleFor(CURRENT_ROLE.organization);
  return { ...CURRENT_ROLE, title: role.title, timeframe: role.timeframe };
};

const EXPERTISE_PROSE =
  'Privacy-preserving machine learning, skeleton-based motion data, motion retargeting, virtual-reality privacy, ethical machine learning, explainable AI, deep learning, computer vision, multimodal fusion, full-stack development.';

module.exports = {
  DISSERTATION,
  RESEARCH,
  EDUCATION,
  EXPERTISE_PROSE,
  priorExperience,
  currentRole,
};
