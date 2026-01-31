import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Roboto } from "next/font/google";
import AppProvider from "@src/components/config/AppProvider";
import { SEODATA } from "@constants/seoContants";
import { Metadata } from "next";

const roboto = Roboto({
	subsets: ["latin-ext"],
	weight: ["100", "300", "400", "500", "700", "900"],
	style: ["normal"],
});

const { description, title } = SEODATA.default;
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
	other: {
		"application/ld+json": JSON.stringify({
			"@context": "https://schema.org",
			"@type": "Organization",
			"name": "Your Company Name",
			"url": "https://yourwebsite.com",
			"founder": {
				"@type": "Organization",
				"name": "SLEM Technologies",
				"url": "https://slemtech.com",
				"founder": {
					"@type": "Person",
					"name": "Anselm Fowel",
					"url": "https://anselmfowel.com",
					"jobTitle": "CEO"
				}
			}
		})
	}
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={`${roboto.className} w-full min-h-screen`}>
				<AppProvider>{children}</AppProvider>
			</body>
		</html>
	);
}
