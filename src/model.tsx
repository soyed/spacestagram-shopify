export const API_KEY = 'OFiepJmDbN4gns9AwVwrstP8BlsSU6n3SoCHGhXT';

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}

export interface Astronomy {
  copyright?: string;
  date?: string;
  explanation?: string;
  hdUrl?: string;
  mediaType?: MediaType;
  serviceVersion?: string;
  title?: string;
  url?: string;
  thumbnailUrl?: string;
  // used track the post user have liked
  isLiked?: boolean;
}
