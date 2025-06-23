import * as React from "react";
const MoodlyLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={32} height={28} fill="none">
    <g filter="url(#a)">
      <g filter="url(#b)">
        <path
          fill="#94B7FA"
          d="M19.286 2a7 7 0 0 1 6.992 6.69 5.495 5.495 0 0 1-.053 10.45c.005.054.011.109.014.164a5.9 5.9 0 0 1-9.925 4.629 4.98 4.98 0 0 1-3.766 2.06 4.993 4.993 0 0 1-5.109-3.73 6.714 6.714 0 0 1-2.793-11.93 7.131 7.131 0 0 1 9.788-6.378A6.978 6.978 0 0 1 19.286 2Z"
        />
      </g>
      <ellipse cx={13.086} cy={12.86} fill="#2E302F" rx={0.588} ry={1.294} />
      <ellipse cx={18.712} cy={12.86} fill="#2E302F" rx={0.588} ry={1.294} />
      <path
        fill="#2E302F"
        d="M15.811 18.042c-1.701-.041-2.058-.416-2.051-.682.006-.267.35.052 2.051.094 1.702.042 2.155-.36 2.149-.094-.007.266-.447.724-2.149.682Z"
      />
      <ellipse cx={11.468} cy={15.684} fill="#F5B0DC" rx={1.03} ry={0.515} />
      <ellipse cx={20.219} cy={15.684} fill="#F5B0DC" rx={1.03} ry={0.515} />
    </g>
    <defs>
      <filter
        id="a"
        width={31.28}
        height={27.2}
        x={0.4}
        y={0.4}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={0.8} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_611_3914"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_611_3914"
          result="shape"
        />
      </filter>
      <filter
        id="b"
        width={29.39}
        height={25.343}
        x={1.329}
        y={1.329}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={-0.671} dy={-0.671} />
        <feGaussianBlur stdDeviation={0.336} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
        <feBlend in2="shape" result="effect1_innerShadow_611_3914" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={0.671} dy={0.671} />
        <feGaussianBlur stdDeviation={0.336} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
        <feBlend
          in2="effect1_innerShadow_611_3914"
          result="effect2_innerShadow_611_3914"
        />
      </filter>
    </defs>
  </svg>
);
export default MoodlyLogo;
