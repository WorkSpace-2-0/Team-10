"use client";
import * as React from "react";
import { mn } from "date-fns/locale";
import { formatWithOptions } from "date-fns/fp";
import { format } from "date-fns";
import { Trash } from "lucide-react";

const formatMN = formatWithOptions({ locale: mn });

const None = () => {
  const [dates, setDates] = React.useState<Date | undefined>(new Date());
  return (
    <div className="w-full h-auto flex flex-col px-[32px] py-[22px] gap-1.5 bg-white border border-[#E5E5E5] rounded-[20px] mb-4">
      {/* Header */}
      <div className="w-full flex items-center justify-between gap-[12px]">
        <div className="flex gap-[12px] items-center">
          <div className="w-[70px] h-[70px] overflow-hidden">
            <img src="/images/none.svg" alt="none" />
          </div>
          <h2 className="text-neutral-400 text-base font-medium leading-tight">
            Мэдээлэл алга
          </h2>
        </div>
        {/* Show weekday and selected date here */}
        <div className="shrink-0 text-left">
          <div className="text-neutral-400 text-xs font-semibold leading-tight mb-1">
            {dates ? formatMN("EEEE", dates) : "Өдөр сонгоно уу"}
          </div>
          <pre className="whitespace-pre-line text-neutral-400 text-sm font-base leading-tight">
            {dates ? format(dates, "yyyy-MM-dd") : ""}
          </pre>
        </div>
      </div>
      {/* Note Content */}
      <div className="w-full">
        <h2 className="text-neutral-400 text-base font-normal leading-snug">
          Та энэ өдөр тэмдэглэл хөтлөөгүй байна.
        </h2>
      </div>
      {/* Delete Button */}
      <div className="flex justify-end">
        <button>
          <Trash className="w-[16px] h-[16px] stroke-neutral-400" />
        </button>
      </div>
    </div>
  );
};
export default None;
