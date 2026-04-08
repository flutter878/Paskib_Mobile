import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Flag } from "lucide-react-native";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Timer untuk menampilkan splash selama 3 detik
    const timer = setTimeout(() => {
      router.replace("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Icon Container */}
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Flag size={56} color="#dc2626" strokeWidth={1.5} />
        </View>
      </View>

      {/* Title Text */}
      <Text style={styles.titleText}>PASKIBRAKA</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dc2626",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginBottom: 40,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#fecaca",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 2,
  },
});
