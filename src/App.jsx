import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const BRAND_ASSETS = {
  fullLogo: "/ostara-logo-source.png",
  swirlLogo: "/ostara-swirl-source.png",
};

const SITE_CONTENT = {
  hero: {
    eyebrow: "",
    title: "Disability Support in Adelaide That Fits Your Life",
    description:
      "Ostara Living provides reliable and flexible disability support in Adelaide for self-managed and plan-managed NDIS participants. We support daily routines, personal care, and community participation with a focus on independence, dignity, and consistency.",
    roleLabel: "I'm a",
    serviceLabel: "Interested in",
    serviceHelperText:
      "Looking for something more specific? Select it here and we’ll guide you from there.",
  },
  homeServices: {
    eyebrow: "Request Support",
    title: "Looking for Disability Support in Adelaide?",
    description:
      "Get in touch today and we’ll help you find the right support for your needs.",
    buttonLabel: "Request Support",
  },
  servicesPage: {
    eyebrow: "Services",
    title: "NDIS Disability Support Services in Adelaide",
    description:
      "Explore flexible, participant-centred support options for self-managed and plan-managed NDIS participants across Adelaide. Choose a service below to learn how Ostara Living can support your routine, independence, and community life.",
    ctaTitle: "Not sure which support is right for you?",
    ctaDescription:
      "We’ll guide you based on your needs and help you take the next step.",
    ctaButton: "Request Support",
  },
  contact: {
    eyebrow: "About Ostara Living",
    title: "Get in Touch",
    description:
      "Looking for disability support in Adelaide? Contact us today and we’ll help you get started.",
    formTitle: "Request Support",
    formIntro:
      "Fill out the form and we’ll get back to you as soon as possible.",
    infoTitle: "Get In Touch",
    promises: [
      "Adelaide-based disability support provider",
      "Flexible and reliable NDIS support Adelaide families can trust",
      "Participant-led care shaped by years of hands-on industry experience",
    ],
  },
  footer: {
    brandTitle: "Ostara Living",
    brandDescription:
      "Flexible disability support in Adelaide for self-managed and plan-managed NDIS participants.",
    brandSupportLine:
      "Built around dignity, routine, independence, and clear communication.",
    servicesTitle: "Services",
    services: [
  "Personal Care",
  "Daily Living Assistance",
  "Community Participation",
  "Transport Support",
  "Life Skills Development",
  "Mentoring & Routine Support",
  "1:1 Support",
  "2:1 Support",
],
    supportTitle: "Who We Support",
    supportGroups: [
      "Self-managed participants",
      "Plan-managed participants",
      "Families and carers",
    ],
    contactTitle: "Contact",
    contactLines: [
      "Phone: 0452480554",
      "Email: ostaralivingg@gmail.com",
      "Location: Adelaide, South Australia",
    ],
    contactButton: "Request Support",
    acknowledgementTitle: "Acknowledgement of Country",
    acknowledgementText:
      "Ostara Living acknowledges the Traditional Owners of the land on which we work and live, and we pay our respects to Elders past, present, and emerging. We recognise the continuing connection of Aboriginal and Torres Strait Islander peoples to land, waters, and community.",
    copyright: "© 2026 Ostara Living. All rights reserved.",
  },
};

const ROLE_OPTIONS = [
  "Person Looking For Support",
  "Family Member / Carer",
  "Support Coordinator",
  "Plan Manager",
  "Healthcare Professional",
  "Other",
];

const INTEREST_OPTIONS = [
  "Personal Care",
  "Daily Living Assistance",
  "Community Participation",
  "Transport Support",
  "1:1 Support",
  "2:1 Support",
  "Life Skills Development",
  "Mentoring & Routine Support",
  "Other",
];

const CONTACT_DETAILS = [
  { label: "Email", value: "ostaralivingg@gmail.com" },
  { label: "Phone", value: "0452480554" },
  { label: "Area", value: "Adelaide, South Australia" },
];

const TRUST_METRICS = [
  { value: "Adelaide", label: "Disability support Adelaide" },
  { value: "NDIS", label: "Self-managed and plan-managed support" },
  { value: "Trusted", label: "Reliable local support workers" },
];

const AUDIENCE_PATHWAYS = [
  {
    title: "Participants",
    text: "Support for self-managed and plan-managed NDIS participants across Adelaide.",
    action: "Explore Services",
    page: "services",
  },
  {
    title: "Families and carers",
    text: "Clear and reliable communication to help families and carers feel supported.",
    action: "Request Support",
    page: "contact",
  },
  {
    title: "Support coordinators",
    text: "A straightforward overview for coordinators seeking dependable disability support Adelaide services.",
    action: "Request Support",
    page: "contact",
  },
];

const WHY_CHOOSE_US = {
  eyebrow: "Why Choose Us",
  title: "Why Choose Ostara Living",
  description:
    "Built on real, hands-on disability support experience, Ostara Living delivers flexible and thoughtful support across Adelaide with a strong focus on dignity, routine, and everyday independence.",
  cards: [
    {
      number: "01",
      title: "Experienced Team",
      text: "Experienced disability support workers in Adelaide.",
    },
    {
      number: "02",
      title: "Flexible Support",
      text: "Flexible support tailored to individual needs.",
    },
    {
      number: "03",
      title: "Reliable Care",
      text: "Reliable and consistent care.",
    },
    {
      number: "04",
      title: "Clear Communication",
      text: "Clear communication from first enquiry.",
    },
  ],
};

const HERO_WELCOME_POINTS = [
  "NDIS support Adelaide families can trust",
  "Reliable support worker Adelaide services",
  "Clear communication from first enquiry",
];

const HERO_WELCOME_STATS = [
  { value: "Adelaide", label: "Disability support Adelaide" },
  { value: "NDIS", label: "NDIS support Adelaide" },
  { value: "Local", label: "Support worker Adelaide" },
];

const TESTIMONIAL_STORIES = [
  {
    quote:
      "Ostara Living makes it easier to understand what support is available and how to take the next step with confidence.",
    author: "For participants",
    role: "Clear and reliable support information",
  },
  {
    quote:
      "Families and carers can quickly see that support is flexible, participant-led, and focused on everyday independence.",
    author: "For families and carers",
    role: "Support that feels clear and dependable",
  },
  {
    quote:
      "Support coordinators can refer with confidence knowing communication is clear and services are locally focused across Adelaide.",
    author: "For coordinators",
    role: "Professional and locally focused",
  },
];

