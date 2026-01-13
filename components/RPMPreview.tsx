
import React from 'react';
import { GeneratedRPM, RPMData } from '../types';

interface RPMPreviewProps {
  data: GeneratedRPM;
  meta: RPMData;
}

const RPMPreview: React.FC<RPMPreviewProps> = ({ data, meta }) => {
  if (!data || !data.identitas) return <div className="p-8 text-center text-red-500">Data RPM tidak tersedia.</div>;

  const headerBgClass = "bg-gray-100 font-bold uppercase p-2 text-center text-sm border border-black";
  const labelCellClass = "border border-black p-2 font-bold bg-gray-50 w-1/4 align-top text-xs";
  const contentCellClass = "border border-black p-2 align-top text-xs leading-relaxed text-justify";
  const sectionTitleClass = "text-md font-black uppercase mb-4 mt-8 border-b-2 border-black pb-1 inline-block";

  const today = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const location = meta.identitas.satuanPendidikan?.split(' ').pop() || '....................';

  return (
    <div className="document-layout text-gray-900 bg-white p-1 border-0 print:m-0 print:p-0" style={{ fontSize: '11pt', width: '100%' }}>
      {/* Header RPM */}
      <div className="text-center border-b-2 border-black pb-4 mb-8">
        <h1 className="text-xl font-black uppercase tracking-widest">Rencana Pembelajaran Mendalam (RPM)</h1>
        <p className="text-lg font-bold mt-1 uppercase">{data.identitas.modul?.sekolah || meta.identitas.satuanPendidikan}</p>
        <p className="text-xs font-medium italic tracking-wide">Model Kurikulum Merdeka - Deep Learning Framework</p>
      </div>

      {/* 1. IDENTITAS */}
      <section className="mb-10">
        <h2 className={sectionTitleClass}>1. IDENTITAS</h2>
        
        <table className="w-full border-collapse border border-black mb-6">
          <thead>
            <tr><th colSpan={2} className={headerBgClass}>a. Identitas Modul</th></tr>
          </thead>
          <tbody>
            <tr><td className={labelCellClass}>Penyusun</td><td className={contentCellClass}>{data.identitas.modul?.penyusun}</td></tr>
            <tr><td className={labelCellClass}>Sekolah</td><td className={contentCellClass}>{data.identitas.modul?.sekolah}</td></tr>
            <tr><td className={labelCellClass}>Tahun Pelajaran</td><td className={contentCellClass}>{data.identitas.modul?.tahunPelajaran}</td></tr>
            <tr><td className={labelCellClass}>Semester</td><td className={contentCellClass}>{data.identitas.modul?.semester}</td></tr>
            <tr><td className={labelCellClass}>Mata Pelajaran</td><td className={contentCellClass}>{data.identitas.modul?.mataPelajaran}</td></tr>
            <tr><td className={labelCellClass}>Kelas / Fase</td><td className={contentCellClass}>{data.identitas.modul?.kelasFase}</td></tr>
            <tr><td className={labelCellClass}>Bab / Topik</td><td className={contentCellClass}>{data.identitas.modul?.bab}</td></tr>
            <tr><td className={labelCellClass}>Alokasi Waktu</td><td className={contentCellClass}>{data.identitas.modul?.alokasiWaktu}</td></tr>
          </tbody>
        </table>

        <table className="w-full border-collapse border border-black mb-6">
          <thead>
            <tr><th colSpan={2} className={headerBgClass}>b. Identifikasi Kesiapan Peserta Didik</th></tr>
          </thead>
          <tbody>
            <tr><td className={labelCellClass}>Pengetahuan Awal</td><td className={contentCellClass}>{data.identitas.identifikasiSiswa?.pengetahuanAwal}</td></tr>
            <tr><td className={labelCellClass}>Minat & Latar Belakang</td><td className={contentCellClass}>
              <p className="mb-1 font-bold">Minat:</p><p className="mb-2">{data.identitas.identifikasiSiswa?.minat}</p>
              <p className="mb-1 font-bold">Latar Belakang:</p><p>{data.identitas.identifikasiSiswa?.latarBelakang}</p>
            </td></tr>
            <tr><td className={labelCellClass}>Kebutuhan Belajar (VAK)</td><td className={contentCellClass}>
              <ul className="list-none space-y-1">
                <li>● <span className="font-bold">Visual:</span> {data.identitas.identifikasiSiswa?.kebutuhanBelajar?.visual}</li>
                <li>● <span className="font-bold">Auditori:</span> {data.identitas.identifikasiSiswa?.kebutuhanBelajar?.auditori}</li>
                <li>● <span className="font-bold">Kinestetik:</span> {data.identitas.identifikasiSiswa?.kebutuhanBelajar?.kinestetik}</li>
                <li>● <span className="font-bold">Kesulitan:</span> {data.identitas.identifikasiSiswa?.kebutuhanBelajar?.kesulitan}</li>
                <li>● <span className="font-bold">Cepat Belajar:</span> {data.identitas.identifikasiSiswa?.kebutuhanBelajar?.cepatBelajar}</li>
              </ul>
            </td></tr>
          </tbody>
        </table>

        <table className="w-full border-collapse border border-black mb-6">
          <thead>
            <tr><th colSpan={2} className={headerBgClass}>c. Karakteristik Materi Pelajaran</th></tr>
          </thead>
          <tbody>
            <tr><td className={labelCellClass}>Jenis Pengetahuan</td><td className={contentCellClass}>
              <p className="mb-1"><span className="font-bold">Konseptual:</span> {data.identitas.karakteristikMateri?.jenisPengetahuan?.konseptual}</p>
              <p className="mb-1"><span className="font-bold">Prosedural:</span> {data.identitas.karakteristikMateri?.jenisPengetahuan?.prosedural}</p>
              <p><span className="font-bold">Aplikasi:</span> {data.identitas.karakteristikMateri?.jenisPengetahuan?.aplikasi}</p>
            </td></tr>
            <tr><td className={labelCellClass}>Relevansi & Nilai</td><td className={contentCellClass}>
              <p className="mb-2"><span className="font-bold">Relevansi:</span> {data.identitas.karakteristikMateri?.relevansi}</p>
              <p><span className="font-bold">Integrasi Nilai:</span> {data.identitas.karakteristikMateri?.integrasiNilai}</p>
            </td></tr>
            <tr><td className={labelCellClass}>Tingkat Kesulitan & Struktur</td><td className={contentCellClass}>
              <p className="mb-2"><span className="font-bold">Kesulitan:</span> {data.identitas.karakteristikMateri?.tingkatKesulitan}</p>
              <p><span className="font-bold">Struktur:</span> {data.identitas.karakteristikMateri?.strukturMateri}</p>
            </td></tr>
          </tbody>
        </table>

        <table className="w-full border-collapse border border-black mb-6">
          <thead>
            <tr><th colSpan={2} className={headerBgClass}>d. Dimensi Profil Lulusan</th></tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2} className={contentCellClass}>
                <div className="grid grid-cols-1 gap-2 p-1">
                  {data.identitas.dimensiProfil?.map((dim, i) => (
                    <div key={i} className="flex gap-2 border-b border-gray-100 pb-1">
                      <span className="font-bold text-blue-700 whitespace-nowrap">[{dim.nama}]</span>
                      <span>{dim.penjelasan}</span>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* 2. DESAIN PEMBELAJARAN */}
      <section className="mb-10 page-break-before">
        <h2 className={sectionTitleClass}>2. DESAIN PEMBELAJARAN</h2>
        <table className="w-full border-collapse border border-black mb-6">
          <tbody>
            <tr><td className={labelCellClass}>a. Capaian Pembelajaran</td><td className={contentCellClass}>{data.desainPembelajaran?.cp}</td></tr>
            <tr><td className={labelCellClass}>b. Tujuan Pembelajaran</td><td className={contentCellClass}>
              <ul className="list-decimal ml-4">
                {data.desainPembelajaran?.tujuan?.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </td></tr>
            <tr><td className={labelCellClass}>c. Lintas Disiplin Ilmu</td><td className={contentCellClass}>{data.desainPembelajaran?.lintasDisiplin}</td></tr>
            <tr><td className={labelCellClass}>d. Topik Pembelajaran</td><td className={contentCellClass}>{data.desainPembelajaran?.topik}</td></tr>
            <tr><td className={labelCellClass}>e. Praktik Pedagogik</td><td className={contentCellClass}>
              <p className="mb-1 uppercase font-bold text-blue-800">Pendekatan: {data.desainPembelajaran?.pedagogik?.pendekatan}</p>
              <p className="mb-1"><span className="font-bold">MODEL:</span> {data.desainPembelajaran?.pedagogik?.model}</p>
              <p className="mb-1"><span className="font-bold">STRATEGI:</span> {data.desainPembelajaran?.pedagogik?.strategi}</p>
              <p className="mb-2"><span className="font-bold">METODE:</span> {data.desainPembelajaran?.pedagogik?.metode}</p>
              <p className="font-bold italic underline">Sintaks Model:</p>
              <ul className="list-disc ml-4">{data.desainPembelajaran?.pedagogik?.sintaks?.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </td></tr>
            <tr><td className={labelCellClass}>f. Kemitraan Pembelajaran</td><td className={contentCellClass}>{data.desainPembelajaran?.kemitraan}</td></tr>
            <tr><td className={labelCellClass}>g. Lingkungan Pembelajaran</td><td className={contentCellClass}>{data.desainPembelajaran?.lingkungan}</td></tr>
            <tr><td className={labelCellClass}>h. Pemanfaatan Digital</td><td className={contentCellClass}>{data.desainPembelajaran?.digital}</td></tr>
          </tbody>
        </table>
      </section>

      {/* 3. PENGALAMAN BELAJAR */}
      <section className="mb-10 page-break-before">
        <h2 className={sectionTitleClass}>3. PENGALAMAN BELAJAR</h2>
        {data.pengalamanBelajar?.map((meeting, i) => (
          <table key={i} className="w-full border-collapse border border-black mb-8">
            <thead>
              <tr className="bg-blue-50">
                <th colSpan={2} className="border border-black p-2 text-center text-xs font-bold uppercase">
                  PERTEMUAN {meeting.pertemuanKe} (Model: {meeting.model} | Strategi: {meeting.strategi})
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-2 font-bold bg-gray-50 w-1/5 text-[10px] align-middle text-center uppercase">Kegiatan Awal (15-20 Menit)</td>
                <td className={contentCellClass}>
                  <p className="font-bold text-blue-800 mb-1">Prinsip: {meeting.awal?.principles?.join(', ')}</p>
                  <div className="whitespace-pre-line">{meeting.awal?.text}</div>
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-bold bg-gray-50 w-1/5 text-[10px] align-middle text-center uppercase">Kegiatan Inti (60 Menit)</td>
                <td className={contentCellClass}>
                  <p className="italic mb-4 text-gray-600 bg-gray-50 p-2 border-l-4 border-indigo-300">
                    Pada tahap ini, siswa aktif terlibat dalam pengalaman belajar memahami, mengaplikasikan, dan merefleksi. Guru menerapkan prinsip pembelajaran berkesadaran, bermakna, menyenangkan untuk mencapai tujuan pembelajaran.
                  </p>
                  <div className="space-y-4">
                    <div className="border-b border-gray-100 pb-2">
                      <p className="font-bold text-indigo-700 uppercase text-[10px] mb-1">1. Memahami (Prinsip: {meeting.inti?.memahami?.principles?.join(', ')}):</p>
                      <div className="whitespace-pre-line">{meeting.inti?.memahami?.text}</div>
                    </div>
                    <div className="border-b border-gray-100 pb-2">
                      <p className="font-bold text-indigo-700 uppercase text-[10px] mb-1">2. Mengaplikasikan (Prinsip: {meeting.inti?.mengaplikasikan?.principles?.join(', ')}):</p>
                      <div className="whitespace-pre-line">{meeting.inti?.mengaplikasikan?.text}</div>
                    </div>
                    <div>
                      <p className="font-bold text-indigo-700 uppercase text-[10px] mb-1">3. Merefleksi (Prinsip: {meeting.inti?.merefleksi?.principles?.join(', ')}):</p>
                      <div className="whitespace-pre-line">{meeting.inti?.merefleksi?.text}</div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2 font-bold bg-gray-50 w-1/5 text-[10px] align-middle text-center uppercase">Kegiatan Penutup (5-10 Menit)</td>
                <td className={contentCellClass}>
                  <p className="font-bold text-amber-700 mb-1">Prinsip: {meeting.penutup?.principles?.join(', ')}</p>
                  <div className="whitespace-pre-line">{meeting.penutup?.text}</div>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </section>

      {/* 4. ASESMEN PEMBELAJARAN */}
      <section className="mb-10 page-break-before">
        <h2 className={sectionTitleClass}>4. ASESMEN PEMBELAJARAN</h2>
        <table className="w-full border-collapse border border-black mb-8">
          <tbody>
            <tr>
              <td className={labelCellClass}>ASSESSMENT AS LEARNING (Sebagai Pembelajaran)</td>
              <td className={contentCellClass}>{data.asesmen?.asLearning}</td>
            </tr>
            <tr>
              <td className={labelCellClass}>ASSESSMENT FOR LEARNING (Untuk Pembelajaran)</td>
              <td className={contentCellClass}>{data.asesmen?.forLearning}</td>
            </tr>
            <tr>
              <td className={labelCellClass}>ASSESSMENT OF LEARNING (Tentang Pembelajaran)</td>
              <td className={contentCellClass}>{data.asesmen?.ofLearning}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Signature Section - Robust for Word Exports */}
      <div className="mt-12 mb-20" style={{ width: '100%', display: 'block' }}>
        <table border={0} cellPadding={0} cellSpacing={0} width="100%" style={{ width: '100%', border: 'none', borderCollapse: 'collapse', backgroundColor: 'transparent' }}>
          <tbody>
            <tr style={{ border: 'none' }}>
              <td align="center" width="50%" style={{ width: '50%', textAlign: 'center', border: 'none', padding: '10px', verticalAlign: 'top' }}>
                <p style={{ margin: '0 0 4pt 0', fontSize: '11pt' }}>Mengetahui,</p>
                <p style={{ margin: '0 0 0 0', fontWeight: 'bold', fontSize: '11pt', textTransform: 'uppercase' }}>Kepala Sekolah</p>
                <br/><br/><br/><br/>
                <p style={{ margin: '0 0 0 0', fontWeight: 'bold', fontSize: '11pt', textDecoration: 'underline', textTransform: 'uppercase' }}>{meta.identitas.kepalaSekolah || '____________________'}</p>
                <p style={{ margin: '2pt 0 0 0', fontSize: '10pt' }}>NIP: {meta.identitas.nipKepalaSekolah || '____________________'}</p>
              </td>
              <td align="center" width="50%" style={{ width: '50%', textAlign: 'center', border: 'none', padding: '10px', verticalAlign: 'top' }}>
                <p style={{ margin: '0 0 4pt 0', fontSize: '11pt' }}>{location}, {today}</p>
                <p style={{ margin: '0 0 0 0', fontWeight: 'bold', fontSize: '11pt', textTransform: 'uppercase' }}>Guru Mata Pelajaran</p>
                <br/><br/><br/><br/>
                <p style={{ margin: '0 0 0 0', fontWeight: 'bold', fontSize: '11pt', textDecoration: 'underline', textTransform: 'uppercase' }}>{meta.identitas.guru || '____________________'}</p>
                <p style={{ margin: '2pt 0 0 0', fontSize: '10pt' }}>NIP: {meta.identitas.nipGuru || '____________________'}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bottom Information (Footer) */}
      <div className="mt-20 pt-8 border-t border-gray-100 text-center text-[9px] text-gray-400 no-print flex flex-col items-center gap-2">
        <div style={{ letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.5 }}>Generator RPM Deep Learning v4.8</div>
        <div style={{ fontWeight: '900', color: '#2563eb', padding: '4px 12px', background: '#eff6ff', borderRadius: '8px' }}>Created by: @yags.id</div>
      </div>
    </div>
  );
};

export default RPMPreview;
