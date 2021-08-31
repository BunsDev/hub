/* eslint-disable @typescript-eslint/naming-convention */
export interface ApiData {
  id: number;
  name: string;
  subtext: string;
  description: string;
  icon: string;
  locationUri: string;
  pointerUris: string[];
  ownerId?: string;
}
export interface UserData {
  id: number;
  username?: string;
  address?: string;
  accessToken?: string;
  authType?: number;
  githubId?: string;
}
export interface Authentication {
  github?: {
    accessToken?: string;
    [k: string]: unknown; // eslint-disable-line
  };
  [k: string]: unknown;  // eslint-disable-line
}

export interface PaginationMeta {
  limit: number;
  page: number;
  max_page: number;
  total_count: number;
}
