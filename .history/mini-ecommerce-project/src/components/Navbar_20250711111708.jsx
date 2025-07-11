/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";

import { siteConfig } from "../config/site";

import { Logo, SearchIcon, CartIcon } from "./icons";
import { ThemeSwitch } from "./theme-switch";

export const Navbar = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const cartItemCount = 3;

  const handleSearchMouseEnter = () => setIsSearchExpanded(true);
  const handleSearchMouseLeave = () => setIsSearchExpanded(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const searchInput = (
    <div className="relative flex items-center w-full">
      <SearchIcon className="absolute left-3 text-base text-gray-400 pointer-events-none flex-shrink-0" />
      <input
        aria-label="Search"
        className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-lavender focus:border-transparent dark:bg-gray-700 dark:text-white"
        placeholder="Search..."
        type="search"
      />
    </div>
  );

  return (
    <nav className="w-full bg-secondary-mint shadow-md sticky top-0 z-50 rounded-b-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a
            className="flex items-center gap-2 text-primary hover:text-primary-light font-bold text-lg transition-colors duration-200"
            href="/"
          >
            <Logo className="text-primary" size={32} />
            KNODI
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-grow justify-center">
          <ul className="flex space-x-8">
            {siteConfig.navItems.map((item) => {
              const isActive = currentPath === item.href;

              return (
                <li key={item.href}>
                  <a
                    className={clsx(
                      "font-medium transition-colors duration-200 px-3 py-1 rounded-full",
                      isActive
                        ? "bg-primary text-white"
                        : "text-primary hover:text-primary-light"
                    )}
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-6">
          {/* Cart */}
          <a
            className="hidden sm:relative sm:flex text-primary hover:text-primary-light transition-colors duration-200"
            href="/cart"
          >
            <CartIcon className="w-6 h-6 text-primary" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </a>

          {/* Desktop Search */}
          <div
            className="hidden sm:relative sm:flex items-center"
            onMouseEnter={handleSearchMouseEnter}
            onMouseLeave={handleSearchMouseLeave}
          >
            {isSearchExpanded && window.innerWidth >= 1024 ? (
              <div className="w-64 transition-all duration-300 ease-in-out">
                {searchInput}
              </div>
            ) : (
              <SearchIcon className="w-6 h-6 text-primary cursor-pointer hover:text-primary-light transition-colors duration-200" />
            )}
          </div>

          <ThemeSwitch />

          {/* Hamburger */}
          <button
            aria-label="Toggle navigation"
            className="lg:hidden text-primary hover:text-primary-light focus:outline-none transition-colors duration-200"
            onClick={toggleMobileMenu}
          >
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

      {/* Mobile Menu */}
      <div
        className={clsx(
          "fixed inset-y-0 right-0 w-64 bg-secondary-blush dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out z-50",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-end p-4">
          <button
            aria-label="Close navigation"
            className="text-primary hover:text-primary-light focus:outline-none transition-colors duration-200"
            onClick={toggleMobileMenu}
          >
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
          {siteConfig.navMenuItems.map((item, index) => {
            const isActive = currentPath === item.href;

            return (
              <li key={`${item.href}-${index}`}>
                <a
                  className={clsx(
                    "block transition-colors duration-200 text-lg px-3 py-2 rounded-md",
                    isActive
                      ? "bg-primary text-white"
                      : "text-primary hover:text-primary-light"
                  )}
                  href={item.href}
                  onClick={toggleMobileMenu}
                >
                  {item.label}
                </a>
              </li>
            );
          })}

          {/* Mobile Search */}
          <li className="py-2">{searchInput}</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
