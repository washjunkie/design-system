import * as React from 'react';

/**
 * Icons.
 *
 * The spec (docs/08-iconography.md) in one paragraph: 24×24 viewBox, 1.75px
 * stroke, round caps and joins, 2px minimum interior radius, drawn on a 2px
 * grid with a 1px optical margin inside the box. Stroked, never filled, so a
 * single set works at every size and inherits `currentColor` — which is what
 * lets the same icon sit on a glass pane, inside a solid button, and in a
 * danger-toned menu item without three files.
 *
 * Generic icons (chevrons, search, bell…) come from Lucide, which is drawn to
 * a compatible spec. What lives here is the set Lucide does not have: the
 * things that are specifically laundry.
 */

export type IconProps = Omit<React.SVGProps<SVGSVGElement>, 'stroke'> & {
  size?: number;
  /** Stroke width in the 24-unit space. Leave alone unless matching a mark. */
  stroke?: number;
  /** Give an icon that carries meaning on its own a label; leave decorative
   *  ones unlabelled and they stay out of the accessibility tree. */
  title?: string;
};

export const Icon = ({
  size = 20,
  stroke = 1.75,
  title,
  children,
  ...rest
}: IconProps & { children: React.ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    role={title ? 'img' : undefined}
    aria-hidden={title ? undefined : true}
    focusable="false"
    {...rest}
  >
    {title ? <title>{title}</title> : null}
    {children}
  </svg>
);

const make = (path: React.ReactNode) => {
  const C = (p: IconProps) => <Icon {...p}>{path}</Icon>;
  return C;
};

/* ---------- The laundry set ---------- */

/** Washing machine. The core object of the whole platform. */
export const IconWasher = make(
  <>
    <rect x="4" y="3" width="16" height="18" rx="3" />
    <path d="M4 8h16" />
    <circle cx="12" cy="14.5" r="4" />
    <path d="M9.2 13.6c1-.9 1.9-.9 2.8 0s1.8.9 2.8 0" />
    <circle cx="7.2" cy="5.6" r=".6" fill="currentColor" stroke="none" />
  </>
);

/** Tumble dryer — the machine with heat, so the drum carries a spiral. */
export const IconDryer = make(
  <>
    <rect x="4" y="3" width="16" height="18" rx="3" />
    <path d="M4 8h16" />
    <circle cx="12" cy="14.5" r="4" />
    <path d="M12 12.2a2.3 2.3 0 1 1-1.9 3.6" />
    <circle cx="7.2" cy="5.6" r=".6" fill="currentColor" stroke="none" />
  </>
);

/** Laundry basket — an intake, a batch, a load waiting. */
export const IconBasket = make(
  <>
    <path d="M4 8h16l-1.4 10.2a2 2 0 0 1-2 1.8H7.4a2 2 0 0 1-2-1.8Z" />
    <path d="M2.5 8h19" />
    <path d="M9 11.5v5M15 11.5v5" />
  </>
);

/** Folded stack — items processed, ready. */
export const IconFolded = make(
  <>
    <rect x="3.5" y="14.5" width="17" height="5" rx="1.6" />
    <rect x="5" y="9.5" width="14" height="4.5" rx="1.6" />
    <rect x="6.5" y="5" width="11" height="4" rx="1.6" />
  </>
);

/** Hanger — dry cleaning, press, garment care. */
export const IconHanger = make(
  <>
    <path d="M12 8.5V7.2a2.1 2.1 0 1 1 2.1-2.1" />
    <path d="m12 8.5 8 5.6a1.6 1.6 0 0 1-.9 2.9H4.9a1.6 1.6 0 0 1-.9-2.9Z" />
  </>
);

/** Iron — press and finish. */
export const IconIron = make(
  <>
    <path d="M3 16.5h18a7.5 7.5 0 0 0-7.5-7.5H8.2A5.2 5.2 0 0 0 3 14.2Z" />
    <path d="M7.5 9V7.4A2.4 2.4 0 0 1 9.9 5h5.6" />
    <path d="M3 19.5h18" />
  </>
);

/** Droplet — water, wash cycle, detergent. Also the softener of the set. */
export const IconDroplet = make(<path d="M12 3.2c3.4 3.9 5.6 6.6 5.6 9.3a5.6 5.6 0 1 1-11.2 0c0-2.7 2.2-5.4 5.6-9.3Z" />);

/** Delivery van — the driver surface's primary object. */
export const IconVan = make(
  <>
    <path d="M2.5 16.5V7.8a1.3 1.3 0 0 1 1.3-1.3h8.9v10" />
    <path d="M12.7 10.2h3.6l4 3.3v3h-1.8" />
    <path d="M6.4 16.5h7.4" />
    <circle cx="8.4" cy="17.6" r="1.9" />
    <circle cx="17.6" cy="17.6" r="1.9" />
  </>
);

/** Route — a pickup and a delivery with the road between them. */
export const IconRoute = make(
  <>
    <circle cx="6" cy="6.5" r="2.4" />
    <circle cx="18" cy="17.5" r="2.4" />
    <path d="M8.4 6.5h4.4a3.4 3.4 0 0 1 0 6.8h-2.6a3.2 3.2 0 0 0 0 4.2h5.4" strokeDasharray="0.1 3.4" />
  </>
);

/** Outlet — a customer-facing shopfront. */
export const IconOutlet = make(
  <>
    <path d="M4 9.5V20h16V9.5" />
    <path d="M3 9.5 4.8 4.6A1 1 0 0 1 5.7 4h12.6a1 1 0 0 1 .9.6L21 9.5a3 3 0 0 1-5.6 1.6 3 3 0 0 1-5.5 0A3 3 0 0 1 3 9.5Z" />
    <path d="M9.8 20v-5.2h4.4V20" />
  </>
);

/** Wash house — the production facility behind the counter. */
export const IconWashHouse = make(
  <>
    <path d="M3 20V10.4a1 1 0 0 1 .5-.9l7.9-4.7a1 1 0 0 1 1.1 0l7.9 4.7a1 1 0 0 1 .6.9V20" />
    <path d="M2 20h20" />
    <rect x="8" y="12.5" width="8" height="7.5" rx="1.4" />
    <circle cx="12" cy="16.2" r="1.9" />
  </>
);

/** Wash Credit — the platform's prepaid balance. */
export const IconWashCredit = make(
  <>
    <rect x="2.5" y="5" width="19" height="14" rx="3" />
    <path d="M2.5 10h19" />
    <path d="M6.5 14.8h3.5" />
    <path d="M16.4 13.2c1.3 1.5 2.1 2.5 2.1 3.4a2.1 2.1 0 1 1-4.2 0c0-.9.8-1.9 2.1-3.4Z" />
  </>
);

/** Order — a docket, a job ticket. */
export const IconOrder = make(
  <>
    <path d="M5 3.5h14a1 1 0 0 1 1 1v16l-3-1.8-3 1.8-3-1.8-3 1.8-3-1.8V4.5a1 1 0 0 1 1-1Z" />
    <path d="M8.5 8.5h7M8.5 12.5h7M8.5 16h4" />
  </>
);

export const laundryIcons = {
  washer: IconWasher,
  dryer: IconDryer,
  basket: IconBasket,
  folded: IconFolded,
  hanger: IconHanger,
  iron: IconIron,
  droplet: IconDroplet,
  van: IconVan,
  route: IconRoute,
  outlet: IconOutlet,
  washHouse: IconWashHouse,
  washCredit: IconWashCredit,
  order: IconOrder,
} as const;

export type LaundryIconName = keyof typeof laundryIcons;
