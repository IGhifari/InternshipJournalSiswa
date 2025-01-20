import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage} from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'; 
import Footer from '@/Components/footer';
import './scrollbar.css';
import { FaEye, FaRegEdit, FaSearch, FaUserCircle, FaBuilding, FaBook } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdRemoveRedEye, MdDateRange } from "react-icons/md";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { motion } from 'framer-motion';

export default function Jurnal() {
  const { jurnalData, auth } = usePage().props;
      const  user = usePage().props.auth.user;

  // State untuk data jurnal
  const [jurnalDataState, setJurnalDataState] = useState(jurnalData || []);
  const [searchCriteria, setSearchCriteria] = useState({
    name: '',
    supervisor_name: '',
    date: '',
    activity: ''
  });

  const [formData, setFormData] = useState({
    name: '',
    class: '',
    company: '',
    supervisor_name: '',
    date: new Date().toISOString().split('T')[0],
    activity: '', 
  });

  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Tambahkan definisi variants di awal komponen
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

  useEffect(() => {
    localStorage.setItem('jurnalData', JSON.stringify(jurnalDataState));
  }, [jurnalDataState]);

  // Handle search change
  const handleSearchChange = (field, value) => {
    setSearchCriteria(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle search submit
  const handleSearchSubmit = () => {
    setIsSearching(true);
    const filteredData = jurnalData.filter(item => {
      const nameMatch = item.name.toLowerCase().includes(searchCriteria.name.toLowerCase()) || !searchCriteria.name;
      const supervisorMatch = item.supervisor_name.toLowerCase().includes(searchCriteria.supervisor_name.toLowerCase()) || !searchCriteria.supervisor_name;
      const dateMatch = item.date.includes(searchCriteria.date) || !searchCriteria.date;
      const activityMatch = item.activity.toLowerCase().includes(searchCriteria.activity.toLowerCase()) || !searchCriteria.activity;
      
      return nameMatch && supervisorMatch && dateMatch && activityMatch;
    });
    
    setSearchResults(filteredData);
    
    if (filteredData.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'Tidak Ada Hasil',
        text: 'Data yang Anda cari tidak ditemukan',
      });
    }
  };

  // Handle reset search
  const handleResetSearch = () => {
    setSearchCriteria({
      name: '',
      supervisor_name: '',
      date: '',
      activity: ''
    });
    setSearchResults([]);
    setIsSearching(false);
    setJurnalDataState(jurnalData);
  };

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
      <Head title="Jurnal PKL" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header Section dengan animasi yang lebih menarik */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              Jurnal PKL
            </h1>
            <p className="text-gray-700 dark:text-gray-200 text-lg">
              Selamat datang, <span className="font-semibold">{user?.name}</span>
            </p>
          </motion.div>

          {/* Main Content Container dengan efek glassmorphism */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white/80 backdrop-blur-xl dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <FaBook className="text-2xl text-blue-600 dark:text-blue-400" />
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Input Jurnal Harian
                  </h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <FaUserCircle />
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder='Masukkan Nama Lengkap'
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white transition-all duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="class"
                        className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Kelas
                      </label>
                      <select
                        id="class"
                        name="class"
                        value={formData.class}
                        onChange={handleChange}
                        className="w-full mt-1 px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-200"
                      >
                        <option value="">Pilih Kelas</option>
                        <option value="XII RPL 1">XII RPL 1</option>
                        <option value="XII RPL 2">XII RPL 2</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
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
                      className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
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
                  <div className="mb-4">
                    <label
                      htmlFor="date"
                      className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
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
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <FaBook />
                      Kegiatan
                    </label>
                    <textarea
                      name="activity"
                      value={formData.activity}
                      placeholder='Masukkan Kegiatan'
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white transition-all duration-200"
                      required
                    ></textarea>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg transition-all duration-200"
                  >
                    Simpan Jurnal
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Search Section */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-1"
            >
              <div className="bg-white/80 backdrop-blur-xl dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <FaSearch className="text-2xl text-blue-600 dark:text-blue-400" />
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Cari Jurnal
                  </h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <FaUserCircle />
                      Nama
                    </label>
                    <input
                      type="text"
                      placeholder="Cari berdasarkan nama..."
                      value={searchCriteria.name}
                      onChange={(e) => handleSearchChange('name', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <FaUserCircle />
                      Supervisor
                    </label>
                    <input
                      type="text"
                      placeholder="Cari berdasarkan supervisor..."
                      value={searchCriteria.supervisor_name}
                      onChange={(e) => handleSearchChange('supervisor_name', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <MdDateRange />
                      Tanggal
                    </label>
                    <input
                      type="date"
                      value={searchCriteria.date}
                      onChange={(e) => handleSearchChange('date', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      <FaBook />
                      Kegiatan
                    </label>
                    <input
                      type="text"
                      placeholder="Cari berdasarkan kegiatan..."
                      value={searchCriteria.activity}
                      onChange={(e) => handleSearchChange('activity', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSearchSubmit}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg transition-all duration-200"
                    >
                      Cari
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleResetSearch}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg transition-all duration-200"
                    >
                      Reset
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hasil Pencarian */}
          {isSearching && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto px-4 mt-8"
            >
                <div className="bg-white/80 backdrop-blur-xl dark:bg-gray-800/80 rounded-2xl shadow-xl p-6 border border-white/20 mb-10">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                            Hasil Pencarian
                        </h2>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            Ditemukan {searchResults.length} hasil
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700/50">
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Nama</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">Kelas</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">Perusahaan</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">Supervisor</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">Tanggal</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">Kegiatan</th>
                                    <th className="px-4 py-3  text-sm font-semibold text-gray-600 dark:text-gray-300 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {searchResults.map((item, index) => (
                                    <motion.tr 
                                        key={item.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        className="hover:bg-gray-50/50 dark:hover:bg-gray-700/50"
                                    >
                                        <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">{item.name}</td>
                                        <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200 text-center">{item.class}</td>
                                        <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200 text-center">{item.company}</td>
                                        <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200 text-center">{item.supervisor_name}</td>
                                        <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200 text-center">{item.date}</td>
                                        <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200 text-center">
                                            {item.activity.length > 50 ? `${item.activity.substring(0, 50)}...` : item.activity}
                                        </td>
                                        <td className="px-4 py-3 text-sm ">
                                            <div className="flex gap-2 items-center justify-center">
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="p-1.5 text-yellow-600  flex items-center gap-1 justify-center rounded-lg dark:text-yellow-400 "
                                                    title="Edit"
                                                >
                                                    <FaRegEdit size={18} />
                                                    <p className='hover:underline'>Edit</p>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="p-1.5 text-red-600  rounded-lg flex items-center gap-1 justify-center dark:text-red-400 "
                                                    title="Hapus"
                                                >
                                                    <RiDeleteBin6Fill size={18} />
                                                    <p className='hover:underline'>Delete</p>
                                                </button>
                                                <button
                                                    onClick={() => handleView(item)}
                                                    className="p-1.5 text-blue-600  flex items-center gap-1 justify-center rounded-lg dark:text-white "
                                                    title="Lihat Detail"
                                                >
                                                    <MdRemoveRedEye size={18} />
                                                    <p className='hover:underline'>View</p>
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>
          )}

          {/* Table Section */}
          <motion.div 
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mt-20"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Nama
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Kelas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Perusahaan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Supervisor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Kegiatan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {jurnalData.length > 0 ? (
                    jurnalData.map((item, index) => (
                      <motion.tr 
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {item.class}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {item.company}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {item.supervisor_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {item.date}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                          {item.activity.length > 50 ? `${item.activity.substring(0, 50)}...` : item.activity}
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
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDownloadPDF(item)}
                              className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 tooltip"
                              title="Download PDF"
                            >
                              <span className="text-sm">PDF</span>
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        Tidak ada data tersedia
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
      
      {/* Perbaikan style JSX */}
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