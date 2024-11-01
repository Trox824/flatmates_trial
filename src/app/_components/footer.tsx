import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const quickLinks = [
    { title: 'About us', href: '#' },
    { title: 'Privacy policy', href: '#' },
    { title: 'How it works', href: '#' },
    { title: 'Terms & Conditions', href: '#' },
    { title: 'Info', href: '#' },
    { title: 'FAQ & Contact', href: '#' },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      href: '#',
      icon: '/path-to-facebook-icon.svg' // Replace with actual path
    },
    {
      name: 'Twitter',
      href: '#',
      icon: '/path-to-twitter-icon.svg' // Replace with actual path
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: '/path-to-linkedin-icon.svg' // Replace with actual path
    }
  ];

  return (
    <footer className="bg-[#2f3a4a] min-h-[336px] leading-6 m-0 p-0">
      <div className="pt-6 pr-6 pb-16 pl-6 max-w-[1200px] mx-auto">
        {/* Logo */}
        <Link href="/" className="block text-center">
          <Image 
            src="/path-to-logo.svg" // Replace with actual logo path
            alt="Flatmates Logo"
            width={140}
            height={38}
            className="text-white"
          />
        </Link>

        {/* Content Grid */}
        <div className="text-base text-white">
          <div className="flex flex-wrap">
            {/* Description Column */}
            <div className="w-[464px] pr-16 mb-0">
              <p className="font-medium">
                Flatmates.com.au is a peer-to-peer listing site for those looking for shared homes or those looking for a flatmate. Simply create a listing, search, and connect.
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="w-[370px] pr-16 mb-0 text-base leading-7 font-normal">
              <ul className="flex flex-wrap justify-between w-full list-none quick-link">
                {quickLinks.map((link, index) => (
                  <li key={index} className="w-1/2">
                    <Link href={link.href}>
                      <span>{link.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Media Column */}
            <div className="mb-0">
              <h3 className="mb-4">Connect with us on:</h3>
              <ul className="flex space-x-6 logo-list items-center">
                {socialLinks.map((social, index) => (
                  <li key={index}>
                    <Link href={social.href}>
                      <Image 
                        src={social.icon}
                        alt={social.name}
                        width={28}
                        height={28}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Copyright Text */}
            <div className="mt-8 w-full">
              <p className="text-sm">
                Flatmates.com.au is owned and operated by ASX-listed REA Group Ltd (REA:ASX) © REA Group Ltd.
              </p>
            </div>

            {/* Divider */}
            <hr className="border-t border-[#abb0b6] my-8 w-full" />

            {/* Acknowledgment Text */}
            <div className="mt-4 w-full">
              <p className="text-sm">
                In the spirit of reconciliation, Flatmates.com.au acknowledges the Traditional Custodians of Country throughout Australia and their connections to land, sea, and community. We pay our respects to their Elders past, present, and emerging.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;