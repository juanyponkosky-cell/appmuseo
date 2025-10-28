import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* 👇 Grupo de pestañas (Home, Explore...) */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* 👇 Rutas fuera de tabs */}
      <Stack.Screen name="qr" options={{ headerShown: true, title: 'Escanear QR' }} />
      <Stack.Screen name="obra/[id]" options={{ headerShown: true, title: 'Detalle de obra' }} />
    </Stack>
  );
}
