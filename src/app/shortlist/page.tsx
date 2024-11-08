"use client";

import { Breadcrumb } from "~/app/_components/propertiesContent/breadcrumb";
import ListingGrid from "~/app/_components/home/ListingGrid";

interface PageProps {
  params: {
    id: string;
  };
}

export default function PersonPage({ params }: PageProps) {
  const { id } = params;

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
