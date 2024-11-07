import RentPerWeek from "../advancedFilter/RentPerWeek";
import Availability from "../advancedFilter/availability";
import AccommodationType from "../advancedFilter/AccommodationType";
import Household from "../advancedFilter/Household";
import BedroomAvailable from "../advancedFilter/BedroomAvailable";

const AdvancedFilterModal = () => {
  return (
    <>
      <RentPerWeek />
      <Availability />
      <AccommodationType />
      <Household />
      <BedroomAvailable />
      <div className="sticky bottom-0 flex justify-center border-t bg-white py-[1.5rem]">
        <button className="w-[50%] rounded-md bg-[#006977] px-6 py-3 text-white">
          Update
        </button>
      </div>
    </>
  );
};

export default AdvancedFilterModal;
