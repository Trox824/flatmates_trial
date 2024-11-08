interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex gap-2 text-xs">
        {items.map((item, index) => (
          <div key={item.label} className="flex items-center">
            {index > 0 && <span className="mx-2 text-gray-500">›</span>}
            {item.href ? (
              <a href={item.href} className="text-gray-600 hover:text-gray-900">
                {item.label}
              </a>
            ) : (
              <span className="text-gray-900">{item.label}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
