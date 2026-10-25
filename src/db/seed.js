import * as repository from "../features/events/events.repository.js";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const toIsoDate = (daysFromToday) =>
  new Date(Date.now() + daysFromToday * DAY_IN_MS).toISOString().slice(0, 10);

const SAMPLE_EVENTS = [
  { title: "Ibadah Raya Minggu", category: "ibadah", offset: 3, startTime: "09:00", location: "Gedung Gereja Utama", leader: "Pdt. Samuel Sitorus", description: "Ibadah pagi bersama seluruh jemaat dengan Perjamuan Kudus." },
  { title: "Doa Malam Persekutuan", category: "doa", offset: 5, startTime: "19:00", location: "Aula Gereja", leader: "Ibu Maria Simanjuntak", description: "Doa syafaat untuk jemaat, keluarga, dan bangsa." },
  { title: "Latihan Paduan Suara", category: "paduan-suara", offset: 6, startTime: "18:30", location: "Ruang Musik", leader: "Bpk. Daniel Hutapea", description: "Persiapan lagu untuk ibadah Natal." },
  { title: "Kunjungan Kasih Jemaat Sakit", category: "pelayanan", offset: 8, startTime: "14:00", location: "Berangkat dari kantor gereja", leader: "Tim Diakonia", description: "Mengunjungi dan mendoakan jemaat yang sedang sakit." },
  { title: "Rapat Majelis Bulanan", category: "rapat", offset: 10, startTime: "17:00", location: "Ruang Rapat Majelis", leader: "Pdt. Samuel Sitorus", description: "Evaluasi program dan persiapan perayaan Natal." },
];

export function seedDatabase() {
  if (repository.count() > 0) return;
  SAMPLE_EVENTS.forEach(({ offset, ...event }) =>
    repository.create({ ...event, eventDate: toIsoDate(offset) })
  );
}
