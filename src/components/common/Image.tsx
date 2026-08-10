"use client";

import NextImage, { ImageProps as NextImageProps } from "next/image";
import { useState } from "react";

const PLACEHOLDER = "/images/placeholder.png";

function getFileUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("/")) return url;
  // erxes stores attachments as opaque keys; they are served by the gateway's
  // read-file endpoint. Strip only `/graphql` so the `/gateway` prefix is kept.
  const fileUrl = process.env.NEXT_PUBLIC_ERXES_FILE_URL;
  if (fileUrl) return `${fileUrl}${encodeURIComponent(url)}`;
  const endpoint = process.env.NEXT_PUBLIC_ERXES_API_URL || "";
  const apiDomain = endpoint.replace(/\/graphql$/, "");
  return apiDomain
    ? `${apiDomain}/read-file?key=${encodeURIComponent(url)}`
    : url;
}

type ImageProps = Omit<NextImageProps, "src"> & {
  src?: string | null;
  fallback?: string;
};

export default function Image({
  src,
  fallback = PLACEHOLDER,
  alt = "",
  ...props
}: ImageProps) {
  const resolved = getFileUrl(src || "") || fallback;
  const [imgSrc, setImgSrc] = useState(resolved);

  return (
    <NextImage
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallback)}
    />
  );
}
