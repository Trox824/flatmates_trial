"use client";

import { useQuery } from "@tanstack/react-query";
import { Breadcrumb } from "~/app/_components/propertiesContent/breadcrumb";
import ImageScroll from "~/app/_components/propertiesContent/ImageScroll";
import PropertiesContent from "~/app/_components/propertiesContent/PropertiesContent";
import PropertyAside from "~/app/_components/propertiesContent/PropertyAside";

interface PageProps {
  params: {
    id: string;
  };
}

interface BreadcrumbInfo {
  location: string;
  propertyType: string;
  propertyId: string;
}

export default function PersonPage({ params }: PageProps) {
  const { id } = params;

  /**
   * Capitalizes the first letter of a string.
   * @param {string} str - The string to capitalize.
   * @returns {string} - The capitalized string.
   */
  const capitalize = (str: string): string => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  /**
   * Parses the URL ID to extract Location, Property Type, and Property ID.
   *
   * @param {string} urlId - The URL ID string to parse.
   * @returns {BreadcrumbInfo} - An object containing the formatted Location, Property Type, and Property ID.
   */
  const parseBreadcrumbInfo = (urlId: string): BreadcrumbInfo => {
    // Define Property Types
    const propertyTypes: string[] = [
      "share-house",
      "whole-property",
      "student-accommodation",
      "studio",
      "granny-flat",
      "1-bed",
    ];

    // Extract Property ID (starts with 'P')
    const propertyIdMatch = urlId.match(/P\d+/);
    const propertyId: string = propertyIdMatch ? propertyIdMatch[0] : "";

    // Extract Property Type
    const matchedType = propertyTypes.find((type) => urlId.includes(type));
    const propertyType = matchedType
      ? matchedType
          .split("-")
          .map((word) => capitalize(word))
          .join(" ")
      : "Property";

    // Remove Property Type and Property ID from the URL to get Location
    let locationId = urlId;
    if (matchedType) {
      locationId = locationId.replace(matchedType, "");
    }
    if (propertyId) {
      locationId = locationId.replace(propertyId, "");
    }

    // Replace multiple hyphens with a single hyphen and trim hyphens from start/end
    locationId = locationId.replace(/--+/g, "-").replace(/^-+|-+$/g, "");

    // Split the remaining string by hyphens
    const locationParts = locationId.split("-");

    // Capitalize each part and join with spaces
    const location = locationParts.map((part) => capitalize(part)).join(" ");

    return {
      location,
      propertyType,
      propertyId,
    };
  };

  // Parse the breadcrumb information from the URL ID
  const breadcrumbInfo: BreadcrumbInfo = parseBreadcrumbInfo(id);

  // Fetch room data based on the ID
  const { data: room, isLoading } = useQuery({
    queryKey: ["room", id],
    queryFn: async () => {
      const response = await fetch(`/api/propertyContent/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="loader"></div>
          <p className="mt-4 text-lg text-gray-700">Loading, please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <div className="bg-[#f4f5f5] p-2">
        <div className="m-auto block max-w-[1200px] px-[3%]">
          <div className="flex flex-row justify-center gap-5">
            <h4 className="mb-0 inline-block hidden w-auto align-middle text-[1rem] font-semibold leading-[2rem] text-[#2f3a4a] lg:block">
              Get started with a FREE listing
            </h4>
            <h4 className="mb-0 inline-block w-auto align-middle text-[1rem] font-semibold leading-[2rem] text-[#2f3a4a] lg:hidden">
              Get started
            </h4>
            <div className="flex justify-center gap-2">
              <a
                className="flex min-h-[2rem] min-w-[2rem] items-center justify-center rounded-md border border-[#2f3a4a] bg-[#2f3a4a] px-4 py-[0.375rem] text-center text-white"
                href="#"
              >
                <span className="text-[0.875rem] font-semibold leading-[1.25rem]">
                  Find people
                </span>
              </a>
              <a
                className="flex min-h-[2rem] min-w-[2rem] items-center justify-center rounded-md border border-[#2f3a4a] bg-[#2f3a4a] px-4 py-[0.375rem] text-center text-white"
                href="#"
              >
                <span className="text-[0.875rem] font-semibold leading-[1.25rem]">
                  Find homes
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto max-w-7xl p-4 px-6">
        {/* Breadcrumb Component */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Rooms", href: "/rooms" },
            { label: breadcrumbInfo.location, href: "#" },
            { label: breadcrumbInfo.propertyType, href: "#" },
            { label: breadcrumbInfo.propertyId, href: `/rooms/${id}` },
          ]}
        />

        {/* Image Scroll Component */}
        <ImageScroll imagePaths={room?.images ?? []} />

        {/* Properties Content and Aside */}
        <div className="flex">
          <PropertiesContent
            name={room?.name}
            description={room?.description}
            weeklyRent={room?.weeklyRent}
            bond={room?.bond}
            author={room?.author}
            noBeds={room?.noBeds}
            noBathrooms={room?.noBathrooms}
            propertyFeatures={room?.propertyFeatures}
            roomFeatures={room?.roomFeatures}
            acceptedPeople={room?.acceptedPeople}
            type={room?.type}
            bills={room?.bills}
            noFlatmates={room?.noFlatmates}
            flatmatesDescription={room?.aboutFlatmates}
            bathRoom={room?.bathRoom}
            furnished={room?.furnished}
            acceptingTags={room?.acceptingTags}
            heading2={room?.heading2}
            address2={room?.address2}
          />
          <PropertyAside
            author={room?.author}
            online={room?.online}
            responseRate={room?.responseRate}
            authorAvatar={room?.authorAvatar}
          />
        </div>
      </div>
    </div>
  );
}
