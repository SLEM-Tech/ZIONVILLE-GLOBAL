import AppLayout from "@src/components/AppLayout";
import AllCategorySection from "@src/components/PageFragments/AllCategorySection";
import SortedProducts from "./(Home)/_components/SortedProducts";
import { SEODATA } from "@constants/seoContants";
import { Metadata } from "next";
import MiddleBanner from "./(Home)/_components/MiddleBanner";
import DisplayBanner from "./(Home)/_components/DisplayBanner";

const { description, title } = SEODATA.home;
export const metadata: Metadata = {
	title: title,
	description: description,
	icons: SEODATA.defaultOGImage,
	openGraph: {
		images: [
			{
				url: SEODATA.defaultOGImage,
			},
		],
	},
};

const page = () => {
	return (
		<AppLayout className='pt-14 lg:pt-0 mx-auto lg:mt-0 pb-12'>
			<div className='relative'>
				<AllCategorySection />
			</div>
			<div className='mt-1 sm:mt-5 max-w-[1256px] mx-auto'>
				<SortedProducts />
			</div>
		</AppLayout>
	);
};

export default page;
