"use client";

import React, { useState } from "react";
import { FileText, Settings, Shield, Download, ChevronDown } from "lucide-react";
import type { Product } from "@/types/catalog";

interface ProductTabsProps {
  product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "warranty" | "downloads">("desc");
  const [openAccordion, setOpenAccordion] = useState<string | null>("desc");

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      
      {/* Desktop Tabs Header */}
      <div className="hidden lg:flex overflow-x-auto border-b border-gray-100 scrollbar-hide">
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

      {/* Content Area (Desktop Tab Content & Mobile Accordions) */}
      <div className="flex flex-col">
        
        {/* Description Section */}
        <div className="border-b border-gray-100 lg:border-none">
          <button 
            className="flex lg:hidden items-center justify-between w-full p-6 text-left font-bold text-gray-900"
            onClick={() => toggleAccordion("desc")}
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-400" />
              Product Description
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openAccordion === "desc" ? "rotate-180" : ""}`} />
          </button>
          <div className={`${openAccordion === "desc" ? "block" : "hidden"} lg:block p-6 pt-0 lg:p-12 lg:pt-12`}>
            {(activeTab === "desc" || openAccordion === "desc") && (
              <div className="prose prose-lg max-w-none text-gray-600">
                {product.full_description ? (
                  <div dangerouslySetInnerHTML={{ __html: product.full_description }} />
                ) : (
                  <p>No detailed description available for this product.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Specifications Section */}
        <div className="border-b border-gray-100 lg:border-none">
          <button 
            className="flex lg:hidden items-center justify-between w-full p-6 text-left font-bold text-gray-900"
            onClick={() => toggleAccordion("specs")}
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-gray-400" />
              Technical Specifications
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openAccordion === "specs" ? "rotate-180" : ""}`} />
          </button>
          <div className={`${openAccordion === "specs" ? "block" : "hidden"} lg:block p-6 pt-0 lg:p-12 lg:pt-12 ${activeTab !== "specs" ? "lg:hidden" : ""}`}>
            {(activeTab === "specs" || openAccordion === "specs") && (
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
          </div>
        </div>

        {/* Warranty Section */}
        <div className="border-b border-gray-100 lg:border-none">
          <button 
            className="flex lg:hidden items-center justify-between w-full p-6 text-left font-bold text-gray-900"
            onClick={() => toggleAccordion("warranty")}
          >
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-400" />
              Warranty & Support
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openAccordion === "warranty" ? "rotate-180" : ""}`} />
          </button>
          <div className={`${openAccordion === "warranty" ? "block" : "hidden"} lg:block p-6 pt-0 lg:p-12 lg:pt-12 ${activeTab !== "warranty" ? "lg:hidden" : ""}`}>
            {(activeTab === "warranty" || openAccordion === "warranty") && (
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
          </div>
        </div>

        {/* Downloads Section */}
        {product.documents && product.documents.length > 0 && (
          <div className="border-b border-gray-100 lg:border-none">
            <button 
              className="flex lg:hidden items-center justify-between w-full p-6 text-left font-bold text-gray-900"
              onClick={() => toggleAccordion("downloads")}
            >
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-gray-400" />
                Downloads ({product.documents.length})
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openAccordion === "downloads" ? "rotate-180" : ""}`} />
            </button>
            <div className={`${openAccordion === "downloads" ? "block" : "hidden"} lg:block p-6 pt-0 lg:p-12 lg:pt-12 ${activeTab !== "downloads" ? "lg:hidden" : ""}`}>
              {(activeTab === "downloads" || openAccordion === "downloads") && (
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
        )}

      </div>
    </div>
  );
}
