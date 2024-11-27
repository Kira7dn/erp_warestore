import {
  LayoutDashboard,
  Bolt,
  Paintbrush,
  Cpu,
  Warehouse,
  ScanQrCode,
  Settings,
} from "lucide-react";

export const mainLinks = [
  {
    route: "/",
    label: "Dashboard",
    component: LayoutDashboard,
  },
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
  // {
  //   route: "/warehouse",
  //   label: "Warehouse",
  //   component: Warehouse,
  // },
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
