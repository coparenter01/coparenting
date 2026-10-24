/** A single item in the main navigation. */
export interface NavItem {
  /** Router path (relative to root) */
  readonly path: string;
  /** Display label */
  readonly label: string;
  /** Material Symbols Rounded icon name */
  readonly icon: string;
  /** Icon when the item is active */
  readonly activeIcon: string;
  /** Screen-reader only prefix prepended before label */
  readonly ariaLabel?: string;
}

/** All main navigation items in the declared order (matches spec §2.1). */
export const MAIN_NAV_ITEMS: readonly NavItem[] = [
  {
    path: '/home',
    label: 'Home',
    icon: 'home',
    activeIcon: 'home',
  },
  {
    path: '/messages',
    label: 'Messages',
    icon: 'chat_bubble_outline',
    activeIcon: 'chat_bubble',
  },
  {
    path: '/calls',
    label: 'Calls',
    icon: 'call_outline',
    activeIcon: 'call',
  },
  {
    path: '/calendar',
    label: 'Calendar',
    icon: 'calendar_today',
    activeIcon: 'event',
  },
  {
    path: '/expenses',
    label: 'Expenses',
    icon: 'receipt_long',
    activeIcon: 'receipt_long',
  },
  {
    path: '/child-support',
    label: 'Child Support',
    icon: 'account_balance',
    activeIcon: 'account_balance',
  },
  {
    path: '/children',
    label: 'Children',
    icon: 'child_care',
    activeIcon: 'child_care',
  },
  {
    path: '/documents',
    label: 'Documents',
    icon: 'folder_outline',
    activeIcon: 'folder',
  },
  {
    path: '/records',
    label: 'Records',
    icon: 'description',
    activeIcon: 'description',
  },
  {
    path: '/professionals',
    label: 'Professionals',
    icon: 'badge',
    activeIcon: 'badge',
  },
  {
    path: '/settings',
    label: 'Settings',
    icon: 'settings',
    activeIcon: 'settings',
  },
  {
    path: '/help',
    label: 'Help',
    icon: 'help_outline',
    activeIcon: 'help',
  },
] as const;

/** Items shown in the mobile bottom bar (first 5 primary items). */
export const BOTTOM_NAV_ITEMS: readonly NavItem[] = [
  { path: '/home', label: 'Home', icon: 'home', activeIcon: 'home' },
  { path: '/messages', label: 'Messages', icon: 'chat_bubble_outline', activeIcon: 'chat_bubble' },
  { path: '/calls', label: 'Calls', icon: 'call_outline', activeIcon: 'call' },
  { path: '/calendar', label: 'Calendar', icon: 'calendar_today', activeIcon: 'event' },
  { path: '/expenses', label: 'Expenses', icon: 'receipt_long', activeIcon: 'receipt_long' },
] as const;
