import * as React from "react";
const GiftSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={272} height={271} fill="none">
    <g filter="url(#a)">
      <path
        fill="#F5C51A"
        d="M41 63c0-5.523 4.477-10 10-10h180c5.523 0 10 4.477 10 10v180c0 5.523-4.477 10-10 10H51c-5.523 0-10-4.477-10-10V63Z"
      />
      <path fill="#E93F3F" d="M121 53h40v200h-40V53Z" />
    </g>
    <g filter="url(#b)">
      <path
        fill="#F5C51A"
        d="M35 60c0-5.523 4.477-10 10-10h192c5.523 0 10 4.477 10 10v30c0 5.523-4.477 10-10 10H45c-5.523 0-10-4.477-10-10V60Z"
      />
      <path fill="#E93F3F" d="M121 50h40v50h-40V50Z" />
    </g>
    <g filter="url(#c)">
      <rect width={22} height={22} x={130} y={28} fill="#E93F3F" rx={3} />
    </g>
    <g filter="url(#d)">
      <path
        fill="#E93F3F"
        d="M152 32.92a8.001 8.001 0 0 1 4.39-7.14l36.998-18.707c1.379-.697 2.993.366 2.899 1.907l-1.257 20.527c-.02.324.04.647.173.943l7.528 16.73a2 2 0 0 1-1.824 2.82H154a2 2 0 0 1-2-2V32.92Z"
      />
    </g>
    <g filter="url(#e)">
      <path
        fill="#E93F3F"
        d="M130 32.92a8.001 8.001 0 0 0-4.39-7.14L88.612 7.073c-1.379-.697-2.993.366-2.899 1.907l1.257 20.527a2 2 0 0 1-.173.943L79.27 47.18A2 2 0 0 0 81.093 50H128a2 2 0 0 0 2-2V32.92Z"
      />
    </g>
    <defs>
      <filter
        id="a"
        width={220}
        height={222}
        x={33}
        y={43}
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
        <feOffset dx={-8} dy={-10} />
        <feGaussianBlur stdDeviation={8} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
        <feBlend in2="shape" result="effect1_innerShadow_896_3119" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={12} dy={12} />
        <feGaussianBlur stdDeviation={8} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.32 0" />
        <feBlend
          in2="effect1_innerShadow_896_3119"
          result="effect2_innerShadow_896_3119"
        />
      </filter>
      <filter
        id="b"
        width={224}
        height={66}
        x={31}
        y={42}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_896_3119"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_896_3119"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={-4} dy={-8} />
        <feGaussianBlur stdDeviation={6} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
        <feBlend in2="shape" result="effect2_innerShadow_896_3119" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={8} dy={8} />
        <feGaussianBlur stdDeviation={6} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.32 0" />
        <feBlend
          in2="effect2_innerShadow_896_3119"
          result="effect3_innerShadow_896_3119"
        />
      </filter>
      <filter
        id="c"
        width={28}
        height={28}
        x={128}
        y={26}
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
        <feOffset dx={-2} dy={-2} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
        <feBlend in2="shape" result="effect1_innerShadow_896_3119" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={4} dy={4} />
        <feGaussianBlur stdDeviation={4} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0" />
        <feBlend
          in2="effect1_innerShadow_896_3119"
          result="effect2_innerShadow_896_3119"
        />
      </filter>
      <filter
        id="d"
        width={58.909}
        height={55.145}
        x={148}
        y={2.855}
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
        <feOffset dx={-4} dy={-4} />
        <feGaussianBlur stdDeviation={6} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
        <feBlend in2="shape" result="effect1_innerShadow_896_3119" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={4} dy={8} />
        <feGaussianBlur stdDeviation={6} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.24 0" />
        <feBlend
          in2="effect1_innerShadow_896_3119"
          result="effect2_innerShadow_896_3119"
        />
      </filter>
      <filter
        id="e"
        width={58.909}
        height={55.145}
        x={75.091}
        y={2.855}
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
        <feOffset dx={-4} dy={-4} />
        <feGaussianBlur stdDeviation={6} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
        <feBlend in2="shape" result="effect1_innerShadow_896_3119" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={4} dy={8} />
        <feGaussianBlur stdDeviation={6} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.24 0" />
        <feBlend
          in2="effect1_innerShadow_896_3119"
          result="effect2_innerShadow_896_3119"
        />
      </filter>
    </defs>
  </svg>
);
export default GiftSvg;
