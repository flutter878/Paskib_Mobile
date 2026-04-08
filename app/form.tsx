import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert 
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, Calendar } from 'lucide-react-native';

export default function FormScreen() {
  const router = useRouter();
  
  // State untuk mengontrol langkah saat ini (1 sampai 4)
  const [step, setStep] = useState(1);

  // State untuk input data (contoh untuk Step 1)
  const [formData, setFormData] = useState({
    nik: '',
    nama: '',
    tempatLahir: '',
    tglLahir: '',
  });

  const steps = ['Biodata', 'Fisik', 'Motivasi', 'Berkas'];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Jika sudah di step terakhir (4), maka submit
      Alert.alert(
        'Pendaftaran Terkirim!', 
        'Data Anda akan diverifikasi oleh panitia.',
        [{ text: 'Kembali ke Beranda', onPress: () => router.replace('/(tabs)') }]
      );
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1); // Kembali ke langkah sebelumnya
    } else {
      router.back(); // Keluar dari form jika di langkah 1
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ChevronLeft size={24} color="#1e293b" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Formulir Pendaftaran</Text>
          <View style={{ width: 24 }} /> {/* Spacer agar text center */}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Stepper Indicator */}
          <View style={styles.stepperContainer}>
            {steps.map((title, index) => {
              const isActive = step >= index + 1;
              return (
                <View key={index} style={styles.stepWrapper}>
                  {/* Garis Penghubung (kecuali untuk item pertama) */}
                  {index > 0 && (
                    <View style={[styles.stepLine, isActive ? styles.stepLineActive : {}]} />
                  )}
                  
                  {/* Lingkaran Angka */}
                  <View style={[styles.stepCircle, isActive ? styles.stepCircleActive : {}]}>
                    <Text style={[styles.stepNumber, isActive ? styles.stepNumberActive : {}]}>
                      {index + 1}
                    </Text>
                  </View>
                  
                  {/* Teks Label */}
                  <Text style={[styles.stepText, isActive ? styles.stepTextActive : {}]}>
                    {title}
                  </Text>
                </View>
              );
            })}
          </View>

          {/* Area Konten Form */}
          <View style={styles.card}>
            {/* Tampilan Step 1: Data Pribadi */}
            {step === 1 && (
              <View>
                <Text style={styles.cardTitle}>Data Pribadi</Text>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>N.I.K</Text>
                  <TextInput 
                    style={styles.input} 
                    placeholder="16 Digit NIK" 
                    placeholderTextColor="#9ca3af"
                    keyboardType="numeric"
                    maxLength={16}
                    value={formData.nik}
                    onChangeText={(text) => setFormData({...formData, nik: text})}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Nama Lengkap</Text>
                  <TextInput 
                    style={styles.input} 
                    placeholder="" 
                    value={formData.nama}
                    onChangeText={(text) => setFormData({...formData, nama: text})}
                  />
                </View>

                {/* Kolom Tempat & Tgl Lahir bersebelahan */}
                <View style={styles.row}>
                  <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                    <Text style={styles.inputLabel}>Tempat Lahir</Text>
                    <TextInput 
                      style={styles.input} 
                      placeholder="" 
                      value={formData.tempatLahir}
                      onChangeText={(text) => setFormData({...formData, tempatLahir: text})}
                    />
                  </View>
                  
                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.inputLabel}>Tgl Lahir</Text>
                    <View style={styles.inputWithIcon}>
                      <TextInput 
                        style={[styles.input, { flex: 1, borderRightWidth: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }]} 
                        placeholder="mm/dd/yyyy" 
                        placeholderTextColor="#9ca3af"
                        value={formData.tglLahir}
                        onChangeText={(text) => setFormData({...formData, tglLahir: text})}
                      />
                      <View style={styles.iconBox}>
                        <Calendar size={20} color="#1e293b" />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )}

            {/* Placeholder untuk Step 2, 3, 4 */}
            {step === 2 && <Text style={styles.placeholderText}>Bagian Fisik (Tinggi, Berat Badan, dll)</Text>}
            {step === 3 && <Text style={styles.placeholderText}>Bagian Motivasi (Esai Alasan Bergabung)</Text>}
            {step === 4 && <Text style={styles.placeholderText}>Bagian Berkas (Upload Surat Izin, dll)</Text>}

          </View>
        </ScrollView>

        {/* Tombol Footer Lengket di Bawah */}
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {step === 4 ? 'Kirim Pendaftaran' : 'Selanjutnya'}
            </Text>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b' },

  scrollContent: { padding: 20, paddingBottom: 100 }, // paddingBottom agar tidak tertutup tombol

  // Stepper
  stepperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  stepWrapper: { alignItems: 'center', flex: 1, position: 'relative' },
  stepLine: {
    position: 'absolute',
    top: 15, // Setengah tinggi lingkaran
    left: '-50%',
    right: '50%',
    height: 3,
    backgroundColor: '#E2E8F0',
    zIndex: 1,
  },
  stepLineActive: { backgroundColor: '#DC2626' },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    marginBottom: 8,
  },
  stepCircleActive: { backgroundColor: '#DC2626' },
  stepNumber: { fontSize: 14, fontWeight: 'bold', color: '#94A3B8' },
  stepNumberActive: { color: '#FFFFFF' },
  stepText: { fontSize: 11, fontWeight: '600', color: '#94A3B8' },
  stepTextActive: { color: '#DC2626' },

  // Card Content
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: 20,
  },
  inputGroup: { marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  inputLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: '#0f172a',
    backgroundColor: '#FFFFFF',
  },
  inputWithIcon: { flexDirection: 'row', alignItems: 'center' },
  iconBox: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderLeftWidth: 0, // Gabung dengan input
    padding: 14,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: { textAlign: 'center', color: '#94A3B8', marginVertical: 30 },

  // Bottom Fixed Button
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  nextButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});