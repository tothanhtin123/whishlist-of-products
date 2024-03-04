import { ReadonlyURLSearchParams } from "next/navigation";
import type { NextRouter } from "next/router";

export const createQueryParams = (
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  queryData: Object,
  oldParams?: ReadonlyURLSearchParams,
) => {
  const params = new URLSearchParams(oldParams);
  Object.entries(queryData).forEach(([key, val]) => {
    if (val) {
      params.set(key, val.toString());
    } else {
      params.delete(key);
    }
  });
  return params;
};
