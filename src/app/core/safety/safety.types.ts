export type AlertPreviewLevel = 'none' | 'name_only' | 'name_and_text';

export interface AiAuditEntry {
  id: string;
  timestamp: string;
  featureName: string;
  itemType: 'Draft' | 'Incoming message' | 'Receipt' | 'Document' | 'Calendar item';
  actionTaken: string;
  dataRetained: boolean;
}

export interface SafetySettingsState {
  safetyModeActive: boolean;
  safetyCode: string;
  alertPreviewLevel: AlertPreviewLevel;
  maskImages: boolean;
  aiFeaturesActive: boolean;
  neutralEscapeUrl: string;
}
