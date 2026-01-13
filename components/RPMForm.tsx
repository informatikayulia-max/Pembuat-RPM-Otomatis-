
import React from 'react';
import { RPMData, Jenjang, DimensiProfil } from '../types';
import { Send, RefreshCw } from 'lucide-react';

interface RPMFormProps {
  data: RPMData;
  onChange: (data: RPMData) => void;
  onGenerate: () => void;
  loading: boolean;
}

const RPMForm: React.FC<RPMFormProps> = ({ data, onChange, onGenerate, loading }) => {
  const updateIdentitas = (field: keyof RPMData['identitas'], value: string) => {
    onChange({
      ...data,
      identitas: { ...data.identitas, [field]: value }
    });
  };

  const updatePembelajaran = (field: keyof RPMData['pembelajaran'], value: string) => {
    onChange({
      ...data,
      pembelajaran: { ...data.pembelajaran, [field]: value }
    });
  };

  const updatePertemuan = (field: keyof RPMData['pertemuan'], value: any) => {
    onChange({
      ...data,
      pertemuan: { ...data.pertemuan, [field]: value }
    });
  };

  const toggleDimensi = (dimensi: DimensiProfil) => {
    const current = [...data.profilLulusan];
    const index = current.indexOf(dimensi);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(dimensi);
    }
    onChange({ ...data, profilLulusan: current });
  };

  return (
    <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
      {/* Identitas */}
      <section className="space-y-3">
        <h3 className="font-semibold text-blue-600 text-sm uppercase tracking-wider">Identitas Pengajar</h3>
        <input 
          type="text" placeholder="Nama Satuan Pendidikan" 
          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          value={data.identitas.satuanPendidikan}
          onChange={(e) => updateIdentitas('satuanPendidikan', e.target.value)}
        />
        <div className="grid grid-cols-2 gap-2">
          <input 
            type="text" placeholder="Nama Guru" 
            className="p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={data.identitas.guru}
            onChange={(e) => updateIdentitas('guru', e.target.value)}
          />
          <input 
            type="text" placeholder="NIP Guru" 
            className="p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={data.identitas.nipGuru}
            onChange={(e) => updateIdentitas('nipGuru', e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input 
            type="text" placeholder="Nama Kepala Sekolah" 
            className="p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={data.identitas.kepalaSekolah}
            onChange={(e) => updateIdentitas('kepalaSekolah', e.target.value)}
          />
          <input 
            type="text" placeholder="NIP Kepala Sekolah" 
            className="p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={data.identitas.nipKepalaSekolah}
            onChange={(e) => updateIdentitas('nipKepalaSekolah', e.target.value)}
          />
        </div>
      </section>

      {/* Informasi Pembelajaran */}
      <section className="space-y-3">
        <h3 className="font-semibold text-blue-600 text-sm uppercase tracking-wider">Materi & Target</h3>
        <div className="grid grid-cols-2 gap-2">
          <select 
            className="p-2.5 border rounded-lg bg-white shadow-sm font-bold"
            value={data.pembelajaran.jenjang}
            onChange={(e) => updatePembelajaran('jenjang', e.target.value as Jenjang)}
          >
            {Object.values(Jenjang).map(j => <option key={j} value={j}>{j}</option>)}
          </select>
          <input 
            type="text" placeholder="Kelas / Fase (contoh: X / E)" 
            className="p-2.5 border rounded-lg"
            value={data.pembelajaran.kelas}
            onChange={(e) => updatePembelajaran('kelas', e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input 
            type="text" placeholder="Semester (contoh: 1 atau Ganjil)" 
            className="p-2.5 border rounded-lg"
            value={data.identitas.semester}
            onChange={(e) => updateIdentitas('semester', e.target.value)}
          />
          <input 
            type="text" placeholder="Mata Pelajaran" 
            className="p-2.5 border rounded-lg"
            value={data.pembelajaran.mataPelajaran}
            onChange={(e) => updatePembelajaran('mataPelajaran', e.target.value)}
          />
        </div>
        <input 
          type="text" placeholder="Bab / Topik Utama" 
          className="w-full p-2.5 border rounded-lg font-medium"
          value={data.identitas.bab}
          onChange={(e) => updateIdentitas('bab', e.target.value)}
        />
        <textarea 
          placeholder="Capaian Pembelajaran (CP)" 
          className="w-full p-2.5 border rounded-lg h-24 text-sm"
          value={data.pembelajaran.cp}
          onChange={(e) => updatePembelajaran('cp', e.target.value)}
        ></textarea>
      </section>

      {/* Pertemuan */}
      <section className="space-y-3">
        <h3 className="font-semibold text-blue-600 text-sm uppercase tracking-wider">Waktu</h3>
        <div className="grid grid-cols-2 gap-3 mb-2">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold text-gray-400">Jml Pertemuan</label>
            <input 
              type="number" min="1" max="10"
              className="p-2.5 border rounded-lg font-bold"
              value={data.pertemuan.jumlah}
              onChange={(e) => updatePertemuan('jumlah', parseInt(e.target.value) || 1)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold text-gray-400">Durasi Per Pertemuan</label>
            <input 
              type="text" 
              className="p-2.5 border rounded-lg"
              value={data.pertemuan.durasi}
              onChange={(e) => updatePertemuan('durasi', e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Dimensi Profil Lulusan */}
      <section className="space-y-3">
        <h3 className="font-semibold text-blue-600 text-sm uppercase tracking-wider">Profil Lulusan</h3>
        <div className="flex flex-wrap gap-2">
          {Object.values(DimensiProfil).map(dim => (
            <button
              key={dim}
              onClick={() => toggleDimensi(dim)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                data.profilLulusan.includes(dim) 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {dim}
            </button>
          ))}
        </div>
      </section>

      <button
        onClick={onGenerate}
        disabled={loading || !data.pembelajaran.cp || data.profilLulusan.length === 0}
        className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-white shadow-lg transition-all ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800 hover:shadow-xl active:scale-95'
        }`}
      >
        {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        {loading ? 'MERANCANG RPM...' : 'HASILKAN RPM SEKARANG'}
      </button>
    </div>
  );
};

export default RPMForm;
