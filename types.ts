
export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  views: string;
  postedAt: string;
  duration: string;
  description: string;
  codeSnippet: string;
  category: string;
  avatar: string;
  url?: string; // For external links
  isUserUploaded?: boolean;
  meta?: string;
}

export enum Category {
  ALL = 'All',
  AI = 'AI & Machine Learning',
  WEB = 'Web Development',
  DATA = 'Data Science',
  AUTOMATION = 'Automation',
  GAMES = 'Game Dev',
}
