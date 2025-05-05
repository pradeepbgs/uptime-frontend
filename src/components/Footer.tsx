import React from 'react';
import { FaGithub, FaTwitter } from "react-icons/fa";

import { cn } from "@/lib/utils"

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className={cn(
                "bg-[#131a26] text-gray-400 py-6 md:py-8",
                "border-t border-gray-800",
                "w-full"
            )}
        >
            <div
                className={cn(
                    "container mx-auto px-4",
                    "flex flex-col md:flex-row",
                    "items-center justify-between",
                    "text-sm"
                )}
            >
                <div className="mb-4 md:mb-0">
                    &copy; {currentYear} uptime-bot. All rights reserved.
                </div>

                <div className="flex items-center space-x-4">
                    <a
                        href="https://github.com/pradeepbgs/uptime-frontend"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "text-gray-400 hover:text-blue-400 transition-colors",
                            "flex items-center gap-1"
                        )}
                    >
                        <FaGithub size={25}  />
                        <span className="sr-only">GitHub</span>
                    </a>
                    <a
                        href="https://x.com/exvillager"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "text-gray-400 hover:text-blue-400 transition-colors",
                            "flex items-center gap-1"
                        )}
                    >
                        <FaTwitter size={25} />
                        <span className="sr-only">Twitter</span>
                    </a>
                    {/* more links can be added */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
