import React from 'react';
import { motion } from 'framer-motion';

export const ChatAvatar: React.FC = () => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Bear Body/Head Group */}
            <motion.g
                initial={{ y: 5 }}
                animate={{ y: [5, 0, 5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                {/* Left Ear */}
                <circle cx="25" cy="25" r="12" fill="#8B5CF6" /> {/* Violet-500 */}
                <circle cx="25" cy="25" r="6" fill="#DDD6FE" /> {/* Violet-100 */}

                {/* Right Ear */}
                <circle cx="75" cy="25" r="12" fill="#8B5CF6" />
                <circle cx="75" cy="25" r="6" fill="#DDD6FE" />

                {/* Head */}
                <ellipse cx="50" cy="45" rx="35" ry="30" fill="#8B5CF6" />

                {/* Eyes */}
                <motion.g
                    animate={{ scaleY: [1, 1, 0.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.9, 0.95, 1], delay: 1 }}
                >
                    <circle cx="38" cy="40" r="4" fill="white" />
                    <circle cx="38" cy="40" r="2" fill="#1F2937" />
                </motion.g>
                <motion.g
                    animate={{ scaleY: [1, 1, 0.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, times: [0, 0.9, 0.95, 1], delay: 1.1 }}
                >
                    <circle cx="62" cy="40" r="4" fill="white" />
                    <circle cx="62" cy="40" r="2" fill="#1F2937" />
                </motion.g>

                {/* Snout */}
                <ellipse cx="50" cy="52" rx="12" ry="9" fill="#DDD6FE" />
                <ellipse cx="50" cy="49" rx="4" ry="3" fill="#4C1D95" /> {/* Nose */}
                <path d="M 50 52 L 50 56" stroke="#4C1D95" strokeWidth="2" strokeLinecap="round" />
                <path d="M 46 56 Q 50 59 54 56" stroke="#4C1D95" strokeWidth="2" strokeLinecap="round" fill="none" />

                {/* Cheeks */}
                <circle cx="30" cy="52" r="4" fill="#F472B6" opacity="0.6" />
                <circle cx="70" cy="52" r="4" fill="#F472B6" opacity="0.6" />

                {/* Paws */}
                <motion.g
                    animate={{ rotate: [0, -5, 0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    {/* Left Paw */}
                    <ellipse cx="20" cy="75" rx="12" ry="10" fill="#8B5CF6" />
                    <circle cx="20" cy="72" r="4" fill="#DDD6FE" />

                    {/* Right Paw */}
                    <ellipse cx="80" cy="75" rx="12" ry="10" fill="#8B5CF6" />
                    <circle cx="80" cy="72" r="4" fill="#DDD6FE" />
                </motion.g>
            </motion.g>
        </svg>
    );
};