const SUPPORT_SERVICES = [
  {
    title: "Personal Care",
    short: "Respectful Daily Care",
    description:
      "Support with daily personal routines delivered with dignity and respect.",
    text: "Support with daily personal routines delivered with dignity and respect from a trusted personal care Adelaide provider.",
    image: "/personal-care-photo.png",
    imagePosition: "62% center",
    surface: "#a9dbf6",
    placeholderHint: "Professional wellbeing and care support",
    color: "#1098d5",
    highlights: ["Showering and hygiene", "Dressing and grooming"],
  },
  {
    title: "Daily Living Assistance",
    short: "Practical Help At Home",
    description:
      "Help with household tasks to maintain a safe and comfortable home.",
    text: "Help with household tasks to maintain a safe and comfortable home through flexible disability support Adelaide services.",
    image: "/daily-living-photo.png",
    imagePosition: "50% center",
    surface: "#f3bb3f",
    placeholderHint: "Warm, organised home support environment",
    color: "#22c55e",
    highlights: ["Cleaning and home support", "Meal preparation"],
  },
  {
    title: "Community Participation",
    short: "Meaningful Community Life",
    description:
      "Support to stay active and connected in your local Adelaide community.",
    text: "Support to stay active and connected through community participation Adelaide services that fit everyday life.",
    image: "/community-participation-photo.png",
    imagePosition: "50% center",
    surface: "#9fd8f4",
    placeholderHint: "Community participation and connected living",
    color: "#12c7c1",
    highlights: ["Social outings", "Appointment support"],
  },
  {
    title: "Transport Support",
    short: "Reliable Everyday Access",
    description:
      "Reliable transport for appointments and everyday activities.",
    text: "Reliable transport for appointments and everyday activities with support worker Adelaide assistance you can trust.",
    image: "/transport-support-photo.png",
    imagePosition: "50% center",
    surface: "#ead5ea",
    placeholderHint: "Safe and reliable transport support",
    color: "#f59e0b",
    highlights: ["Medical appointments", "Community travel"],
  },
  {
    title: "Life Skills Development",
    short: "Confidence In Everyday Skills",
    description:
      "Support to build confidence and independence in everyday life.",
    text: "Support to build confidence and independence in everyday life through practical routines and skill development.",
    image: "/life-skills-photo.png",
    imagePosition: "50% center",
    surface: "#87d6a8",
    placeholderHint: "Life skills and growing independence",
    color: "#2153a5",
    highlights: ["Routine building", "Practical skills"],
  },
  {
    title: "Mentoring & Routine Support",
    short: "Consistent 1:1 Guidance",
    description:
      "Consistent one-to-one support focused on structure and confidence.",
    text: "Consistent one-to-one support focused on structure, confidence, and routine in everyday life.",
    image: "/mentoring-routine-photo.png",
    imagePosition: "50% center",
    surface: "#ee7f83",
    placeholderHint: "Calm mentoring and routine support",
    color: "#8b5cf6",
    highlights: ["Routine support", "One-on-one mentoring"],
  },
];

const SERVICES_PAGE_GROUPS = [
  {
    title: "Everyday Support",
    items: [
      {
        title: "Personal Care",
        serviceId: "personal-care",
        description:
          "Respectful personal care support focused on dignity and independence.",
        points: ["Hygiene support", "Daily routines"],
      },
      {
        title: "Daily Living Assistance",
        serviceId: "daily-living-assistance",
        description:
          "Support with everyday household tasks and routines.",
        points: ["Cleaning", "Meal preparation"],
      },
      {
        title: "Community Participation",
        serviceId: "community-participation",
        description:
          "Helping participants stay active and engaged in the community.",
        points: ["Social activities", "Appointments"],
      },
      {
        title: "Transport Support",
        serviceId: "transport-support",
        description:
          "Safe and reliable transport for daily activities.",
        points: ["Appointments", "Community access"],
      },
    ],
  },
  {
    title: "Building Independence",
    items: [
      {
        title: "Life Skills Development",
        serviceId: "life-skills-development",
        description:
          "Building confidence through practical skills and routines.",
        points: ["Routine development", "Independent skills"],
      },
      {
        title: "Mentoring & Routine Support",
        serviceId: "mentoring-routine-support",
        description:
          "Ongoing support for structure and personal growth.",
        points: ["Routine support", "One-on-one mentoring"],
      },
    ],
  },
  {
    title: "Flexible Support Options",
    items: [
      {
        title: "1:1 Support",
        serviceId: "one-to-one-support",
        description:
          "Personalised support tailored to individual needs.",
        points: ["Individual care", "Flexible support"],
      },
      {
        title: "2:1 Support",
        serviceId: "two-to-one-support",
        description:
          "Additional support for higher needs.",
        points: ["Complex support", "Increased assistance"],
      },
    ],
  },
];

