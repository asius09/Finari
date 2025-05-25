"use client";

import Image from "next/image";

interface LogoProps {
  size?: "small" | "medium" | "large" | "xlarge";
  aspectRatio?: number;
  variant?: "full" | "character"; // Added variant prop to choose between full logo and character
  className?: string;
}

const sizeMap = {
  small: 80,
  medium: 100,
  large: 120,
  xlarge: 150,
};

export const Logo = ({
  size = "small",
  aspectRatio = 2,
  variant = "full",
  className = "",
}: LogoProps) => {
  const width = sizeMap[size];
  const height = width / aspectRatio;

  const imageSrc = variant === "full" ? "/finari-logo.svg" : "/f-logo.svg";
  const altText = "Finari Logo";

  return (
    <div style={{ width, height }} className={className}>
      <Image
        priority={true}
        placeholder="blur"
        blurDataURL="/finari-logo.svg"
        src={imageSrc}
        alt={altText}
        width={width}
        height={height}
        className="w-full h-full"
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};
