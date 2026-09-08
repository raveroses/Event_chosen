"use client";
import { useState } from "react";
import Link from "next/link";
const Footer = () => {
  const [FooterDetail] = useState<{ heading: string; children: string[] }[]>([
    {
      heading: "Use EventChosen",
      children: ["Create Events ", "Pricing", "Mobile Ticket App"],
    },

    {
      heading: "Plan Events",
      children: [
        "Sell Tickets Online",
        "Event Payment System",
        "Event Management Software",
      ],
    },
    {
      heading: "Find Events",
      children: ["Popular Events", "Music Events", "Food & Drink Events "],
    },
    {
      heading: "Connect",
      children: ["Contact Support", "Facebook", "Instagram"],
    },
  ]);
  return (
    <footer
      className="bg-[#1e0a3c] w-full min-w-full text-white flex md:flex-row flex-col gap-6
     items-center md:justify-between justify-center p-5 "
    >
      {FooterDetail.map((footer, index) => {
        return (
          <div className="footer-motherDiv" key={index}>
            <h3 className="text-[15px] font-bold py-5 md:text-left text-center">
              {" "}
              {footer.heading}
            </h3>
            <nav
              className="flex flex-col gap-[10px] text-[12px] md:text-left text-center"
              key={index}
            >
              {footer.children.map((footerChild, index) => {
                return (
                  <Link href="/" key={index}>
                    {footerChild}
                  </Link>
                );
              })}
            </nav>
          </div>
        );
      })}
    </footer>
  );
};

export default Footer;
