const RentPerWeek = () => {
  return (
    <div className="border-b">
      <h3 className="text-medium mb-4 pt-[1.5rem] font-semibold text-[#2f3a4a]">
        Rent per week
      </h3>

      <div className="flex items-center gap-4 py-[.75rem] pb-[1.5rem] pt-0">
        {/* Min Rent Input */}
        <div className="relative">
          <label
            htmlFor="min_budget"
            className="mb-1 block text-[1rem] font-medium text-[#2f3a4a]"
          >
            Rent min
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              name="min_budget"
              id="min_budget"
              type="tel"
              placeholder="Any"
              className="w-[120px] rounded-md border border-gray-600 px-10 py-3"
            />
          </div>
        </div>

        {/* Max Rent Input */}
        <div className="relative">
          <label
            htmlFor="max_budget"
            className="mb-1 block text-[1rem] font-medium text-[#2f3a4a]"
          >
            Rent max
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              name="max_budget"
              id="max_budget"
              type="tel"
              placeholder="Any"
              className="w-[120px] rounded-md border border-gray-600 px-10 py-3"
            />
          </div>
        </div>

        {/* Bills Checkbox */}
        <div className="ml-2 mt-8 flex items-center">
          <input
            name="bills"
            id="bills"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300"
          />
          <label htmlFor="bills" className="ml-2 text-sm text-gray-500">
            Bills included
          </label>
        </div>
      </div>
    </div>
  );
};

export default RentPerWeek;
