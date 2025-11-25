export interface Dynasty {
  id: string;
  name: string;
  chineseName: string;
  period: string;
  description: string;
  imageUrl: string;
}

export interface DetailedHistory {
  introduction: string;
  emperor: string;
  capital: string;
  philosophy: string;
  majorEvents: {
    year: string;
    event: string;
    description: string;
  }[];
  culturalAchievements: string[];
  downfall: string;
}
