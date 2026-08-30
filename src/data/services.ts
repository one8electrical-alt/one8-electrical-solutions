export type ServiceData = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: "power" | "green" | "control";
  categoryName: string;
  overview: string;
  features: string[];
  applications: string[];
  benefits: string[];
};

export const servicesList: ServiceData[] = [
  {
    slug: "domestic-wiring",
    title: "Domestic Wiring",
    metaTitle: "Professional Domestic & House Wiring Services",
    metaDescription: "Safety-first residential and house wiring services across Rajasthan. Led by Er. Hanuman Yadav.",
    category: "power",
    categoryName: "Power & Substations",
    overview: "Providing high-quality residential internal electrical wiring services for apartments, houses, villas, and housing societies. We focus on proper circuit design, standard spacing, and premium cable routing.",
    features: [
      "Mains distribution box setup",
      "Point-to-point conduit wiring",
      "MCB & RCCB safety switches configuration",
      "Inverter and UPS wiring integration",
      "Chemical earthing pits for home safety"
    ],
    applications: [
      "Residential houses & villas",
      "Multi-storey apartments",
      "Housing societies & townships"
    ],
    benefits: [
      "Certified safety compliance",
      "Zero-accident layout protection",
      "Efficient load balancing",
      "Quality materials selection"
    ]
  },
  {
    slug: "industrial-wiring",
    title: "Industrial Wiring",
    metaTitle: "Heavy-Duty Industrial Wiring & Power Cabling",
    metaDescription: "Heavy-duty industrial conduits, power routing, and distribution panels for factories and manufacturing plants across Rajasthan.",
    category: "power",
    categoryName: "Power & Substations",
    overview: "Engineered power distribution and cabling setups for factories, processing plants, and manufacturing spaces. We ensure clean tray layouts, armored conduits, and robust terminations.",
    features: [
      "Armored cable tray installations",
      "HT/LT line distribution setups",
      "Main service panel integration",
      "High-power machine power drops",
      "Industrial busbar trunking systems"
    ],
    applications: [
      "Manufacturing factories",
      "Textile mills",
      "Food processing facilities",
      "Industrial plants"
    ],
    benefits: [
      "High load durability",
      "Structured tray layouts",
      "Compliance with electricity regulations",
      "Reduced power transmission losses"
    ]
  },
  {
    slug: "motor-installation-repair",
    title: "Motor Installation & Repair",
    metaTitle: "Industrial Motor Installation & Repair Services",
    metaDescription: "Professional alignment, commissioning, and servicing of high-voltage single and three-phase industrial motors.",
    category: "power",
    categoryName: "Power & Substations",
    overview: "Installation, terminal wiring, alignment, and commissioning of industrial single and three-phase electric motors. We provide starter controls setup and preventive checks.",
    features: [
      "Star-delta and DOL starter setups",
      "Insulation resistance testing (megger)",
      "VFD (Variable Frequency Drive) speed controls",
      "Motor alignment and base fixing",
      "Terminal connection rewrites and testing"
    ],
    applications: [
      "Water pumping stations",
      "Factory conveyor drives",
      "Pneumatic compressor drives",
      "Industrial blower fans"
    ],
    benefits: [
      "Extended motor lifecycle",
      "Reduced starting current stress",
      "Accurate thermal protection",
      "Optimized motor efficiency"
    ]
  },
  {
    slug: "panel-board-design-fabrication",
    title: "Panel Board Design & Fabrication",
    metaTitle: "Custom Panel Board Design & Fabrication Services",
    metaDescription: "Custom electrical panel board design, fabrication, and busbar calculations for systematic power distribution.",
    category: "control",
    categoryName: "Automation & Panels",
    overview: "Custom engineering, busbar calculations, and fabrication of industrial control panel boards. We design and build main panels, sub-panels, and motor control centers (MCCs).",
    features: [
      "Mains switchgear panel board assemblies",
      "Busbar support configurations",
      "Ventilation and exhaust integration",
      "Circuit breaker and fuse selector links",
      "Indicator lamp and metering setups"
    ],
    applications: [
      "Industrial plants",
      "Commercial office complexes",
      "Substations and yards",
      "Power distribution units"
    ],
    benefits: [
      "Organized layout structure",
      "Safe thermal management",
      "Compact footprints",
      "Easy troubleshooting diagrams"
    ]
  },
  {
    slug: "dg-set-installation-maintenance",
    title: "DG Set Installation & Maintenance",
    metaTitle: "DG Set Installation & Maintenance Services",
    metaDescription: "Diesel generator set installation, synchronization panels, AMF panels, and periodic maintenance checks.",
    category: "power",
    categoryName: "Power & Substations",
    overview: "Comprehensive diesel generator set installation, sync panel integration, and routine maintenance support. We ensure uninterrupted backup power sync for industries.",
    features: [
      "AMF (Automatic Mains Failure) panel connection",
      "Generator synchronization setup",
      "Exhaust chimney and acoustic check layouts",
      "Periodic load-bank testing",
      "Alternator checking and battery servicing"
    ],
    applications: [
      "Manufacturing factories",
      "Hospitals & healthcare units",
      "Commercial complexes",
      "Residential societies"
    ],
    benefits: [
      "Instant power failovers",
      "Optimized fuel efficiency",
      "Steady voltage regulations",
      "Preventive failure analysis"
    ]
  },
  {
    slug: "compressor-installation",
    title: "Compressor Installation",
    metaTitle: "Pneumatic Compressor Electrical Installation Services",
    metaDescription: "Electrical power synchronization, cabling, and starter panel configuration for industrial air compressor units.",
    category: "power",
    categoryName: "Power & Substations",
    overview: "Power wiring, synchronization, and control panel setups for pneumatic and industrial air compressors. We ensure reliable starting controls and overload safety loops.",
    features: [
      "Compressor starter panel setup",
      "High-amp safety breaker links",
      "Pressure sensor control loops",
      "Emergency stop circuit integration",
      "VFD compressor speed setup"
    ],
    applications: [
      "Textile processing plants",
      "Automobile service centers",
      "Pneumatic packing plants",
      "General manufacturing shops"
    ],
    benefits: [
      "Reduced start-up current surge",
      "Automated cut-off protection",
      "Thermal overload mitigation",
      "Stable power consumption"
    ]
  },
  {
    slug: "hvac-system-wiring",
    title: "HVAC System Wiring",
    metaTitle: "Commercial HVAC System Control & Power Wiring",
    metaDescription: "Power routing and control loops for chiller plants, air handlers, and commercial central air-conditioning systems.",
    category: "power",
    categoryName: "Power & Substations",
    overview: "Specialized control wiring and power routing for chiller plants, air handling units (AHUs), and central commercial air conditioning systems. We build clean control loop wiring.",
    features: [
      "Chiller plant power routing",
      "Thermostat and sensor control loop layouts",
      "AHU panel installations",
      "VAV box control wiring",
      "Interlock safety controls integration"
    ],
    applications: [
      "Commercial office spaces",
      "Shopping malls",
      "Industrial clean rooms",
      "Hospital air handling grids"
    ],
    benefits: [
      "Precise temperature regulation",
      "Integrated building controls",
      "Overcurrent component safety",
      "Energy-efficient cycle sync"
    ]
  },
  {
    slug: "solar-panel-installation",
    title: "Solar Panel Installation",
    metaTitle: "Rooftop Solar Panel Installation & Net-Metering",
    metaDescription: "Rooftop solar PV array design, structural frame layouts, solar inverter installation, and net-metering integration.",
    category: "green",
    categoryName: "Green Energy & Audits",
    overview: "Design, structural support checks, grid connections, and commissioning of rooftop solar PV arrays. We coordinate bidirectional net-metering setups with local utilities.",
    features: [
      "Solar PV frame mounting and grounding",
      "Solar inverter power integration",
      "Bidirectional net-metering setup",
      "ACDB & DCDB safety box setups",
      "Surge protection devices (SPD) installation"
    ],
    applications: [
      "Residential houses & rooftops",
      "Industrial factory roofs",
      "Commercial complexes",
      "Agricultural pump grids"
    ],
    benefits: [
      "Reduced grid utility bills",
      "Sustainable green energy source",
      "Rooftop space utilization",
      "Long-term system reliability"
    ]
  },
  {
    slug: "power-factor-improvement",
    title: "Power Factor Improvement",
    metaTitle: "Power Factor Improvement & APFC Panels",
    metaDescription: "APFC (Automatic Power Factor Correction) panels design and installation to improve power factor and avoid grid penalties.",
    category: "green",
    categoryName: "Green Energy & Audits",
    overview: "Design and installation of APFC (Automatic Power Factor Correction) panels to eliminate grid penalties and lower energy bills. We provide power factor calculation audits.",
    features: [
      "APFC panel board setups",
      "Capacitor bank stage configurations",
      "Power factor relay controller links",
      "Harmonic filter reactor setups",
      "Switchgear and contactor connections"
    ],
    applications: [
      "Heavy industries",
      "Textile mills",
      "Commercial complexes",
      "High-load factories"
    ],
    benefits: [
      "Elimination of grid penalties",
      "Reduced transmission losses",
      "Optimized transformer load capacity",
      "Stable internal line voltages"
    ]
  },
  {
    slug: "earthing-lightning-protection",
    title: "Earthing & Lightning Protection",
    metaTitle: "Chemical Earthing & Lightning Protection Systems",
    metaDescription: "Chemical earthing pits, copper strip routing, and lightning protection systems for home and industrial safety.",
    category: "green",
    categoryName: "Green Energy & Audits",
    overview: "Installation of maintenance-free chemical earthing grids and lightning protection grids. We verify earth resistance parameters to guarantee personnel and system safety.",
    features: [
      "Chemical earth electrode installations",
      "Copper/GI strip grounding loops",
      "Earth resistance testing (megger checks)",
      "Lightning arrestor setups",
      "Equipotential bonding grids"
    ],
    applications: [
      "Industrial plant compounds",
      "Data centers & server rooms",
      "Commercial buildings",
      "Residential apartments"
    ],
    benefits: [
      "Protection against shock hazards",
      "Equipment static discharge safety",
      "Lightning strike current diversion",
      "Maintenance-free long life"
    ]
  },
  {
    slug: "etp-stp-panel-installation",
    title: "ETP & STP Panel Installation",
    metaTitle: "ETP & STP Control Panel Installation Services",
    metaDescription: "Control panel assemblies and automation configurations for Effluent and Sewage Treatment Plants.",
    category: "control",
    categoryName: "Automation & Panels",
    overview: "Weatherproof panel installations and sensor integrations for Sewage Treatment Plants (STP) and Effluent Treatment Plants (ETP). We build automated pump starter controls.",
    features: [
      "IP-rated weatherproof panel enclosures",
      "Float switch and level sensor integrations",
      "Sequential pump starter controls",
      "Dry-run and overload safety circuits",
      "Central indicator panel configurations"
    ],
    applications: [
      "Industrial waste plants",
      "Housing society STP grids",
      "Textile processing ETP setups",
      "Chemical plant waste units"
    ],
    benefits: [
      "Safe weatherproof layout",
      "Automated level controls",
      "Pump lifespan expansion",
      "Local status indicator displays"
    ]
  },
  {
    slug: "energy-audit-service",
    title: "Energy Audit Service",
    metaTitle: "Energy Audit Service & Power Quality Analysis",
    metaDescription: "Assessments of power distribution efficiency, load balancing, harmonic analysis, and energy saving recommendations.",
    category: "green",
    categoryName: "Green Energy & Audits",
    overview: "Routine assessments of power distribution lines, load balancing profiles, and grid parameters. We identify energy saving opportunities and calculate system losses.",
    features: [
      "Load profile logging checks",
      "Voltage imbalance analysis",
      "Harmonic calculation tests",
      "Power factor efficiency audits",
      "Energy saving layout recommendations"
    ],
    applications: [
      "Heavy industrial plants",
      "Textile factories",
      "Commercial complexes",
      "Large educational campuses"
    ],
    benefits: [
      "Identified system losses",
      "Preventive load overloading",
      "Reduced monthly energy bills",
      "Detailed load data records"
    ]
  },
  {
    slug: "fire-alarm-system-wiring",
    title: "Fire Alarm System Wiring",
    metaTitle: "Commercial Fire Alarm System Wiring & Setup",
    metaDescription: "Sensor wiring, control loop design, alarm panels, and safety integration for commercial fire alarm networks.",
    category: "green",
    categoryName: "Green Energy & Audits",
    overview: "Wiring, loop design, detector placement, and panel setups for fire alarm systems. We conform to fire safety guidelines to safeguard your buildings.",
    features: [
      "Fire control panel wiring",
      "Smoke and heat detector sensor loops",
      "Manual call point installations",
      "Hooter and strobe alarm cabling",
      "Backup battery power connection"
    ],
    applications: [
      "Commercial office spaces",
      "Industrial factories",
      "Warehouses & depots",
      "Residential apartments"
    ],
    benefits: [
      "Early safety warning alerts",
      "Zonal fire source detection",
      "Standby backup power safety",
      "Building code compliance"
    ]
  },
  {
    slug: "cable-laying-termination",
    title: "Cable Laying & Termination",
    metaTitle: "HT/LT Cable Laying & Armored Cable Termination",
    metaDescription: "Underground armored cabling, cable tray routing, and termination of HT/LT power cables.",
    category: "power",
    categoryName: "Power & Substations",
    overview: "Trenching, tray routing, and high-quality termination for high-tension (HT) and low-tension (LT) armored power cables. We ensure strong connections with proper glands and lugs.",
    features: [
      "Underground cable trench layouts",
      "Cable tray bracket routing",
      "Glanding and crimping connections",
      "Heat-shrink joint kit setups",
      "Insulation resistance testing checks"
    ],
    applications: [
      "Substations & yards",
      "Factory power inputs",
      "Commercial building mains",
      "Solar field layouts"
    ],
    benefits: [
      "High physical impact protection",
      "Moisture-sealed terminations",
      "Secure electrical contact points",
      "Reduced cable heating issues"
    ]
  },
  {
    slug: "transformer-installation-service",
    title: "Transformer Installation & Service",
    metaTitle: "Transformer Installation & Substation Services",
    metaDescription: "Substation commissioning assistance, transformer placement, oil filtration, and regular testing services.",
    category: "power",
    categoryName: "Power & Substations",
    overview: "Support services for transformer structural placement, substation cabling, oil filtration, and regular test cycles. We assist in building robust high-voltage grids.",
    features: [
      "Transformer structural installation assistance",
      "Substation earthing connections",
      "Transformer oil filtration checks",
      "Insulation and ratio tests",
      "HT switchgear links"
    ],
    applications: [
      "Industrial grid substations",
      "Rural electrification feeds",
      "Large factory yards",
      "Solar power field plants"
    ],
    benefits: [
      "High transformer uptime",
      "Safe high-voltage operations",
      "Purified dielectric insulation",
      "Reduced load fault losses"
    ]
  },
  {
    slug: "automation-setup-plc-scada",
    title: "Automation Setup (PLC/SCADA)",
    metaTitle: "PLC SCADA Automation Setup Services",
    metaDescription: "Programmable Logic Controller setups and SCADA dashboard interfaces for industrial process monitoring.",
    category: "control",
    categoryName: "Automation & Panels",
    overview: "Wiring and programming support for Programmable Logic Controller (PLC) setups and SCADA system interfaces. We help integrate old relay panels into computerized control systems.",
    features: [
      "PLC panel control routing",
      "I/O module connection setups",
      "SCADA dashboard data links",
      "Sensor signal cabling setups",
      "Ethernet and Modbus network connections"
    ],
    applications: [
      "Water treatment plants",
      "Process manufacturing plants",
      "Textile chemical grids",
      "Automatic packaging setups"
    ],
    benefits: [
      "Central process display",
      "Reduced human intervention faults",
      "Automated sequence checking",
      "Fast fault diagnostic screens"
    ]
  },
  {
    slug: "street-lighting-solution",
    title: "Street Lighting Solution",
    metaTitle: "Street Lighting Solutions & Smart Controls",
    metaDescription: "Design and installation of smart lighting grids and automated timers for yards, roads, and compounds.",
    category: "power",
    categoryName: "Power & Substations",
    overview: "Design, cabling, pole erection, and control panel setups for street lighting networks. We integrate automatic timers or light sensors to optimize energy use.",
    features: [
      "Street light pole cable routing",
      "Automatic timer switch panels",
      "Light sensor switch node installations",
      "Overvoltage safety protection",
      "LED lighting array configurations"
    ],
    applications: [
      "Industrial campus roads",
      "Residential colony streets",
      "Warehouse yard pathways",
      "Commercial site parameters"
    ],
    benefits: [
      "Automated day-night triggers",
      "Reduced energy wastage",
      "Safe illuminated campus",
      "Balanced phase distributions"
    ]
  },
  {
    slug: "amc-annual-maintenance-contract",
    title: "AMC (Annual Maintenance Contract)",
    metaTitle: "Annual Maintenance Contract (AMC) for Power Systems",
    metaDescription: "Scheduled periodic checks, contactor cleaning, load tests, and priority support for industrial systems.",
    category: "control",
    categoryName: "Automation & Panels",
    overview: "Routine maintenance packages offering safety audits, panel thermography, terminal tightens, and safety checks. We help factories avoid costly breakdown repair bills.",
    features: [
      "Thermal checks of electrical panels",
      "Contactor and switch cleaning",
      "Earth pit resistance logs",
      "Circuit breaker trip testing",
      "Priority breakdown support responses"
    ],
    applications: [
      "Industrial manufacturing factories",
      "Commercial complexes",
      "Large solar rooftop layouts",
      "ETP/STP process systems"
    ],
    benefits: [
      "Minimized sudden downtime",
      "Optimized layout safety",
      "Detailed maintenance records",
      "Cost-effective service scheduling"
    ]
  }
];
