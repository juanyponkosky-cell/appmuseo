import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/src/components/themed-text';
import { ThemedView } from '@/src/components/themed-view';
import * as TaskManager from 'expo-task-manager';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
// ⚠️ Asegúrate de que este archivo exista y contenga la definición de la tarea (Paso 1 del Geofencing)
import { GEOFENCE_TASK_NAME } from "@/src/services/geofencingTask";


// ⚠️ IMPORTANTE: Define la región del museo AQUI (usa tus coordenadas reales)
const MUSEUM_REGION = {
    latitude: -35.669957, // Reemplazar
    longitude: -63.759391, // Reemplazar
    radius: 100, // Radio en metros
    notifyOnEnter: true,
    notifyOnExit: false,
};

// --- Lógica para Iniciar el Monitoreo ---
async function startGeofencing() {
    try {
        // 1. Pedir permisos de ubicación en primer plano y en segundo plano
        let { status: fgStatus } = await Location.requestForegroundPermissionsAsync();
        let { status: bgStatus } = await Location.requestBackgroundPermissionsAsync();

        if (fgStatus !== 'granted' || bgStatus !== 'granted') {
            Alert.alert(
                'Permiso Requerido',
                'Debes otorgar permiso de "Ubicación Siempre" para el monitoreo automático de bienvenida.'
            );
            return false;
        }

        // 2. Registrar la geocerca si aún no está activa
        const isTaskRegistered = await TaskManager.isTaskRegisteredAsync(GEOFENCE_TASK_NAME);
        
        if (!isTaskRegistered) {
            await Location.startGeofencingAsync(GEOFENCE_TASK_NAME, [MUSEUM_REGION]);
            console.log("Geofencing iniciado para el museo.");
            return true;
        }

        return true; // Ya estaba registrado
    } catch (error) {
        console.error("Error al iniciar Geofencing:", error);
        Alert.alert("Error", "No se pudo iniciar el monitoreo de ubicación.");
        return false;
    }
}


export default function HomeScreen() {
    const router = useRouter();

    const handleStartMonitoring = async () => {
        const success = await startGeofencing();
        if (success) {
            Alert.alert(
                "✅ Monitoreo Iniciado",
                "El monitoreo del área del museo está activo. Recibirás una bienvenida al ingresar."
            );
        }
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title" style={styles.title}>
                Home
            </ThemedText>

            {/* Botón para escanear QR */}
            <TouchableOpacity style={styles.btn} onPress={() => router.push('/qr')}>
                <ThemedText style={styles.btnText}>📷 Escanear QR</ThemedText>
            </TouchableOpacity>

            {/* Botón para probar notificaciones (ya existente) */}
            <TouchableOpacity
                style={[styles.btn, { backgroundColor: '#4EA8DE' }]}
                onPress={() => router.push('/testNoti')}>
                <ThemedText style={styles.btnText}>🔔 Probar Notificaciones</ThemedText>
            </TouchableOpacity>

            {/* 🆕 NUEVO BOTÓN PARA INICIAR MONITOREO 🆕 */}
            <TouchableOpacity
                style={[styles.btn, { backgroundColor: '#FF8800' }]}
                onPress={handleStartMonitoring}>
                <ThemedText style={styles.btnText}>🌐 Iniciar Monitoreo de Museo</ThemedText>
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