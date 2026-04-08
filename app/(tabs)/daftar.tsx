import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import {
    Calendar,
    CheckCircle2,
    ChevronLeft,
    Upload,
    Wand2,
} from "lucide-react-native";
import React, { useState } from "react";
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Platform,
} from "react-native";

const STEPS = ["Biodata", "Fisik", "Motivasi", "Berkas"];

export default function DaftarScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  // State Biodata
  const [nik, setNik] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerDate, setPickerDate] = useState(new Date(2008, 0, 1)); // Default 18 tahun lalu

  // State Fisik
  const [tinggi, setTinggi] = useState("");
  const [berat, setBerat] = useState("");
  const [riwayatPenyakit, setRiwayatPenyakit] = useState("");

  // State Motivasi & AI
  const [asalSekolah, setAsalSekolah] = useState("");
  const [kunciEsai, setKunciEsai] = useState("");
  const [esai, setEsai] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  // State Berkas
  const [suratIzinOrangTua, setSuratIzinOrangTua] = useState("");
  const [suratKeteranganSehat, setSuratKeteranganSehat] = useState("");
  const [nilaiRaporTerakhir, setNilaiRaporTerakhir] = useState("");

  const handleNext = () => {
    // Validasi step saat ini
    if (currentStep === 1) {
      if (!nik || !namaLengkap || !tempatLahir || !tanggalLahir) {
        Alert.alert("Perhatian", "Mohon lengkapi semua data di step Biodata");
        return;
      }
      if (nik.length !== 16) {
        Alert.alert("Perhatian", "NIK harus 16 digit");
        return;
      }
    } else if (currentStep === 2) {
      if (!tinggi || !berat) {
        Alert.alert("Perhatian", "Mohon lengkapi semua data di step Fisik");
        return;
      }
    } else if (currentStep === 3) {
      if (!asalSekolah || !esai) {
        Alert.alert("Perhatian", "Mohon lengkapi semua data di step Motivasi");
        return;
      }
    } else if (currentStep === 4) {
      if (!suratIzinOrangTua || !suratKeteranganSehat || !nilaiRaporTerakhir) {
        Alert.alert("Perhatian", "Mohon upload semua berkas");
        return;
      }
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form
      handleSubmit();
    }
  };

  const handleGenerateAI = () => {
    if (!kunciEsai.trim()) {
      Alert.alert("Perhatian", "Mohon isi kata kunci untuk membuat esai");
      return;
    }

    setLoadingAI(true);
    // Simulasi AI generation
    setTimeout(() => {
      setEsai(
        `Esai mengenai "${kunciEsai}":\n\nSaya memiliki komitmen kuat untuk mengembangkan kemampuan disiplin dan kepemimpinan melalui organisasi Paskibra. Dengan mengikuti pendidikan karakter yang ketat, saya yakin dapat menjadi individu yang lebih bertanggung jawab dan siap berkontribusi untuk masyarakat.`,
      );
      setLoadingAI(false);
      Alert.alert("Sukses", "Esai telah dibuat dengan AI");
    }, 2000);
  };

  const handleDateChange = (event: any, selectedDate: any) => {
    if (Platform.OS === "android") {
      // Android automatically closes after selection
      setShowDatePicker(false);
      if (event.type === "dismissed") {
        return;
      }
    }

    if (selectedDate) {
      // Update picker date
      setPickerDate(selectedDate);
      
      // Format: mm/dd/yyyy
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const year = selectedDate.getFullYear();
      const formattedDate = `${month}/${day}/${year}`;
      setTanggalLahir(formattedDate);
      
      // Close picker on iOS
      if (Platform.OS === "ios") {
        setShowDatePicker(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      // Kembali ke halaman tabs (data tetap tersimpan)
      router.back();
    }
  };

  const handleSubmit = () => {
    Alert.alert("Pendaftaran Berhasil", "Data Anda telah berhasil dikirimkan", [
      { text: "OK", onPress: () => router.replace("/(tabs)") },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrevious}>
          <ChevronLeft size={28} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Formulir Pendaftaran</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Step Indicator */}
      <View style={styles.stepContainer}>
        {STEPS.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <View key={index} style={styles.stepWrapper}>
              <View
                style={[
                  styles.stepCircle,
                  isCompleted
                    ? styles.stepCircleComplete
                    : isActive
                      ? styles.stepCircleActive
                      : styles.stepCircleInactive,
                ]}
              >
                {isCompleted ? (
                  <CheckCircle2 size={32} color="#ffffff" strokeWidth={2.5} />
                ) : (
                  <Text
                    style={[
                      styles.stepNumber,
                      isActive
                        ? styles.stepNumberActive
                        : styles.stepNumberInactive,
                    ]}
                  >
                    {stepNumber}
                  </Text>
                )}
              </View>
              <Text
                style={[styles.stepLabel, isActive && styles.stepLabelActive]}
              >
                {step}
              </Text>
              {index < STEPS.length - 1 && (
                <View
                  style={[
                    styles.stepLine,
                    isCompleted && styles.stepLineActive,
                  ]}
                />
              )}
            </View>
          );
        })}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {currentStep === 1 && (
          <View>
            <Text style={styles.sectionTitle}>Data Pribadi</Text>

            <Text style={styles.label}>N.I.K</Text>
            <TextInput
              style={styles.input}
              placeholder="16 Digit NIK"
              placeholderTextColor="#d1d5db"
              value={nik}
              onChangeText={setNik}
              keyboardType="numeric"
              maxLength={16}
            />

            <Text style={styles.label}>Nama Lengkap</Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan nama lengkap"
              placeholderTextColor="#d1d5db"
              value={namaLengkap}
              onChangeText={setNamaLengkap}
            />

            <View style={styles.rowContainer}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Tempat Lahir</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Kota/Kabupaten"
                  placeholderTextColor="#d1d5db"
                  value={tempatLahir}
                  onChangeText={setTempatLahir}
                />
              </View>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Tgl Lahir</Text>
                <TouchableOpacity
                  style={styles.datePickerButton}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Calendar size={20} color="#dc2626" />
                  <Text style={styles.datePickerButtonText}>
                    {tanggalLahir || "Pilih Tanggal"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        {currentStep === 2 && (
          <View>
            <Text style={styles.sectionTitle}>Data Fisik</Text>

            <View style={styles.rowContainer}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Tinggi (cm)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Masukkan tinggi"
                  placeholderTextColor="#d1d5db"
                  value={tinggi}
                  onChangeText={setTinggi}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Berat (kg)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Masukkan berat"
                  placeholderTextColor="#d1d5db"
                  value={berat}
                  onChangeText={setBerat}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <Text style={styles.label}>Riwayat Penyakit</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Kosongkan jika tidak ada"
              placeholderTextColor="#d1d5db"
              value={riwayatPenyakit}
              onChangeText={setRiwayatPenyakit}
              multiline={true}
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>
        )}

        {currentStep === 3 && (
          <View>
            <Text style={styles.sectionTitle}>Motivasi & AI</Text>

            <Text style={styles.label}>Asal Sekolah</Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan nama sekolah"
              placeholderTextColor="#d1d5db"
              value={asalSekolah}
              onChangeText={setAsalSekolah}
            />

            <View style={styles.aiSection}>
              <View style={styles.aiHeader}>
                <Text style={styles.aiTitle}>✨ Pembuat Esai Cerdas</Text>
              </View>

              <Text style={styles.label}>Kata Kunci</Text>
              <TextInput
                style={styles.input}
                placeholder="Kata kunci: Disiplin, fisik kuat..."
                placeholderTextColor="#d1d5db"
                value={kunciEsai}
                onChangeText={setKunciEsai}
              />

              <TouchableOpacity
                style={[styles.aiButton, loadingAI && styles.aiButtonLoading]}
                onPress={handleGenerateAI}
                disabled={loadingAI}
              >
                <Wand2 size={18} color="#b45309" />
                <Text style={styles.aiButtonText}>
                  {loadingAI ? "Membuat Esai..." : "Susun dengan AI"}
                </Text>
              </TouchableOpacity>

              <Text style={styles.label}>Esai akan muncul di sini</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Esai Anda akan ditampilkan di sini setelah membuat dengan AI"
                placeholderTextColor="#d1d5db"
                value={esai}
                onChangeText={setEsai}
                multiline={true}
                numberOfLines={6}
                textAlignVertical="top"
              />
            </View>
          </View>
        )}

        {currentStep === 4 && (
          <View>
            <Text style={styles.sectionTitle}>Unggah Berkas Persyaratan</Text>

            <Text style={styles.label}>Surat Izin Orang Tua</Text>
            <TouchableOpacity
              style={styles.uploadArea}
              onPress={() => setSuratIzinOrangTua("berkas1.pdf")}
            >
              <Upload size={32} color="#dc2626" />
              <Text style={styles.uploadTitle}>Surat Izin Orang Tua</Text>
              <Text style={styles.uploadSubtitle}>
                Ketuk untuk unggah (PDF/JPG)
              </Text>
              {suratIzinOrangTua && (
                <Text style={styles.uploadSuccess}>✓ {suratIzinOrangTua}</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.label}>Surat Keterangan Sehat</Text>
            <TouchableOpacity
              style={styles.uploadArea}
              onPress={() => setSuratKeteranganSehat("berkas2.pdf")}
            >
              <Upload size={32} color="#dc2626" />
              <Text style={styles.uploadTitle}>Surat Keterangan Sehat</Text>
              <Text style={styles.uploadSubtitle}>
                Ketuk untuk unggah (PDF/JPG)
              </Text>
              {suratKeteranganSehat && (
                <Text style={styles.uploadSuccess}>
                  ✓ {suratKeteranganSehat}
                </Text>
              )}
            </TouchableOpacity>

            <Text style={styles.label}>Nilai Rapor Terakhir</Text>
            <TouchableOpacity
              style={styles.uploadArea}
              onPress={() => setNilaiRaporTerakhir("berkas3.pdf")}
            >
              <Upload size={32} color="#dc2626" />
              <Text style={styles.uploadTitle}>Nilai Rapor Terakhir</Text>
              <Text style={styles.uploadSubtitle}>
                Ketuk untuk unggah (PDF/JPG)
              </Text>
              {nilaiRaporTerakhir && (
                <Text style={styles.uploadSuccess}>✓ {nilaiRaporTerakhir}</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Button Container */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => setCurrentStep(Math.max(1, currentStep - 1))}
        >
          <Text style={styles.buttonTextSecondary}>Kembali</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonPrimary]}
          onPress={handleNext}
        >
          <Text style={styles.buttonTextPrimary}>
            {currentStep === 4 ? "Kirim Pendaftaran" : "Selanjutnya"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* DateTime Picker */}
      {showDatePicker && Platform.OS === "ios" && (
        <View style={styles.datePickerContainer}>
          <View style={styles.datePickerHeader}>
            <TouchableOpacity onPress={() => setShowDatePicker(false)}>
              <Text style={styles.datePickerHeaderText}>Batal</Text>
            </TouchableOpacity>
            <Text style={styles.datePickerTitle}>Pilih Tanggal</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(false)}>
              <Text style={[styles.datePickerHeaderText, styles.datePickerHeaderDone]}>
                Selesai
              </Text>
            </TouchableOpacity>
          </View>
          <DateTimePicker
            value={pickerDate}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
            maximumDate={new Date()}
            minimumDate={new Date(1950, 0, 1)}
            textColor="#1f2937"
          />
        </View>
      )}
      {showDatePicker && Platform.OS === "android" && (
        <DateTimePicker
          value={pickerDate}
          mode="date"
          display="calendar"
          onChange={handleDateChange}
          maximumDate={new Date()}
          minimumDate={new Date(1950, 0, 1)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#fafafa",
  },
  stepWrapper: {
    alignItems: "center",
    flex: 1,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  stepCircleActive: {
    backgroundColor: "#dc2626",
  },
  stepCircleInactive: {
    backgroundColor: "#e5e7eb",
  },
  stepCircleComplete: {
    backgroundColor: "#dc2626",
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  stepNumberActive: {
    color: "#ffffff",
  },
  stepNumberInactive: {
    color: "#9ca3af",
  },
  stepLabel: {
    fontSize: 11,
    color: "#9ca3af",
    textAlign: "center",
    fontWeight: "500",
  },
  stepLabelActive: {
    color: "#dc2626",
    fontWeight: "700",
  },
  stepLine: {
    position: "absolute",
    top: 20,
    right: -30,
    width: 60,
    height: 2,
    backgroundColor: "#e5e7eb",
  },
  stepLineActive: {
    backgroundColor: "#dc2626",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: "#1f2937",
    marginBottom: 16,
    backgroundColor: "#f9fafb",
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 16,
    backgroundColor: "#f9fafb",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  datePickerButtonText: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "500",
  },
  datePickerContainer: {
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  datePickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  datePickerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1f2937",
  },
  datePickerHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
  },
  datePickerHeaderDone: {
    color: "#dc2626",
    fontWeight: "700",
  },
  rowContainer: {
    flexDirection: "row",
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  aiSection: {
    marginTop: 12,
    marginBottom: 16,
  },
  aiHeader: {
    backgroundColor: "#fef3c7",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  aiTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#92400e",
  },
  aiButton: {
    backgroundColor: "#fef3c7",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: "#fcd34d",
  },
  aiButtonLoading: {
    opacity: 0.6,
  },
  aiButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#b45309",
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderStyle: "dashed",
  },
  uploadTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
    marginTop: 12,
  },
  uploadSubtitle: {
    fontSize: 12,
    color: "#dc2626",
    marginTop: 4,
  },
  uploadSuccess: {
    fontSize: 12,
    color: "#059669",
    marginTop: 8,
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPrimary: {
    backgroundColor: "#dc2626",
  },
  buttonSecondary: {
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  buttonTextPrimary: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  buttonTextSecondary: {
    color: "#1f2937",
    fontSize: 16,
    fontWeight: "700",
  },
});
