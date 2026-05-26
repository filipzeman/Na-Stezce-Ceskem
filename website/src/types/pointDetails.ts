export interface PointDetails {
  point_id: string;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  opening_info?: string | null;
  note?: string | null;
  images?: string[];
  hikers_welcome?: boolean | null;
  active: boolean;
  location_id?: string | null;
  location_name?: string | null;
}
