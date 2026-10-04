export type FeederStatus = 'ENERGIZED' | 'LOAD_SHED' | 'FAULT' | 'MAINTENANCE';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface Zone {
  id: string;
  name: string;
  code: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    substations: number;
  };
}

export interface Substation {
  id: string;
  name: string;
  code: string;
  capacityMW: number;
  zoneId: string;
  zone?: Zone;
  createdAt: string;
  updatedAt: string;
  _count?: {
    feeders: number;
  };
}

export interface Feeder {
  id: string;
  name: string;
  code: string;
  loadMW: number;
  status: FeederStatus;
  substationId: string;
  substation?: Substation;
  createdAt: string;
  updatedAt: string;
  _count?: {
    areas: number;
  };
}

export interface Area {
  id: string;
  name: string;
  code: string;
  feederId: string;
  priority: Priority;
  customerCount: number;
  feeder?: Feeder;
  createdAt: string;
  updatedAt: string;
}

export interface Meter {
  id: string;
  number: string;
  areaId: string;
  userId?: string;
  area?: Area;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}