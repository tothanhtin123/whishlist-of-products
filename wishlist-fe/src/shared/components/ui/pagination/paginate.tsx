import { useEffect, useState } from "react";
import type { ReactPaginateProps } from "react-paginate";
import ReactPaginate from "react-paginate";

import SVGPaginationLeftArrow from "@/svg/SVGPaginationLeftArrow";
import SVGPaginationRightArrow from "@/svg/SVGPaginationRightArrow";
import useWindowDimensions from "@/hooks/useWindowDimensions";

interface IPaginate extends ReactPaginateProps {}

const pageLinkItemClassName =
  "flex h-8 w-8 items-center justify-center rounded-[4px] border bg-white font-bold leading-[0px] text-[#212B36] outline-none border-[#DFE3E8] hover:border-warm-1";
const nextPreviousItemClassName =
  "flex h-8 w-8 items-center justify-center rounded-[4px] border leading-[0px] text-[#CDD5C4] outline-none border-[#DFE3E8] bg-white hover:border-warm-1";
const nextPreviousIconClassName = "w-8 h-8 text-[#CDD5C4]";

const Paginate = (props: IPaginate) => {
  const [paginateDisplayConfig, setPaginateDisplayConfig] = useState({
    pageRangeDisplayed: 2,
    marginPagesDisplayed: 2,
  });
  const { width: screenWidth } = useWindowDimensions();

  // for pagination config when screen width changed
  useEffect(() => {
    const config = { pageRangeDisplayed: 2, marginPagesDisplayed: 2 };
    if (screenWidth < 1024) {
      config.pageRangeDisplayed = 1;
      config.marginPagesDisplayed = 1;
    }
    setPaginateDisplayConfig(config);
  }, [screenWidth]);

  return (
    <ReactPaginate
      pageRangeDisplayed={paginateDisplayConfig.pageRangeDisplayed}
      marginPagesDisplayed={paginateDisplayConfig.marginPagesDisplayed}
      containerClassName="mt-6 flex justify-center gap-x-2 lg:mt-10"
      pageLinkClassName={pageLinkItemClassName}
      breakLinkClassName={pageLinkItemClassName}
      activeLinkClassName="!bg-primary-foreground text-white"
      nextLabel={<SVGPaginationRightArrow className={nextPreviousIconClassName} />}
      nextLinkClassName={nextPreviousItemClassName}
      previousLabel={<SVGPaginationLeftArrow className={nextPreviousIconClassName} />}
      previousLinkClassName={nextPreviousItemClassName}
      disabledLinkClassName="cursor-not-allowed !border-transparent !bg-cool-3 opacity-50"
      {...props}
    />
  );
};
export default Paginate;
