import React, { useState } from "react";

const BedroomAvailable = () => {
  const [activeTab, setActiveTab] = useState("Any");

  return (
    <div className="border-b">
      <h3 className="text-medium mb-4 pt-[1.5rem] font-semibold text-[#2f3a4a]">
        Bedroom available
      </h3>

      <div className="mx-auto mb-4 max-w-[100%] pb-[1.5rem] pt-0">
        {/* Tabs */}
        <div className="mx-auto flex max-w-[100%] rounded-md">
          {["Any", "1+", "2+", "3+", "4+"].map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 p-3 text-center ${
                activeTab === tab
                  ? "bg-[#2f3a4a] text-white"
                  : `border border-[#2f3a4a] bg-white text-[#2f3a4a] ${index === 1 ? "border-l-0 border-r-0" : ""} ${index === 3 ? "border-l-0 border-r-0" : ""}`
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BedroomAvailable;
