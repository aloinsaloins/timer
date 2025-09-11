export interface VisitationPattern {
  id: string;
  parentId: string;
  annualDays: number; // 0-365
  dailyHours: number; // 0-24
  isLivingTogether: boolean;
  createdAt: Date;
  updatedAt: Date;
}

