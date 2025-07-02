import { Skeleton } from "@/components/ui/skeleton";
export const SkelA = () => {
  return (
    <div>
      <div className="flex items-center justify-between w-full mb-6">
        <div className="flex items-center gap-2">
          <Skeleton className="w-[346px] h-[36px] rounded-full" />
        </div>
        <div className="flex p-1 ">
          <Skeleton className="w-[199px] h-[36px] rounded-full" />
        </div>
      </div>
      <div className="flex flex-col gap-8 mb-[24px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Skeleton className="w-[395px] h-[151px] rounded full" />
          </div>
          <div>
            <Skeleton className="w-[395px] h-[151px] rounded full" />
          </div>
          <div>
            <Skeleton className="w-[395px] h-[151px] rounded full" />
          </div>
        </div>
        <div className="flex items-center justify-between w-full mb-6">
          <div className="flex items-center gap-2">
            <Skeleton className="w-[262px] h-[36px] rounded-full" />
          </div>
          <div className="flex p-1 ">
            <Skeleton className="w-[199px] h-[36px] rounded-full" />
          </div>
        </div>
      </div>
      <div>
        <Skeleton className="w-[1232px] h-[480px] rounded-xl" />
      </div>
    </div>
  );
};
