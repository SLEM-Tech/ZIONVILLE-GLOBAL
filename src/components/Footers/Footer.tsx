"use client";
import React from "react";
import * as Iconbi from "react-icons/bi";
import { motion } from "framer-motion";
import FooterCard from "../Cards/FooterCard";
import Link from "next/link";
import { ChatServiceIconSvg, FileIconSvg, RocketIconSvg } from "../SvgIcons";
import useToken from "../hooks/useToken";
import { signOut } from "@utils/lib";
import { CompanyName, filterCustomersByEmail } from "@constants";
import { useCustomer } from "../lib/woocommerce";
import { LogoImage } from "@utils/function";

interface footerDataProps {
  title: string;
  links: {
    label: string;
    href: string;
    function?: () => void;
  }[];
}

const Footer = () => {
  const { email } = useToken();
  const currentYear = new Date().getFullYear();
  const { data: customer, isLoading, isError } = useCustomer("");
  const wc_customer2_info: Woo_Customer_Type[] = customer;
  const wc_customer_info: Woo_Customer_Type | undefined =
    filterCustomersByEmail(wc_customer2_info, email);
  const firstName = wc_customer_info?.first_name;
  const footer1socialMediaIcons = [
    {
      id: 1,
      icon: <Iconbi.BiLogoFacebook className="text-lg text-white" />,
      link: "http://facebook.com",
      backgroundColor: "bg-[#365493]",
    },

    {
      id: 3,
      icon: <Iconbi.BiLogoLinkedin className="text-lg text-white" />,
      link: "http://instagram.com",
      backgroundColor: "bg-[#0274B3]",
    },
  ];

  const footerCardData = [
    {
      icon: <RocketIconSvg />,
      name: "Delivery Assistance",
      description: "Seller Online Delivery",
    },
    {
      icon: <FileIconSvg />,
      name: "Secure Purchase",
      description: "100% Secure Payment",
    },
    {
      icon: <ChatServiceIconSvg />,
      name: "Unmatched Service",
      description: "Dedicated Support",
    },
  ];

  const footerData: footerDataProps[] = [
    {
      title: "Account",
      links: [
        {
          label: firstName ? "Update Account" : "Create Account",
          href: firstName ? "/user/account-details" : "/user/register",
        },
        {
          label: firstName ? "Log Out" : "Login",
          href: firstName ? "" : "/user/login",
          function: firstName ? signOut : () => {},
        },
        {
          label: firstName ? "Change Password" : "Forget Password",
          href: firstName ? "/user/change-password" : "/user/forget-password",
        },
      ],
    },
    {
      title: "Information",
      links: [
        { label: "FAQ", href: "/faq" },
        { label: "Support", href: "/contact-us" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Use", href: "/terms-of-use?terms-of-use" },
        { label: "Privacy Policy", href: "/terms-of-use?privacy-policy" },
        { label: "Delivery & Shipping", href: "/terms-of-use?delivery-return" },
        { label: "Refund Policy", href: "/terms-of-use?refund-policy" },
      ],
    },
  ];

  const productCards = footerCardData.map((item, index) => (
    <FooterCard
      key={index}
      icon={item.icon}
      name={item.name}
      description={item.description}
      borderRight={index !== footerCardData.length - 1}
    />
  ));

  const staggerDelay = 0.2;

  return (
    <footer className="bg-white w-full">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-4 lg:pb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <LogoImage className="rounded-md !w-[50px] lg:!w-[60px]" />
            <p className="text-primary text-sm leading-relaxed">
              Operates A Park And Shop Varieties Stores To Meet All Customers
              Needs, Manufacturers Representative, Sales And Supplies Of General
              Goods, General Contracts.
            </p>
          </div>

          {/* Links Columns */}
          {footerData.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-primary transition-colors flex items-start gap-2">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-1 lg:my-6"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-xs text-gray-600 space-x-6">
            <span>
              &copy; {currentYear} {CompanyName}. All rights reserved.
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 order-2 md:order-1">
            {footer1socialMediaIcons.map((item, index) => (
              <motion.a
                href={item.link}
                key={index}
                whileHover={{ y: -2, scale: 1.1 }}
                className={`p-2 rounded-full ${item.backgroundColor} transition-all duration-300`}>
                {item.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
