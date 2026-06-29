"use client";

import React, { useState } from "react";
import { ShieldCheck, Truck, ShoppingCart, Minus, Plus, Heart } from "lucide-react";
import type { Product } from "@/types/catalog";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);

  const increase = () => setQuantity(q => (q < product.stock ? q + 1 : q));
  const decrease = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const discount = product.compare_price 
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0;

  return (
    <div className="flex flex-col">
      {/* Category & Badges */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {product.category && (
          <span className="text-[#D42B2B] text-sm font-bold tracking-widest uppercase">
            {product.category.name}
          </span>
        )}
        {product.is_new_arrival && (
          <span className="bg-blue-600 text-white text-[10px] font-black tracking-wider px-2 py-1 rounded shadow-sm uppercase">
            NEW ARRIVAL
          </span>
        )}
        {discount > 0 && (
          <span className="bg-[#D42B2B] text-white text-[10px] font-black tracking-wider px-2 py-1 rounded shadow-sm uppercase">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-2">
        {product.name}
      </h1>

      {/* SKU & Stock */}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 font-medium">
        {product.sku && <span>SKU: {product.sku}</span>}
        <div className="w-1 h-1 rounded-full bg-gray-300" />
        {product.stock > 0 ? (
          <span className="text-emerald-600 flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            In Stock ({product.stock} available)
          </span>
        ) : (
          <span className="text-red-600 flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            Out of Stock
          </span>
        )}
      </div>

      {/* Pricing */}
      <div className="flex items-end gap-3 mb-8">
        <span className="text-4xl md:text-5xl font-black text-gray-900 leading-none">
          ₹{product.price.toLocaleString("en-IN")}
        </span>
        {product.compare_price && (
          <span className="text-xl text-gray-400 font-semibold line-through decoration-gray-300 mb-1">
            ₹{product.compare_price.toLocaleString("en-IN")}
          </span>
        )}
      </div>

      {/* Short Description */}
      {product.short_description && (
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          {product.short_description}
        </p>
      )}

      {/* Actions (Quantity & Cart) */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Quantity Selector */}
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl h-14 w-full sm:w-36 overflow-hidden">
          <button 
            onClick={decrease}
            disabled={quantity <= 1 || product.stock === 0}
            className="flex-1 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-50 transition-colors h-full"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="flex-1 flex items-center justify-center font-bold text-lg text-gray-900 h-full border-x border-gray-200 bg-white">
            {quantity}
          </span>
          <button 
            onClick={increase}
            disabled={quantity >= product.stock || product.stock === 0}
            className="flex-1 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-50 transition-colors h-full"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Add to Cart CTA */}
        <button 
          disabled={product.stock === 0}
          className="flex-1 h-14 bg-[#D42B2B] text-white font-bold text-lg rounded-xl flex items-center justify-center gap-3 hover:bg-[#b82323] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30"
        >
          <ShoppingCart className="w-5 h-5 fill-current" />
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>

        {/* Wishlist Button */}
        <button 
          onClick={() => setIsWishlist(!isWishlist)}
          className={`h-14 w-14 shrink-0 rounded-xl border flex items-center justify-center transition-colors ${
            isWishlist 
              ? "bg-red-50 border-red-200 text-[#D42B2B]" 
              : "bg-white border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600"
          }`}
        >
          <Heart className={`w-6 h-6 ${isWishlist ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="text-sm">
            <p className="font-bold text-gray-900">2-Year Warranty</p>
            <p className="text-gray-500">Official HID Guarantee</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div className="text-sm">
            <p className="font-bold text-gray-900">Free Delivery</p>
            <p className="text-gray-500">On orders over ₹5,000</p>
          </div>
        </div>
      </div>

    </div>
  );
}
