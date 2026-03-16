"use client";

import dynamic from "next/dynamic";

const CosmicNebulaBackground = dynamic(
  () => import("@/components/cosmic-nebula-background"),
  { ssr: false }
);

export default function SiteBackground() {
  return <CosmicNebulaBackground />;
}