"use client";

import React, { useState } from "react";
import { FileText, Settings, Shield, Download } from "lucide-react";
import type { Product } from "@/types/catalog";

interface ProductTabsProps {
  product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "warranty" | "downloads">("desc");

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      
      {/* Tabs Header */}
      <div className="flex overflow-x-auto border-b border-gray-100 scrollbar-hide">
        <button
          onClick={() => setActiveTab("desc")}
          className={`flex items-center gap-2 px-6 lg:px-8 py-5 text-sm font-bold whitespace-nowrap transition-colors ${
            activeTab === "desc" 
              ? "text-[#D42B2B] border-b-2 border-[#D42B2B] bg-red-50/30" 
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          <FileText className="w-4 h-4" />
          Description
        </button>
        <button
          onClick={() => setActiveTab("specs")}
          className={`flex items-center gap-2 px-6 lg:px-8 py-5 text-sm font-bold whitespace-nowrap transition-colors ${
            activeTab === "specs" 
              ? "text-[#D42B2B] border-b-2 border-[#D42B2B] bg-red-50/30" 
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          <Settings className="w-4 h-4" />
          Specifications
        </button>
        <button
          onClick={() => setActiveTab("warranty")}
          className={`flex items-center gap-2 px-6 lg:px-8 py-5 text-sm font-bold whitespace-nowrap transition-colors ${
            activeTab === "warranty" 
              ? "text-[#D42B2B] border-b-2 border-[#D42B2B] bg-red-50/30" 
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          <Shield className="w-4 h-4" />
          Warranty
        </button>
        {product.documents && product.documents.length > 0 && (
          <button
            onClick={() => setActiveTab("downloads")}
            className={`flex items-center gap-2 px-6 lg:px-8 py-5 text-sm font-bold whitespace-nowrap transition-colors ${
              activeTab === "downloads" 
                ? "text-[#D42B2B] border-b-2 border-[#D42B2B] bg-red-50/30" 
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <Download className="w-4 h-4" />
            Downloads ({product.documents.length})
          </button>
        )}
      </div>

      {/* Tabs Content */}
      <div className="p-6 md:p-8 lg:p-12">
        
        {/* Description Tab */}
        {activeTab === "desc" && (
          <div className="prose prose-lg max-w-none text-gray-600">
            {product.full_description ? (
              <div dangerouslySetInnerHTML={{ __html: product.full_description }} />
            ) : (
              <p>No detailed description available for this product.</p>
            )}
          </div>
        )}

        {/* Specifications Tab */}
        {activeTab === "specs" && (
          <div className="max-w-3xl">
            {product.specifications ? (
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-sm text-gray-600">
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(product.specifications as Record<string, string>).map(([key, value]) => (
                      <tr key={key} className="hover:bg-gray-50">
                        <th className="px-6 py-4 font-bold text-gray-900 bg-gray-50/50 w-1/3 border-r border-gray-200">
                          {key}
                        </th>
                        <td className="px-6 py-4">
                          {value}
                        </td>
                      </tr>
                    ))}
                    {product.weight && (
                      <tr className="hover:bg-gray-50">
                        <th className="px-6 py-4 font-bold text-gray-900 bg-gray-50/50 w-1/3 border-r border-gray-200">
                          Weight
                        </th>
                        <td className="px-6 py-4">
                          {product.weight} kg
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">No detailed specifications available.</p>
            )}
          </div>
        )}

        {/* Warranty Tab */}
        {activeTab === "warranty" && (
          <div className="max-w-3xl prose prose-lg text-gray-600">
            {product.warranty ? (
              <p>{product.warranty}</p>
            ) : (
              <>
                <p><strong>Standard 2-Year Professional Warranty</strong></p>
                <p>This industrial-grade tool is backed by our comprehensive 2-year warranty covering all manufacturing defects. HID PowerTools provides exceptional after-sales support to ensure your equipment keeps running when you need it most.</p>
              </>
            )}
          </div>
        )}

        {/* Downloads Tab */}
        {activeTab === "downloads" && product.documents && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl">
            {product.documents.map((doc) => (
              <a 
                key={doc.id}
                href={doc.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-[#D42B2B] hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center text-[#D42B2B] group-hover:bg-[#D42B2B] group-hover:text-white transition-colors">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 group-hover:text-[#D42B2B] transition-colors">
                    {doc.title}
                  </p>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mt-1">
                    {doc.document_type}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
