import React from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { Button } from "./button";
import type { PricingTier, PricingFeature } from "@hid/types";

export interface PricingCardProps {
  tier: PricingTier;
  isHighlighted?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({ tier }) => {
  const isFeatured = tier.color === "featured";
  const savings = tier.originalPrice 
    ? Math.round((1 - tier.price / tier.originalPrice) * 100) 
    : null;

  return (
    <div 
      className={`relative w-full flex flex-col justify-between transition-all duration-300 ${
        isFeatured 
          ? "bg-primary rounded-3xl p-8 md:scale-105 shadow-2xl shadow-primary/40 text-white hover:shadow-primary/60 z-10" 
          : "bg-surface border border-border rounded-3xl p-8 hover:shadow-xl hover:border-primary/30 z-0"
      }`}
    >
      <div className="flex flex-col">
        {/* TAG BADGE */}
        {tier.tag !== "" && (
          <div className="mb-4">
            <span className={`text-xs font-bold px-3 py-1 rounded-full inline-block ${
              isFeatured ? "bg-white text-primary" : "bg-primary/10 text-primary"
            }`}>
              {tier.tag}
            </span>
          </div>
        )}

        {/* PRICE BLOCK */}
        <h3 className={`font-bold text-lg ${isFeatured ? "text-white" : "text-text"}`}>
          {tier.name}
        </h3>
        
        <p className={`text-sm mt-1 ${isFeatured ? "text-white/70" : "text-text-muted"}`}>
          {tier.description}
        </p>

        {tier.originalPrice !== null && (
          <div className="mt-4">
            <span className={`line-through text-sm ${isFeatured ? "text-white/50" : "text-text-muted/60"}`}>
              ₹{tier.originalPrice.toLocaleString('en-IN')}
            </span>
          </div>
        )}

        <div className="flex items-baseline mt-1">
          <span className={`font-black text-5xl ${isFeatured ? "text-white" : "text-text"}`}>
            ₹{tier.price.toLocaleString('en-IN')}
          </span>
          <span className={`text-sm font-normal opacity-70 ml-1 ${isFeatured ? "text-white" : "text-text"}`}>
            {tier.billingNote}
          </span>
        </div>

        {savings !== null && (
          <div className="mt-2">
            <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full inline-block">
              Save {savings}%
            </span>
          </div>
        )}

        {/* DIVIDER */}
        <div className={`h-px w-full my-6 ${isFeatured ? "bg-white/20" : "bg-border"}`} />

        {/* FEATURES LIST */}
        <ul className="space-y-3 flex-1 mb-8">
          {tier.features.map((feature: PricingFeature, index: number) => (
            <li key={index} className="flex flex-row items-start gap-3">
              {feature.included ? (
                <Check 
                  size={16} 
                  className={`flex-shrink-0 mt-0.5 ${isFeatured ? "text-white" : "text-green-500"}`} 
                />
              ) : (
                <X 
                  size={16} 
                  className={`flex-shrink-0 mt-0.5 ${isFeatured ? "text-white/30" : "text-text-muted/40"}`} 
                />
              )}
              
              <span className={`text-sm ${
                feature.included 
                  ? (isFeatured ? "text-white" : "text-text") 
                  : (isFeatured ? "text-white/40 line-through" : "text-text-muted/50 line-through")
              }`}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA BUTTON */}
      <div className="w-full mt-auto">
        {isFeatured ? (
          <Link href={tier.ctaHref} className="block w-full">
            <button className="bg-white text-primary font-bold rounded-xl py-3 w-full hover:bg-white/90 transition duration-200">
              {tier.cta}
            </button>
          </Link>
        ) : (
          <Link href={tier.ctaHref} className="block w-full">
            <Button variant="primary" size="md" className="w-full">
              {tier.cta}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PricingCard;
// ✅ FILE COMPLETE
