import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={{ marginBottom: 20 }}>
        Home
      </ThemedText>

      <TouchableOpacity style={styles.btn} onPress={() => router.push('/qr')}>
        <ThemedText style={styles.btnText}>📷 Escanear QR</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
  btn: {
    backgroundColor: '#00C896',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 14,
  },
  btnText: { fontWeight: '800', color: '#001A14' },
});
