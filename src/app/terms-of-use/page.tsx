"use client";
import React, { useEffect, useState } from "react";
import AppLayout from "@src/components/AppLayout";
import { useSearchParams } from "next/navigation";
import { CompanyName } from "@constants";
import RefundPolicy from "./_components/RefundPolicy";
import DeliveryReturn from "./_components/DeliveryReturn";

const Page = () => {
	const searchParams = useSearchParams().toString();
	const search = searchParams.replace(/=$/, "");
	const [activeTab, setActiveTab] = useState<string>("termsOfUse");

	useEffect(() => {
		if (search === "terms-of-use") {
			setActiveTab("termsOfUse");
		} else if (search === "privacy-policy") {
			setActiveTab("privacyPolicy");
		} else if (search === "delivery-return") {
			setActiveTab("deliveryReturn");
		} else if (search === "refund-policy") {
			setActiveTab("refundPolicy");
		}
	}, [search]);

	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
	};

	return (
		<AppLayout>
			<main className='bg-white mx-auto mt-20 lg:mt-32 pb-8 lg:pb-24'>
				<section className='flex w-full flex-col items-center pt-8 xl:pt-16 gap-2 sm:gap-3 px-2 sm:px-8 md:px-16 text-center'>
					<h4 className='text-black text-base sm:text-xl font-semibold leading-[120%]'>
						Our Policies
					</h4>
					<h3 className='font-semibold text-xl sm:text-2xl md:text-3xl leading-[150%]'>
						Zionville Global Stores Limited Policies
					</h3>
					<span className='text-xs sm:text-sm xl:text-base leading-[150%] text-black/80 sm:max-w-3xl slg:max-w-2xl'>
						At Zionville Global Stores Limited, we operate modern park and shop
						variety stores to meet all customer needs while serving as
						manufacturers' representatives and suppliers of general goods with
						comprehensive contract services and customer satisfaction
						guarantees.
					</span>
					<div className='flex gap-2 mt-3 xl:mt-8 text-[10px] xs:text-xs sm:text-sm slg:text-base leading-[140%] bg-[#F5F5F5] p-1 rounded-md transition'>
						<button
							className={`px-2 xl:px-4 py-2 rounded-md ${
								activeTab === "termsOfUse"
									? "bg-white text-black"
									: "bg-[#F5F5F5] text-[#667085]"
							}`}
							onClick={() => handleTabClick("termsOfUse")}
						>
							Terms of use
						</button>
						<button
							className={`px-2 xl:px-4 py-2 rounded-md ${
								activeTab === "privacyPolicy"
									? "bg-white text-black"
									: "bg-[#F5F5F5] text-[#667085]"
							}`}
							onClick={() => handleTabClick("privacyPolicy")}
						>
							Privacy Policy
						</button>
						<button
							className={`px-2 xl:px-4 py-2 rounded-md ${
								activeTab === "deliveryReturn"
									? "bg-white text-black"
									: "bg-[#F5F5F5] text-[#667085]"
							}`}
							onClick={() => handleTabClick("deliveryReturn")}
						>
							Delivery & Return
						</button>
						<button
							className={`px-2 xl:px-4 py-2 rounded-md ${
								activeTab === "refundPolicy"
									? "bg-white text-black"
									: "bg-[#F5F5F5] text-[#667085]"
							}`}
							onClick={() => handleTabClick("refundPolicy")}
						>
							Refund Policy
						</button>
					</div>
				</section>

				<div className='flex mx-auto w-full mt-4 md:mt-8 text-base leading-[155%] px-2 sm:px-0 sm:max-w-xl slg:max-w-2xl pb-20'>
					{activeTab === "termsOfUse" && (
						<div id='termsOfUse' className='text-[#667085]'>
							<h4 className='text-base sm:text-xl xl:text-2xl font-semibold text-black capitalize'>
								Terms of Use - Zionville Global Stores Limited
							</h4>

							<p className='mt-2 leading-[1.8] text-xs md:text-sm xl:text-base'>
								By shopping at Zionville Global Stores Limited or engaging our
								services as manufacturers' representatives and general goods
								suppliers, you agree to the following comprehensive terms and
								conditions:
							</p>

							<ul className='list-disc pl-5 mt-2 space-y-2 text-xs md:text-sm xl:text-base'>
								<li>
									<span className='font-medium'>
										Park & Shop Variety Stores:
									</span>{" "}
									Zionville Global operates modern retail variety stores
									designed to meet diverse customer needs including household
									items, electronics, clothing, groceries, personal care
									products, and seasonal merchandise. Our stores provide
									convenient shopping experiences with ample parking and
									customer service support.
								</li>
								<li>
									<span className='font-medium'>Product Range & Quality:</span>{" "}
									We stock a comprehensive range of products from reputable
									manufacturers and suppliers, ensuring quality standards and
									competitive pricing. Product categories include home and
									garden, electronics and gadgets, fashion and accessories,
									health and beauty, sports and recreation, and specialty items.
								</li>
								<li>
									<span className='font-medium'>
										Manufacturers' Representative Services:
									</span>{" "}
									As authorized representatives for various manufacturers, we
									provide product sourcing, distribution services, local market
									access, technical support coordination, and warranty service
									facilitation. All represented products come with full
									manufacturer backing and support.
								</li>
								<li>
									<span className='font-medium'>General Goods Supply:</span> Our
									supply services include bulk purchasing, inventory management,
									distribution coordination, and custom sourcing for businesses
									and organizations. We maintain relationships with diverse
									suppliers to meet varied client requirements and
									specifications.
								</li>
								<li>
									<span className='font-medium'>
										General Contract Services:
									</span>{" "}
									We execute general contracts including project coordination,
									timeline management, quality assurance, and delivery
									guarantees. Contract services span multiple industries with
									customized solutions for each client's specific requirements
									and objectives.
								</li>
								<li>
									<span className='font-medium'>Store Shopping Policies:</span>{" "}
									Store hours, payment methods, and shopping guidelines are
									posted at each location. We accept cash, cards, and mobile
									payments with receipt provided for all purchases. Special
									promotions and loyalty programs offer additional value to
									regular customers.
								</li>
								<li>
									<span className='font-medium'>
										Online & In-Store Integration:
									</span>{" "}
									Our online platform complements physical store locations with
									inventory synchronization, online ordering with store pickup
									options, and integrated customer service across all channels.
									Product availability may vary between online and store
									locations.
								</li>
								<li>
									<span className='font-medium'>
										Customer Service Standards:
									</span>{" "}
									We maintain high customer service standards with trained
									staff, product knowledge support, complaint resolution
									procedures, and satisfaction guarantee programs. Customer
									feedback is valued and used for continuous improvement
									initiatives.
								</li>
								<li>
									<span className='font-medium'>
										Bulk & Business Customers:
									</span>{" "}
									Special pricing, credit terms, and dedicated service available
									for bulk purchasers and business customers. Volume discounts,
									scheduled deliveries, and custom packaging options provided
									based on order size and frequency.
								</li>
							</ul>

							<p className='mt-4 leading-[1.8] text-xs md:text-sm xl:text-base'>
								<span className='font-medium'>Product Warranties:</span> All
								products come with applicable manufacturer warranties. We
								facilitate warranty claims and provide replacement coordination.
								Extended warranty options available for selected product
								categories.
							</p>

							<p className='mt-2 leading-[1.8] text-xs md:text-sm xl:text-base'>
								<span className='font-medium'>Store Policies:</span> Store
								policies regarding returns, exchanges, and customer conduct are
								posted prominently. We reserve the right to refuse service or
								modify policies to ensure a safe and pleasant shopping
								environment for all customers.
							</p>
						</div>
					)}

					{activeTab === "privacyPolicy" && (
						<div id='privacyPolicy' className='text-[#667085]'>
							<h4 className='text-sm sm:text-base lg:text-lg font-medium mt-4'>
								RETAIL DATA SECURITY MEASURES
							</h4>

							<p className='mt-2 leading-[1.8] text-xs md:text-sm xl:text-base'>
								We implement comprehensive security measures for all customer
								and business data including PCI-compliant payment processing,
								secure storage of customer information, and restricted access to
								sensitive business data. Store security systems protect both
								customers and data with professional monitoring and access
								controls. Business contract information is maintained with
								confidentiality safeguards.
							</p>

							<h4 className='text-sm sm:text-base lg:text-lg font-medium mt-4'>
								MANUFACTURER & SUPPLIER RELATIONSHIPS
							</h4>

							<p className='mt-2 leading-[1.8] text-xs md:text-sm xl:text-base'>
								As manufacturers' representatives, we share necessary business
								information with partners for inventory management, warranty
								services, and market analysis. Customer purchase data may be
								shared in aggregate form for trend analysis. All manufacturer
								relationships include privacy protection clauses. Supplier
								partnerships maintain strict confidentiality requirements for
								business customer information.
							</p>

							<h4 className='text-sm sm:text-base lg:text-lg font-medium mt-4'>
								CUSTOMER RIGHTS & DATA CONTROL
							</h4>

							<p className='mt-2 leading-[1.8] text-xs md:text-sm xl:text-base'>
								Customers have the right to access their purchase history,
								update personal information, and control marketing
								communications. Loyalty program members can manage their
								preferences and point balances. Business customers can access
								their account information and transaction records. For retail
								privacy inquiries and data requests, contact
								privacy@zionvilleglobal.com.ng.
							</p>
						</div>
					)}

					{activeTab === "deliveryReturn" && (
						<div id='deliveryReturn' className='text-[#667085]'>
							<h3 className='font-semibold text-sm md:text-base xl:text-lg mb-2'>
								DELIVERY & RETURN POLICY - ZIONVILLE GLOBAL STORES LIMITED
							</h3>

							<p className='text-xs md:text-sm xl:text-base mb-4'>
								Zionville Global Stores Limited provides comprehensive shopping
								solutions with convenient delivery options, flexible return
								policies, and excellent customer service across our variety
								stores and business services to ensure complete customer
								satisfaction.
							</p>

							<div className='mb-6'>
								<h4 className='font-medium text-xs md:text-sm xl:text-base mb-2'>
									Store Shopping & Pickup Services
								</h4>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
									<div>
										<h5 className='font-medium text-xs md:text-sm mb-1'>
											In-Store Shopping
										</h5>
										<ul className='list-disc pl-5 space-y-1 text-xs md:text-sm xl:text-base'>
											<li>
												Multiple store locations with ample parking and
												accessibility
											</li>
											<li>
												Store hours: 8 AM - 9 PM Monday through Saturday, 10 AM
												- 7 PM Sunday
											</li>
											<li>
												Shopping carts and baskets available with assistance for
												large items
											</li>
											<li>
												Customer service desk for inquiries, returns, and
												special orders
											</li>
										</ul>
									</div>
									<div>
										<h5 className='font-medium text-xs md:text-sm mb-1'>
											Online Order Pickup
										</h5>
										<ul className='list-disc pl-5 space-y-1 text-xs md:text-sm xl:text-base'>
											<li>
												Order online for convenient store pickup within 2-4
												hours
											</li>
											<li>
												Dedicated pickup area with reserved parking spaces
											</li>
											<li>
												SMS notifications when orders are ready for collection
											</li>
											<li>
												Curbside pickup available for large or heavy items
											</li>
										</ul>
									</div>
								</div>
							</div>

							<div className='mb-6'>
								<h4 className='font-medium text-xs md:text-sm xl:text-base mb-2'>
									Home Delivery Services
								</h4>
								<ul className='list-disc pl-5 space-y-1 text-xs md:text-sm xl:text-base'>
									<li>
										Same-day delivery within Lagos for orders placed before 2 PM
										- ₦2,500
									</li>
									<li>
										Next-day delivery available for all locations within Lagos
										State - ₦1,500
									</li>
									<li>
										Free delivery for purchases over ₦50,000 within Lagos metro
										area
									</li>
									<li>
										National delivery: 3-7 business days with tracking (₦5,000 -
										₦12,000)
									</li>
									<li>
										Large item delivery with professional handling and placement
										service
									</li>
									<li>
										Scheduled delivery appointments available for customer
										convenience
									</li>
								</ul>
							</div>

							<div className='mb-6'>
								<h4 className='font-medium text-xs md:text-sm xl:text-base mb-2'>
									Business & Bulk Order Services
								</h4>
								<ul className='list-disc pl-5 space-y-1 text-xs md:text-sm xl:text-base'>
									<li>
										Dedicated business customer service with account management
									</li>
									<li>
										Volume pricing and bulk order processing with priority
										handling
									</li>
									<li>
										Custom delivery schedules and warehouse direct shipping
									</li>
									<li>
										Invoice billing and extended payment terms for qualified
										businesses
									</li>
									<li>
										Specialized packaging and labeling for business requirements
									</li>
									<li>
										Drop shipping services for manufacturers' representative
										products
									</li>
								</ul>
							</div>

							<div className='mb-6'>
								<h4 className='font-medium text-xs md:text-sm xl:text-base mb-2'>
									Return & Exchange Policies
								</h4>
								<div className='space-y-3'>
									<div>
										<p className='font-medium text-xs md:text-sm'>
											General Merchandise Returns:
										</p>
										<ul className='list-disc pl-5 space-y-1 text-xs md:text-sm xl:text-base'>
											<li>
												30-day return policy for most items in original
												condition with receipt
											</li>
											<li>
												Unopened electronics and appliances: 14-day return
												window
											</li>
											<li>
												Clothing and accessories: 30 days with tags attached
											</li>
											<li>
												Defective items replaced immediately with proof of
												purchase
											</li>
										</ul>
									</div>
									<div>
										<p className='font-medium text-xs md:text-sm'>
											Special Categories:
										</p>
										<ul className='list-disc pl-5 space-y-1 text-xs md:text-sm xl:text-base'>
											<li>
												Perishable goods: same-day return for quality issues
												only
											</li>
											<li>
												Personal care items: unopened returns only for safety
												reasons
											</li>
											<li>
												Custom orders: non-returnable unless defective or
												damaged
											</li>
											<li>
												Clearance and sale items: final sale with warranty
												coverage only
											</li>
										</ul>
									</div>
								</div>
							</div>

							<div className='mb-6'>
								<h4 className='font-medium text-xs md:text-sm xl:text-base mb-2'>
									Manufacturers' Representative Services
								</h4>
								<ul className='list-disc pl-5 space-y-1 text-xs md:text-sm xl:text-base'>
									<li>
										Direct manufacturer warranty service and claims processing
									</li>
									<li>
										Product registration assistance and extended warranty
										options
									</li>
									<li>
										Technical support coordination and troubleshooting
										assistance
									</li>
									<li>
										Replacement parts ordering and installation referral
										services
									</li>
									<li>
										Product recall coordination and customer notification
										services
									</li>
									<li>
										Training and education on proper product use and maintenance
									</li>
								</ul>
							</div>

							<div className='mt-6 pt-4 border-t border-gray-200'>
								<h4 className='font-semibold text-xs md:text-sm xl:text-base mb-2'>
									Customer Service Contact
								</h4>
								<ul className='list-disc pl-5 space-y-1 text-xs md:text-sm xl:text-base'>
									<li>Store Locations: stores@zionvilleglobal.com.ng</li>
									<li>Online Orders: online@zionvilleglobal.com.ng</li>
									<li>Business Services: business@zionvilleglobal.com.ng</li>
									<li>Delivery Services: delivery@zionvilleglobal.com.ng</li>
									<li>Customer Service: +234-801-234-5012</li>
									<li>Website: www.zionvilleglobal.com.ng</li>
								</ul>
							</div>
						</div>
					)}

					{activeTab === "refundPolicy" && (
						<div id='refundPolicy' className='text-[#667085]'>
							<h3 className='font-semibold text-sm md:text-base xl:text-lg mb-2'>
								REFUND POLICY - ZIONVILLE GLOBAL STORES LIMITED
							</h3>
							<p className='text-xs md:text-sm xl:text-base mb-4'>
								Effective Date: {new Date().toLocaleDateString("en-GB")}
							</p>

							<p className='text-xs md:text-sm xl:text-base mb-4'>
								At Zionville Global Stores Limited, customer satisfaction is our
								top priority. Our comprehensive refund policy covers retail
								purchases, business services, and manufacturers' representative
								obligations to ensure fair treatment and exceptional customer
								service across all our operations.
							</p>

							<ul className='list-disc pl-5 space-y-3 leading-[1.8] text-xs md:text-sm xl:text-base'>
								<li>
									<span className='font-medium'>
										1. Retail Purchase Refunds
									</span>
									<ul className='list-disc pl-5 mt-1 space-y-1'>
										<li>
											Full refund for defective or damaged items within 30 days
											of purchase
										</li>
										<li>
											Store credit or exchange for items in original condition
											with receipt
										</li>
										<li>
											Cash refunds for purchases under ₦10,000, store credit for
											larger amounts
										</li>
										<li>
											No-receipt returns accepted with valid ID up to ₦5,000
											(store credit only)
										</li>
										<li>
											Immediate replacement for items that fail within
											manufacturer warranty period
										</li>
									</ul>
								</li>

								<li>
									<span className='font-medium'>
										2. Product Category Specific Refunds
									</span>
									<ul className='list-disc pl-5 mt-1 space-y-1'>
										<li>
											<strong>Electronics:</strong> 14-day return period, must
											be in original packaging with all accessories
										</li>
										<li>
											<strong>Clothing & Accessories:</strong> 30-day return
											with original tags and receipt
										</li>
										<li>
											<strong>Home & Garden:</strong> 30-day return for unused
											items, 1-year warranty on major appliances
										</li>
										<li>
											<strong>Health & Beauty:</strong> Unopened items only,
											14-day return period for safety reasons
										</li>
										<li>
											<strong>Seasonal Items:</strong> Returns accepted until
											end of relevant season
										</li>
									</ul>
								</li>

								<li>
									<span className='font-medium'>
										3. Business & Bulk Purchase Refunds
									</span>
									<ul className='list-disc pl-5 mt-1 space-y-1'>
										<li>
											Extended 45-day return period for business customers with
											account status
										</li>
										<li>
											Prorated refunds for partial bulk order cancellations
										</li>
										<li>
											Invoice credit for defective items in large quantity
											purchases
										</li>
										<li>
											Custom order refunds available if specifications are not
											met
										</li>
										<li>
											Restocking fees may apply for non-defective bulk returns
											(15% of order value)
										</li>
									</ul>
								</li>

								<li>
									<span className='font-medium'>
										4. Manufacturers' Representative Refunds
									</span>
									<ul className='list-disc pl-5 mt-1 space-y-1'>
										<li>
											Full manufacturer warranty support with direct claims
											processing
										</li>
										<li>
											Immediate replacement coordination for warranty-covered
											failures
										</li>
										<li>
											Extended warranty claim assistance and service referral
										</li>
										<li>
											Product recall refunds processed according to manufacturer
											guidelines
										</li>
										<li>
											Technical support escalation to manufacturers for complex
											issues
										</li>
									</ul>
								</li>

								<li>
									<span className='font-medium'>5. Non-Refundable Items</span>
									<ul className='list-disc pl-5 mt-1 space-y-1'>
										<li>
											Perishable food items (unless defective upon purchase)
										</li>
										<li>Opened personal care and hygiene products</li>
										<li>Custom-made or personalized items</li>
										<li>Digital downloads and gift cards</li>
										<li>Items damaged due to misuse or normal wear and tear</li>
									</ul>
								</li>

								<li>
									<span className='font-medium'>
										6. Refund Processing Methods
									</span>
									<p className='mt-1'>
										Refunds are processed using the following methods:
									</p>
									<ul className='list-disc pl-5 mt-1 space-y-1'>
										<li>
											Cash refunds: Processed immediately at customer service
											desk
										</li>
										<li>
											Card refunds: 3-5 business days to reflect in customer
											account
										</li>
										<li>
											Store credit: Issued immediately, valid for 12 months
										</li>
										<li>
											Exchange: Processed immediately with price adjustment if
											applicable
										</li>
										<li>
											Business accounts: Invoice credit applied within 48 hours
										</li>
									</ul>
								</li>

								<li>
									<span className='font-medium'>
										7. Return Process Requirements
									</span>
									<ul className='list-disc pl-5 mt-1 space-y-1'>
										<li>
											Original receipt or proof of purchase required for all
											returns
										</li>
										<li>
											Items must be in original condition with packaging when
											applicable
										</li>
										<li>
											Valid government-issued ID required for no-receipt returns
										</li>
										<li>
											Large items may require delivery service for returns (fee
											may apply)
										</li>
										<li>
											Business returns require purchase order or invoice
											documentation
										</li>
									</ul>
								</li>

								<li>
									<span className='font-medium'>
										8. Customer Satisfaction Guarantee
									</span>
									<ul className='list-disc pl-5 mt-1 space-y-1'>
										<li>
											Manager override available for exceptional customer
											service situations
										</li>
										<li>
											Customer feedback survey completion for all refund
											transactions
										</li>
										<li>
											Escalation to regional management for unresolved issues
										</li>
										<li>
											Loyalty program point restoration for returned purchases
										</li>
										<li>
											Goodwill gestures for customers experiencing service
											issues
										</li>
									</ul>
								</li>
							</ul>

							<div className='mt-6 pt-4 border-t border-gray-200'>
								<h4 className='font-semibold text-xs md:text-sm xl:text-base mb-2'>
									Contact Information
								</h4>
								<p className='text-xs md:text-sm xl:text-base'>
									For refunds and customer service:
								</p>
								<ul className='list-disc pl-5 mt-2 space-y-1 text-xs md:text-sm xl:text-base'>
									<li>Zionville Global Stores Limited</li>
									<li>Email: refunds@zionvilleglobal.com.ng</li>
									<li>Customer Service: service@zionvilleglobal.com.ng</li>
									<li>Phone: +234-801-234-5012</li>
									<li>Website: www.zionvilleglobal.com.ng</li>
								</ul>
							</div>
						</div>
					)}
				</div>
			</main>
		</AppLayout>
	);
};

export default Page;
