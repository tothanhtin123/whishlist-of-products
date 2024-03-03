import type { ISVG } from "@/types/svg";

const SVGPaginationRightArrow = (ISVG: ISVG) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={ISVG.className}
    >
      <path
        d="M8.83984 7.41L13.4198 12L8.83984 16.59L10.2498 18L16.2498 12L10.2498 6L8.83984 7.41Z"
        fill={ISVG.fill || "currentColor"}
      />
    </svg>
  );
};
export default SVGPaginationRightArrow;
