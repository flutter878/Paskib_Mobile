import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert 
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';

export default function RegisterScreen() {
  const router = useRouter();
  
  // State untuk menyimpan inputan user
  const [nik, setNik] = useState('');
  const [nama, setNama] = useState('');
  const [sekolah, setSekolah] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Validasi sederhana
    if (!nik || !nama || !sekolah || !email || !password) {
      Alert.alert('Perhatian', 'Mohon lengkapi semua data pendaftaran!');
      return;
    }

    if (nik.length !== 16) {
      Alert.alert('Perhatian', 'NIK harus 16 digit!');
      return;
    }

    // Simulasi sukses mendaftar
    Alert.alert(
      'Pendaftaran Berhasil', 
      'Akun Anda telah berhasil dibuat. Silakan masuk (login) menggunakan email dan kata sandi Anda.',
      [{ text: 'OK', onPress: () => router.replace('/login') }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Tombol Kembali */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={28} color="#4b5563" />
        </TouchableOpacity>

        {/* Gunakan ScrollView agar form bisa di-scroll saat keyboard muncul */}
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Judul & Subjudul */}
          <Text style={styles.title}>Daftar Akun Baru</Text>
          <Text style={styles.subtitle}>Lengkapi data untuk membuat akun pendaftaran.</Text>

          {/* Input: NIK */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>N.I.K (Nomor Induk Kependudukan)</Text>
            <TextInput 
              style={styles.input} 
              placeholder="16 Digit NIK" 
              placeholderTextColor="#9ca3af"
              value={nik}
              onChangeText={setNik}
              keyboardType="numeric"
              maxLength={16}
            />
          </View>

          {/* Input: Nama Lengkap */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nama Lengkap</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Sesuai KTP/KK" 
              placeholderTextColor="#9ca3af"
              value={nama}
              onChangeText={setNama}
              autoCapitalize="words"
            />
          </View>

          {/* Input: Asal Sekolah */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Asal Sekolah</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Contoh: SMAN 1 Jakarta" 
              placeholderTextColor="#9ca3af"
              value={sekolah}
              onChangeText={setSekolah}
              autoCapitalize="words"
            />
          </View>

          {/* Input: Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput 
              style={styles.input} 
              placeholder="email@contoh.com" 
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Input: Kata Sandi */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Kata Sandi</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Minimal 6 karakter" 
              placeholderTextColor="#9ca3af"
              secureTextEntry 
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Tombol Daftar */}
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Daftar Sekarang</Text>
          </TouchableOpacity>
          
          {/* Spacing bawah agar tidak mepet saat di-scroll mentok */}
          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  container: {
    flex: 1,
  },
  backButton: {
    paddingHorizontal: 20,
    paddingTop: 40, 
    paddingBottom: 10,
    alignSelf: 'flex-start',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748b',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: '#0f172a',
  },
  registerButton: {
    backgroundColor: '#DC2626',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});