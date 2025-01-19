import React from 'react';
import { Head } from '@inertiajs/react';
import Footer from '@/Components/footer';
import Navbar from './navbar';
import { motion } from 'framer-motion';

const AboutUs = ({auth}) => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <>
            <Head title="Tentang Kami" />
            <Navbar auth={auth} />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <motion.div 
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                    className="container mx-auto px-4 py-12 max-w-4xl"
                >
                    <motion.div 
                        variants={fadeIn}
                        className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 backdrop-blur-lg bg-opacity-90"
                    >
                        {/* Header Section with Animation */}
                        <motion.div 
                            variants={fadeIn}
                            className="text-center space-y-4 mb-12"
                        >
                            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-300 animate-gradient">
                                Tentang Kami
                            </h1>
                            <p className="md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                Kami adalah tim yang berkomitmen untuk menyediakan platform yang membantu siswa dalam mengelola dan mendokumentasikan data PKL secara efisien.
                            </p>
                        </motion.div>

                        {/* Vision Section with Hover Effects */}
                        <motion.div 
                            variants={fadeIn}
                            className="grid gap-8 md:grid-cols-2 mb-12"
                        >
                            <motion.div 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4 flex items-center gap-3">
                                    <motion.svg 
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="w-6 h-6" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </motion.svg>
                                    Visi Kami
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Menjadi platform terbaik yang membantu siswa dalam mengelola pengalaman PKL mereka dengan cara yang lebih mudah, efisien, dan terorganisir.
                                </p>
                            </motion.div>

                            <motion.div 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-3">
                                    <motion.svg 
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="w-6 h-6" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </motion.svg>
                                    Misi Kami
                                </h2>
                                <motion.ul className="space-y-3 text-gray-600 dark:text-gray-300">
                                    {["Memberikan kemudahan pengelolaan data magang",
                                      "Menawarkan solusi berbasis teknologi",
                                      "Memfasilitasi kolaborasi antar pihak"].map((item, index) => (
                                        <motion.li 
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.2 }}
                                            className="flex items-center gap-2"
                                        >
                                            <motion.span 
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="w-2 h-2 bg-blue-500 rounded-full"
                                            />
                                            {item}
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            </motion.div>
                        </motion.div>

                        {/* Team Section with Card Animations */}
                        <motion.div variants={fadeIn} className="mb-12">
                            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">
                                Tim Kami
                            </h2>
                            <div className="grid gap-6 md:grid-cols-3">
                                {[
                                    {
                                        name: "M. Ghifari Bima Khadafi",
                                        role: "Full Stack Developer"
                                    },
                                    {
                                        name: "Mutia Risnawati",
                                        role: "UI/UX Designer"
                                    },
                                    {
                                        name: "Rizqi Fadillah Azhar",
                                        role: "Backend Developer"
                                    }
                                ].map((member, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.2 }}
                                        className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        <motion.div 
                                            animate={{ 
                                                boxShadow: ["0px 0px 0px rgba(79, 70, 229, 0.2)", "0px 0px 20px rgba(79, 70, 229, 0.4)", "0px 0px 0px rgba(79, 70, 229, 0.2)"]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                                        >
                                            {member.name.charAt(0)}
                                        </motion.div>
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center mb-2">{member.name}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-center">{member.role}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Contact Section with Hover Animation */}
                        <motion.div 
                            variants={fadeIn}
                            whileHover={{ scale: 1.01 }}
                            className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 rounded-xl p-6"
                        >
                            <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">Hubungi Kami</h2>
                            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                                <motion.a 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="mailto:info@domain.com" 
                                    className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-lg transition-all duration-300"
                                >
                                    <motion.svg 
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="w-5 h-5 text-indigo-600" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </motion.svg>
                                    <span className="text-gray-800 dark:text-gray-200">info@domain.com</span>
                                </motion.a>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
                <Footer />
            </div>
        </>
    );
}

export default AboutUs;
