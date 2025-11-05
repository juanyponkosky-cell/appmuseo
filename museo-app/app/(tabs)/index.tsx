import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Home
      </ThemedText>

      {/* Botón para escanear QR */}
      <TouchableOpacity style={styles.btn} onPress={() => router.push('/qr')}>
        <ThemedText style={styles.btnText}>📷 Escanear QR</ThemedText>
      </TouchableOpacity>

      {/* Botón para probar notificaciones */}
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: '#4EA8DE' }]}
        onPress={() => router.push('/testNoti')}>
        <ThemedText style={styles.btnText}>🔔 Probar Notificaciones</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 30,
  },
  btn: {
    backgroundColor: '#00C896',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 16,
    width: 240,
    alignItems: 'center',
  },
  btnText: {
    fontWeight: '800',
    color: '#001A14',
  },
});
