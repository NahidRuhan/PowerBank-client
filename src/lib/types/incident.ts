export type IncidentStatus = 'REPORTED' | 'ACKNOWLEDGED' | 'IN_PROGRESS' | 'RESOLVED';

export interface OutageIncident {
  id: string;
  feederId: string;
  description: string;
  photoUrl?: string;
  status: IncidentStatus;
  priority: string;
  estimatedRestoration?: string;
  resolvedAt?: string;
  createdBy: string;
  assignedToId?: string;
  createdAt: string;
  updatedAt: string;
}