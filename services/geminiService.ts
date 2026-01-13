
import { GoogleGenAI, Type } from "@google/genai";
import { RPMData, GeneratedRPM } from "../types";

export const generateRPMContent = async (data: RPMData): Promise<GeneratedRPM> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const tp = `${currentYear}/${nextYear}`;

  const prompt = `
    Tugas: Hasilkan Rencana Pembelajaran Mendalam (RPM) profesional dengan struktur yang SANGAT DETAIL.
    
    DATA INPUT:
    - Sekolah: ${data.identitas.satuanPendidikan}
    - Guru: ${data.identitas.guru}
    - Mapel: ${data.pembelajaran.mataPelajaran}
    - Kelas/Fase: ${data.pembelajaran.kelas}
    - CP: ${data.pembelajaran.cp}
    - Bab: ${data.identitas.bab}
    - Semester: ${data.identitas.semester}
    - Jenjang: ${data.pembelajaran.jenjang}
    - Alokasi per Pertemuan: ${data.pertemuan.durasi}
    - Jumlah Pertemuan: ${data.pertemuan.jumlah}
    - DPL Terpilih: ${data.profilLulusan.join(', ')}

    INSTRUKSI KHUSUS PENGALAMAN BELAJAR (LANGKAH-LANGKAH):
    Hasilkan narasi yang lengkap untuk setiap pertemuan dengan poin-poin detail sebagai berikut:

    AWAL (Prinsip: Bermakna, Menggembirakan, Berkesadaran):
    - Harus mencakup: Menyapa/Doa, Contoh Masalah nyata sehari-hari yang provokatif, Apersepsi (tanya pengalaman siswa), dan Motivasi (kaitan materi dengan kemudahan hidup).

    INTI (Prinsip: Berkesadaran, Bermakna, Menggembirakan):
    Berikan narasi pengantar: "Pada tahap ini, siswa aktif terlibat dalam pengalaman belajar memahami, mengaplikasikan, dan merefleksi. Guru menerapkan prinsip pembelajaran berkesadaran, bermakna, menyenangkan untuk mencapai tujuan pembelajaran."
    
    1. Memahami: Jelaskan bagaimana Guru memaparkan konsep dasar (misal: pilar berpikir komputasional atau materi relevan) dengan bantuan alat peraga/visual/video.
    2. Mengaplikasikan: Detailkan pembagian kelompok, analisis MASALAH NYATA, dan langkah pemecahan masalah (jika mapel IT/Logika gunakan sub-poin: Dekomposisi, Pengenalan Pola, Abstraksi, Algoritma). Sertakan DIFERENSIASI PRODUK (misal: laporan, canva, video).
    3. Merefleksi: Proses presentasi, tanggapan antar kelompok, dan pertanyaan reflektif dari Guru ("Apakah cara ini bisa diterapkan di kehidupan lain?").

    PENUTUP (Bermakna, Berkesadaran):
    - Mencakup: Umpan balik/Apresiasi, Refleksi melalui instrumen (misal: Padlet/Jurnal), Kesimpulan, dan Arahan tugas lanjutan/rencana selanjutnya.

    INTEGRASI: 
    - Gunakan istilah "Guru" dan "Murid/Siswa" secara konsisten.
    - Cantumkan DPL (${data.profilLulusan.join(', ')}) di dalam kurung pada aktivitas yang relevan.

    Output HARUS valid JSON.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          identitas: {
            type: Type.OBJECT,
            properties: {
              modul: {
                type: Type.OBJECT,
                properties: {
                  penyusun: { type: Type.STRING },
                  sekolah: { type: Type.STRING },
                  tahunPelajaran: { type: Type.STRING },
                  semester: { type: Type.STRING },
                  mataPelajaran: { type: Type.STRING },
                  kelasFase: { type: Type.STRING },
                  bab: { type: Type.STRING },
                  alokasiWaktu: { type: Type.STRING }
                },
                required: ["penyusun", "sekolah", "tahunPelajaran", "semester", "mataPelajaran", "kelasFase", "bab", "alokasiWaktu"]
              },
              identifikasiSiswa: {
                type: Type.OBJECT,
                properties: {
                  pengetahuanAwal: { type: Type.STRING },
                  minat: { type: Type.STRING },
                  latarBelakang: { type: Type.STRING },
                  kebutuhanBelajar: {
                    type: Type.OBJECT,
                    properties: {
                      visual: { type: Type.STRING },
                      auditori: { type: Type.STRING },
                      kinestetik: { type: Type.STRING },
                      kesulitan: { type: Type.STRING },
                      cepatBelajar: { type: Type.STRING }
                    },
                    required: ["visual", "auditori", "kinestetik", "kesulitan", "cepatBelajar"]
                  }
                },
                required: ["pengetahuanAwal", "minat", "latarBelakang", "kebutuhanBelajar"]
              },
              karakteristikMateri: {
                type: Type.OBJECT,
                properties: {
                  jenisPengetahuan: {
                    type: Type.OBJECT,
                    properties: {
                      konseptual: { type: Type.STRING },
                      prosedural: { type: Type.STRING },
                      aplikasi: { type: Type.STRING }
                    },
                    required: ["konseptual", "prosedural", "aplikasi"]
                  },
                  relevansi: { type: Type.STRING },
                  tingkatKesulitan: { type: Type.STRING },
                  strukturMateri: { type: Type.STRING },
                  integrasiNilai: { type: Type.STRING }
                },
                required: ["jenisPengetahuan", "relevansi", "tingkatKesulitan", "strukturMateri", "integrasiNilai"]
              },
              dimensiProfil: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    nama: { type: Type.STRING },
                    penjelasan: { type: Type.STRING }
                  },
                  required: ["nama", "penjelasan"]
                }
              }
            },
            required: ["modul", "identifikasiSiswa", "karakteristikMateri", "dimensiProfil"]
          },
          desainPembelajaran: {
            type: Type.OBJECT,
            properties: {
              cp: { type: Type.STRING },
              tujuan: { type: Type.ARRAY, items: { type: Type.STRING } },
              lintasDisiplin: { type: Type.STRING },
              topik: { type: Type.STRING },
              pedagogik: {
                type: Type.OBJECT,
                properties: {
                  pendekatan: { type: Type.STRING },
                  model: { type: Type.STRING },
                  strategi: { type: Type.STRING },
                  metode: { type: Type.STRING },
                  sintaks: { type: Type.ARRAY, items: { type: Type.STRING } }
                },
                required: ["pendekatan", "model", "strategi", "metode", "sintaks"]
              },
              kemitraan: { type: Type.STRING },
              lingkungan: { type: Type.STRING },
              digital: { type: Type.STRING }
            },
            required: ["cp", "tujuan", "lintasDisiplin", "topik", "pedagogik", "kemitraan", "lingkungan", "digital"]
          },
          pengalamanBelajar: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                pertemuanKe: { type: Type.INTEGER },
                model: { type: Type.STRING },
                strategi: { type: Type.STRING },
                metode: { type: Type.STRING },
                awal: {
                  type: Type.OBJECT,
                  properties: {
                    text: { type: Type.STRING },
                    principles: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ["text", "principles"]
                },
                inti: {
                  type: Type.OBJECT,
                  properties: {
                    memahami: {
                      type: Type.OBJECT,
                      properties: {
                        text: { type: Type.STRING },
                        principles: { type: Type.ARRAY, items: { type: Type.STRING } }
                      },
                      required: ["text", "principles"]
                    },
                    mengaplikasikan: {
                      type: Type.OBJECT,
                      properties: {
                        text: { type: Type.STRING },
                        principles: { type: Type.ARRAY, items: { type: Type.STRING } }
                      },
                      required: ["text", "principles"]
                    },
                    merefleksi: {
                      type: Type.OBJECT,
                      properties: {
                        text: { type: Type.STRING },
                        principles: { type: Type.ARRAY, items: { type: Type.STRING } }
                      },
                      required: ["text", "principles"]
                    }
                  },
                  required: ["memahami", "mengaplikasikan", "merefleksi"]
                },
                penutup: {
                  type: Type.OBJECT,
                  properties: {
                    text: { type: Type.STRING },
                    principles: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ["text", "principles"]
                }
              },
              required: ["pertemuanKe", "model", "strategi", "metode", "awal", "inti", "penutup"]
            }
          },
          asesmen: {
            type: Type.OBJECT,
            properties: {
              asLearning: { type: Type.STRING },
              forLearning: { type: Type.STRING },
              ofLearning: { type: Type.STRING }
            },
            required: ["asLearning", "forLearning", "ofLearning"]
          }
        },
        required: ["identitas", "desainPembelajaran", "pengalamanBelajar", "asesmen"]
      }
    }
  });

  const jsonStr = response.text?.trim();
  if (!jsonStr) throw new Error("AI returned empty content");
  return JSON.parse(jsonStr);
};
