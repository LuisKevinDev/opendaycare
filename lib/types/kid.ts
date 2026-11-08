export interface Badge {
  id: string;
  label: string;
  variant: "warning" | "action" | "info";
}

export interface Kid {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  initials: string;
  avatarColor: string;
  initialsColor: string;
  linkedParentsCount: number;
  badges: Badge[];
}

export interface Parent {
  id: string;
  name: string;
  email: string;
}
