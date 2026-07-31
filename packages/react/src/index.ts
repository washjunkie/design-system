/**
 * @washjunkie/ui — the React binding for the Wash Junkie design system.
 *
 * Import the stylesheets once, at the root of the app, in this order:
 *
 *   import '@washjunkie/tokens/wj-tokens.css';
 *   import '@washjunkie/ui/wj-material.css';
 *   import '@washjunkie/ui/wj-components.css';
 *
 * Order matters: material and components both read the token variables, and
 * components override a handful of material defaults.
 *
 * These components carry behaviour and accessibility, not appearance —
 * appearance lives entirely in the CSS, so a non-React surface gets the same
 * product by using the same class names.
 */

export { WJProvider, useWJ, themeScript } from './provider';
export type { Theme, Register, Density, WJConfig, WJProviderProps } from './provider';

export { GlassSurface, cx } from './glass';
export type { GlassTier, GlassTint, GlassSurfaceProps } from './glass';

export { Button, IconButton, Switch, Segmented, Chip } from './controls';
export type { ButtonProps, ButtonVariant, ControlSize, IconButtonProps, SwitchProps, SegmentedProps, ChipProps } from './controls';

export { Field, Input, Textarea, Select, InputGroup, Checkbox, Radio } from './forms';
export type { FieldProps, InputGroupProps, CheckProps } from './forms';

export {
  Badge, Card, CardHeader, CardBody, CardFooter, Stat, Avatar, initials,
  Alert, EmptyState, Skeleton, Spinner, Progress, Divider,
} from './display';
export type { Tone, BadgeProps, StatProps, AvatarProps, AlertProps, EmptyStateProps } from './display';

export { Modal, Sheet, Popover, Menu, MenuItem, MenuSeparator, ToastProvider, useToast, CommandPalette } from './layers';
export type { ModalProps, SheetProps, PopoverProps, ToastData, CommandItem } from './layers';

export { Nav, NavItem, NavGroup, Tabs, TabBar, Breadcrumbs } from './nav';
export type { NavItemProps, TabsProps, TabBarItem } from './nav';

export { WashJunkieLogo, WashJunkieMark, clearSpace } from './logo';
export type { LogoProps } from './logo';

export { Icon, laundryIcons } from './icons';
export * from './icons';
