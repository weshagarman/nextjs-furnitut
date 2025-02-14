'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type MenuWrapperProps = {
    children: React.ReactNode;
};

export const MenuWrapper = ({ children }: MenuWrapperProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Close menu when pathname changes (aka user click on a link)
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);
    return (
        <>
            {/* Mobile menu button */}
            <div className="flex-1 sm:hidden flex justify-end items-center">
                <button
                    className="p-4"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    aria-controls="mobile-menu"
                >
                    <svg
                        className="block h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                        />
                    </svg>
                    <span className="sr-only">Toggle menu</span>
                </button>
            </div>

            {/* Desktop navigation */}
            <div className="hidden sm:block bg-red-800">{children}</div>

            {/* Mobile navigation */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 sm:hidden">
                    <div className="bg-light border border-muted rounded-lg shadow-lg p-4">{children}</div>
                </div>
            )}
        </>
    );
};
