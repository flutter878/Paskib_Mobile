import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Bell } from 'lucide-react-native';

export default function PengumumanScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Informasi & Pengumuman</Text>
      </View>

      {/* Contoh Kartu Pengumuman 1 */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Bell size={20} color="#dc2626" />
          <Text style={styles.cardTitle}>Pendaftaran Resmi Dibuka!</Text>
        </View>
        <Text style={styles.cardDate}>12 April 2026</Text>
        <Text style={styles.cardContent}>
          Selamat datang calon Paskibraka. Segera lengkapi formulir pendaftaran Anda beserta berkas-berkas yang dibutuhkan sebelum waktu pendaftaran ditutup.
        </Text>
      </View>

      {/* Contoh Kartu Pengumuman 2 */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Bell size={20} color="#dc2626" />
          <Text style={styles.cardTitle}>Panduan Upload Berkas</Text>
        </View>
        <Text style={styles.cardDate}>10 April 2026</Text>
        <Text style={styles.cardContent}>
          Pastikan semua berkas yang diunggah dalam format PDF atau JPG dengan ukuran maksimal 2MB agar mudah diverifikasi oleh panitia.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { padding: 20, paddingTop: 60, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e5e7eb', marginBottom: 10 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1f2937' },
  card: { backgroundColor: '#fff', marginHorizontal: 20, marginTop: 10, padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#f3f4f6' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#1f2937', marginLeft: 8 },
  cardDate: { fontSize: 12, color: '#9ca3af', marginBottom: 10 },
  cardContent: { fontSize: 14, color: '#4b5563', lineHeight: 22 },
});