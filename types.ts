
export enum Jenjang {
  SD = 'SD',
  SMP = 'SMP',
  SMA = 'SMA',
  SMK = 'SMK'
}

export enum DimensiProfil {
  ImanTaqwa = 'Keimanan & Ketakwaan',
  Kewargaan = 'Kewargaan',
  NalarKritis = 'Penalaran Kritis',
  Kreativitas = 'Kreativitas',
  Kolaborasi = 'Kolaborasi',
  Kemandirian = 'Kemandirian',
  Kesehatan = 'Kesehatan',
  Komunikasi = 'Komunikasi'
}

export interface LearningStepContent {
  text: string;
  principles: string[];
}

export interface MeetingSteps {
  pertemuanKe: number;
  model: string;
  strategi: string;
  metode: string;
  awal: LearningStepContent;
  inti: {
    memahami: LearningStepContent;
    mengaplikasikan: LearningStepContent;
    merefleksi: LearningStepContent;
  };
  penutup: LearningStepContent;
}

export interface RPMData {
  identitas: {
    satuanPendidikan: string;
    guru: string;
    nipGuru: string;
    kepalaSekolah: string;
    nipKepalaSekolah: string;
    semester: string;
    bab: string;
  };
  pembelajaran: {
    jenjang: Jenjang;
    kelas: string;
    mataPelajaran: string;
    cp: string;
  };
  pertemuan: {
    jumlah: number;
    durasi: string;
  };
  profilLulusan: DimensiProfil[];
}

export interface GeneratedRPM {
  identitas: {
    modul: {
      penyusun: string;
      sekolah: string;
      tahunPelajaran: string;
      semester: string;
      mataPelajaran: string;
      kelasFase: string;
      bab: string;
      alokasiWaktu: string;
    };
    identifikasiSiswa: {
      pengetahuanAwal: string;
      minat: string;
      latarBelakang: string;
      kebutuhanBelajar: {
        visual: string;
        auditori: string;
        kinestetik: string;
        kesulitan: string;
        cepatBelajar: string;
      };
    };
    karakteristikMateri: {
      jenisPengetahuan: {
        konseptual: string;
        prosedural: string;
        aplikasi: string;
      };
      relevansi: string;
      tingkatKesulitan: string;
      strukturMateri: string;
      integrasiNilai: string;
    };
    dimensiProfil: {
      nama: string;
      penjelasan: string;
    }[];
  };
  desainPembelajaran: {
    cp: string;
    tujuan: string[];
    lintasDisiplin: string;
    topik: string;
    pedagogik: {
      pendekatan: string;
      model: string;
      strategi: string;
      metode: string;
      sintaks: string[];
    };
    kemitraan: string;
    lingkungan: string;
    digital: string;
  };
  pengalamanBelajar: MeetingSteps[];
  asesmen: {
    asLearning: string;
    forLearning: string;
    ofLearning: string;
  };
}
