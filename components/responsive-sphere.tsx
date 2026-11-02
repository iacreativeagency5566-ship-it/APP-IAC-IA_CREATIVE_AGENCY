"use client";
import { useEffect, useState } from "react";
import SphereImageGrid, { type ImageData } from "@/components/ui/img-sphere";
export function ResponsiveSphere({ images }: { images: ImageData[] }) {
  const [size, setSize] = useState(600);
  useEffect(() => {
    const on = () => setSize(Math.max(280, Math.min(600, innerWidth - 48)));
    on(); addEventListener("resize", on); return () => removeEventListener("resize", on);
  }, []);
  return <SphereImageGrid images={images} containerSize={size} sphereRadius={size / 3} />;
}
