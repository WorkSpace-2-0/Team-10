import * as React from "react";
const GreenMood = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 107 111" {...props}>
    {" "}
    <g filter="url(#a)">
      <path
        fill="#A0DF9A"
        d="M50 27.5c13.255 0 24 10.745 24 24s-10.745 24-24 24-24-10.745-24-24V29.42c0-1.06.86-1.92 1.92-1.92H50Z"
      />
      <ellipse cx={44.255} cy={50.249} fill="#2E302F" rx={1.177} ry={2.589} />
      <ellipse cx={55.507} cy={50.249} fill="#2E302F" rx={1.177} ry={2.589} />
      <path
        fill="#2E302F"
        d="M49.706 60.613c-3.403-.084-4.04-1.86-4.026-2.393.013-.532.623 1.133 4.026 1.216 3.403.083 4.147-1.748 4.134-1.216-.013.532-.731 2.476-4.134 2.393Z"
      />
      <ellipse cx={41.019} cy={55.897} fill="#F697BF" rx={2.059} ry={1.03} />
      <ellipse cx={58.522} cy={55.897} fill="#F697BF" rx={2.059} ry={1.03} />
    </g>
    <defs>
      <filter
        id="a"
        width={109.44}
        height={109.44}
        x={-2.8}
        y={0.62}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={1.92} dy={3.84} />
        <feGaussianBlur stdDeviation={15.36} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.627451 0 0 0 0 0.87451 0 0 0 0 0.603922 0 0 0 0.72 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1203_3492"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_1203_3492"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={-1.92} dy={-3.84} />
        <feGaussianBlur stdDeviation={2.88} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
        <feBlend in2="shape" result="effect2_innerShadow_1203_3492" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={5.76} dy={5.76} />
        <feGaussianBlur stdDeviation={4.8} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.32 0" />
        <feBlend
          in2="effect2_innerShadow_1203_3492"
          result="effect3_innerShadow_1203_3492"
        />
      </filter>
    </defs>
  </svg>
);
export default GreenMood;
