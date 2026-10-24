import type { Phase4MessagesTables } from './phase4-messages-tables.types';
import type { Phase4NotificationsTables } from './phase4-notifications-tables.types';

export * from './phase4-messages.types';
export * from './phase4-notifications.types';
export * from './phase4-messages-tables.types';
export * from './phase4-notifications-tables.types';

export type Phase4Tables = Phase4MessagesTables & Phase4NotificationsTables;
