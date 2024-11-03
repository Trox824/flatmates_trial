import Navbar from "../_components/navbar"
export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100/80">
      {children}
    </div>
  );
}