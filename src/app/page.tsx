"use client";
import HeroSection from "~/app/_components/home/HeroSection";
import ListingGrid from "~/app/_components/home/ListingGrid";
import CreateListingButton from "~/app/_components/home/CreateListingButton";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ListingGrid isShortlist={false} />
      <CreateListingButton isVisible={false} />
    </main>
  );
}
