import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function NoticeBar() {
  const pathname = usePathname();
  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    setIsHome(pathname === "/");
  }, [pathname]);

  if (!isHome) return null;

  return (
    <div className="bg-gray-700 py-3 text-center text-sm text-white">
      Australia&apos;s biggest share accommodation website{" "}
      <Link href="/about">
        <span className="underline">Learn more</span>
      </Link>
    </div>
  );
}
