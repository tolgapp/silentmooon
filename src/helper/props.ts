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