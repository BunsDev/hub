/* eslint-disable @typescript-eslint/naming-convention */
export interface ApiData {
  id: number;
  name: string;
  subtext: string;
  description: string;
  icon: string;
  locationUri: string;
  apiUris: string[];
  ownerId?: string;
}

export interface PaginationMeta {
  limit: number;
  page: number;
  max_page: number;
  total_count: number;
}
