import type { Phase10ProfessionalsTables } from './phase10-professionals-tables.types';
import type { Phase11SupportTables } from './phase11-support-tables.types';
import type { Phase3Tables } from './phase3-tables.types';
import type { Phase4Tables } from './phase4-tables.types';
import type { Phase5CallingTables } from './phase5-calling-tables.types';
import type { Phase6CalendarTables } from './phase6-calendar-tables.types';
import type { Phase7ExpensesTables } from './phase7-expenses-tables.types';
import type { Phase8RecordsTables } from './phase8-records-tables.types';
import type { Phase9ChildSupportTables } from './phase9-child-support-tables.types';
import type { PublicTables } from './tables.types';

export * from './models.types';
export * from './phase10-professionals.types';
export * from './phase10-professionals-tables.types';
export * from './phase11-support.types';
export * from './phase11-support-tables.types';
export * from './phase3-tables.types';
export * from './phase4-tables.types';
export * from './phase5-calling.types';
export * from './phase5-calling-tables.types';
export * from './phase6-calendar.types';
export * from './phase6-calendar-tables.types';
export * from './phase7-expenses.types';
export * from './phase7-expenses-tables.types';
export * from './phase8-records.types';
export * from './phase8-records-tables.types';
export * from './phase9-child-support.types';
export * from './phase9-child-support-tables.types';
export * from './tables.types';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Database = {
  public: {
    Tables: PublicTables &
      Phase3Tables &
      Phase4Tables &
      Phase5CallingTables &
      Phase6CalendarTables &
      Phase7ExpensesTables &
      Phase8RecordsTables &
      Phase9ChildSupportTables &
      Phase10ProfessionalsTables &
      Phase11SupportTables;
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
