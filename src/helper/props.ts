export type DataItem = {
  id?: string | undefined;
  name?: string | undefined;
  type?: "video" | "audio" | undefined;
  url?: string | undefined;
  videoUrl?: string | undefined;
  category?: "yoga" | "meditation" | "music" | undefined;
  image?: string | undefined;
  title?: string;
  level?: string | undefined;
  time?: string;
  description?: string | undefined;
  userId?: string | undefined;
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
  searchQuery: string;
};

export type UserPageCombined = DataItem & UserPageProps;
