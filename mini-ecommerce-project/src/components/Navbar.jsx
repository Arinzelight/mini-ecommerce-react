/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useSelector } from "react-redux";

import { siteConfig } from "../config/site";
import { Logo, SearchIcon, CartIcon, HeartIcon } from "./icons";
import { ThemeSwitch } from "./theme-switch";
import SearchInput from "./SearchInput";

export const Navbar = () => {
  const favoriteItems = useSelector((state) => state.favorites.items);
  const cartItems = useSelector((state) => state.cart.items);

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname;

  const cartItemCount = cartItems;

  const searchInputRef = useRef(null);
  const searchIconRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const hamburgerIconRef = useRef(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleClickOutsideSearch = (event) => {
      if (
        isSearchExpanded &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target) &&
        searchIconRef.current &&
        !searchIconRef.current.contains(event.target)
      ) {
        setIsSearchExpanded(false);
      }
    };

    if (isSearchExpanded) {
      document.addEventListener("mousedown", handleClickOutsideSearch);
      document.addEventListener("touchstart", handleClickOutsideSearch);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSearch);
      document.removeEventListener("touchstart", handleClickOutsideSearch);
    };
  }, [isSearchExpanded]);

  useEffect(() => {
    const handleClickOutsideMobileMenu = (event) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        hamburgerIconRef.current &&
        !hamburgerIconRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutsideMobileMenu);
      document.addEventListener("touchstart", handleClickOutsideMobileMenu);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMobileMenu);
      document.removeEventListener("touchstart", handleClickOutsideMobileMenu);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="w-full bg-secondary-mint shadow-md sticky top-0 z-50 rounded-b-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between relative">
        <div className="flex items-center">
          <Link
            className="flex items-center gap-2 text-primary hover:text-primary-light font-bold text-lg transition-colors duration-200"
            to="/"
          >
            <Logo className="text-primary" size={32} />
            KNODI
          </Link>
        </div>

        <div className="hidden lg:flex flex-grow justify-center">
          <ul className="flex space-x-8">
            {siteConfig.navItems.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <li key={item.href}>
                  <Link
                    className={clsx(
                      "font-medium transition-colors duration-200 px-3 py-1 rounded-full",
                      isActive
                        ? "bg-primary text-white"
                        : "text-primary hover:text-primary-light"
                    )}
                    to={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex items-center space-x-4 sm:space-x-6 z-10">
          <Link
            className={clsx(
              "relative flex text-primary hover:text-primary-light transition-colors duration-200",
              { "hidden lg:flex": isSearchExpanded }
            )}
            to="/cart"
          >
            <CartIcon className="w-6 h-6 text-primary" />
            {cartItemCount.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartItemCount.length}
              </span>
            )}
          </Link>

          <Link
            className={clsx(
              "relative flex text-primary hover:text-primary-light transition-colors duration-200",
              { "hidden lg:flex": isSearchExpanded }
            )}
            to="/favorites"
          >
            <HeartIcon className="w-6 h-6 text-primary" />
            {favoriteItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {favoriteItems.length}
              </span>
            )}
          </Link>

          <div className={clsx({ "hidden lg:block": isSearchExpanded })}>
            <ThemeSwitch />
          </div>

          <SearchIcon
            ref={searchIconRef}
            className="w-6 h-6 text-primary cursor-pointer hover:text-primary-light transition-colors duration-200"
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
          />

          <button
            ref={hamburgerIconRef}
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

        <div
          ref={searchInputRef}
          className={clsx(
            "absolute top-1/2 transform -translate-y-1/2 z-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2",
            "transition-all duration-300 ease-in-out",
            {
              "opacity-0 scale-x-0 origin-right pointer-events-none": !isSearchExpanded,
              "opacity-100 scale-x-100": isSearchExpanded,
              "right-[3.5rem] sm:right-30 lg:right-0 lg:w-auto": isSearchExpanded,
              "lg:max-w-md": isSearchExpanded,
            }
          )}
          style={{ display: isSearchExpanded ? "block" : "none" }}
        >
          <SearchInput aria-label="Search" placeholder="Search..." />
        </div>
      </div>

      <div
        ref={mobileMenuRef}
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
                <Link
                  className={clsx(
                    "block transition-colors duration-200 text-lg px-3 py-2 rounded-md",
                    isActive
                      ? "bg-primary text-white"
                      : "text-primary dark:text-secondary-mint hover:text-primary-light"
                  )}
                  to={item.href}
                  onClick={toggleMobileMenu}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}

          <li className="py-2">
            <SearchInput aria-label="Search" placeholder="Search..." />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
