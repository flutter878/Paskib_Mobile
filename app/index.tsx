import { useRouter } from "expo-router"; // Tambahkan ini untuk navigasi
import { StatusBar } from "expo-status-bar";
import { Flag } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Definisi warna sesuai desain
const COLORS = {
  mainRed: "#DC2626",
  white: "#FFFFFF",
  darkRed: "#a51d1d", // Merah gelap untuk tombol daftar
};

export default function WelcomeScreen() {
  const router = useRouter(); // Hook untuk pindah halaman
  const [showSplash, setShowSplash] = useState(true); // State untuk splash screen

  useEffect(() => {
    // Timer untuk menampilkan splash selama 3 detik
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Jika masih show splash, tampilkan splash screen
  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <StatusBar style="light" />

        {/* Icon Container */}
        <View style={styles.splashIconContainer}>
          <View style={styles.splashIconCircle}>
            <Flag size={56} color="#dc2626" strokeWidth={1.5} />
          </View>
        </View>

        {/* Title Text */}
        <Text style={styles.splashTitleText}>PASKIBRAKA</Text>
      </View>
    );
  }

  // Setelah 3 detik, tampilkan welcome screen
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      <View style={styles.container}>
        {/* Ikon Bendera dalam Lingkaran Putih */}
        <View style={styles.iconContainer}>
          <Flag size={48} color={COLORS.mainRed} style={styles.flagIcon} />
        </View>

        {/* Teks Judul */}
        <Text style={styles.titleText}>PASKIBRAKA</Text>

        {/* Teks Deskripsi */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            Sistem Manajemen & Pendaftaran Paskibraka Berbasis Mobile
          </Text>
        </View>

        {/* Tombol Masuk (Login) */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push("/login")} // Arahkan ke file app/login.tsx
        >
          <Text style={styles.loginButtonText}>Masuk (Login)</Text>
        </TouchableOpacity>

        {/* Tombol Daftar Akun Baru */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => router.push("/register")} // Nanti kita buat file app/register.tsx
        >
          <Text style={styles.registerButtonText}>Daftar Akun Baru</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.mainRed, // Layar penuh warna merah
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: COLORS.white,
    width: 100,
    height: 100,
    borderRadius: 50, // Membuatnya bulat sempurna
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 5, // Sedikit bayangan di Android
    shadowColor: "#000", // Bayangan di iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  flagIcon: {
    marginLeft: 2, // Menyesuaikan posisi ikon agar pas di tengah
  },
  titleText: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: 1, // Memberi jarak antar huruf agar lebih elegan
  },
  descriptionContainer: {
    width: "85%", // Agar teks tidak terlalu mepet ke pinggir layar
    alignItems: "center",
    marginBottom: 50, // Jarak yang cukup jauh ke tombol
  },
  descriptionText: {
    color: COLORS.white,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
  },
  loginButton: {
    backgroundColor: COLORS.white,
    width: "100%",
    paddingVertical: 15,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  loginButtonText: {
    color: COLORS.mainRed,
    fontSize: 16,
    fontWeight: "bold",
  },
  registerButton: {
    backgroundColor: COLORS.darkRed,
    width: "100%",
    paddingVertical: 15,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#b91c1c", // Sedikit garis luar agar lebih tegas
  },
  registerButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  // Styles untuk Splash Screen
  splashContainer: {
    flex: 1,
    backgroundColor: "#dc2626",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  splashIconContainer: {
    marginBottom: 40,
  },
  splashIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#fecaca",
    justifyContent: "center",
    alignItems: "center",
  },
  splashTitleText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 2,
  },
});
