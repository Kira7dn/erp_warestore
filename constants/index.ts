import {
  CalendarCheck,
  LayoutTemplateIcon,
  HomeIcon,
  UserCircle,
  Folders,
  Package,
  XCircle,
  PauseCircle,
} from "lucide-react";

import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from "@radix-ui/react-icons";
import { CheckCircle2, MinusCircle } from "lucide-react";
import {
  FaHeadset,
  FaUserClock,
  FaUserTie,
} from "react-icons/fa6";
import { MdPayments } from "react-icons/md";
import { RiDashboard2Line } from "react-icons/ri";
import { TbFingerprintScan } from "react-icons/tb";
import {
  LiaFemaleSolid,
  LiaGenderlessSolid,
  LiaMaleSolid,
} from "react-icons/lia";

export const genders = [
  {
    value: "male",
    label: "Male",
    icon: LiaMaleSolid,
  },
  {
    value: "female",
    label: "Female",
    icon: LiaFemaleSolid,
  },
  {
    value: "other",
    label: "Other",
    icon: LiaGenderlessSolid,
  },
];

export const statuses = [
  {
    value: "active",
    label: "Active",
    icon: CheckCircle2,
  },
  {
    value: "inactive",
    label: "Inactive",
    icon: MinusCircle,
  },
];
export const candidateStatuses = [
  {
    value: "passed",
    label: "Passed",
    icon: CheckCircle2,
    className: "text-green-500",
  },
  {
    value: "failed",
    label: "Failed",
    icon: XCircle,
    className: "text-red-500",
  },
  {
    value: "waiting",
    label: "Waiting",
    icon: PauseCircle,
    className: "text-yellow-500",
  },
];

export const levels = [
  {
    label: "Junior",
    value: "Junior",
    icon: ArrowDownIcon,
  },
  {
    label: "Mid-Level",
    value: "Mid-Level",
    icon: ArrowRightIcon,
  },
  {
    label: "Senior",
    value: "Senior",
    icon: ArrowUpIcon,
  },
];

export const mainLinks = [
  {
    route: "/",
    label: "Dashboard",
    component: RiDashboard2Line,
  },
  {
    route: "/admin/employee",
    label: "Employee",
    component: FaUserTie,
  },
  {
    route: "/admin/candidate",
    label: "Candidate",
    component: FaUserClock,
  },
  {
    route: "/admin/recruitment",
    label: "Recruitment",
    component: FaHeadset,
  },
  {
    route: "/admin/payroll",
    label: "Payroll",
    component: MdPayments,
  },
  {
    route: "/admin/attendance",
    label: "Attendance",
    component: TbFingerprintScan,
  },
];
export const otherLinks = [
  {
    route: "/admin/events",
    label: "Events",
    component: CalendarCheck,
  },
];
export const preferenceLinks = [
  {
    route: "/",
    label: "Preferences1",
    component: HomeIcon,
  },
  {
    route: "/",
    label: "Preferences2",
    component: LayoutTemplateIcon,
  },
];
export const projecLinks = [
  { icon: HomeIcon, route: "/" },
  {
    icon: LayoutTemplateIcon,
    route: "/?admin=true",
  },
  {
    icon: UserCircle,
    route: "/?admin=true",
  },
  {
    icon: Folders,
    route: "/?admin=true",
  },
  {
    icon: CalendarCheck,
    route: "/?admin=true",
  },
  {
    icon: Package,
    route: "/?admin=true",
  },
];

export const department = [
  "Engineering",
  "Product",
  "Design",
  "Data",
  "Operations",
  "Management",
  "Development",
  "Security",
  "Mobile",
];

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const attendance_status = [
  "work",
  "paid_leave",
  "unpaid_leave",
];
