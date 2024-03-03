import type { ISVG } from "@/types/svg";

const SVGPaginationLeftArrow = (ISVG: ISVG) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={ISVG.className}
    >
      <path
        d="M15.1602 7.41L10.5802 12L15.1602 16.59L13.7502 18L7.75016 12L13.7502 6L15.1602 7.41Z"
        fill={ISVG.fill || "currentColor"}
      />
    </svg>
  );
};
export default SVGPaginationLeftArrow;
