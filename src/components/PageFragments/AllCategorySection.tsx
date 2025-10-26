"use client";
import React from "react";
import Picture from "../picture/Picture";
import {
  heroZion1,
  heroZion2,
  heroZion3,
  heroZion4,
  heroZion5,
  heroZion6,
} from "@public/images";

import Link from "next/link";
import { useCategories } from "../lib/woocommerce";

const AllCategorySection = () => {
  const PROMO_IMAGES = [
    { id: 1, src: heroZion1, alt: "Father’s Day Blue" },
    { id: 2, src: heroZion2, alt: "Shopping Festival" },
    { id: 3, src: heroZion3, alt: "Summer Sale" },
    { id: 4, src: heroZion6, alt: "Father’s Day Red" },
    { id: 5, src: heroZion5, alt: "Mother’s Day" },
    { id: 6, src: heroZion6, alt: "Father’s Day Red" },
  ];

  const {
    data: categories,
    isLoading: categoryWpIsLoading,
    isError: categoryIsError,
  } = useCategories("");

  const Categories: CategoryType[] = categories;

  return (
    <>
      <section className="mx-auto max-w-[1300px] sm:px-6 pt-5 md:pt-24 lg:pt-32">
        <div className="flex w-full flex-col gap-4 overflow-x-auto no-scrollbar mb-4 md:mb-5">
          {/* Top Row - First Image */}
          <div className="flex items-center space-x-3 sm:space-x-4 px-2">
            <Picture
              src={PROMO_IMAGES[0].src}
              alt={PROMO_IMAGES[0].alt}
              className="object-cover rounded-xl md:rounded-3xl h-44 sm:h-52 md:h-60 flex-shrink-0 min-w-[300px] sm:min-w-[380px] md:min-w-[460px] lg:max-w-[200px]"
            />

            {/* Top Row - Second Image */}
            <Picture
              src={PROMO_IMAGES[1].src}
              alt={PROMO_IMAGES[1].alt}
              className="object-cover rounded-xl md:rounded-3xl h-44 sm:h-52 md:h-60 flex-shrink-0 min-w-[260px] sm:min-w-[340px] md:min-w-[400px] lg:max-w-[400px]"
            />

            {/* Top Row - Third Image */}
            <Picture
              src={PROMO_IMAGES[2].src}
              alt={PROMO_IMAGES[2].alt}
              className="object-cover rounded-xl md:rounded-3xl h-44 sm:h-52 md:h-60 flex-shrink-0 min-w-[240px] sm:min-w-[300px] md:min-w-[360px] lg:max-w-[200px]"
            />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex w-full flex-col gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center space-x-3 sm:space-x-4 px-2">
            <Picture
              src={PROMO_IMAGES[3].src}
              alt={PROMO_IMAGES[3].alt}
              className="object-cover rounded-xl md:rounded-3xl h-44 sm:h-52 md:h-60 flex-shrink-0 min-w-[240px] sm:min-w-[300px] md:min-w-[360px] lg:max-w-[400px]"
            />

            <Picture
              src={PROMO_IMAGES[4].src}
              alt={PROMO_IMAGES[4].alt}
              className="object-cover rounded-xl md:rounded-3xl h-44 sm:h-52 md:h-60 flex-shrink-0 min-w-[320px] sm:min-w-[500px] md:min-w-[600px] lg:max-w-[700px]"
            />

            <Picture
              src={PROMO_IMAGES[5].src}
              alt={PROMO_IMAGES[5].alt}
              className="object-cover rounded-xl md:rounded-3xl h-44 sm:h-52 md:h-60 flex-shrink-0 min-w-[200px] sm:min-w-[280px] md:min-w-[320px] lg:w-fit"
            />
          </div>
        </div>
      </section>
      <div className="bg-white relative">
        <div className="w-full space-y-4 lg:space-y-8 mt-2 sm:mt-8 lg:mt-0 pt-5 sm:pt-7 lg:py-14 px-4 sm:px-5 lg:px-5 max-w-[1256px] mx-auto">
          <div className="flex flex-col items-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
              Categories
            </h2>
            <div className="w-full space-y-2">
              <div className="relative">
                {/* Scrollable container with touch-friendly padding */}
                <div className="flex overflow-x-auto scroll-smooth pb-4 -mx-4 sm:-mx-6 px-4 sm:px-6 no-scrollbar touch-pan-x">
                  <div className="flex flex-nowrap gap-3 sm:gap-4">
                    {Categories?.map((category) => (
                      <div
                        key={category?.id}
                        className="flex-shrink-0 w-40 sm:w-48 md:w-56 group cursor-pointer" // Responsive widths
                      >
                        {/* Card with better mobile touch target */}
                        <div className="h-full p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border border-gray-100 transition-all duration-300 hover:border-primaryColor-100 hover:bg-primaryColor-100/10 active:scale-95 hover:shadow-xs">
                          <div className="flex flex-col items-center text-center">
                            <span className="text-base sm:text-lg font-semibold text-gray-800 group-hover:text-primaryColor-100 transition-colors">
                              {category?.name}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-1.5 px-2 py-1 bg-gray-50 rounded-full">
                              {category?.count}{" "}
                              {category?.count === 1 ? "item" : "items"}
                            </span>
                            {category?.description && (
                              <p className="text-xs text-gray-500 mt-2 sm:mt-3 line-clamp-2">
                                {category?.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gradient fade indicators - mobile optimized */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-4 sm:w-6 bg-gradient-to-r from-white via-white/80 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-4 sm:w-6 bg-gradient-to-l from-white via-white/80 to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Decorative text - hidden on mobile for cleaner look */}
        <div className="absolute bottom-5 sm:bottom-10 lg:bottom-5 right-0 z-10 hidden sm:block">
          <span className="text-xs text-gray-400 italic">Categories</span>
        </div>
      </div>
    </>
  );
};

export default AllCategorySection;