const SERVICE_LANDING_PAGES = {
  "personal-care": {
    title: "Personal Care",
    eyebrow: "Respectful Daily Support",
    image: "/personal-care-photo.png",
    imagePosition: "62% center",
    color: "#1098d5",
    intro:
      "Personal care should feel respectful, calm, and centred around the participant. Ostara Living supports daily routines in a way that protects dignity, encourages independence, and keeps the participant in control wherever possible.",
    includes: [
      "Showering, hygiene, dressing, and grooming support",
      "Morning, evening, and daily routine assistance",
      "Support that respects privacy, comfort, culture, and personal preference",
    ],
    approach:
      "We take time to understand how each participant prefers to be supported, then build a reliable routine around their needs.",
    outcome:
      "The goal is to help participants feel comfortable, respected, and ready for their day.",
  },
  "daily-living-assistance": {
    title: "Daily Living Assistance",
    eyebrow: "Practical Help At Home",
    image: "/daily-living-photo.png",
    imagePosition: "50% center",
    color: "#22c55e",
    intro:
      "Daily living support helps participants manage everyday tasks at home with more confidence and less pressure. Support is flexible and shaped around what matters most in the participant’s daily routine.",
    includes: [
      "Cleaning, tidying, laundry, and household routines",
      "Meal preparation and support with simple daily tasks",
      "Building safer, calmer, and more manageable home routines",
    ],
    approach:
      "We work alongside participants, so support feels practical, respectful, and useful.",
    outcome:
      "The goal is to help home life feel more organised, comfortable, and manageable.",
  },
  "community-participation": {
    title: "Community Participation",
    eyebrow: "Connection And Confidence",
    image: "/community-participation-photo.png",
    imagePosition: "50% center",
    color: "#12c7c1",
    intro:
      "Community participation is about helping participants stay connected to people, places, activities, and opportunities that matter to them. Support can be social, practical, confidence-building, or routine-based.",
    includes: [
      "Social outings, community activities, and local events",
      "Support attending appointments, programs, or activities",
      "Encouragement to build confidence in community settings",
    ],
    approach:
      "We support participants at their pace, with attention to comfort, communication, and choice.",
    outcome:
      "The goal is to help participants feel included, confident, and connected.",
  },
  "transport-support": {
    title: "Transport Support",
    eyebrow: "Safe Everyday Access",
    image: "/transport-support-photo.png",
    imagePosition: "50% center",
    color: "#f59e0b",
    intro:
      "Transport support helps participants get where they need to go safely and reliably. This can include appointments, community access, shopping, social activities, or everyday errands.",
    includes: [
      "Transport to appointments and community activities",
      "Support getting in and out safely where needed",
      "Reliable planning around time, location, and participant needs",
    ],
    approach:
      "We keep transport support calm, planned, and centred around the participant’s routine.",
    outcome:
      "The goal is to make everyday access easier, safer, and less stressful.",
  },
  "life-skills-development": {
    title: "Life Skills Development",
    eyebrow: "Building Independence",
    image: "/life-skills-photo.png",
    imagePosition: "50% center",
    color: "#2153a5",
    intro:
      "Life skills support helps participants build confidence with practical everyday tasks. Support can focus on routines, communication, planning, home skills, community confidence, and independence.",
    includes: [
      "Developing routines and everyday problem-solving skills",
      "Support with planning, organising, and practical tasks",
      "Encouragement to build confidence step by step",
    ],
    approach:
      "We focus on small, meaningful progress that feels achievable for the participant.",
    outcome:
      "The goal is to help participants feel more capable, confident, and independent.",
  },
  "mentoring-routine-support": {
    title: "Mentoring & Routine Support",
    eyebrow: "Structure And Confidence",
    image: "/mentoring-routine-photo.png",
    imagePosition: "50% center",
    color: "#8b5cf6",
    intro:
      "Mentoring and routine support gives participants consistent one-to-one guidance. It can help with motivation, structure, confidence, planning, and building positive daily habits.",
    includes: [
      "One-to-one mentoring and encouragement",
      "Routine building and weekly structure",
      "Support with goals, confidence, and personal growth",
    ],
    approach:
      "We build trust through consistency, respectful communication, and participant-led support.",
    outcome:
      "The goal is to help participants feel supported, steady, and more confident in everyday life.",
  },
  "one-to-one-support": {
    title: "1:1 Support",
    eyebrow: "Personalised Support",
    image: "/personal-care-photo.png",
    imagePosition: "62% center",
    color: "#1098d5",
    intro:
      "1:1 support gives participants focused assistance from one support worker. It is flexible and can be shaped around personal care, daily living, community access, routines, or confidence-building.",
    includes: [
      "Individual support based on participant needs",
      "Flexible assistance at home or in the community",
      "Support that adapts to goals, preferences, and routine",
    ],
    approach:
      "We listen first, then shape support around what helps the participant feel safe, respected, and understood.",
    outcome:
      "The goal is to provide reliable support that feels personal, calm, and consistent.",
  },
  "two-to-one-support": {
    title: "2:1 Support",
    eyebrow: "Additional Assistance",
    image: "/daily-living-photo.png",
    imagePosition: "50% center",
    color: "#22c55e",
    intro:
      "2:1 support may suit participants who need a higher level of assistance, extra supervision, or more support with complex routines. The focus remains on safety, dignity, and participant choice.",
    includes: [
      "Additional support for higher assistance needs",
      "Support with complex routines or community access",
      "A calm and planned approach with clear communication",
    ],
    approach:
      "We work carefully with participants, families, and relevant supports to understand what level of assistance is appropriate.",
    outcome:
      "The goal is to help participants feel safer, supported, and included while receiving the right level of help.",
  },
};

const NAV_ITEMS = [
  { label: "Home", page: "home" },
  { label: "Services", page: "services" },
  { label: "Contact", page: "contact" },
];

const HERO_CARD_LAYOUT = {
  desktop: [
    { left: "0%", top: 102, rotate: -8, scale: 0.82, zIndex: 1, opacity: 0.38 },
    { left: "10%", top: 70, rotate: -5, scale: 0.88, zIndex: 2, opacity: 0.58 },
    { left: "21%", top: 38, rotate: -2.5, scale: 0.95, zIndex: 3, opacity: 0.8 },
    { left: "37%", top: 8, rotate: 0, scale: 1.06, zIndex: 6, opacity: 1 },
    { left: "56%", top: 42, rotate: 2.8, scale: 0.94, zIndex: 4, opacity: 0.78 },
    { left: "69%", top: 76, rotate: 5.5, scale: 0.86, zIndex: 2, opacity: 0.56 },
  ],
  expandedDesktop: [
    { left: "0%", top: 88, rotate: -4.8, scale: 0.88, zIndex: 1, opacity: 0.54 },
    { left: "11%", top: 56, rotate: -3.2, scale: 0.92, zIndex: 2, opacity: 0.72 },
    { left: "24%", top: 24, rotate: -1.6, scale: 0.97, zIndex: 3, opacity: 0.9 },
    { left: "40%", top: 0, rotate: 0, scale: 1.08, zIndex: 6, opacity: 1 },
    { left: "58%", top: 28, rotate: 1.6, scale: 0.97, zIndex: 4, opacity: 0.9 },
    { left: "71%", top: 58, rotate: 3.5, scale: 0.9, zIndex: 2, opacity: 0.7 },
  ],
  mobile: [
    { left: "-2%", top: 88, rotate: -7, scale: 0.74, zIndex: 1, opacity: 0.24 },
    { left: "6%", top: 58, rotate: -5, scale: 0.82, zIndex: 2, opacity: 0.48 },
    { left: "18%", top: 28, rotate: -2.5, scale: 0.91, zIndex: 3, opacity: 0.74 },
    { left: "34%", top: 2, rotate: 0, scale: 1.02, zIndex: 6, opacity: 1 },
    { left: "53%", top: 30, rotate: 2.5, scale: 0.9, zIndex: 4, opacity: 0.68 },
    { left: "66%", top: 62, rotate: 5.5, scale: 0.8, zIndex: 2, opacity: 0.42 },
  ],
  expandedMobile: [
    { left: "-1%", top: 76, rotate: -5.5, scale: 0.8, zIndex: 1, opacity: 0.34 },
    { left: "8%", top: 48, rotate: -3.5, scale: 0.86, zIndex: 2, opacity: 0.56 },
    { left: "21%", top: 22, rotate: -1.8, scale: 0.93, zIndex: 3, opacity: 0.8 },
    { left: "37%", top: 0, rotate: 0, scale: 1.04, zIndex: 6, opacity: 1 },
    { left: "55%", top: 24, rotate: 1.8, scale: 0.92, zIndex: 4, opacity: 0.78 },
    { left: "68%", top: 50, rotate: 4, scale: 0.84, zIndex: 2, opacity: 0.54 },
  ],
};

