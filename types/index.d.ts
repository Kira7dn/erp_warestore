declare interface SearchParamProps {
  params?: Promise<SegmentParams>;
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

declare type PartType =
  | "sparepart"
  | "consumable"
  | "material";
