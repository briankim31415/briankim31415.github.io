import resume from '../assets/Resume_Brian Kim.pdf';
import githubIcon from '../assets/github-dark.svg';
import linkedinIcon from '../assets/linkedin-dark.svg';
import madcommunity from '../assets/madcommunity.png';
import musentiment from '../assets/musentiment.png';
import neatpso from '../assets/neatpso.png';
import rlstock from '../assets/rlstock.png';

export const sections = [
  { id: 'hero', label: 'Introduction', shortLabel: 'Intro' },
  { id: 'projects', label: 'Selected Work', shortLabel: 'Work' },
  { id: 'side-projects', label: 'Side Projects', shortLabel: 'Side' },
  { id: 'timeline', label: 'Career Timeline', shortLabel: 'Timeline' },
  { id: 'capabilities', label: 'Capabilities', shortLabel: 'Skills' },
  { id: 'contact', label: 'Contact', shortLabel: 'Contact' },
];

export const heroContent = {
  name: 'Brian Kim',
  role: 'Digital Twin Full-Stack Software Engineer',
  description:
    'General Motors engineer with a UT Austin MSE background in AI/ML, simulation, digital twins, and privacy-focused systems.',
  proofChips: [
    'General Motors',
    'UT Austin MSE',
    'Digital Twin Platforms',
    'AI/ML + Simulation',
  ],
  cta: {
    label: 'Open Resume',
    href: resume,
  },
  socialLinks: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/briankim31415/',
      icon: linkedinIcon,
    },
    {
      label: 'GitHub',
      href: 'https://github.com/briankim31415',
      icon: githubIcon,
    },
  ],
};

export const projects = [
  {
    title: 'MAD-Community',
    summary:
      'Designed a configurable multi-agent debate framework that routes LLM agents through community-based network topologies and staged judging to improve answer quality.',
    outcome:
      "Developed prompt templates, network presets, and evaluation tooling that improved benchmark accuracy by 39% over the paper's GPT-4 baseline while reducing model cost with GPT-4o mini agents.",
    link: 'https://github.com/briankim31415/MAD-Community',
    image: madcommunity,
    featured: true,
    proofChips: ['39% benchmark lift', 'Community-routed agents', 'Cost-aware evaluation'],
  },
  {
    title: 'NEAT-PSO: Hybrid CNN Architecture Evolution',
    summary:
      'Built a hybrid neural architecture search pipeline that combines NEAT-style topology evolution with multi-objective particle swarm optimization for CNN design on CIFAR-10.',
    outcome:
      'Optimized for both classification error and parameter efficiency, producing evolved architectures whose best individuals delivered roughly 2x the accuracy of the weakest candidates over 50 generations.',
    link: 'https://github.com/briankim31415/NEAT-PSO',
    image: neatpso,
    featured: false,
    proofChips: ['CIFAR-10 search', '50 generations', 'Multi-objective optimization'],
  },
  {
    title: 'Reinforcement Learning Trading Agent Exploration',
    summary:
      'Developed a deep reinforcement learning research pipeline for equity trading using CNN-based feature extraction with A2C, PPO, DDPG, and ensemble strategies.',
    outcome:
      'Benchmarked strategies with return, volatility, and Sharpe ratio, and the CNN-augmented ensemble outperformed four major market indices from January 2018 through January 2023.',
    image: rlstock,
    featured: false,
    proofChips: ['A2C / PPO / DDPG', 'Index outperformance', '2018-2023 backtests'],
  },
  {
    title: 'MuSentiment',
    summary:
      'Built an end-to-end analysis pipeline that scraped Billboard, Genius, Spotify, and CDC datasets to study how lyrical sentiment in popular music tracks with public health indicators.',
    outcome:
      'Applied NLTK sentiment analysis, regression modeling, and trend visualizations across 1,500 Billboard Hot 100 songs, earning 2nd place in the 2021 Texas A&M Datathon Data Synthesis Challenge.',
    link: 'https://github.com/jeeminhan/MuSentiment',
    image: musentiment,
    featured: false,
    proofChips: ['1,500 songs analyzed', 'Sentiment + health trends', 'Datathon runner-up'],
  },
];

