import { useRouter } from "expo-router";
import {
  AlertCircle,
  CheckCircle,
  ChevronRight,
  XCircle,
} from "lucide-react-native";
import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AppContext } from "../../context/AppContext";

export default function HomeScreen() {
  const router = useRouter();
  const context = useContext(AppContext);

  const namaUser = context?.currentUser?.nama || "Ahmad Calon Paskibra";

  // PERBAIKAN: Gunakan useState
  const [statusPendaftaran] = useState<
    "belum" | "menunggu" | "lulus" | "ditolak"
  >("belum");

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header dengan Gradient Red */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Halo, {namaUser}! 👋</Text>
          <Text style={styles.subGreeting}>Peserta Seleksi Paskibraka</Text>
        </View>

        {/* Status Card */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>STATUS PENDAFTARAN</Text>

          {statusPendaftaran === "belum" && (
            <>
              <Text style={styles.statusTitle}>Belum Melengkapi Formulir</Text>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => router.push("/(tabs)/daftar")}
              >
                <Text style={styles.actionButtonText}>Lengkapi</Text>
                <ChevronRight size={20} color="#fff" />
              </TouchableOpacity>
            </>
          )}

          {statusPendaftaran === "menunggu" && (
            <>
              <View style={styles.statusRow}>
                <AlertCircle size={24} color="#d97706" />
                <Text
                  style={[
                    styles.statusTitle,
                    { color: "#d97706", marginBottom: 0, marginLeft: 8 },
                  ]}
                >
                  Menunggu Verifikasi
                </Text>
              </View>
              <Text style={styles.statusDesc}>
                Berkas Anda sedang diperiksa oleh panitia. Harap cek secara
                berkala.
              </Text>
            </>
          )}

          {statusPendaftaran === "lulus" && (
            <>
              <View style={styles.statusRow}>
                <CheckCircle size={24} color="#16a34a" />
                <Text
                  style={[
                    styles.statusTitle,
                    { color: "#16a34a", marginBottom: 0, marginLeft: 8 },
                  ]}
                >
                  Lulus Verifikasi
                </Text>
              </View>
              <Text style={styles.statusDesc}>
                Selamat! Berkas administrasi Anda disetujui. Silakan cek menu
                Profil untuk info selanjutnya.
              </Text>
            </>
          )}

          {statusPendaftaran === "ditolak" && (
            <>
              <View style={styles.statusRow}>
                <XCircle size={24} color="#dc2626" />
                <Text
                  style={[
                    styles.statusTitle,
                    { color: "#dc2626", marginBottom: 0, marginLeft: 8 },
                  ]}
                >
                  Berkas Ditolak
                </Text>
              </View>
              <Text style={styles.statusDesc}>
                Terdapat ketidaksesuaian pada berkas Anda. Silakan hubungi
                panitia pendaftaran.
              </Text>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    backgroundColor: "#dc2626",
    paddingTop: 30,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
  },
  subGreeting: {
    fontSize: 14,
    color: "#fca5a5",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginTop: -20,
    marginBottom: 30,
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9ca3af",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 16,
  },
  statusDesc: {
    fontSize: 14,
    color: "#4b5563",
    marginTop: 10,
    lineHeight: 20,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    backgroundColor: "#dc2626",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    gap: 8,
  },
  actionButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },
});
