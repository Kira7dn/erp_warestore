import type { Metadata } from "next";
import createLocalFont from "next/font/local";
import "./globals.css";
import type { Viewport } from "next";

export const viewport: Viewport = {
  viewportFit: "cover",
};

const LGEI = createLocalFont({
  src: [
    {
      path: "./fonts/LGEIText-Light.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/LGEIText-Regular.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/LGEIText-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/LGEIText-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "ERP - Warehouse Management",
  description:
    "Manage your warehouse with ease. ERP - Warehouse Management is a web application that helps you manage your warehouse.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/assets/logo.svg",
        href: "/assets/logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/assets/logo-dark.svg",
        href: "/assets/logo-dark.svg",
      },
    ],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${LGEI.className}`}
    >
      <body>{children}</body>
    </html>
  );
}
