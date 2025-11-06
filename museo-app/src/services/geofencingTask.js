import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager'; // ✅ Importación correcta

// ⚠️ Este nombre DEBE coincidir con el que usas en HomeScreen.js
const GEOFENCE_TASK_NAME = 'GEOFENCE_MUSEO';

/**
 * Define la función que se ejecutará cuando se detecte un evento de geofencing.
 * Esta función corre en un proceso de background separado.
 */
// 🛑 ANTES: Location.TaskManager.defineTask(GEOFENCE_TASK_NAME, ({ data, error }) => {
// ✅ AHORA: Usa TaskManager directo.
TaskManager.defineTask(GEOFENCE_TASK_NAME, ({ data, error }) => {
    if (error) {
        console.error('Error en la tarea de Geofencing:', error);
        return;
    }

    // 1. Verificar que sea un evento de ENTRADA
    if (data && data.eventType === Location.GeofencingEventType.Enter) {
        console.log("¡Usuario detectado entrando al área del museo!");

        // 2. Disparar la Notificación de Bienvenida
        Notifications.scheduleNotificationAsync({
            content: {
                title: "👋 ¡Bienvenido al Museo!",
                body: "Gracias por visitarnos. Usa la app para el tour interactivo.",
                data: { screen: 'WelcomeScreen' }, 
            },
            trigger: null, // Envío inmediato
        });
    }
});

export { GEOFENCE_TASK_NAME };