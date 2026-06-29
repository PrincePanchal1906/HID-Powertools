import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex text-sm font-medium text-gray-500" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="inline-flex items-center">
              <Link 
                href={item.href} 
                className={`inline-flex items-center transition-colors ${
                  isLast ? "text-gray-900 pointer-events-none" : "hover:text-[#D42B2B]"
                }`}
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </Link>
              {!isLast && <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
