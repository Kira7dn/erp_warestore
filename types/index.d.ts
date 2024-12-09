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

declare type PartDataType = {
  _id?: string;
  id?: number;
  name: string;
  type: "sparepart" | "consumable" | "material";
  specification: string;
  brand: string;
  image: string;
  category: string;
};
