import { useEffect, useRef, useState } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import ScannerFrame from '../src/components/ScannerFrame';
import { parseObraIdFromQr } from '../src/utils/validateQr';

export default function QRScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const router = useRouter();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Pedir permiso si todavía no se pidió
    if (!permission?.granted) {
      requestPermission();
    }

    // Timeout de seguridad
    timerRef.current = setTimeout(() => {
      if (!scanned) {
        Alert.alert('Aviso', 'No se pudo leer el QR en 1 minuto.');
        router.back();
      }
    }, 60_000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, [permission?.granted, scanned]);

  const onBarcodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;
    const obraId = parseObraIdFromQr(data);
    if (!obraId) {
      Alert.alert('QR inválido', 'El código no pertenece al formato esperado.');
      return;
    }
    setScanned(true);
    router.push(`/obra/${obraId}`);
  };

  if (!permission) {
    return <Centered text="Solicitando permisos de cámara..." />;
  }
  if (!permission.granted) {
    return <Centered text="No se otorgaron permisos para usar la cámara." />;
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        // Filtrá solo QR si querés
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={scanned ? undefined : onBarcodeScanned}
      />
      <ScannerFrame />
      <View style={styles.bottomPanel}>
        <Text style={styles.tip}>Alineá el QR dentro del marco</Text>
        {scanned && (
          <TouchableOpacity onPress={() => setScanned(false)} style={styles.btn}>
            <Text style={styles.btnText}>Escanear otra vez</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

function Centered({ text }: { text: string }) {
  return (
    <View style={styles.center}><Text style={{ fontSize: 16 }}>{text}</Text></View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  bottomPanel: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  tip: { color: '#fff', textAlign: 'center', marginBottom: 8 },
  btn: {
    backgroundColor: '#00C896',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnText: { color: '#001A14', fontWeight: '700', textAlign: 'center' },
});
