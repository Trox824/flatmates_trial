const Household = () => {
  return (
    <div className="border-b">
      <h3 className="text-medium mb-4 pt-[1.5rem] font-semibold text-[#2f3a4a]">
        Household
      </h3>

      <div className="grid grid-cols-2 gap-y-3 pb-[1.5rem] pt-0">
        {/* Left Column */}
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="women_only"
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="ml-2 text-sm text-[#2f3a4a]">
              Women only household
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Household;
