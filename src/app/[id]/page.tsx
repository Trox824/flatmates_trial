"use client";

import { api } from "~/trpc/react";
import { Breadcrumb } from "~/app/_components/breadcrumb";
import ImageScroll from "~/app/_components/ImageScroll";
import PropertiesContent from "~/app/_components/propertiesContent/PropertiesContent";
import PropertyAside from "~/app/_components/propertiesContent/PropertyAside";

interface PageProps {
  params: {
    id: string;
  };
}

export default function PersonPage({ params }: PageProps) {
  const { id } = params;

  const imagePaths = [
    "/images/housemate.png",
    "/images/housemate.png",
    "/images/housemate.png",
    "/images/housemate.png",
    "/images/housemate.png",
    "/images/housemate.png",
    "/images/housemate.png",
  ];

  return (
    <div>
      <div className="bg-[#f4f5f5] p-1">
        <div className="m-auto block max-w-[1200px] px-[3%]">
          <div className="p- flex w-full flex-row justify-center gap-5">
            <h4 className="mb-0 inline-block w-auto align-middle text-[1rem] font-semibold leading-[2rem] text-[#2f3a4a]">
              Get started with a FREE listing
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
      <div className="container mx-auto max-w-7xl max-w-[75rem] p-4 px-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Rooms", href: "/rooms" },
            { label: "Benowa, 4217", href: "/rooms/benowa-4217" },
            { label: "Granny Flats", href: "/rooms/benowa-4217/granny-flats" },
            { label: "P1637491" },
          ]}
        />
        <ImageScroll imagePaths={imagePaths} />

        <div className="flex gap-8">
          <PropertiesContent />
          <PropertyAside />
        </div>
      </div>
    </div>
  );
}
