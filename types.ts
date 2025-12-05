export interface UserProfile {
  id: number;
  name: string;
  role: string;
  wishes: string;
  images: string[];
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
}
