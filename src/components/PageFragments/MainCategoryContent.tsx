"use client";
import React from "react";
import { useCategories } from "../lib/woocommerce";
import SubCategoryCard from "../Cards/SubCategoryCard";

const MainCategoryContent = () => {
	// WooCommerce API Category
	const {
		data: categories,
		isLoading: categoryWpIsLoading,
		isError: categoryIsError,
	} = useCategories("");

	const Categories: CategoryType[] = categories;

	return (
		<>
			{categoryWpIsLoading && (
				<section className='mb-8'>
					<div className='w-full h-[100px] sm:h-[270px] bg-gray-200 rounded-md animate-pulse' />
				</section>
			)}

			{Categories && (
				<div className=''>
					<h4 className='text-2xl mb-4 font-medium text-center'>
						All Categories
					</h4>
					<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 px-4 sm:px-0'>
						{Categories?.map((data) => (
							<SubCategoryCard
								key={data.id}
								name={data?.name}
								id={data?.id?.toString()}
								image={data?.image?.src}
							/>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default MainCategoryContent;