const inputFields = [
  { name: "fullName", label: "Full Name *", placeholder: "Full Name", required: true },
  { name: "suburb", label: "Suburb", placeholder: "Suburb" },
  { name: "postcode", label: "Postcode", placeholder: "Postcode" },
  { name: "email", label: "Email *", placeholder: "Email", type: "email", required: true },
  {
    name: "phone",
    label: "Mobile Number *",
    placeholder: "Mobile Number",
    type: "tel",
    required: true,
  },
];

function createPlaceholderImage(title, hint, color) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#eef9ff" />
          <stop offset="45%" stop-color="#d8f5f8" />
          <stop offset="100%" stop-color="${color}" />
        </linearGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#bg)" />
      <circle cx="1020" cy="170" r="140" fill="rgba(255,255,255,0.38)" />
      <circle cx="170" cy="740" r="180" fill="rgba(255,255,255,0.28)" />
      <rect x="100" y="120" width="1000" height="660" rx="42" fill="rgba(255,255,255,0.58)" />
      <rect x="160" y="180" width="300" height="24" rx="12" fill="rgba(33,83,165,0.18)" />
      <rect x="160" y="230" width="410" height="18" rx="9" fill="rgba(33,83,165,0.14)" />
      <rect x="160" y="266" width="360" height="18" rx="9" fill="rgba(33,83,165,0.11)" />
      <rect x="160" y="360" width="880" height="260" rx="30" fill="rgba(255,255,255,0.8)" />
      <text x="160" y="520" fill="#1f3a5f" font-size="58" font-family="Arial, Helvetica, sans-serif" font-weight="700">${title}</text>
      <text x="160" y="588" fill="#4f6b83" font-size="30" font-family="Arial, Helvetica, sans-serif">${hint}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function SmartImage({ src, fallbackSrc, alt, className, style }) {
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);

  useEffect(() => {
    setCurrentSrc(src || fallbackSrc);
  }, [src, fallbackSrc]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      style={style}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}

function TransparentImage({
  src,
  alt,
  className,
  tolerance = 245,
  edgeTolerance = 18,
}) {
  const [processedSrc, setProcessedSrc] = useState(src);

  useEffect(() => {
    let active = true;
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = src;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d");

      if (!context) {
        return;
      }

      context.drawImage(image, 0, 0);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const { data } = imageData;

      for (let index = 0; index < data.length; index += 4) {
        const red = data[index];
        const green = data[index + 1];
        const blue = data[index + 2];
        const alpha = data[index + 3];
        const maxChannel = Math.max(red, green, blue);
        const minChannel = Math.min(red, green, blue);

        if (
          alpha > 0 &&
          maxChannel >= tolerance &&
          minChannel >= tolerance - edgeTolerance
        ) {
          data[index + 3] = 0;
        }
      }

      context.putImageData(imageData, 0, 0);

      if (active) {
        setProcessedSrc(canvas.toDataURL("image/png"));
      }
    };

    image.onerror = () => {
      if (active) {
        setProcessedSrc(src);
      }
    };

    return () => {
      active = false;
    };
  }, [src, tolerance, edgeTolerance]);

  return <img src={processedSrc} alt={alt} className={className} />;
}

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? "is-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function LogoBlock({ onClick }) {
  return (
    <button type="button" className="logo-block" onClick={onClick}>
      <TransparentImage
        src={BRAND_ASSETS.swirlLogo}
        alt="Ostara Living logo"
        className="logo-mark"
      />
      <div>
        <div className="logo-title">Ostara Living</div>
        <div className="logo-subtitle">Self-managed and Plan-managed support</div>
      </div>
    </button>
  );
}

