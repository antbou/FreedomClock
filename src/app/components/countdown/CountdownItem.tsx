const CountdownItem = ({ value, unit }: { value: number; unit: string }) => (
  <div className="flex flex-col gap-5 relative">
    <div className="h-16 w-16 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex justify-between items-center bg-[#343650] rounded-lg">
      <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 !-left-[6px] rounded-full bg-[#191A24]"></div>
      <span className="lg:text-7xl sm:text-6xl text-3xl font-semibold text-[#a5b4fc]">
        {value}
      </span>
      <div className="relative h-2.5 w-2.5 sm:h-3 sm:w-3 -right-[6px] rounded-full bg-[#191A24]"></div>
    </div>
    <span className="text-[#8486A9] text-xs sm:text-2xl text-center capitalize">
      {value === 1 ? unit : `${unit}s`}
    </span>
  </div>
);

export default CountdownItem;
