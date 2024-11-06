"use client";

import { useState, useEffect, useRef } from "react";
import SearchBar from "./SearchBar";
import ModalContent from "./ModalContent";
export default function FilterModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sticky top-0 z-50 border-gray-300 bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="relative">
          <SearchBar onClick={() => setIsOpen(true)} />
          {isOpen && <ModalContent setIsOpen={setIsOpen} modalRef={modalRef} />}
        </div>
      </div>
    </div>
  );
}
