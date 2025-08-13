export interface PriorAction {
  id: string;
  projectNumber: string;
  country: string;
  pillar: string;
  priorAction: string;
  resultIndicator: string;
  drmPolicyArea: string;
  typeOfLegalEvidence: string;
  isTotal?: boolean;
}

export interface PriorActionChartData {
  category: string;
  value: number;
  color?: string;
}
