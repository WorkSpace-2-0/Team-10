// components/AnimatedLogo.tsx
import React from "react";
import "./AnimatedLogo.css";

const logos = [
  { src: "/images/sadLogo.svg", className: "Тавгүй", alt: "Sad" },
  { src: "/images/goodLogo.svg", className: "Хэвийн", alt: "Normal" },
  { src: "/images/happyLogo.svg", className: "Супер", alt: "Happy" },
];

const LoadingLogoRow = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex gap-8">
        {logos.map((logo) => (
          <div key={logo.alt} className={`logo-container ${logo.className}`}>
            <img src={logo.src} alt={logo.alt} className="logo" />
          </div>
        ))}
      </div>
      <p className="text-gray-500 text-xl font-medium">
        Мэдээлэл уншиж байна...
      </p>
    </div>
  );
};

export default LoadingLogoRow;
