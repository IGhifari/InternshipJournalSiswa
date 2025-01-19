import React from 'react';
import { Head, Link } from '@inertiajs/react';



export default function Footer() {
    return(
        <>
            <footer className="bg-white dark:bg-gray-800 shadow-lg mt-20">
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-gray-600 dark:text-gray-400">
                                &copy; {new Date().getFullYear()} Internship Journal Siswa. Semua Hak Dilindungi.
                            </p>
                            <div className="flex gap-6">
                                <Link href="/privacy-policy" className="text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300">
                                    Kebijakan Privasi
                                </Link>
                                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-300">
                                    Tentang Kami
                                </Link>
                            </div>
                        </div>
                    </div>
            </footer>
        </>
    )
}