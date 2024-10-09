import React, { useState, useEffect } from "react";

interface Month {
  month_num: number;
  selected: boolean;
}

type Months = Month[];

export const ExcelUploaderMonths = () => {
  const [months, setMonths] = useState<Months>([]);

  useEffect(() => {
    const fillMonths = (): Months => {
      return new Array(12).fill(0).map((_, index) => ({
        month_num: index + 1,
        selected: false
      }));
    };

    setMonths(fillMonths());
  }, []);

  const handleMonthSelect = (month_to_select: number) => {
    setMonths((prev_months) => {
      return prev_months.map((month) => (month_to_select === month.month_num ? { ...month, selected: !month.selected } : month));
    });
  };

  console.log(months);

  return (
    <>
      <div className="justify-left mb-4 flex flex-row flex-wrap gap-4">
        {months.length > 0 &&
          months.map(({ month_num, selected }, index) => (
            <button
              key={index}
              className={`px-4 py-2 font-bold transition-all hover:-translate-y-1 hover:cursor-pointer ${
                selected ? "bg-green-500 text-white hover:bg-white hover:text-red-600" : "bg-red-600"
              } hover:bg-white hover:text-red-600`}
              onClick={() => handleMonthSelect(month_num)}
            >
              {month_num}
            </button>
          ))}
      </div>
    </>
  );
};
