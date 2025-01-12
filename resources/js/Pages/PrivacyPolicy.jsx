import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from './navbar';
import './scrollbar.css'
import Footer from '@/Components/footer';
const PrivacyPolicy = ({auth}) => {
    return (
        <>
        <Head title="Kebijakan Privasi" className="privacy " />
        <Navbar auth={auth} />
        <div className=" p-6 bg-white dark:bg-gray-900 shadow-lg w-screen">
            <h1 className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-gray-200">Kebijakan Privasi</h1>

            <p className="text-lg text-gray-600 dark:text-gray-400">
            <strong>Pembaruan Terakhir: {new Date().toLocaleDateString()}</strong>
            </p>

            <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">1. Informasi yang Kami Kumpulkan</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
                Kami mengumpulkan informasi pribadi Anda untuk memberikan layanan terbaik. Jenis informasi yang kami kumpulkan termasuk:
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-400">
                <li>Informasi Akun: Nama, alamat email, dan informasi lainnya yang Anda berikan saat mendaftar untuk membuat akun.</li>
                <li>Informasi Penggunaan: Data terkait aktivitas Anda saat menggunakan platform kami, seperti data login, halaman yang Anda kunjungi, waktu yang dihabiskan, dan interaksi lainnya dengan layanan kami.</li>
                <li>Informasi Perangkat: Informasi mengenai perangkat yang Anda gunakan, termasuk jenis perangkat, sistem operasi, dan browser yang digunakan untuk mengakses platform kami.</li>
            </ul>
            </section>

            <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">2. Bagaimana Kami Menggunakan Informasi Anda</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
                Kami menggunakan informasi yang kami kumpulkan untuk tujuan berikut:
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-400">
                <li>Menyediakan, memelihara, dan meningkatkan layanan kami.</li>
                <li>Menyediakan dukungan pelanggan dan komunikasi terkait layanan.</li>
                <li>Menganalisis penggunaan dan performa platform kami untuk meningkatkan pengalaman pengguna.</li>
                <li>Mengirimkan informasi terkait akun dan pembaruan layanan (jika diperlukan).</li>
            </ul>
            </section>

            <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">3. Bagaimana Kami Melindungi Informasi Anda</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
                Kami berkomitmen untuk melindungi data pribadi Anda. Kami menggunakan langkah-langkah keamanan yang wajar dan praktik terbaik untuk melindungi informasi Anda dari akses yang tidak sah, perubahan, pengungkapan, atau penghancuran.
            </p>
            </section>

            <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">4. Cookies dan Teknologi Serupa</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
                Kami menggunakan cookies dan teknologi serupa untuk meningkatkan pengalaman Anda saat menggunakan platform kami. Cookies adalah file teks kecil yang disimpan di perangkat Anda yang memungkinkan kami untuk mengenali pengunjung dan menyimpan preferensi mereka.
            </p>
            </section>

            <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">5. Hak Pengguna</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
                Sebagai pengguna, Anda memiliki hak-hak tertentu terkait data pribadi Anda, termasuk:
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-400">
                <li><strong>Hak untuk Mengakses</strong>: Anda dapat meminta salinan data pribadi yang kami simpan tentang Anda.</li>
                <li><strong>Hak untuk Memperbaiki</strong>: Anda dapat memperbarui atau memperbaiki data pribadi yang tidak akurat.</li>
                <li><strong>Hak untuk Menghapus</strong>: Anda dapat meminta kami untuk menghapus data pribadi Anda, kecuali jika kami diwajibkan untuk mempertahankannya untuk tujuan hukum atau bisnis tertentu.</li>
            </ul>
            </section>

            <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">6. Perubahan pada Kebijakan Privasi</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
                Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Setiap perubahan akan diumumkan di platform kami dengan mencantumkan tanggal pembaruan terbaru di bagian atas kebijakan ini. Kami mendorong Anda untuk memeriksa kebijakan ini secara berkala untuk tetap mengetahui bagaimana data pribadi Anda dilindungi.
            </p>
            </section>

            <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">7. Kontak Kami</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
                Jika Anda memiliki pertanyaan atau kekhawatiran mengenai Kebijakan Privasi ini atau ingin menggunakan hak-hak Anda terkait data pribadi, Anda dapat menghubungi kami melalui:
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-400">
                <li>Email: <a href="mailto:email@domain.com" className="text-blue-500">sasuke@gmail.com</a></li>
                <li>Contact: +6281237142818</li>
            </ul>
            </section>
            <footer className=''>
                <Footer />
            </footer>
        </div>
        </>
    );
    }

    export default PrivacyPolicy;
