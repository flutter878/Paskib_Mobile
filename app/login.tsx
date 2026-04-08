import React, { useState, useContext } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  SafeAreaView, KeyboardAvoidingView, Platform, Alert 
} from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { AppContext } from '../context/AppContext';

export default function LoginScreen() {
  const router = useRouter();
  const context = useContext(AppContext);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Perhatian', 'Email/NIK dan Kata Sandi harus diisi!');
      return;
    }

    // Logika Login
    if (context) {
      if (email.toLowerCase() === 'admin@paskibra.id') {
        context.setUserRole('admin');
        context.setCurrentUser({ nama: 'Administrator', email });
        // Nanti bisa diarahkan ke /admin-dashboard, sementara alert dulu
        Alert.alert('Login Admin', 'Berhasil masuk sebagai Admin!');
      } else {
        context.setUserRole('peserta');
        context.setCurrentUser({ nama: 'Calon Paskibraka', email });
        // Arahkan ke menu utama peserta (tabs)
        router.replace('/(tabs)');
      }
    }
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

        <View style={styles.content}>
          {/* Judul & Subjudul */}
          <Text style={styles.title}>Selamat Datang!</Text>
          <Text style={styles.subtitle}>Silakan masuk untuk melanjutkan.</Text>




          {/* Form Input: Email / NIK */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email / NIK</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Masukkan NIK atau Email" 
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          {/* Form Input: Kata Sandi */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Kata Sandi</Text>
            <TextInput 
              style={styles.input} 
              placeholder="••••••••" 
              placeholderTextColor="#9ca3af"
              secureTextEntry 
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Tombol Masuk */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Masuk</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Warna background sangat terang (sedikit abu-abu)
  },
  container: {
    flex: 1,
  },
  backButton: {
    padding: 20,
    paddingTop: 40, // Jarak ekstra untuk status bar
    alignSelf: 'flex-start',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1e293b', // Biru keabu-abuan sangat gelap
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 24,
  },
  infoBox: {
    backgroundColor: '#FEF9C3', // Kuning pucat
    borderColor: '#FDE047', // Border kuning
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#854D0E', // Teks coklat/emas gelap
    marginBottom: 4,
  },
  infoText: {
    fontSize: 13,
    color: '#A16207',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#0f172a',
  },
  loginButton: {
    backgroundColor: '#DC2626', // Merah utama
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3, // Bayangan tombol
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});