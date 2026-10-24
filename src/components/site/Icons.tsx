import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const MenuIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

export const CloseIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const BagIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 8h12l-1 12H7L6 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);

export const ArrowLeftIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ChevronDownIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const PlusIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MinusIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const TrashIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />
  </svg>
);

export const SaffronIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3c0 3-2 5-2 8a2 2 0 0 0 4 0c0-3-2-5-2-8Z" />
    <path d="M8 21c1-2 2.5-3 4-3s3 1 4 3" />
    <path d="M4 10c2 .5 3.5 1.8 4.5 3.5M20 10c-2 .5-3.5 1.8-4.5 3.5" />
  </svg>
);

export const LeafIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 19c0-8 5-13 14-13 0 9-5 14-14 13Z" />
    <path d="M9 15c2-3 4-5 7-6" />
  </svg>
);

export const SparkIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
  </svg>
);

export const ShieldIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3Z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const DropIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />
  </svg>
);

export const GlassIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 4h12l-6 8v6" />
    <path d="M9 20h6" />
    <path d="M7.5 8h9" />
  </svg>
);

export const GridIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
  </svg>
);

export const MailIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M3 6h18v12H3z" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

export const PhoneIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a1 1 0 0 1-1 1A17 17 0 0 1 4 5a1 1 0 0 1 1-1Z" />
  </svg>
);

export const PinIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const SendIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 12 20 4l-7 16-2.5-6.5L4 12Z" />
  </svg>
);

export const ChevronUpIcon = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 15l6-6 6 6" />
  </svg>
);
