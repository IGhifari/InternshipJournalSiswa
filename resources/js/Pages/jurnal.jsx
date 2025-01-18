import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage} from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; 
import Footer from '@/Components/footer';
import './scrollbar.css';
import { FaEye, FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdRemoveRedEye } from "react-icons/md";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export default function Jurnal() {
  const { jurnalData, auth } = usePage().props;
      const  user = usePage().props.auth.user;

  // State untuk data jurnal
  const [jurnalDataState, setJurnalDataState] = useState(jurnalData || []);

  const [formData, setFormData] = useState({
    name: '',
    class: '',
    company: '',
    supervisor_name: '',
    date: new Date().toISOString().split('T')[0],
    activity: '', 
  });

  useEffect(() => {
    localStorage.setItem('jurnalData', JSON.stringify(jurnalDataState));
  }, [jurnalDataState]);


  const handleDownloadPDF = (item) => {
    const doc = new jsPDF();
  
    
      // Set up document
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`Detail Jurnal ${item.name}`, 105, 20, null, null, "center");

    // Add a line under the title
    doc.setLineWidth(0.5);
    doc.line(10, 25, 200, 25);

    // Set up content with improved spacing and style
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');

    // Name section with bold label
    doc.setFont('helvetica', 'bold');
    doc.text('Nama:', 10, 40);
    doc.setFont('helvetica', 'normal');
    doc.text(item.name, 60, 40);

    // Class section with bold label
    doc.setFont('helvetica', 'bold');
    doc.text('Kelas:', 10, 50);
    doc.setFont('helvetica', 'normal');
    doc.text(item.class, 60, 50);

    // Company section with bold label
    doc.setFont('helvetica', 'bold');
    doc.text('Nama Perusahaan:', 10, 60);
    doc.setFont('helvetica', 'normal');
    doc.text(item.company, 60, 60);

    // Supervisor section with bold label
    doc.setFont('helvetica', 'bold');
    doc.text('Supervisor Name:', 10, 70);
    doc.setFont('helvetica', 'normal');
    doc.text(item.supervisor_name, 60, 70);

    // Date section with bold label
    doc.setFont('helvetica', 'bold');
    doc.text('Tanggal:', 10, 80);
    doc.setFont('helvetica', 'normal');
    doc.text(item.date, 60, 80);

    // Add a separator line
    doc.setLineWidth(0.5);
    doc.line(10, 85, 200, 85);

    // Activity section with title and text box for better presentation
    doc.setFont('helvetica', 'bold');
    doc.text("Kegiatan:", 10, 95);

    // Add a text box for the activity content
    doc.setFont('helvetica', 'normal');
    doc.rect(10, 98, 190, 40);  // Draw a rectangle around the activity text
    doc.text(item.activity, 12, 102, { maxWidth: 180 });

      
    
    doc.save(`jurnal_${item.name}.pdf`);
    Swal.fire({
      title: 'Berhasil',
      text: 'Jurnal berhasil diunduh.',
      icon: 'success',
      confirmButtonText: 'Tutup'
    })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/siswa/jurnalharian', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Jurnal anda telah berhasil disimpan.',
        });
        const newJurnal = await response.json();
        setJurnalDataState([...jurnalDataState, newJurnal]);
        setFormData({
          name: '',
          class: '',
          company: '',
          supervisor_name: '',
          date: new Date().toISOString().split('T')[0],
          activity: '',
        });
      } else {
        const data = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: data.errors ? Object.values(data.errors).join(', ') : 'Terjadi kesalahan.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Kesalahan',
        text: 'Terjadi kesalahan server.',
      });
    }
  };

  const handleEdit = (item) => {
    Swal.fire({
      width: 650,
      title: 'Edit Jurnal Anda',
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
          <div style=" gap: 10px; margin-bottom: 10px;">
            <div style="flex: 1;">
              <label for="edit-company" style="display: block; font-weight: bold;">Nama Perusahaan</label>
              <input type="text" id="edit-company" class="swal2-input -ml-0 w-full text-sm" placeholder="Nama Perusahaan" value="${item.company}">
            </div>
            <div style="flex: 1;">
              <label for="edit-supervisor_name" style="display: block; font-weight: bold;">Supervisor Name</label>
              <input type="text" id="edit-supervisor_name" class="swal2-input -ml-0 w-full text-sm" placeholder="Supervisor Name" value="${item.supervisor_name}">
            </div>
          </div>
          <div style=" gap: 44px; margin-bottom: 10px;">
            <div style="flex: 1;">
              <label for="edit-date" style="display: block; font-weight: bold;">Tanggal</label>
              <input type="date" id="edit-date" class="swal2-input -ml-0 w-full text-sm" value="${item.date}">
            </div>
            <div style="flex: 1;">
              <label for="edit-activity" style="display: block; font-weight: bold;">Kegiatan</label>
              <textarea id="edit-activity" class="swal2-textarea -ml-0 w-full text-sm" placeholder="Kegiatan">${item.activity}</textarea>
            </div>
          </div>
        </div>
      `,
      focusConfirm: false,
      showCloseButton: true,
      
      preConfirm: () => {
        const name = Swal.getPopup().querySelector('#edit-name').value;
        const classValue = Swal.getPopup().querySelector('#edit-class').value;
        const company = Swal.getPopup().querySelector('#edit-company').value;
        const supervisor_name = Swal.getPopup().querySelector('#edit-supervisor_name').value;
        const date = Swal.getPopup().querySelector('#edit-date').value;
        const activity = Swal.getPopup().querySelector('#edit-activity').value;
        return { name, class: classValue, company, supervisor_name, date, activity };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedItem = { ...item, ...result.value };
        updateJurnalData(updatedItem);
      }
    });
  };

  const updateJurnalData = async (updatedItem) => {
    try {
      const response = await fetch(`/siswa/jurnalharian/${updatedItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
        },
        body: JSON.stringify(updatedItem),
      });

      if (response.ok) {
        setJurnalDataState(jurnalDataState.map(item => item.id === updatedItem.id ? updatedItem : item));
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Jurnal anda telah berhasil diperbarui.',
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
        text: 'Data jurnal ini akan dihapus secara permanen!',
        showCancelButton: true,
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/siswa/jurnalharian/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
            })
            .then(response => {
                if (response.ok) {
                  setJurnalDataState(prevState => prevState.filter(item => item.id !== itemId));
                    Swal.fire(
                        'Dihapus!',
                        'Data jurnal telah dihapus.',
                        'success'
                    );
                } else {
                    response.json().then(data => {
                        console.error('Server response:', data);
                        Swal.fire(
                            'Gagal!',
                            'Gagal menghapus data jurnal.',
                            'error'
                        );
                    }).catch(error => {
                        console.error('Error parsing JSON:', error);
                        Swal.fire(
                            'Gagal!',
                            'Gagal menghapus data jurnal.',
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
        title: '<strong class="text-4xl">Detail Jurnal</strong>',
        html: `
        <div class="flex justify-center" >
          <div style="font-size: 1.1rem"; class="text-left ">
            <p><strong>Nama:</strong> ${item.name}</p>
            <p><strong>Kelas:</strong> ${item.class}</p>
            <p><strong>Nama Perusahaan:</strong> ${item.company}</p>
            <p><strong>Supervisor Name:</strong> ${item.supervisor_name}</p>
            <p><strong>Tanggal:</strong> ${item.date}</p>
            <p><strong>Kegiatan:</strong> ${item.activity}</p>
          </div>
        </div>
        `,
        icon: 'info',
        confirmButtonText: 'Tutup'
    });
  };


  return (
    <AuthenticatedLayout>
      <Head title="Jurnal" />

      <div className="py-10 px-4 md:px-0">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Bagian Header */}
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 mb-8">
          </div>

          {/* Form Input Jurnal */}
          <div className="bg-white shadow-md rounded-lg p-6 dark:bg-gray-800">
            <div className="pb-10 text-gray-900 dark:text-gray-100 text-center">
              <h1 className="text-2xl font-bold">Halo, selamat datang {user?.name} </h1>
              <p className="mt-2 text-gray-400">Isi jurnal untuk keperluan catatan harian Anda di bawah ini.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Nama
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama Anda"
                    className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-200"
                    required
                  />
                  <div>
                      <p className='text-yellow-500'>pastikan nama anda sesuai dengan nama lengkap anda</p>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="class"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Kelas
                  </label>
                  <select
                    id="class"
                    name="class"
                    value={formData.class}
                    onChange={handleChange}
                    className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-200"
                  >
                    <option value="">Pilih Kelas</option>
                    <option value="XII RPL 1">XII RPL 1</option>
                    <option value="XII RPL 2">XII RPL 2</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Nama Perusahaan
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Masukkan nama Perusahaan"
                    className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-200"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="supervisor_name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Supervisor Name
                  </label>
                  <input
                    type="text"
                    id="supervisor_name"
                    name="supervisor_name"
                    value={formData.supervisor_name}
                    onChange={handleChange}
                    placeholder="Masukkan nama Supervisor"
                    className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-200"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Tanggal
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-200"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="activity"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Catatan Jurnal
                </label>
                <textarea
                  id="activity"
                  name="activity"
                  value={formData.activity}
                  onChange={handleChange}
                  placeholder="Tulis catatan jurnal Anda di sini"
                  className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-200"
                  rows={4}
                  required
                />
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200"
                >
                  Simpan Jurnal
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className='mx-5 md:mx-10 flex justify-end mt-10'>
                    <input type="search" placeholder="Seacrh" className="w-80 md:w-96 p-3 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-gray-300 " />
        </div>
        <div className='text-white  mx-4 sm:mx-6 lg:mx-8 mt-5'>
          <div className='overflow-x-auto'>
            <table className="w-full text-sm text-gray-500 dark:text-gray-400 text-center">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Nama</th>
                  <th scope="col" className="px-6 py-3">Kelas</th>
                  <th scope="col" className="px-6 py-3">Nama Perusahaan</th>
                  <th scope="col" className="px-6 py-3">Supervisor Name</th>
                  <th scope="col" className="px-6 py-3">Tanggal</th>
                  <th scope="col" className="px-6 py-3">Kegiatan</th>
                  <th scope="col" className="px-6 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {jurnalData.length > 0 ? (
                  jurnalData.map((item) => (
                    <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.class}</td>
                      <td className="px-6 py-4">{item.company}</td>
                      <td className="px-6 py-4">{item.supervisor_name}</td>
                      <td className="px-6 py-4">{item.date}</td>
                      <td className="px-6 py-4">{item.activity}</td>
                      <td className="px-6 py-4 flex gap-5 justify-center">
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
                          <span className='hover:underline'>View</span>
                        </div>
                        <div className='flex items-center gap-1 text-blue-500 cursor-pointer' onClick={() => handleDownloadPDF(item)}>
                                            <span className='hover:underline'>Download Jurnal</span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    </AuthenticatedLayout>
  );
}