function HeroWelcomePanel() {
  return (
    <div className="hero-welcome-card">
      <div className="hero-welcome-image-wrap">
        <img
          src="/hero-support-team-photo.png"
          alt="Support worker and participant in a welcoming home setting"
          className="hero-welcome-image"
        />
        <div className="hero-welcome-badge">
          Self-managed and plan-managed support
        </div>
      </div>

      <div className="hero-welcome-body">
        <span className="section-eyebrow">Trusted Disability Support</span>
        <h2 className="hero-welcome-title">Reliable support for daily life, routine, and independence.</h2>
        <div className="hero-welcome-stat-grid">
          {HERO_WELCOME_STATS.map((item) => (
            <div key={item.label} className="hero-welcome-stat">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <div className="feature-list is-compact">
          {HERO_WELCOME_POINTS.map((point) => (
            <div key={point} className="feature-item">
              <span className="feature-dot" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Header({ page, setPage, menuOpen, setMenuOpen }) {
  const handleNavigate = (nextPage) => {
    setPage(nextPage);
    setMenuOpen(false);
  };

  const isActiveNav = (itemPage) => {
    if (itemPage === "services") {
      return page === "services" || page.startsWith("service:");
    }

    return page === itemPage;
  };

  return (
    <header className="site-header">
      <LogoBlock onClick={() => handleNavigate("home")} />
      <button
        type="button"
        className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
        onClick={() => setMenuOpen((previous) => !previous)}
        aria-expanded={menuOpen}
        aria-label="Toggle navigation"
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.page}
            type="button"
            className={`nav-button ${isActiveNav(item.page) ? "is-active" : ""}`}
            onClick={() => handleNavigate(item.page)}
          >
            {item.label}
          </button>
        ))}
        <button
          type="button"
          className="button button-primary"
          onClick={() => handleNavigate("contact")}
        >
          Request Support
        </button>
      </nav>
    </header>
  );
}

function HeroCardStack({
  items,
  isCompact,
  isHovered,
  setIsHovered,
  setActiveCard,
}) {
  const positions = isCompact
    ? isHovered
      ? HERO_CARD_LAYOUT.expandedMobile
      : HERO_CARD_LAYOUT.mobile
    : isHovered
      ? HERO_CARD_LAYOUT.expandedDesktop
      : HERO_CARD_LAYOUT.desktop;

  return (
    <div
      className={`hero-card-stage ${isCompact ? "is-compact" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {items.map((item, index) => {
        const position = positions[index];
        const isPrimary = index === 3;
        const cardWidth = isCompact
          ? isPrimary
            ? "34%"
            : "27%"
          : isPrimary
            ? "14.6rem"
            : "11.2rem";

        return (
          <button
            key={`${item.data.title}-${item.actualIndex}`}
            type="button"
            className={`hero-card ${isPrimary ? "is-primary" : ""}`}
            onClick={() => setActiveCard(item.actualIndex)}
            style={{
              "--service-accent": item.data.color,
              "--service-surface": item.data.surface || "#eef6fb",
              left: position.left,
              top: `${position.top}px`,
              width: cardWidth,
              transform: `rotate(${position.rotate}deg) scale(${position.scale})`,
              zIndex: position.zIndex,
              opacity: position.opacity,
              borderTopColor: item.data.surface || item.data.color,
            }}
          >
            <SmartImage
              src={item.data.image}
              fallbackSrc={createPlaceholderImage(
                item.data.title,
                item.data.placeholderHint,
                item.data.color,
              )}
              alt={item.data.title}
              className="hero-card-image"
              style={{ objectPosition: item.data.imagePosition || "center center" }}
            />
            <div className="hero-card-copy">
              <span className="hero-card-kicker">{item.data.short}</span>
              <span className="hero-card-title">{item.data.title}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function FeaturedServicePanel({ service, setPage, transitioning }) {
  const fallbackSrc = createPlaceholderImage(
    service.title,
    service.placeholderHint,
    service.color,
  );

  return (
    <aside
      className="featured-panel"
      style={{
        "--service-accent": service.color,
        "--service-surface": service.surface || "#eef6fb",
      }}
    >
      <div className={`featured-image-shell ${transitioning ? "is-transitioning" : ""}`}>
        <SmartImage
          src={service.image}
          fallbackSrc={fallbackSrc}
          alt={service.title}
          className="featured-image"
          style={{ objectPosition: service.imagePosition || "center center" }}
        />
        <div className="featured-image-overlay">
          <span className="featured-pill">Featured Support</span>
          <h2 className="featured-title">{service.title}</h2>
        </div>
      </div>

      <div className={`featured-body ${transitioning ? "is-transitioning" : ""}`}>
        <span className="service-tag">{service.short}</span>
        <p className="featured-description">{service.description}</p>
        <div className="feature-list">
          {service.highlights.map((item) => (
            <div key={item} className="feature-item">
              <span className="feature-dot" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        <div className="button-row">
          <button
            type="button"
            className="button button-primary"
            onClick={() => setPage("contact")}
          >
            Request This Support
          </button>
          <button
            type="button"
            className="button button-secondary"
            onClick={() => setPage("services")}
          >
            View All Services
          </button>
        </div>
      </div>
    </aside>
  );
}

function HandPointerIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="pointer-icon"
      aria-hidden="true"
    >
      <path
        d="M17 10c0-1.7 1.3-3 3-3s3 1.3 3 3v12h1V7c0-1.7 1.3-3 3-3s3 1.3 3 3v15h1v-9c0-1.7 1.3-3 3-3s3 1.3 3 3v14.2c0 6.5-5.3 11.8-11.8 11.8h-4.5c-3.2 0-6.2-1.4-8.2-3.9l-6.4-8c-1.1-1.4-.9-3.4.4-4.6 1.3-1.1 3.2-1 4.4.2l3.8 3.7V10Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PathwayCard({ item, index, setPage }) {
  return (
    <article className="pathway-card">
      <span className="pathway-index">0{index + 1}</span>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
      <button
        type="button"
        className="pathway-link"
        onClick={() => setPage(item.page)}
      >
        {item.action}
      </button>
    </article>
  );
}

function StorySlider({ activeIndex, setActiveIndex }) {
  const activeStory = TESTIMONIAL_STORIES[activeIndex];

  return (
    <section className="story-slider">
      <div className="story-slider-copy">
        <span className="section-eyebrow">Support And Trust</span>
        <h2 className="section-heading">Clear Support Information for Adelaide</h2>
        <p className="section-copy">
          We make disability support Adelaide participants, families, and coordinators can understand quickly, with clear next steps and practical information about NDIS support Adelaide services.
        </p>
      </div>

      <div className="story-slider-panel">
        <p className="story-quote">“{activeStory.quote}”</p>
        <div className="story-meta">
          <strong>{activeStory.author}</strong>
          <span>{activeStory.role}</span>
        </div>
        <div className="story-controls">
          {TESTIMONIAL_STORIES.map((item, index) => (
            <button
              key={item.author}
              type="button"
              className={`story-dot ${index === activeIndex ? "is-active" : ""}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show story ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesPageCard({ item, setPage }) {
  return (
    <button
      type="button"
      className="services-page-card"
      onClick={() => setPage(`service:${item.serviceId}`)}
      style={{
        width: "100%",
        textAlign: "left",
        cursor: "pointer",
        border: "1px solid rgba(31, 58, 95, 0.08)",
        transition: "transform 180ms ease, box-shadow 180ms ease",
      }}
    >
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <div className="services-page-points">
        {item.points.map((point) => (
          <div key={point} className="feature-item">
            <span className="feature-dot" />
            <span>{point}</span>
          </div>
        ))}
      </div>
      <span
        style={{
          display: "inline-flex",
          marginTop: "1rem",
          color: "#1098d5",
          fontWeight: 800,
        }}
      >
        View service
      </span>
    </button>
  );
}

function ServiceLandingPage({ service, setPage, setService, setEnquiryForm }) {
  const fallbackSrc = createPlaceholderImage(
    service.title,
    service.eyebrow,
    service.color,
  );

  const handleRequestSupport = () => {
    setService(service.title);
    setEnquiryForm((previous) => ({
      ...previous,
      support: service.title,
    }));
    setPage("contact");
  };

  return (
    <section
      className="content-section"
      style={{
        paddingTop: "clamp(2rem, 5vw, 4rem)",
        paddingBottom: "clamp(2rem, 5vw, 4rem)",
      }}
    >
      <div
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "clamp(1.5rem, 4vw, 3rem)",
          alignItems: "center",
        }}
      >
        <div>
          <button
            type="button"
            onClick={() => setPage("services")}
            style={{
              border: 0,
              borderRadius: "999px",
              padding: "0.72rem 1rem",
              marginBottom: "1.2rem",
              background: "rgba(16, 152, 213, 0.1)",
              color: "#1f3a5f",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Back to services
          </button>

          <span className="section-eyebrow">{service.eyebrow}</span>
          <h1 className="page-heading">{service.title}</h1>
          <p
            className="section-copy"
            style={{
              maxWidth: "680px",
              fontSize: "clamp(1rem, 1.5vw, 1.16rem)",
              lineHeight: 1.75,
            }}
          >
            {service.intro}
          </p>

          <div className="button-row" style={{ marginTop: "1.4rem" }}>
            <button
              type="button"
              className="button button-primary"
              onClick={handleRequestSupport}
            >
              Request This Support
            </button>
            <button
              type="button"
              className="button button-secondary"
              onClick={() => setPage("services")}
            >
              View All Services
            </button>
          </div>
        </div>

        <div
          style={{
            minHeight: "360px",
            borderRadius: "28px",
            overflow: "hidden",
            background: "rgba(255, 255, 255, 0.72)",
            boxShadow: "0 28px 70px rgba(31, 58, 95, 0.16)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
          }}
        >
          <SmartImage
            src={service.image}
            fallbackSrc={fallbackSrc}
            alt={service.title}
            className="featured-image"
            style={{
              width: "100%",
              height: "100%",
              minHeight: "360px",
              objectFit: "cover",
              objectPosition: service.imagePosition || "center center",
              display: "block",
            }}
          />
        </div>
      </div>

      <div
        style={{
          maxWidth: "1180px",
          margin: "clamp(2rem, 5vw, 4rem) auto 0",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem",
        }}
      >
        <article className="services-page-card">
          <h3>What support can include</h3>
          <div className="feature-list">
            {service.includes.map((item) => (
              <div key={item} className="feature-item">
                <span className="feature-dot" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="services-page-card">
          <h3>How we approach it</h3>
          <p>{service.approach}</p>
        </article>

        <article className="services-page-card">
          <h3>What participants can expect</h3>
          <p>{service.outcome}</p>
        </article>
      </div>

      <div className="services-page-cta">
        <h2 className="services-page-cta-title">
          Want support that feels right for you?
        </h2>
        <p className="section-copy">
          Tell us what you need, what matters to you, and what kind of routine you want support with.
        </p>
        <button
          type="button"
          className="button button-primary"
          onClick={handleRequestSupport}
        >
          Request Support
        </button>
      </div>
    </section>
  );
}

function HomePage({
  role,
  service,
  setRole,
  setService,
  activeCard,
  setActiveCard,
  isCompact,
  setPage,
  setEnquiryForm,
}) {
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [displayedService, setDisplayedService] = useState(SUPPORT_SERVICES[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeStory, setActiveStory] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const orderedCards = useMemo(() => {
    const offsets = [-3, -2, -1, 0, 1, 2];

    return offsets.map((offset) => {
      const actualIndex =
        (activeCard + offset + SUPPORT_SERVICES.length) % SUPPORT_SERVICES.length;

      return {
        actualIndex,
        data: SUPPORT_SERVICES[actualIndex],
      };
    });
  }, [activeCard]);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = window.setTimeout(() => {
      setDisplayedService(SUPPORT_SERVICES[activeCard]);
      setIsTransitioning(false);
    }, 160);

    return () => window.clearTimeout(timer);
  }, [activeCard]);

  const handleHeroPointerMove = (event) => {
    if (isCompact) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 18;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 18;
    setParallax({ x, y });
  };

  const handleHeroPointerLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  const handleTakeMeThere = () => {
    setEnquiryForm((previous) => ({
      ...previous,
      role,
      support: service,
    }));
    setPage("contact");
  };

  return (
    <>
      <section
        className="hero-section"
        onMouseMove={handleHeroPointerMove}
        onMouseLeave={handleHeroPointerLeave}
        style={{
          "--pointer-x": `${parallax.x}px`,
          "--pointer-y": `${parallax.y}px`,
        }}
      >
        <div className="hero-copy-shell">
          <div className="hero-intro-grid">
            <Reveal className="hero-copy-column" delay={40}>
              <h1>{SITE_CONTENT.hero.title}</h1>
              <p className="hero-intro">{SITE_CONTENT.hero.description}</p>

              <div className="hero-filter-panel">
                <div className="field-group">
                  <label htmlFor="role-select">{SITE_CONTENT.hero.roleLabel}</label>
                  <div className="select-wrap">
                    <select
                      id="role-select"
                      value={role}
                      onChange={(event) => setRole(event.target.value)}
                    >
                      {ROLE_OPTIONS.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                    <span className="select-arrow">▼</span>
                  </div>
                </div>

                <div className="field-group">
                  <label htmlFor="service-select">{SITE_CONTENT.hero.serviceLabel}</label>
                  <div className="select-wrap">
                    <select
                      id="service-select"
                      value={service}
                      onChange={(event) => setService(event.target.value)}
                    >
                      {INTEREST_OPTIONS.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                    <span className="select-arrow">▼</span>
                  </div>
                  <p className="field-helper-text">{SITE_CONTENT.hero.serviceHelperText}</p>
                </div>

                <div className="button-row">
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={handleTakeMeThere}
                  >
                    Request Support
                  </button>
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() => {
                      setEnquiryForm((previous) => ({
                        ...previous,
                        role,
                        support: service,
                      }));
                      setPage("services");
                    }}
                  >
                    Explore Services
                  </button>
                </div>
              </div>
            </Reveal>

            <Reveal className="hero-side-panel" delay={140}>
              <HeroWelcomePanel />
            </Reveal>
          </div>
        </div>

        <div className="hero-showcase">
          <Reveal className="hero-stack-column" delay={120}>
            <HeroCardStack
              items={orderedCards}
              isCompact={isCompact}
              isHovered={isHeroHovered}
              setIsHovered={setIsHeroHovered}
              setActiveCard={setActiveCard}
            />
            <div className="hero-controls">
              <button
                type="button"
                className="control-button"
                onClick={() =>
                  setActiveCard(
                    (previous) =>
                      (previous - 1 + SUPPORT_SERVICES.length) % SUPPORT_SERVICES.length,
                  )
                }
                aria-label="Show previous service"
              >
                ←
              </button>
              <button
                type="button"
                className="control-button"
                onClick={() =>
                  setActiveCard((previous) => (previous + 1) % SUPPORT_SERVICES.length)
                }
                aria-label="Show next service"
              >
                →
              </button>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <FeaturedServicePanel
              service={displayedService}
              setPage={setPage}
              transitioning={isTransitioning}
            />
          </Reveal>
        </div>

        <div className="trust-strip">
          {TRUST_METRICS.map((item, index) => (
            <Reveal key={item.label} delay={index * 80}>
              <div className="trust-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="content-section">
        <section className="why-choose-section">
          <div className="why-choose-copy">
            <span className="section-eyebrow">{WHY_CHOOSE_US.eyebrow}</span>
            <h2 className="section-heading">{WHY_CHOOSE_US.title}</h2>
            <p className="section-copy">{WHY_CHOOSE_US.description}</p>
          </div>

          <div className="why-choose-grid">
            {WHY_CHOOSE_US.cards.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <article className="why-choose-card">
                  <span className="why-choose-number">{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal delay={60}>
          <div className="explore-services-cta">
            <div className="explore-services-copy">
              <span className="section-eyebrow">{SITE_CONTENT.homeServices.eyebrow}</span>
              <h2 className="section-heading">{SITE_CONTENT.homeServices.title}</h2>
              <p className="section-copy">{SITE_CONTENT.homeServices.description}</p>
            </div>

            <div className="explore-services-action">
              <div className="pointer-callout" aria-hidden="true">
                <HandPointerIcon />
              </div>
              <button
                type="button"
                className="button button-primary explore-services-button"
                onClick={() => setPage("contact")}
              >
                {SITE_CONTENT.homeServices.buttonLabel}
              </button>
            </div>
          </div>
        </Reveal>

        <div className="content-section-header">
          <span className="section-eyebrow">Who We Work With</span>
          <h2 className="section-heading">Who We Work With</h2>
          <p className="section-copy">
            We support self-managed and plan-managed NDIS participants across Adelaide, along with families, carers, and support coordinators.
          </p>
        </div>

        <div className="pathway-grid">
          {AUDIENCE_PATHWAYS.map((item, index) => (
            <Reveal key={item.title} delay={index * 70}>
              <PathwayCard item={item} index={index} setPage={setPage} />
            </Reveal>
          ))}
        </div>

        <StorySlider activeIndex={activeStory} setActiveIndex={setActiveStory} />
      </section>
    </>
  );
}

function ServicesPage({ setPage }) {
  return (
    <section className="content-section services-page">
      <div className="services-page-intro">
        <span className="section-eyebrow">{SITE_CONTENT.servicesPage.eyebrow}</span>
        <h1 className="page-heading">{SITE_CONTENT.servicesPage.title}</h1>
        <p className="section-copy">{SITE_CONTENT.servicesPage.description}</p>
      </div>

      <div className="services-group-stack">
        {SERVICES_PAGE_GROUPS.map((group, groupIndex) => (
          <section key={group.title} className="services-group-section">
            <div className="services-group-header">
              <h2 className="services-group-title">{group.title}</h2>
            </div>

            <div className="services-page-grid">
              {group.items.map((item, itemIndex) => (
                <Reveal
                  key={item.title}
                  delay={groupIndex * 60 + itemIndex * 50}
                >
                  <ServicesPageCard item={item} setPage={setPage} />
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="services-page-cta">
        <h2 className="services-page-cta-title">{SITE_CONTENT.servicesPage.ctaTitle}</h2>
        <p className="section-copy">{SITE_CONTENT.servicesPage.ctaDescription}</p>
        <button
          type="button"
          className="button button-primary"
          onClick={() => setPage("contact")}
        >
          {SITE_CONTENT.servicesPage.ctaButton}
        </button>
      </div>
    </section>
  );
}

function ContactPage({
  enquiryForm,
  setEnquiryForm,
  role,
  setRole,
  service,
  setService,
}) {
  const handleFieldChange = (field, value) => {
    setEnquiryForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleRoleChange = (value) => {
    setRole(value);
    handleFieldChange("role", value);
  };

  const handleSupportChange = (value) => {
    setService(value);
    handleFieldChange("support", value);
  };

  return (
    <section className="contact-section">
      <div className="contact-layout">
        <Reveal delay={40}>
          <div className="contact-info-card">
            <div className="contact-info-header">
              <LogoBlock />
            </div>

            <div className="contact-glass-box">
              <span className="section-eyebrow">{SITE_CONTENT.contact.eyebrow}</span>
              <h2 className="contact-title">{SITE_CONTENT.contact.title}</h2>
              <p className="contact-copy">{SITE_CONTENT.contact.description}</p>
              <div className="feature-list is-compact">
                {SITE_CONTENT.contact.promises.map((item) => (
                  <div key={item} className="feature-item">
                    <span className="feature-dot" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="contact-details">
                <h3>{SITE_CONTENT.contact.infoTitle}</h3>
                {CONTACT_DETAILS.map((item) => (
                  <div key={item.label} className="contact-detail-row">
                    <span>{item.label}</span>
                    <strong>
                      {item.label === "Email" ? (
                        <a href={`mailto:${item.value}`}>{item.value}</a>
                      ) : item.label === "Phone" ? (
                        <a href={`tel:${item.value}`}>{item.value}</a>
                      ) : (
                        item.value
                      )}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="contact-form-card">
            <h2 className="contact-form-title">{SITE_CONTENT.contact.formTitle}</h2>
            <p className="contact-form-intro">{SITE_CONTENT.contact.formIntro}</p>

            <form
              action="https://formspree.io/f/xgorkrwv"
              method="POST"
              className="contact-form-shell"
            >
              <input
                type="hidden"
                name="_subject"
                value="New enquiry from Ostara Living website"
              />

              <div className="selection-summary">
                <div className="selection-control">
                  <span>I'm A *</span>
                  <div className="select-wrap form-select-wrap">
                    <select
                      className="form-select"
                      name="user_type"
                      value={role}
                      onChange={(event) => handleRoleChange(event.target.value)}
                      required
                    >
                      {ROLE_OPTIONS.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                    <span className="select-arrow">▼</span>
                  </div>
                </div>
                <div className="selection-control">
                  <span>What Kind Of Support *</span>
                  <div className="select-wrap form-select-wrap">
                    <select
                      className="form-select"
                      name="service"
                      value={service}
                      onChange={(event) => handleSupportChange(event.target.value)}
                      required
                    >
                      {INTEREST_OPTIONS.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                    <span className="select-arrow">▼</span>
                  </div>
                </div>
              </div>

              <div className="contact-form-grid">
                {inputFields.map((field) => (
                  <label
                    key={field.name}
                    className={field.wide ? "form-field is-wide" : "form-field"}
                  >
                    <span className="form-label">{field.label}</span>
                    <input
                      className="form-input"
                      name={field.name}
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      value={enquiryForm[field.name]}
                      required={field.required}
                      onChange={(event) => handleFieldChange(field.name, event.target.value)}
                    />
                  </label>
                ))}
                <label className="form-field is-wide">
                  <span className="form-label">Message *</span>
                  <textarea
                    className="form-input form-textarea"
                    name="message"
                    placeholder="Tell us what support is needed, preferred schedule, location, and any important notes."
                    value={enquiryForm.notes}
                    required
                    onChange={(event) => handleFieldChange("notes", event.target.value)}
                  />
                </label>
              </div>

              <button type="submit" className="button button-primary submit-button">
                Send Enquiry
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AboriginalFlagMark() {
  return (
    <div className="aboriginal-flag" aria-hidden="true">
      <span className="aboriginal-flag-top" />
      <span className="aboriginal-flag-bottom" />
      <span className="aboriginal-flag-sun" />
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [role, setRole] = useState(ROLE_OPTIONS[0]);
  const [service, setService] = useState(INTEREST_OPTIONS[0]);
  const [activeCard, setActiveCard] = useState(0);
  const [isCompact, setIsCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    fullName: "",
    suburb: "",
    postcode: "",
    email: "",
    phone: "",
    support: INTEREST_OPTIONS[0],
    notes: "",
    role: ROLE_OPTIONS[0],
  });

  const navigatePage = (nextPage) => {
    setPage(nextPage);
    setMenuOpen(false);

    if (window.history.state?.page !== nextPage) {
      window.history.pushState({ page: nextPage }, "", "/");
    }
  };

  useEffect(() => {
    window.history.replaceState({ page: "home" }, "", "/");

    const handleBackButton = (event) => {
      const previousPage = event.state?.page || "home";
      setPage(previousPage);
      setMenuOpen(false);
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 960px)");
    const updateLayout = (event) => {
      setIsCompact(event.matches);
      if (!event.matches) {
        setMenuOpen(false);
      }
    };

    setIsCompact(mediaQuery.matches);
    mediaQuery.addEventListener("change", updateLayout);

    return () => {
      mediaQuery.removeEventListener("change", updateLayout);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [page]);

  const activeServiceId = page.startsWith("service:")
    ? page.replace("service:", "")
    : null;
  const activeServicePage = activeServiceId
    ? SERVICE_LANDING_PAGES[activeServiceId]
    : null;

  return (
    <div className="app-shell">
      <Header
        page={page}
        setPage={navigatePage}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <main className="page-shell">
        {page === "home" && (
          <HomePage
            role={role}
            service={service}
            setRole={setRole}
            setService={setService}
            activeCard={activeCard}
            setActiveCard={setActiveCard}
            isCompact={isCompact}
            setPage={navigatePage}
            setEnquiryForm={setEnquiryForm}
          />
        )}

        {page === "services" && <ServicesPage setPage={navigatePage} />}

        {activeServicePage && (
          <ServiceLandingPage
            service={activeServicePage}
            setPage={navigatePage}
            setService={setService}
            setEnquiryForm={setEnquiryForm}
          />
        )}

        {page === "contact" && (
          <ContactPage
            enquiryForm={enquiryForm}
            setEnquiryForm={setEnquiryForm}
            role={role}
            setRole={setRole}
            service={service}
            setService={setService}
          />
        )}
      </main>

            <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-brand-lockup">
              <TransparentImage
                src={BRAND_ASSETS.swirlLogo}
                alt="Ostara Living logo"
                className="footer-logo-mark"
              />
              <div className="footer-brand-name">{SITE_CONTENT.footer.brandTitle}</div>
            </div>
            <p>{SITE_CONTENT.footer.brandDescription}</p>
            <p className="footer-support-line">{SITE_CONTENT.footer.brandSupportLine}</p>
          </div>

          <div className="footer-column">
            <h3>{SITE_CONTENT.footer.servicesTitle}</h3>
            <ul className="footer-list">
  {SITE_CONTENT.footer.services.map((item) => {
    const footerServiceLinks = {
      "Personal Care": "service:personal-care",
      "Daily Living Assistance": "service:daily-living-assistance",
      "Community Participation": "service:community-participation",
      "Transport Support": "service:transport-support",
      "Life Skills Development": "service:life-skills-development",
      "Mentoring & Routine Support": "service:mentoring-routine-support",
      "1:1 Support": "service:one-to-one-support",
      "2:1 Support": "service:two-to-one-support",
    };

    return (
      <li key={item}>
        <button
          type="button"
          className="footer-link-button"
          onClick={() => navigatePage(footerServiceLinks[item] || "services")}
        >
          {item}
        </button>
      </li>
    );
  })}
</ul>
          </div>

          <div className="footer-column">
            <h3>{SITE_CONTENT.footer.supportTitle}</h3>
            <ul className="footer-list">
  {SITE_CONTENT.footer.services.map((item) => {
    const footerServiceLinks = {
      "Personal Care": "service:personal-care",
      "Daily Living Assistance": "service:daily-living-assistance",
      "Community Participation": "service:community-participation",
      "Transport Support": "service:transport-support",
      "Life Skills Development": "service:life-skills-development",
      "Mentoring & Routine Support": "service:mentoring-routine-support",
    };

    return (
      <li key={item}>
        <button
          type="button"
          className="footer-link-button"
          onClick={() => navigatePage(footerServiceLinks[item] || "services")}
        >
          {item}
        </button>
      </li>
    );
  })}
</ul>
          </div>

          <div className="footer-column">
            <h3>{SITE_CONTENT.footer.contactTitle}</h3>
            <div className="footer-contact-lines">
              {SITE_CONTENT.footer.contactLines.map((item) => (
                <p key={item}>
                  {item.startsWith("Email: ") ? (
                    <>
                      Email: <a href="mailto:ostaralivingg@gmail.com">ostaralivingg@gmail.com</a>
                    </>
                  ) : item.startsWith("Phone: ") ? (
                    <>
                      Phone: <a href="tel:0452480554">0452480554</a>
                    </>
                  ) : (
                    item
                  )}
                </p>
              ))}
            </div>
            <button
              type="button"
              className="button button-primary footer-cta"
              onClick={() => navigatePage("contact")}
            >
              {SITE_CONTENT.footer.contactButton}
            </button>
          </div>
        </div>

        <div className="footer-acknowledgement">
          <div className="footer-acknowledgement-flag">
            <AboriginalFlagMark />
          </div>
          <div className="footer-acknowledgement-copy">
            <h3>{SITE_CONTENT.footer.acknowledgementTitle}</h3>
            <p>{SITE_CONTENT.footer.acknowledgementText}</p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{SITE_CONTENT.footer.copyright}</span>
        </div>
      </footer>
    </div>
  );
}
