"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import HeroSection from "~/app/_components/home/HeroSection";
import ListingGrid from "~/app/_components/home/ListingGrid";
import CreateListingButton from "~/app/_components/home/CreateListingButton";
import NoticeBar from "~/app/_components/home/NoticeBar";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ListingGrid isShortlist={false} />
      <CreateListingButton isVisible={false} />
    </main>
  );
}
