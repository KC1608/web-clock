export interface CarArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: "Engines" | "Turbos & Induction" | "Intakes & Air" | "Exhaust Systems" | "Lighting & Aero" | "Drivetrain";
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  readingTime: string;
  publishedAt: string;
  tags: string[];
  bannerImage?: string;
  content: {
    introduction: string;
    howItWorks: string[];
    technicalHighlights: { label: string; value: string }[];
    prosAndCons?: { pros: string[]; cons: string[] };
    commonTroubleshooting?: string[];
  };
}

export interface ConnectMessage {
  id: string;
  name: string;
  email: string;
  favoriteCar?: string;
  interestArea: string;
  message: string;
  createdAt: string;
}

export const CATEGORIES = [
  {
    name: "Engines",
    slug: "engines",
    description: "Internal combustion fundamentals: Inline, V-config, Boxer, Rotary, and valve control systems.",
    icon: "Gauge",
    badgeColor: "bg-red-500/10 text-red-500 border-red-500/20",
  },
  {
    name: "Turbos & Induction",
    slug: "turbos",
    description: "Forced induction mechanics: Turbos, twin-scroll designs, wastegates, blow-off valves, and intercooling.",
    icon: "Wind",
    badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  {
    name: "Intakes & Air",
    slug: "intakes",
    description: "Cold air intakes, mass airflow sensors, throttle bodies, and volumetric efficiency.",
    icon: "Flame",
    badgeColor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  {
    name: "Exhaust Systems",
    slug: "exhausts",
    description: "Headers, downpipes, catalytic converters, backpressure myths, and exhaust pulse scavenging.",
    icon: "Volume2",
    badgeColor: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  },
  {
    name: "Lighting & Aero",
    slug: "lighting",
    description: "Projectors, Matrix LED, Laser beamforming, splitters, diffusers, and aerodynamic drag.",
    icon: "Sun",
    badgeColor: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  },
  {
    name: "Drivetrain",
    slug: "drivetrain",
    description: "Limited slip differentials, dual-clutch transmissions, flywheels, and torque delivery.",
    icon: "Cpu",
    badgeColor: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  },
] as const;

export const INITIAL_ARTICLES: CarArticle[] = [
  {
    id: "1",
    slug: "how-turbochargers-work-dynamics",
    title: "How Turbochargers Work: Turbine, Compressor & Wastegate Dynamics",
    summary:
      "A deep dive into forced induction thermodynamics, spool thresholds, twin-scroll benefits, and preventing compressor surge.",
    category: "Turbos & Induction",
    author: {
      name: "Alex Vance",
      role: "Powertrain Calibration Specialist",
    },
    readingTime: "6 min read",
    publishedAt: "Oct 2, 2026",
    tags: ["Turbo", "Boost", "Wastegate", "Intercooler", "Performance"],
    content: {
      introduction:
        "Turbochargers harness wasted kinetic and thermal energy from the exhaust manifold to compress atmospheric air into the engine's intake cylinders, yielding dramatic power gains without increasing displacement.",
      howItWorks: [
        "1. Exhaust Gas Ingestion: High-temperature exhaust pulses exit the cylinder head and enter the turbine housing.",
        "2. Turbine Wheel Rotation: The expanding exhaust gas spins the turbine wheel at speeds frequently exceeding 150,000–250,000 RPM.",
        "3. Compressor Inducer Action: Connected by a shared center cartridge shaft, the spinning turbine drives the compressor wheel.",
        "4. Ambient Air Compression: The compressor draws in ambient air, compresses it into a high-density charge, and sends it through the intercooler to drop intake charge temperatures before entering the intake manifold.",
        "5. Wastegate Regulation: To prevent catastrophic over-boost, an internal or external wastegate actuator opens to divert excess exhaust gases safely around the turbine wheel.",
      ],
      technicalHighlights: [
        { label: "Operating RPM", value: "120,000 – 280,000 RPM" },
        { label: "Typical Peak Boost", value: "14 – 32 PSI (Street to Track)" },
        { label: "Turbine Temperature", value: "Up to 950°C (1,740°F)" },
        { label: "Efficiency Gain", value: "30% - 50% power increase over NA" },
      ],
      prosAndCons: {
        pros: [
          "Massive horsepower and torque gains from small displacement engines",
          "Improved high-altitude performance compared to naturally aspirated engines",
          "Recovers energy that would otherwise be discarded as exhaust heat",
        ],
        cons: [
          "Turbo lag: Latency between throttle opening and boost threshold",
          "Extreme thermal stress requiring oil and water cooling lines",
          "Risk of knock/detonation if fuel octane or air-fuel ratios (AFR) are improper",
        ],
      },
      commonTroubleshooting: [
        "Shaft Play: Axial or radial movement in the center cartridge indicating worn journal or ball bearings.",
        "Blue Smoke on Deceleration: Worn oil seals in the turbine or compressor housing.",
        "Boost Creep: Inability of an undersized wastegate port to bypass enough exhaust at high RPMs.",
      ],
    },
  },
  {
    id: "2",
    slug: "exhaust-scavenging-vs-backpressure-myths",
    title: "Exhaust Pulse Scavenging vs. The Backpressure Myth",
    summary:
      "Why engines never need 'backpressure'—unravelling acoustic wave tuning, pipe velocity, and optimal primary header lengths.",
    category: "Exhaust Systems",
    author: {
      name: "Marcus Cole",
      role: "Exhaust Fabricator & Tuner",
    },
    readingTime: "5 min read",
    publishedAt: "Sep 28, 2026",
    tags: ["Exhaust", "Headers", "Scavenging", "Velocity", "Downpipe"],
    content: {
      introduction:
        "One of the most persistent myths in automotive culture is that four-stroke combustion engines need 'backpressure' to make low-end torque. In reality, backpressure is always an impediment. What engines actually thrive on is high gas velocity and acoustic pulse scavenging.",
      howItWorks: [
        "1. Exhaust Pulse Generation: When the exhaust valve snaps open, a high-pressure sonic pulse travels down the primary tube.",
        "2. The Scavenging Wave: When this positive pressure pulse reaches a step change or collector, a reflective negative pressure (vacuum) wave travels back toward the cylinder.",
        "3. Valve Overlap Benefit: By sizing primary header tubes correctly, this negative wave arrives right during valve overlap (when intake and exhaust valves are open simultaneously).",
        "4. Sucking Fresh Mixture: This acoustic vacuum pulls the remaining exhaust residuals out and draws fresh air-fuel mixture into the combustion chamber before compression begins.",
      ],
      technicalHighlights: [
        { label: "Optimal Gas Velocity", value: "240 – 300 ft/sec at peak torque" },
        { label: "Equal Length Headers", value: "Timed wave synchronization within ±1/4 inch" },
        { label: "Pipe Diameter Impact", value: "Too large = slow gas speed; Too small = excessive backpressure" },
        { label: "Catalytic Converters", value: "Modern 200-300 CPSI flow >85% of straight pipe" },
      ],
      prosAndCons: {
        pros: [
          "Optimized scavenging increases volumetric efficiency above 100% on NA engines",
          "Produces cleaner combustion and cooler exhaust valve temperatures",
          "Sharper throttle response across the power band",
        ],
        cons: [
          "Overly large straight-pipes drop gas velocity, causing sluggish low-end response",
          "Equal-length manifold packaging can be tight in cramped engine bays",
        ],
      },
      commonTroubleshooting: [
        "Rasp / Drone: Resonant chamber vibration around 2,000–3,000 RPM, solvable with Helmholtz resonators.",
        "Exhaust Leaks at Flange: Warped 2-bolt flanges or crushed donut gaskets causing false lean sensor readings.",
      ],
    },
  },
  {
    id: "3",
    slug: "direct-injection-vs-port-injection-carbon",
    title: "Direct Injection vs. Port Injection: The Carbon Buildup Dilemma",
    summary:
      "Comparing fuel atomization, cylinder cooling benefits of GDI, and why dual-injection (port + direct) is the holy grail.",
    category: "Engines",
    author: {
      name: "Siddharth Rao",
      role: "Engine Design Engineer",
    },
    readingTime: "7 min read",
    publishedAt: "Sep 22, 2026",
    tags: ["Engine", "GDI", "Port Injection", "Fuel Delivery", "Carbon"],
    content: {
      introduction:
        "Gasoline Direct Injection (GDI) revolutionized engine efficiency and emissions by injecting fuel directly into the combustion chamber at pressures above 2,500 PSI. However, it eliminated the self-cleaning effect that port injectors provided to intake valves.",
      howItWorks: [
        "1. Port Fuel Injection (PFI): Sprays fuel into the intake runner behind the intake valve. Fuel washes over the valve stem and tulip, dissolving oil vapor deposits.",
        "2. Direct Injection (GDI): High-pressure fuel rails inject directly into the cylinder during compression, providing charge-cooling that allows higher compression ratios without knock.",
        "3. The Carbon Conundrum: Oil mist from Positive Crankcase Ventilation (PCV) settles on hot intake valves without any fuel spray to wash it away, baking into stubborn carbon crusts.",
        "4. Dual Injection Solution: Modern premium engines (like Toyota's D-4S and Ford's Gen-3 Coyote) run both systems, activating port injectors at low load to wash valves and direct injectors under high load for performance.",
      ],
      technicalHighlights: [
        { label: "PFI Pressure", value: "40 – 65 PSI" },
        { label: "GDI Pressure", value: "2,000 – 4,500 PSI (Mechanical Pump)" },
        { label: "Compression Ratio Boost", value: "+1.0 to 1.5 ratio safely achievable" },
        { label: "Cleaning Interval (GDI)", value: "Walnut blasting recommended every 50k–75k miles" },
      ],
      prosAndCons: {
        pros: [
          "Superior fuel economy and atomization control",
          "Lower in-cylinder temperatures allow aggressive ignition timing",
          "Significant torque gains at low engine speeds",
        ],
        cons: [
          "Intake valve carbon buildup over time requiring walnut shell blasting",
          "Loud ticking noise from high-pressure mechanical fuel pump and solenoids",
        ],
      },
      commonTroubleshooting: [
        "Misfires on Cold Start: Uneven carbon buildup on intake valves preventing full seating.",
        "High-Pressure Fuel Pump (HPFP) Cam Follower Wear: Regular oil changes with high-zinc oil are vital.",
      ],
    },
  },
  {
    id: "4",
    slug: "cold-air-intakes-vs-short-ram",
    title: "Cold Air Intakes vs. Short Ram: Temperature vs. Flow Dynamics",
    summary:
      "Does a Cold Air Intake really make power? Unpacking IATs, MAF sensor calibration, and resonance chamber effects.",
    category: "Intakes & Air",
    author: {
      name: "Jordan Reed",
      role: "Dyno Tuner & Intake Specialist",
    },
    readingTime: "4 min read",
    publishedAt: "Sep 15, 2026",
    tags: ["Intake", "MAF", "Dyno", "Airflow", "Filters"],
    content: {
      introduction:
        "Every 10°F drop in intake air temperature (IAT) increases air density by roughly 1%, producing more oxygen for combustion. We analyze true cold air routing versus engine bay heat-soaking.",
      howItWorks: [
        "1. Atmospheric Air Draw: Cold air intakes pull from outside the engine bay (wheel well, lower bumper grill).",
        "2. Thermal Isolation: Shielded airboxes isolate the filter from radiator exhaust and turbo header radiant heat.",
        "3. Laminar Flow to MAF: Smooth silicone or mandrel-bent aluminum piping reduces turbulence around the Mass Airflow sensor.",
        "4. Velocity Stacks: Smooth entry bellmouths smooth the transition into the throttle body.",
      ],
      technicalHighlights: [
        { label: "IAT Reduction", value: "15°F – 35°F drop vs unshielded intake" },
        { label: "Power Potential", value: "5 – 15 WHP depending on factory bottleneck" },
        { label: "Filter Types", value: "Oiled cotton gauze vs Dry synthetic media" },
      ],
      prosAndCons: {
        pros: [
          "Sharper intake growl and audible diverter/turbo spool sounds",
          "Consistently lower IATs during spirited driving",
          "Washable and reusable high-flow filter elements",
        ],
        cons: [
          "Low-hanging filters pose hydrolock danger in deep standing water puddles",
          "Changing pipe diameter without ECU recalibration skews MAF voltage scales",
        ],
      },
    },
  },
  {
    id: "5",
    slug: "matrix-led-projectors-vs-laser-headlights",
    title: "Matrix LED, Adaptive Projectors & Laser Lights: The Science of Automotive Optics",
    summary:
      "How individual micro-LED arrays shield oncoming traffic, cutoff shield physics, and why Laser lights reach 600 meters.",
    category: "Lighting & Aero",
    author: {
      name: "Elena Rostova",
      role: "Optics & Lighting Engineer",
    },
    readingTime: "5 min read",
    publishedAt: "Sep 10, 2026",
    tags: ["Lighting", "Headlights", "Matrix LED", "Laser", "Safety"],
    content: {
      introduction:
        "Automotive lighting has transformed from basic halogen filaments to intelligent digital beamforming. Modern headlights illuminate road hazards without blinding oncoming vehicles using matrix addressable LEDs and phosphor-excited lasers.",
      howItWorks: [
        "1. Aspheric Projector Lenses: Shape the light from high-output diodes into a razor-sharp horizontal cutoff line to prevent glare.",
        "2. Matrix Micro-LED Array: Camera sensors on the windshield detect headlights or taillights of other vehicles, instantly extinguishing only the specific individual LED segments aimed at those cars.",
        "3. Laser Beam Excitation: Blue laser diodes fire through a yellow phosphorus crystal converter, yielding crisp 5,500K daylight-white light with incredible beam throw up to 600 meters.",
      ],
      technicalHighlights: [
        { label: "Luminous Range", value: "Halogen ~100m, LED ~300m, Laser ~600m" },
        { label: "Color Temperature", value: "Optimal 5,000K – 5,800K for contrast" },
        { label: "Active Pixels", value: "From 16 to over 1.3 million micro-mirror pixels per headlight" },
      ],
      prosAndCons: {
        pros: [
          "Full high-beam illumination active 100% of the time with automatic anti-dazzle masking",
          "Drastically reduces driver eye fatigue during night driving",
          "Sleek aerodynamic headlight housing profiles",
        ],
        cons: [
          "High replacement cost if housing is cracked",
          "Strict regulatory approvals vary between EU and US markets",
        ],
      },
    },
  },
];
