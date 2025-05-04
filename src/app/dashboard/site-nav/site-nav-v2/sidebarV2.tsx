/*
|-----------------------------------------
| setting up sidebarV2 for the app
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, May, 2024
|-----------------------------------------
*/

import { CgArrowLongLeft, CgArrowLongRight } from 'react-icons/cg';
import { ScrollArea } from '@/components/ui/scroll-area';

const SidebarV2 = ({ toggle, handleToggle, toggleButton = false }: { toggleButton?: boolean; toggle: boolean; handleToggle: () => void }) => {
  return (
    <div className="h-screen relative border-slate-500 border-r-1">
      <div className="relative text-slate-600">
        {!toggleButton && (
          <>
            {toggle ? (
              <div onClick={handleToggle} className="top-0 left-0 block w-[253px] md:absolute border-r-1">
                <h3 className="flex w-full cursor-pointer items-center justify-start gap-4 border-t border-slate-200 bg-slate-50 py-4 text-[.8rem]">
                  <span className="ml-4">
                    <CgArrowLongLeft />
                  </span>
                  Hide
                </h3>
              </div>
            ) : (
              <div onClick={handleToggle} className="top-0 left-0 block w-[63px] md:absolute border-r-1">
                <h3 className="flex w-full cursor-pointer items-center justify-center border-t border-slate-200 bg-slate-50 pb-[17px] pt-[18px]">
                  <span title="View">
                    <CgArrowLongRight />
                  </span>
                </h3>
              </div>
            )}
          </>
        )}
        <ScrollArea className="h-[calc(100vh_-_122px)] top-[50px] border-t-1 pt-2">
          {toggle ? (
            <div className="ml-3">List of data</div>
          ) : (
            <div className="flex flex-col p-2">
              <div className="h-4" />
              List <br /> of <br /> data
              <div className="h-16" />
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};
export default SidebarV2;
