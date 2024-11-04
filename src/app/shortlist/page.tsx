"use client";

import { api } from "~/trpc/react";
import { Breadcrumb } from "~/app/_components/breadcrumb";
import ImageScroll from "~/app/_components/ImageScroll";
import PropertiesContent from "~/app/_components/propertiesContent/PropertiesContent";
import PropertyAside from "~/app/_components/propertiesContent/PropertyAside";
import ListingGrid from "~/app/_components/home/ListingGrid";

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
      <div className="container mx-auto max-w-7xl max-w-[75rem] p-4 px-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Shortlist", href: "/shortlist" },
          ]}
        />
        <div className="mb-3 border-b border-gray-200 pb-2 pt-8 text-3xl font-light text-gray-800">
          Shortlist
        </div>
        <ListingGrid isShortlist={true} />
      </div>
    </div>
  );
}
