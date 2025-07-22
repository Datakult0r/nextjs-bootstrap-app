"use client";

import Link from "next/link";

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export function MobileMenuOverlay({ 
  isOpen, 
  onClose, 
  isAuthenticated, 
  onLogout 
}: MobileMenuOverlayProps) {
  const handleLogoutAndClose = () => {
    onLogout();
    onClose();
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed left-0 top-0 z-40 h-full w-full bg-white bg-opacity-75 transition-all duration-300 dark:bg-black dark:bg-opacity-75 lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={onClose}
      />

      {/* Mobile Menu Container (Card Style) */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-full transform transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isOpen ? "bg-white dark:bg-black" : ""}`}
      >
        {/* Close Button */}
        <button
          className="absolute right-5 top-4 text-2xl font-bold text-black dark:text-white"
          onClick={onClose}
          aria-label="Close menu"
        >
          &times;
        </button>

        <div className="mt-20 flex flex-col space-y-6 rounded-lg bg-white p-8 shadow-lg dark:bg-black">
          <Link href="/" onClick={onClose}>
            <p className="text-[16px] font-semibold text-black dark:text-white">
              Products →
            </p>
          </Link>
          
          <Link href="/" onClick={onClose}>
            <p className="text-[16px] font-semibold text-black dark:text-white">
              Solutions →
            </p>
          </Link>
          
          <Link href="/pricing" onClick={onClose}>
            <p className="text-[16px] font-semibold text-black dark:text-white">
              Pricing
            </p>
          </Link>
          
          <Link href="/" onClick={onClose}>
            <p className="text-[16px] font-semibold text-black dark:text-white">
              Resources →
            </p>
          </Link>
          
          <Link href="/" onClick={onClose}>
            <p className="text-[16px] font-semibold text-black dark:text-white">
              Company →
            </p>
          </Link>
          
          <Link href="/daily-news" onClick={onClose}>
            <p className="text-[16px] font-semibold text-black dark:text-white">
              Daily News
            </p>
          </Link>
          
          {isAuthenticated ? (
            <button
              className="text-left text-[16px] font-semibold text-black dark:text-white"
              onClick={handleLogoutAndClose}
            >
              Logout
            </button>
          ) : (
            <Link href="/login" onClick={onClose}>
              <p className="text-[16px] font-semibold text-black dark:text-white">
                Login
              </p>
            </Link>
          )}
        </div>
      </div>
    </>
  );
} 