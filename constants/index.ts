import {
  LayoutDashboard,
  Bolt,
  Paintbrush,
  Cpu,
  ScanQrCode,
  Settings,
} from "lucide-react";

export const mainLinks = [
  {
    route: "/",
    label: "Dashboard",
    component: LayoutDashboard,
    children: [
      {
        route: "/sparepart",
        label: "Spare Part",
        component: Bolt,
      },
      {
        route: "/consumable",
        label: "Consumable",
        component: Paintbrush,
      },
      {
        route: "/material",
        label: "Material",
        component: Cpu,
      },
    ],
  },

  {
    route: "/scan",
    label: "QR Scan",
    component: ScanQrCode,
  },
  {
    route: "/settings",
    label: "Setting",
    component: Settings,
  },
];

export interface LinkType {
  route: string;
  label: string;
  component: React.ComponentType<{ className?: string }>;
  children?: LinkType[];
}
