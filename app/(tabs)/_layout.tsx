import { Tabs } from "expo-router";
import { Clipboard, Home, Megaphone, User } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Menyembunyikan header bawaan agar kita bisa buat desain sendiri
        tabBarActiveTintColor: "#dc2626", // Warna merah saat menu aktif
        tabBarInactiveTintColor: "#9ca3af", // Warna abu-abu saat tidak aktif
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#f3f4f6",
          elevation: 10,
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Beranda",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="pengumuman"
        options={{
          title: "Info",
          tabBarIcon: ({ color }) => <Megaphone size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="daftar"
        options={{
          title: "Daftar",
          tabBarIcon: ({ color }) => <Clipboard size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="profil"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
