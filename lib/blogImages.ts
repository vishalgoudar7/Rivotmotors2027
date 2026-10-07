import type { StaticImageData } from "next/image";
import blogImage15 from "@/asset/blog/15.webp";
import blogImage22 from "@/asset/blog/22.webp";
import blogImage23 from "@/asset/blog/23.webp";

const blogImagesByTitle: Record<string, StaticImageData> = {
  "The Rise of Electric Mobility": blogImage15,
  "Top 5 Group Ride Destinations": blogImage22,
  "Tips for Maintaining Your Rivot": blogImage23,
};

export function resolveBlogImage(title: string, imageUrl = ""): StaticImageData | string {
  const mappedImage = blogImagesByTitle[title.trim()];
  if (mappedImage) return mappedImage;
  if (!imageUrl) return blogImage23;
  return imageUrl.startsWith("/") || imageUrl.startsWith("http") ? imageUrl : `/${imageUrl}`;
}

export function resolveBlogImageSrc(title: string, imageUrl = "") {
  const image = resolveBlogImage(title, imageUrl);
  return typeof image === "string" ? image : image.src;
}
