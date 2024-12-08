export type DataItem = {
  id: string;
  name?: string;
  type: "video" | "audio";
  url?: string;
  videoUrl?: string;
  category: "yoga" | "meditation" | "music";
  image: string;
  title: string;
  level: string;
  time: string;
  description: string;
};

export type MeditationProps = {
  userName: string | null;
  onSearch: (search: string) => void;
  searchQuery: string;
};

export type CombinedMeditation = MeditationProps & IconsBarProps;

export type StructureProps = {
  title: string;
  description: string;
  onSearch: (search: string) => void;
};

export type IconsBarProps = {
  activeIcon: string | null;
  setActiveIcon: (item: string) => void;
};

export type CombinedStructure = StructureProps & IconsBarProps;

export type UserPageProps = {
  selectedDays: number[];
  toggleDay: (dayId: number) => void;
  handleLogout: () => Promise<void>;
  onSearch: (search: string) => void;
  userName: string | null;
};

export type UserPageCombined = DataItem & UserPageProps;
