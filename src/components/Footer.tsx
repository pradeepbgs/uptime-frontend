import React from 'react';
import { FaGithub, FaTwitter } from "react-icons/fa";
import { cn } from "@/lib/utils"

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={cn("bg-black border-t border-white/10 py-5 w-full")}>
            <div className={cn(
                "max-w-6xl mx-auto px-6",
                "flex flex-col md:flex-row",
                "items-center justify-between",
                "text-xs text-white/30"
            )}>
                <div className="mb-3 md:mb-0">
                    &copy; {currentYear} uptime-bot
                </div>

                <div className="flex items-center space-x-4">
                    <a
                        href="https://github.com/pradeepbgs/uptime-frontend"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/30 hover:text-white transition-colors duration-200"
                    >
                        <FaGithub size={18} />
                        <span className="sr-only">GitHub</span>
                    </a>
                    <a
                        href="https://x.com/exvillager"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/30 hover:text-white transition-colors duration-200"
                    >
                        <FaTwitter size={18} />
                        <span className="sr-only">Twitter</span>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
