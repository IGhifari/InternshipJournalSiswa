import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import Footer from '@/Components/footer';
import Swal from 'sweetalert2';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdRemoveRedEye } from "react-icons/md";
import { motion } from 'framer-motion';

export default function Absensi() {
    const { absensiData, auth } = usePage().props; 
    const  user = usePage().props.auth.user;
    
    const [attendanceData, setAttendanceData] = useState({
        name: '', 
        class: '', 
        date: new Date().toISOString().split('T')[0], // Tanggal hari ini
        information: 'Hadir', // Status kehadiran default
        photo: null, // Tambahkan state untuk foto
    });

    const [absensiList, setAbsensiList] = useState(absensiData);

    // Tambahkan state untuk menyimpan kriteria pencarian
    const [searchCriteria, setSearchCriteria] = useState({
        name: '',
        date: '',
        information: ''
    });

    // Handle perubahan input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAttendanceData({
            ...attendanceData,
            [name]: value,
        });
    };

    // Fungsi untuk menangani perubahan input pencarian
    const handleSearchChange = (field, value) => {
        setSearchCriteria(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Fungsi untuk melakukan pencarian
    const handleSearchSubmit = () => {
        const filteredData = absensiData.filter(item => {
            const nameMatch = item.name.toLowerCase().includes(searchCriteria.name.toLowerCase()) || !searchCriteria.name;
            const dateMatch = item.date.includes(searchCriteria.date) || !searchCriteria.date;
            const informationMatch = item.information === searchCriteria.information || !searchCriteria.information;
            
            return nameMatch && dateMatch && informationMatch;
        });
        
        setAbsensiList(filteredData);
        
        // Tampilkan pesan jika tidak ada hasil
        if (filteredData.length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'Tidak Ada Hasil',
                text: 'Data yang Anda cari tidak ditemukan',
            });
        }
    };

    // Fungsi untuk mereset pencarian
    const handleResetSearch = () => {
        setSearchCriteria({
            name: '',
            date: '',
            information: ''
        });
        setAbsensiList(absensiData);
    };

    const isWithinAttendanceTime = () => {
        const now = new Date();
        const startTime = new Date();
        const endTime = new Date();
        // Set jam dan menit untuk batas waktu
        startTime.setHours(7, 0, 0); 
        endTime.setHours(22, 30, 0); 
        return now >= startTime && now <= endTime;
    };

    const handleFileChange = (e) => {
        setAttendanceData({
            ...attendanceData,
            photo: e.target.files[0], // Simpan file foto
        });
    };

    // Submit absensi ke server
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!isWithinAttendanceTime()) {
            Swal.fire({
            icon: 'error',
            title: 'Waktu Tidak Valid',
            text: 'Absensi hanya dapat dilakukan antara jam 07:00 hingga 07:30.',
            });
            return;
        }

        const csrfTokenMeta = document.querySelector('meta[name="csrf-token"]');
        if (!csrfTokenMeta) {
            Swal.fire({
                title: 'Error',
                text: 'CSRF token tidak ditemukan.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const formData = new FormData();
        Object.keys(attendanceData).forEach(key => {
            formData.append(key, attendanceData[key]);
        });

        try {
            const response = await fetch('/siswa/absensi', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': csrfTokenMeta.content,
                },
            });

            if (response.ok) {
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Absensi berhasil disimpan!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                
                setAttendanceData({
                    name: '',
                    class: '',
                    date: new Date().toISOString().split('T')[0],
                    information: 'Hadir',
                    photo: null,
                });
            } else {
                const data = await response.json();
                Swal.fire({
                    title: 'Gagal!',
                    text: data.errors ? Object.values(data.errors).join(', ') : 'Terjadi kesalahan.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Gagal!',
                text: 'Gagal menghubungi server.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleEdit = (item) => {
        Swal.fire({
            showCloseButton: true,
            width: 650,
            title: 'Edit Absensi',
            html: `
                <div style="text-align: left;" class="text-sm">
                    <div style="gap: 10px; margin-bottom: 10px;">
                        <div style="flex: 1;">
                            <label for="edit-name" style="display: block; font-weight: bold;">Nama</label>
                            <input type="text" id="edit-name" class="swal2-input -ml-0 w-full text-sm" placeholder="Nama" value="${item.name}">
                        </div>
                        <div style="flex: 1;">
                            <label for="edit-class" style="display: block; font-weight: bold;">Kelas</label>
                            <select id="edit-class" class="swal2-input mt-4 w-full text-sm">
                                <option value="XII RPL 1" ${item.class === "XII RPL 1" ? "selected" : ""}>XII RPL 1</option>
                                <option value="XII RPL 2" ${item.class === "XII RPL 2" ? "selected" : ""}>XII RPL 2</option>
                            </select>
                        </div>
                    </div>
                    <div style="gap: 10px; margin-bottom: 10px;">
                        <div style="flex: 1;">
                            <label for="edit-date" style="display: block; font-weight: bold;">Tanggal</label>
                            <input type="date" id="edit-date" class="swal2-input -ml-0 w-full text-sm" value="${item.date}">
                        </div>
                        <div style="flex: 1; margin-top: 7px;">
                            <label for="edit-information" style="display: block; font-weight: bold;">Status Kehadiran</label>
                            <select id="edit-information" class="swal2-input mt-4 w-full text-sm" disabled>
                                <option value="Hadir" ${item.information === "Hadir" ? "selected" : ""}>Hadir</option>
                                <option value="Izin" ${item.information === "Izin" ? "selected" : ""}>Izin</option>
                                <option value="Sakit" ${item.information === "Sakit" ? "selected" : ""}>Sakit</option>
                                <option value="Terlambat" ${item.information === "Terlambat" ? "selected" : ""}>Terlambat</option>
                            </select>
                        </div>
                    </div>
                    <div style="margin-bottom: 10px;">
                        <label for="edit-photo" style="display: block; font-weight: bold;">Foto</label>
                        <input type="file" id="edit-photo" class="swal2-input -ml-0 w-full text-sm" accept="image/*">
                        ${item.photo ? `<img src="/storage/${item.photo}" alt="Current Photo" style="max-width: 200px; margin-top: 10px;">` : ''}
                    </div>
                </div>
            `,
            focusConfirm: false,
            preConfirm: () => {
                const name = Swal.getPopup().querySelector('#edit-name').value;
                const classValue = Swal.getPopup().querySelector('#edit-class').value;
                const date = Swal.getPopup().querySelector('#edit-date').value;
                const information = Swal.getPopup().querySelector('#edit-information').value;
                
                // Validasi input
                if (!name || !classValue || !date || !information) {
                    Swal.showValidationMessage('Semua field harus diisi');
                    return false;
                }

                return {
                    name,
                    class: classValue,
                    date,
                    information,
                };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                updateAbsensiData(item.id, result.value);
            }
        });
    };

    const updateAbsensiData = async (id, updatedData) => {
        const formData = new FormData();
        formData.append('name', updatedData.name);
        formData.append('class', updatedData.class);
        formData.append('date', updatedData.date);
        formData.append('information', updatedData.information);
        formData.append('_method', 'PUT');
        
        // Cek apakah ada file foto baru yang dipilih
        const photoInput = document.querySelector('#edit-photo');
        if (photoInput && photoInput.files[0]) {
            formData.append('photo', photoInput.files[0]);
        }

        try {
            const response = await fetch(`/siswa/absensi/${id}`, {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Perbarui tampilan setelah berhasil update
            setAbsensiList(prevList => 
                prevList.map(item => 
                    item.id === id ? { ...item, ...data } : item
                )
            );

            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Data absensi berhasil diperbarui',
            });
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: 'Gagal memperbarui data absensi',
            });
        }
    };

    const handleDelete = (itemId) => {
        Swal.fire({
            icon: 'warning',
            title: 'Apakah Anda yakin?',
            text: 'Data absensi ini akan dihapus secara permanen!',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`/siswa/absensi/${itemId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    },
                })
                .then(response => {
                    if (response.ok) {
                        setAbsensiList(prevState => prevState.filter(item => item.id !== itemId));
                        Swal.fire(
                            'Dihapus!',
                            'Data absensi telah dihapus.',
                            'success'
                        );
                    } else {
                        response.json().then(data => {
                            console.error('Server response:', data);
                            Swal.fire(
                                'Gagal!',
                                'Gagal menghapus data absensi.',
                                'error'
                            );
                        }).catch(error => {
                            console.error('Error parsing JSON:', error);
                            Swal.fire(
                                'Gagal!',
                                'Gagal menghapus data absensi.',
                                'error'
                            );
                        });
                    }
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                    Swal.fire(
                        'Gagal!',
                        'Gagal menghubungi server.',
                        'error'
                    );
                });
            }
        });
    };

    const handleView = (item) => {
        Swal.fire({
            title: 'Detail Absensi',
            html: `
                <div class="text-left space-y-4 mt-4">
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <p class="text-sm text-gray-600 font-semibold">Nama Lengkap:</p>
                        <p class="text-lg text-gray-800">${item.name}</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <p class="text-sm text-gray-600 font-semibold">Kelas:</p>
                        <p class="text-lg text-gray-800">${item.class}</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <p class="text-sm text-gray-600 font-semibold">Tanggal:</p>
                        <p class="text-lg text-gray-800">${item.date}</p>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <p class="text-sm text-gray-600 font-semibold">Status Kehadiran:</p>
                        <span class="inline-block px-3 py-1 mt-1 rounded-full text-sm font-medium ${
                            item.information === 'Hadir' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                            item.information === 'Izin' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                            item.information === 'Sakit' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        }">${item.information}</span>
                    </div>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <p class="text-sm text-gray-600 font-semibold">Foto:</p>
                        <img src="/storage/${item.photo}" alt="Foto Absensi" style="width: 100%; max-width: 200px; border-radius: 8px;"/>
                    </div>
                </div>
            `,
            width: '32rem',
            showCloseButton: true,
            showConfirmButton: false,
            customClass: {
                container: 'custom-swal-container',
                popup: 'custom-swal-popup',
                content: 'custom-swal-content'
            }
        });
    };
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Absensi" />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="container mx-auto px-4 py-8"
                >
                    {/* Welcome Card */}
                    <motion.div 
                        variants={itemVariants}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8"
                    >
                        <div className="relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 animate-pulse"></div>
                            <div className="relative p-8 text-center">
                                <motion.h1 
                                    className="text-3xl font-bold text-gray-800 dark:text-white mb-2"
                                    animate={{ scale: [1, 1, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    Selamat Datang, {user.name}! 
                                </motion.h1>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Silakan isi absensi Anda hari ini
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form Card */}
                    <motion.div 
                        variants={itemVariants}
                        className="grid md:grid-cols-2 gap-8 mb-8"
                    >
                        {/* Form Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Form Absensi
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Masukan Nama Lengkap"
                                        value={attendanceData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Kelas
                                    </label>
                                    <select
                                        name="class"
                                        value={attendanceData.class}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                                        required
                                    >
                                        <option value="">Pilih Kelas</option>
                                        <option value="XII RPL 1">XII RPL 1</option>
                                        <option value="XII RPL 2">XII RPL 2</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Tanggal
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={attendanceData.date}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Status Kehadiran
                                    </label>
                                    <select
                                        name="information"
                                        value={attendanceData.information}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                                        required
                                    >
                                        <option value="Hadir">Hadir</option>
                                        <option value="Izin">Izin</option>
                                        <option value="Sakit">Sakit</option>
                                        <option value="Terlambat">Terlambat</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Foto
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                                        required
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                                >
                                    Submit Absensi
                                </motion.button>
                            </form>
                        </div>

                        {/* Search Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Cari Absensi
                            </h2>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Cari berdasarkan nama..."
                                    value={searchCriteria.name}
                                    onChange={(e) => handleSearchChange('name', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                                />
                                <input
                                    type="date"
                                    value={searchCriteria.date}
                                    onChange={(e) => handleSearchChange('date', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                                />
                                <select
                                    value={searchCriteria.information}
                                    onChange={(e) => handleSearchChange('information', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                                >
                                    <option value="">Semua Status</option>
                                    <option value="Hadir">Hadir</option>
                                    <option value="Izin">Izin</option>
                                    <option value="Sakit">Sakit</option>
                                    <option value="Terlambat">Terlambat</option>
                                </select>
                                <div className="flex gap-2">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleSearchSubmit}
                                        className="flex-1 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                                    >
                                        Cari
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleResetSearch}
                                        className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                                    >
                                        Reset
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Table Section */}
                    <motion.div 
                        variants={itemVariants}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Foto
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Nama
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Kelas
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Tanggal
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {absensiList.map((item, index) => (
                                        <motion.tr 
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                                {item.photo ? (
                                                    <img src={`/storage/${item.photo}`} alt="Absensi" className="w-16 h-16 object-cover rounded" />
                                                ) : (
                                                    <span>Foto tidak ada</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                                {item.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                                {item.class}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                                {item.date}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    item.information === 'Hadir' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                                    item.information === 'Izin' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                                    item.information === 'Sakit' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' :
                                                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                                                }`}>
                                                    {item.information}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="flex items-center space-x-3">
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleEdit(item)}
                                                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 tooltip"
                                                        title="Edit"
                                                    >
                                                        <FaRegEdit size={18} />
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleDelete(item.id)}
                                                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 tooltip"
                                                        title="Hapus"
                                                    >
                                                        <RiDeleteBin6Fill size={18} />
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleView(item)}
                                                        className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 tooltip"
                                                        title="Lihat Detail"
                                                    >
                                                        <MdRemoveRedEye size={18} />
                                                    </motion.button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </motion.div>
                <Footer />
            </div>
            <style>{`
                .tooltip {
                    position: relative;
                }
                
                .tooltip:before {
                    content: attr(title);
                    position: absolute;
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    padding: 4px 8px;
                    background-color: rgba(0, 0, 0, 0.8);
                    color: white;
                    font-size: 12px;
                    border-radius: 4px;
                    white-space: nowrap;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.2s ease;
                }
                
                .tooltip:hover:before {
                    opacity: 1;
                    visibility: visible;
                }
            `}</style>
        </AuthenticatedLayout>
    );
}