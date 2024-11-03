import Link from "next/link";

export default function NoticeBar() {
  return (
    <div className="bg-gray-700 py-3 text-center text-sm text-white">
      Australia&apos;s biggest share accommodation website{" "}
      <Link href="/about" className="underline">
        Learn more
      </Link>
    </div>
  );
}
