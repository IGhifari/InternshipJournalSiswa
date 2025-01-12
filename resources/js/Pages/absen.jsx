import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import Footer from '@/Components/footer';
import Swal from 'sweetalert2';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdRemoveRedEye } from "react-icons/md";

export default function Absensi() {
    const { absensiData, auth } = usePage().props; 
    const  user = usePage().props.auth.user;
    
    const [attendanceData, setAttendanceData] = useState({
        name: '', 
        class: '', 
        date: new Date().toISOString().split('T')[0], // Tanggal hari ini
        information: 'Hadir', // Status kehadiran default
    });

    const [absensiList, setAbsensiList] = useState(absensiData);

    // Handle perubahan input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAttendanceData({
            ...attendanceData,
            [name]: value,
        });
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



    // Submit absensi ke server
    const handleSubmit = (e) => {
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

        fetch('/siswa/absensi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfTokenMeta.content,
            },
            body: JSON.stringify(attendanceData),
        })
            .then((response) => {
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
                    });
                } else {
                    response.json().then((data) => {
                        Swal.fire({
                            title: 'Gagal!',
                            text: data.errors ? Object.values(data.errors).join(', ') : 'Terjadi kesalahan.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    });
                }
            })
            .catch(() => {
                Swal.fire({
                    title: 'Gagal!',
                    text: 'Gagal menghubungi server.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

    const handleEdit = (item) => {
        Swal.fire({
            width: 650,
            title: 'Edit Absensi Anda',
            icon: 'info',
            html: `
                <div style="text-align: left; " class="text-sm">
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
                            <select id="edit-information" class="swal2-input mt-4 w-full text-sm " disabled>
                                <option value="Hadir" ${item.information === "Hadir" ? "selected" : ""}>Hadir</option>
                                <option value="Izin" ${item.information === "Izin" ? "selected" : ""}>Izin</option>
                                <option value="Sakit" ${item.information === "Sakit" ? "selected" : ""}>Sakit</option>
                                <option value="Alfa" ${item.information === "Alfa" ? "selected" : ""}>Alfa</option>
                            </select>
                        </div>
                    </div>
                </div>
            `,
            focusConfirm: false,
            showCloseButton: true,
            preConfirm: () => {
                const name = Swal.getPopup().querySelector('#edit-name').value;
                const classValue = Swal.getPopup().querySelector('#edit-class').value;
                const date = Swal.getPopup().querySelector('#edit-date').value;
                const information = Swal.getPopup().querySelector('#edit-information').value;
                return { name, class: classValue, date, information };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedItem = { ...item, ...result.value };
                updateAbsensiData(updatedItem);
            }
        });
    };

    const updateAbsensiData = async (updatedItem) => {
        try {
            const response = await fetch(`/siswa/absensi/${updatedItem.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
                body: JSON.stringify(updatedItem),
            });

            if (response.ok) {
                setAbsensiList(absensiList.map(item => item.id === updatedItem.id ? updatedItem : item));
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Absensi anda telah berhasil diperbarui.',
                });
            } else {
                const data = await response.json();
                console.error('Server response:', data);
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: data.errors ? Object.values(data.errors).join(', ') : 'Terjadi kesalahan.',
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Kesalahan',
                text: 'Terjadi kesalahan server.',
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
            width: 600,
            title: '<strong class="text-4xl">Detail Absensi</strong>',
            html: `
            <div class="flex justify-center" >
            <div style="font-size: 1.1rem"; class="text-left ">
                <p><strong>Nama:</strong> ${item.name}</p>
                <p><strong>Kelas:</strong> ${item.class}</p>
                <p><strong>Tanggal:</strong> ${item.date}</p>
                <p><strong>Informasi:</strong> ${item.information}</p>
            </div>
            </div>
            `,
            icon: 'info',
            confirmButtonText: 'Tutup'
        });
    };
    
    return (
        <AuthenticatedLayout>
            <Head title="Absensi" />
            <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
                <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 text-center">
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                                Hallo, Selamat Datang {user.name} 
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Isi data absensi Anda di bawah ini.
                            </p>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="p-6 flex flex-col space-y-4"
                        >
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                                >
                                    Nama
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={attendanceData.name}
                                    onChange={handleChange}
                                    placeholder="Masukkan Nama Lengkap"
                                    className="w-full p-3 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300"
                                />
                                <p className='text-yellow-600 text-sm pt-2'>
                                    *Diisi sesuai username Anda dan perhatikan spasi
                                </p>
                            </div>

                            {/* Input Kelas */}
                            <div>
                                <label
                                    htmlFor="class"
                                    className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                                >
                                    Kelas
                                </label>
                                <select
                                    id="class"
                                    name="class"
                                    value={attendanceData.class}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300"
                                >
                                    <option value="">Pilih Kelas</option>
                                    <option value="XII RPL 1">XII RPL 1</option>
                                    <option value="XII RPL 2">XII RPL 2</option>
                                </select>
                            </div>

                            {/* Input Tanggal */}
                            <div>
                                <label
                                    htmlFor="date"
                                    className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                                >
                                    Tanggal
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={attendanceData.date}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300"
                                />
                            </div>

                            {/* Input Informasi */}
                            <div>
                                <label
                                    htmlFor="information"
                                    className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                                >
                                    Status Kehadiran
                                </label>
                                <select
                                    id="information"
                                    name="information"
                                    value={attendanceData.information}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300"
                                >
                                    <option value="Hadir">Hadir</option>
                                    <option value="Izin">Izin</option>
                                    <option value="Sakit">Sakit</option>
                                    <option value="Alfa">Alfa</option>
                                </select>
                                <p className='text-yellow-600 text-sm pt-2'>
                                    *Harap mengisi status kehadiran Anda dengan benar karena data tidak bisa diubah
                                </p>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200"
                                >
                                    Simpan Absensi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='mx-5 md:mx-10 flex justify-end mt-5'>
                    <input type="search" placeholder="Seacrh" className="w-80 md:w-96 p-3 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300 " />
                </div>
                <div className='text-white mx-4 sm:mx-6 lg:mx-8 mt-10 '>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-gray-500 dark:text-gray-400 text-center ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Nama</th>
                                    <th scope="col" className="px-6 py-3">Kelas</th>
                                    <th scope="col" className="px-6 py-3">Tanggal</th>
                                    <th scope="col" className="px-6 py-3">Informasi</th>
                                    <th scope="col" className="px-6 py-3">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {absensiList.length > 0 ? (
                                    absensiList.map((item) => (
                                        <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="px-6 py-4">{item.name}</td>
                                            <td className="px-6 py-4">{item.class}</td>
                                            <td className="px-6 py-4">{item.date}</td>
                                            <td className="px-6 py-4">{item.information}</td>
                                            <td className="px-6 py-4 flex gap-2 justify-center">
                                            <div className='flex gap-6 items-center '>
                                                <div className='flex items-center gap-1 text-yellow-500 cursor-pointer' onClick={() => handleEdit(item)}>
                                                    <FaRegEdit />
                                                    <a href="#" className='hover:underline'>Edit</a>
                                                </div>
                                                <div className='flex items-center gap-1 text-red-500 cursor-pointer' onClick={() => handleDelete(item.id)}>
                                                    <RiDeleteBin6Fill />
                                                    <a href="#" className='hover:underline'>Delete</a>
                                                </div>
                                                <div className='flex items-center gap-1 text-white cursor-pointer' onClick={() => handleView(item)}>
                                                    <MdRemoveRedEye />
                                                    <a href="#" className='hover:underline'>View</a>
                                                </div>
                                            </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-4">No data available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Footer/>
            </div>
        </AuthenticatedLayout>
    );
}