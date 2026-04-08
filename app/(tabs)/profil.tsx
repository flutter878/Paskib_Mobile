import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { AppContext } from '../../context/AppContext';
import { User, LogOut, Settings, HelpCircle } from 'lucide-react-native';

export default function ProfilScreen() {
  const context = useContext(AppContext);
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Konfirmasi', 'Apakah Anda yakin ingin keluar?', [
      { text: 'Batal', style: 'cancel' },
      { 
        text: 'Keluar', 
        style: 'destructive',
        onPress: () => {
          if (context) {
            context.setCurrentUser(null);
            context.setUserRole('');
            router.replace('/login'); // Kembali ke halaman login
          }
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <User size={40} color="#dc2626" />
        </View>
        <Text style={styles.name}>{context?.currentUser?.nama || 'Calon Paskibraka'}</Text>
        <Text style={styles.email}>{context?.currentUser?.email || 'email@contoh.com'}</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Settings size={20} color="#4b5563" />
          <Text style={styles.menuText}>Pengaturan Akun</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <HelpCircle size={20} color="#4b5563" />
          <Text style={styles.menuText}>Bantuan & FAQ</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={20} color="#fff" />
        <Text style={styles.logoutText}>Keluar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { alignItems: 'center', backgroundColor: '#fff', paddingVertical: 40, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  avatar: { width: 80, height: 80, backgroundColor: '#fca5a5', borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  name: { fontSize: 20, fontWeight: 'bold', color: '#1f2937' },
  email: { fontSize: 14, color: '#6b7280', marginTop: 4 },
  menuContainer: { backgroundColor: '#fff', marginTop: 20, paddingVertical: 10, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#e5e7eb' },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  menuText: { fontSize: 16, color: '#4b5563', marginLeft: 15 },
  logoutButton: { flexDirection: 'row', backgroundColor: '#dc2626', margin: 20, padding: 15, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 40 },
  logoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginLeft: 10 },
});