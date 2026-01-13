
import React, { useState, useRef } from 'react';
import { Jenjang, DimensiProfil, RPMData, GeneratedRPM } from './types';
import { generateRPMContent } from './services/geminiService';
import RPMForm from './components/RPMForm';
import RPMPreview from './components/RPMPreview';
import { FileText, Copy, RefreshCw, CheckCircle, ArrowRight, Download, Lock, LogIn } from 'lucide-react';

const App: React.FC = () => {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // App data state
  const [formData, setFormData] = useState<RPMData>({
    identitas: {
      satuanPendidikan: '',
      guru: '',
      nipGuru: '',
      kepalaSekolah: '',
      nipKepalaSekolah: '',
      semester: 'Ganjil',
      bab: '',
    },
    pembelajaran: {
      jenjang: Jenjang.SMA,
      kelas: '',
      mataPelajaran: '',
      cp: '',
    },
    pertemuan: {
      jumlah: 1,
      durasi: '2 x 45 menit',
    },
    profilLulusan: [],
  });

  const [generatedRPM, setGeneratedRPM] = useState<GeneratedRPM | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Updated password to 123456
  const APP_PASSWORD = "123456";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === APP_PASSWORD) {
      setIsLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleGenerate = async () => {
    if (!formData.pembelajaran.cp || formData.profilLulusan.length === 0) {
      alert("Harap lengkapi CP dan pilih minimal satu Dimensi Profil Lulusan.");
      return;
    }
    setLoading(true);
    try {
      const result = await generateRPMContent(formData);
      setGeneratedRPM(result);
    } catch (error) {
      console.error("Error generating RPM:", error);
      alert("Gagal menghasilkan RPM. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (previewRef.current) {
      const range = document.createRange();
      range.selectNode(previewRef.current);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      document.execCommand('copy');
      window.getSelection()?.removeAllRanges();
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadWord = () => {
    if (!previewRef.current) return;
    
    const content = previewRef.current.innerHTML;
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>RPM Deep Learning</title>
      <style>
        body { font-family: 'Times New Roman', serif; font-size: 11pt; line-height: 1.15; }
        table { border-collapse: collapse; width: 100%; border: 1pt solid black; margin-bottom: 10pt; }
        th, td { border: 1pt solid black; padding: 5pt; vertical-align: top; }
        .text-center { text-align: center; }
        .font-bold { font-weight: bold; }
        .uppercase { text-transform: uppercase; }
        .underline { text-decoration: underline; }
        .no-border { border: none !important; }
        .no-border td { border: none !important; }
        @page { size: A4; margin: 1in; }
      </style>
    </head>
    <body>`;
    const footer = "</body></html>";
    const sourceHTML = header + content + footer;
    
    const blob = new Blob(['\ufeff', sourceHTML], {
      type: 'application/msword'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `RPM_${formData.pembelajaran.mataPelajaran || 'Document'}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md transform transition-all animate-in zoom-in duration-300">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-blue-600 p-4 rounded-2xl shadow-lg mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Akses Aplikasi</h1>
            <p className="text-slate-500 text-sm">Masukkan kata sandi untuk masuk</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Kata Sandi"
                className={`w-full p-4 border-2 rounded-xl outline-none transition-all ${loginError ? 'border-red-500 bg-red-50' : 'border-slate-100 focus:border-blue-600'}`}
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setLoginError(false);
                }}
                autoFocus
              />
              {loginError && <p className="text-red-500 text-xs mt-2 font-bold uppercase tracking-widest">Kata sandi salah!</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              MASUK SEKARANG
            </button>
          </form>
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
             <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em]">Generator RPM Deep Learning v4.7</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-12">
      {/* Header: Logo on Left, Reduced Padding */}
      <header className="bg-[#1e293b] text-white py-4 shadow-xl no-print relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="container mx-auto px-4 relative z-10 flex items-center gap-4">
          <div className="p-2.5 bg-blue-600 rounded-2xl shadow-lg shadow-blue-900/20">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight leading-none">
              Generator <span className="text-blue-400">RPM</span>
            </h1>
            <p className="text-slate-400 text-xs font-semibold tracking-widest uppercase mt-0.5">
              Deep Learning Plan
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 no-print">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sticky top-6">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-3">
               <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-blue-600" />
               </div>
               <h2 className="text-lg font-black text-slate-800 tracking-tight uppercase">Data Perangkat</h2>
            </div>
            <RPMForm 
              data={formData} 
              onChange={setFormData} 
              onGenerate={handleGenerate}
              loading={loading}
            />
          </div>
        </div>

        <div className="lg:col-span-8">
          {generatedRPM ? (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden p-8 md:p-14 print:p-0 print:shadow-none print:m-0" ref={previewRef}>
                <RPMPreview data={generatedRPM} meta={formData} />
              </div>

              <div className="flex flex-wrap gap-3 no-print sticky bottom-6 bg-slate-900/95 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/10 z-50">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 bg-white hover:bg-slate-50 text-slate-900 px-6 py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all active:scale-95 shadow-md group"
                >
                  {copied ? <CheckCircle className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 group-hover:rotate-6 transition-transform" />}
                  {copied ? 'BERHASIL DISALIN' : 'SALIN SELURUH HASIL RPM'}
                </button>
                <button
                  onClick={handleDownloadWord}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all active:scale-95 shadow-md"
                >
                  <Download className="w-5 h-5" />
                  DOWNLOAD .DOCX
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border-4 border-dashed border-slate-200 min-h-[700px] flex flex-col items-center justify-center text-slate-300 p-12 text-center transition-all hover:border-blue-100">
              {loading ? (
                <div className="flex flex-col items-center">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 border-6 border-blue-50 border-t-blue-600 rounded-full animate-spin"></div>
                    <RefreshCw className="w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">Menyusun RPM...</h3>
                  <p className="text-slate-500 max-w-sm mt-2 font-medium italic">
                    AI sedang memproses rencana pembelajaran mendalam yang sistematis.
                  </p>
                </div>
              ) : (
                <>
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <FileText className="w-12 h-12 opacity-10 text-slate-900" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight uppercase">Dokumen Preview</h3>
                  <p className="mt-2 max-w-sm text-slate-500 font-medium">
                    Hasil RPM akan muncul di sini setelah Anda melengkapi data dan menekan tombol generate.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="mt-20 text-center text-slate-400 no-print pb-12">
        <div className="container mx-auto px-4">
          <div className="w-12 h-1 bg-slate-200 mx-auto mb-6 rounded-full"></div>
          <p className="font-bold text-slate-700">Generator RPM Deep Learning v4.7</p>
          <div className="mt-4 inline-block px-8 py-3 bg-slate-900 text-white rounded-full font-black text-[10px] tracking-widest shadow-lg">
            Created by: @yags.id
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
