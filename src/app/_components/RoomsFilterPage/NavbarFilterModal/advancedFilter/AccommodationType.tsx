const AccommodationType = () => {
  return (
    <div className="border-b">
      <h3 className="text-medium mb-4 pt-[1.5rem] font-semibold text-[#2f3a4a]">
        Accommodation type
      </h3>

      <div className="grid grid-cols-2 gap-y-3 pb-[1.5rem] pt-0">
        {/* Left Column */}
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="share_house"
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="ml-2 text-sm text-[#2f3a4a]">Share house</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="granny_flat"
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="ml-2 text-sm text-[#2f3a4a]">Granny flat</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="studio"
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="ml-2 text-sm text-[#2f3a4a]">Studio</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="student_accommodation"
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="ml-2 text-sm text-[#2f3a4a]">
              Student accommodation
            </span>
          </label>
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="whole_property"
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="ml-2 text-sm text-[#2f3a4a]">Whole property</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="homestay"
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="ml-2 text-sm text-[#2f3a4a]">Homestay</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="one_bed_flats"
              className="h-4 w-4 rounded border-gray-300"
            />
            <span className="ml-2 text-sm text-[#2f3a4a]">1 bed flats</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AccommodationType;
