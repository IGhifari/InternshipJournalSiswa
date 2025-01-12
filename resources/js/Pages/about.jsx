import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Footer from '@/Components/footer';
import Navbar from './navbar';
const AboutUs = ({auth}) => {
    return (
        <>
        <Head title="Tentang Kami" />
        <Navbar auth={auth} />
        <div className="p-6 bg-white dark:bg-gray-900 shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-gray-200">Tentang Kami</h1>

            <p className="md:text-lg text-gray-600 dark:text-gray-400 mb-6">
            Kami adalah tim yang berkomitmen untuk menyediakan platform yang membantu siswa dalam mengelola dan mendokumentasikan data PKL secara efisien. Dengan tujuan utama untuk menyederhanakan proses pengelolaan data magang, kami berusaha memberikan solusi yang memudahkan komunikasi antara siswa, perusahaan, dan sekolah.
            </p>

            <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Visi Kami</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
                Menjadi platform terbaik yang membantu siswa dalam mengelola pengalaman PKL mereka dengan cara yang lebih mudah, efisien, dan terorganisir, serta menjembatani komunikasi yang lebih baik antara pihak terkait.
            </p>
            </section>

            <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Misi Kami</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
                Kami memiliki misi untuk:
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-400">
                <li>Memberikan kemudahan bagi siswa dalam mengelola data magang mereka.</li>
                <li>Menawarkan solusi berbasis teknologi yang mempermudah pihak sekolah dan perusahaan dalam memantau progres magang siswa.</li>
                <li>Menciptakan platform yang memudahkan kolaborasi antara siswa, perusahaan, dan sekolah untuk memastikan pengalaman magang yang sukses.</li>
            </ul>
            </section>

            <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Tim Kami</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
                Tim kami terdiri dari individu-individu yang berpengalaman dalam bidang teknologi, pendidikan, dan pengelolaan data. Kami bekerja sama untuk memastikan bahwa platform ini dapat memberikan manfaat maksimal bagi penggunanya.
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-400">
                <li><strong>M. Ghifari Bima Khadafi</strong> </li>
                <li><strong>Mutia Risnawati</strong> </li>
                <li><strong>Rizqi Fadillah Azhar</strong> </li>
            </ul>
            </section>

            <section className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Kontak Kami</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
                Jika Anda ingin belajar lebih lanjut tentang kami atau memiliki pertanyaan lebih lanjut, jangan ragu untuk menghubungi kami.
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-400">
                <li>Email: <a href="mailto:info@domain.com" className="text-blue-500">info@domain.com</a></li>
                
            </ul>
            </section>
            <footer>
                <Footer auth={auth}/>
            </footer>
        </div>
        </>
    );
    }

export default AboutUs;
