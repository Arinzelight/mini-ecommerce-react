/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import clsx from "clsx"; // A utility for conditionally joining class names

import { siteConfig } from "../config/site";

import { Logo, SearchIcon, CartIcon } from "./icons";
import { ThemeSwitch } from "./theme-switch";

// --- Navbar Component ---
export const Navbar = () => {
  // State to control the expansion of the search bar on desktop hover
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  // State to control the visibility of the mobile slide-in menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Placeholder for cart item count.
  const cartItemCount = 3;

  // Event handlers for the desktop search bar hover effect
  const handleSearchMouseEnter = () => setIsSearchExpanded(true);
  const handleSearchMouseLeave = () => setIsSearchExpanded(false);

  // Event handler to toggle the mobile menu's open/close state
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);



  return (
    <nav className="w-full bg-secondary-mint shadow-md sticky top-0 z-50 rounded-b-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo and Site Name */}
        <div className="flex items-center">
          <a
            className="flex items-center gap-2 text-primary hover:text-primary-light font-bold text-lg transition-colors duration-200"
            href="/"
          >
            <Logo className="text-primary" size={32} />
            KNODI
          </a>
        </div>

        {/* Desktop Navigation Links */}
        {/* Hidden on xs, sm, md ; visible as flex on lg screen */}
        <div className="hidden lg:flex flex-grow justify-center">
          <ul className="flex space-x-8">
            {siteConfig.navItems.map((item) => (
              <li key={item.href}>
                <a
                  className={clsx(
                    "text-primary hover:text-primary-light font-medium transition-colors duration-200",
                  )}
                  href={item.href}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section: Icons (Cart, Search, Hamburger) */}
        <div className="flex items-center space-x-6">
          {/* Cart Icon */}
          {/* visible as flex on sm screens and up */}
          <a
            className="hidden sm:relative sm:flex text-primary hover:text-primary-light transition-colors duration-200"
            href="/cart"
          >
            <CartIcon className="w-6 h-6 text-primary" />
            {/* Display cart item count if greater than 0 */}
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </a>

          {/* Search Icon/Bar */}
          {/* visible as flex on sm screens and up */}
          {/* Expands on hover on lg screens and up */}
          <div
            className="hidden sm:relative sm:flex items-center"
            onMouseEnter={handleSearchMouseEnter}
            onMouseLeave={handleSearchMouseLeave}
          >
            {/* The search input only expands on large screens (lg) otherwise show SearchIcon */}
            {isSearchExpanded && window.innerWidth >= 1024 ? (
              <div className="w-64 transition-all duration-300 ease-in-out">
                {<Searc}
              </div>
            ) : (
              <SearchIcon className="w-6 h-6 text-primary cursor-pointer hover:text-primary-light transition-colors duration-200" />
            )}
          </div>

          {/* Dark Mode Switch */}
          <ThemeSwitch />

          {/* Hamburger Menu Toggle */}
          {/* hidden on lg screens and up */}
          <button
            aria-label="Toggle navigation"
            className="lg:hidden text-primary hover:text-primary-light focus:outline-none transition-colors duration-200"
            onClick={toggleMobileMenu} // Toggles the mobile menu
          >
            {/* Hamburger icon SVG */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (slides in from the right) */}
      <div
        // clsx conditionally applies 'translate-x-full' to slide out, or 'translate-x-0' to slide in
        className={clsx(
          "fixed inset-y-0 right-0 w-64 bg-secondary-blush dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out z-50",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex justify-end p-4">
          <button
            aria-label="Close navigation"
            className="text-primary hover:text-primary-light focus:outline-none transition-colors duration-200" // Close icon color
            onClick={toggleMobileMenu} // Closes the mobile menu
          >
            {/* Close (X) icon SVG */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col p-4 space-y-4">
          {/* Mobile Navigation Links */}
          {siteConfig.navMenuItems.map((item, index) => (
            <li key={`${item.href}-${index}`}>
              <a
                className="block text-primary hover:text-primary-light transition-colors duration-200 text-lg"
                href={item.href}
                onClick={toggleMobileMenu} // Close menu when a link is clicked
              >
                {item.label}
              </a>
            </li>
          ))}
          {/* Mobile Search Bar */}
          <li className="py-2">
            {<Searc} {/* Reuses the search input component */}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
