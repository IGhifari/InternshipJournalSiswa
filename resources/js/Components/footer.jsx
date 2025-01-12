import React from 'react';
import { Head, Link } from '@inertiajs/react';



export default function Footer() {
    return(
        <>
            <footer className="mt-10 mb-5  text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Internship Journal. Semua Hak Dilindungi.</p>
                    <div className="flex justify-center gap-6">
                        <Link href="/privacy-policy" className="hover:text-gray-500 transition-all duration-300">Kebijakan Privasi</Link>
                        <Link href="/about" className="hover:text-gray-500 transition-all duration-300">Tentang Kami</Link>
                    </div>
                </footer>
        </>
    )
}