import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from './navbar';
import './scrollbar.css'
import Footer from '@/Components/footer';

const PrivacyPolicy = ({auth}) => {
    return (
        <>
            <Head title="Kebijakan Privasi" />
            <Navbar auth={auth} />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-4 py-12 max-w-4xl">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
                        <div className="space-y-6">
                            <div className="text-center space-y-4">
                                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-300">
                                    Kebijakan Privasi
                                </h1>
                                <p className="text-lg text-gray-600 dark:text-gray-400">
                                    <span className="font-semibold">Pembaruan Terakhir:</span> {new Date().toLocaleDateString()}
                                </p>
                            </div>

                            {/* Sections with enhanced styling */}
                            {[
                                {
                                    title: "1. Informasi yang Kami Kumpulkan",
                                    content: "Kami mengumpulkan informasi pribadi Anda untuk memberikan layanan terbaik. Jenis informasi yang kami kumpulkan termasuk:",
                                    list: [
                                        "Informasi Akun: Nama, alamat email, dan informasi lainnya yang Anda berikan saat mendaftar.",
                                        "Informasi Penggunaan: Data terkait aktivitas Anda saat menggunakan platform kami.",
                                        "Informasi Perangkat: Informasi mengenai perangkat yang Anda gunakan."
                                    ]
                                },
                                {
                                    title: "2. Bagaimana Kami Menggunakan Informasi Anda",
                                    content: "Kami menggunakan informasi yang kami kumpulkan untuk tujuan berikut:",
                                    list: [
                                        "Menyediakan, memelihara, dan meningkatkan layanan kami.",
                                        "Menyediakan dukungan pelanggan dan komunikasi terkait layanan.",
                                        "Menganalisis penggunaan dan performa platform kami untuk meningkatkan pengalaman pengguna.",
                                        "Mengirimkan informasi terkait akun dan pembaruan layanan (jika diperlukan)."
                                    ]
                                },
                                {
                                    title: "3. Bagaimana Kami Melindungi Informasi Anda",
                                    content: "Kami berkomitmen untuk melindungi data pribadi Anda. Kami menggunakan langkah-langkah keamanan yang wajar dan praktik terbaik untuk melindungi informasi Anda dari akses yang tidak sah, perubahan, pengungkapan, atau penghancuran."
                                },
                                {
                                    title: "4. Cookies dan Teknologi Serupa",
                                    content: "Kami menggunakan cookies dan teknologi serupa untuk meningkatkan pengalaman Anda saat menggunakan platform kami. Cookies adalah file teks kecil yang disimpan di perangkat Anda yang memungkinkan kami untuk mengenali pengunjung dan menyimpan preferensi mereka."
                                },
                                {
                                    title: "5. Hak Pengguna",
                                    content: "Sebagai pengguna, Anda memiliki hak-hak tertentu terkait data pribadi Anda, termasuk:",
                                    list: [
                                        "Hak untuk Mengakses: Anda dapat meminta salinan data pribadi yang kami simpan tentang Anda.",
                                        "Hak untuk Memperbaiki: Anda dapat memperbarui atau memperbaiki data pribadi yang tidak akurat.",
                                        "Hak untuk Menghapus: Anda dapat meminta kami untuk menghapus data pribadi Anda, kecuali jika kami diwajibkan untuk mempertahankannya untuk tujuan hukum atau bisnis tertentu."
                                    ]
                                },
                                {
                                    title: "6. Perubahan pada Kebijakan Privasi",
                                    content: "Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Setiap perubahan akan diumumkan di platform kami dengan mencantumkan tanggal pembaruan terbaru di bagian atas kebijakan ini. Kami mendorong Anda untuk memeriksa kebijakan ini secara berkala untuk tetap mengetahui bagaimana data pribadi Anda dilindungi."
                                },
                                {
                                    title: "7. Kontak Kami",
                                    content: "Jika Anda memiliki pertanyaan atau kekhawatiran mengenai Kebijakan Privasi ini atau ingin menggunakan hak-hak Anda terkait data pribadi, Anda dapat menghubungi kami melalui:",
                                    list: [
                                        "Email: sasuke@gmail.com",
                                        "Contact: +6281237142818"
                                    ]
                                }
                            ].map((section, index) => (
                                <div key={index} className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:shadow-md transition-all duration-300">
                                    <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                                        {section.title}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        {section.content}
                                    </p>
                                    {section.list && (
                                        <ul className="space-y-2 list-disc pl-6">
                                            {section.list.map((item, i) => (
                                                <li key={i} className="text-gray-600 dark:text-gray-400">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}

                            {/* Contact Section with enhanced styling */}
                            <div className="mt-8 p-6 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
                                <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                                    Hubungi Kami
                                </h2>
                                <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                                    <a href="mailto:sasuke@gmail.com" 
                                        className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-lg transition-all duration-300">
                                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-gray-800 dark:text-gray-200">sasuke@gmail.com</span>
                                    </a>
                                    <div className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-lg">
                                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span className="text-gray-800 dark:text-gray-200">+6281237142818</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default PrivacyPolicy;
