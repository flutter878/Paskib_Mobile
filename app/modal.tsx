import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Flag } from 'lucide-react-native'; // Pastikan sudah install: npm install lucide-react-native

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Flag size={48} color="#dc2626" />
      </View>
      <Text style={styles.title}>PASKIBRAKA</Text>
      <Text style={styles.subtitle}>Sistem Manajemen & Pendaftaran</Text>

      <TouchableOpacity 
        style={styles.buttonWhite} 
        onPress={() => router.push('/login')}
      >
        <Text style={styles.buttonTextRed}>Masuk (Login)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#dc2626', justifyContent: 'center', alignItems: 'center', padding: 20 },
  logoContainer: { width: 96, height: 96, backgroundColor: '#fff', borderRadius: 48, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff', letterSpacing: 2, marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#fca5a5', marginBottom: 40 },
  buttonWhite: { width: '100%', backgroundColor: '#fff', padding: 15, borderRadius: 30, alignItems: 'center', marginBottom: 15 },
  buttonTextRed: { color: '#dc2626', fontWeight: 'bold', fontSize: 16 }
});