export const sideProjects = [
  {
    title: 'Chord Numbers',
    summary:
      'A browser-based Nashville number chart converter for quickly turning chord charts into key-agnostic number notation.',
    link: '/chord-numbers/',
    proofChips: ['Nashville numbers', 'Clipboard export', 'Key + mode controls'],
  },
];

export const timelineItems = [
  {
    kind: 'experience',
    title: 'Digital Twin Full-Stack Software Engineer',
    organization: 'General Motors',
    location: 'Austin, TX',
    timeframe: 'May 2026 - Present',
    bullets: [
      'Working on full-stack software for digital twin platforms.',
      'Supporting engineering workflows through software and simulation.',
      'Contributing to tools for automotive product development.',
    ],
  },
  {
    kind: 'experience',
    title: 'Software Engineer',
    organization: 'UT Computational Visualization Center',
    location: 'Austin, TX',
    timeframe: 'May 2025 - May 2026',
    bullets: [
      'Built a Python simulation platform around NVIDIA Sionna-RT for ray-traced urban radio-wave propagation.',
      'Automated OpenStreetMap, ArcGIS, and Blender workflows to generate digital twin scenes in Unreal Engine 5 and Three.JS.',
      'Ran real-time assessment pipelines covering dataset generation and ResNet-18 training.',
      'Trained an Infinite-GAN neural SDE on TACC with 400+ W&B GPU-hours for urban movement generation.',
    ],
  },
  {
    kind: 'education',
    title: 'MSE, Software Engineering & Systems',
    organization: 'The University of Texas at Austin',
    location: 'Austin, TX',
    timeframe: 'May 2025',
    bullets: ["Thesis: Do Privacy Policies Align with Users' Privacy Values?"],
  },
  {
    kind: 'experience',
    title: 'Graduate Research Assistant',
    organization: 'UT Center for Identity',
    location: 'Austin, TX',
    timeframe: 'September 2023 - May 2025',
    bullets: [
      'Published four peer-reviewed papers with Dr. Suzanne Barber, including two first-author publications.',
      'Served as a teaching assistant across three undergraduate and graduate courses in information security and privacy.',
      'Supported two senior capstone teams on the PrivacyCheck project with onboarding, planning, and development.',
    ],
  },
  {
    kind: 'experience',
    title: 'Cybersecurity Intern',
    organization: 'United States Automobile Association',
    location: 'San Antonio, TX',
    timeframe: 'May 2023 - August 2023',
    bullets: [
      'Migrated eight legacy Detica rulesets to SAS to support fraud-detection system decommissioning.',
      'Worked with onsite and offshore teams to refine matching logic and reduce false positives.',
    ],
  },
  {
    kind: 'education',
    title: 'BSEE, Software Engineering & Design',
    organization: 'The University of Texas at Austin',
    location: 'Austin, TX',
    timeframe: 'May 2023',
    bullets: ['GPA: 3.73/4.0'],
  },
];

export const skillGroups = [
  {
    title: 'Programming',
    description: 'Python, Java, C++, and data-facing languages used for research and systems work.',
    skills: ['Python', 'Java', 'SAS', 'SQL', 'C++'],
  },
  {
    title: 'Machine Learning',
    description: 'Modeling, experimentation, and evaluation tooling across modern ML stacks.',
    skills: [
      'PyTorch',
      'TensorFlow',
      'scikit-learn',
      'NumPy',
      'Reinforcement Learning',
      'OpenAI API',
      'Codex',
    ],
  },
  {
    title: 'Infrastructure',
    description: 'Delivery and experimentation environments spanning Linux, HPC, and observability.',
    skills: ['Linux', 'Git', 'Slurm (HPC)', 'Weights & Biases'],
  },
  {
    title: 'Simulation / Graphics',
    description: 'Spatial pipelines and engine tooling for digital twins, graphics, and environments.',
    skills: [
      'Blender',
      'Unreal Engine 5',
      'PyGame',
      'NVIDIA Sionna-RT',
      'OpenStreetMap',
      'ArcGIS',
    ],
  },
];

export const contactContent = {
  heading: 'Building digital twin systems at the intersection of full-stack software, simulation, and AI.',
  text: 'The fastest way to get context is through my GitHub, LinkedIn, or resume.',
  links: [
    { label: 'GitHub', href: 'https://github.com/briankim31415' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/briankim31415/' },
    { label: 'Resume', href: resume },
  ],
};
