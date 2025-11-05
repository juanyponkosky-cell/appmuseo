// src/lib/notifications.ts
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Cómo se muestran cuando la app está en foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true, // muestra la notificación
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowList: true, // la agrega a la bandeja de notificaciones (Android)
  }),
});


export async function registerForPushNotificationsAsync() {
  // Canal Android (requerido para mostrar notis)
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
    });
  }

  if (!Device.isDevice) return null;

  // Pedir permisos
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') return null;

  // Obtener Expo Push Token
  // Recomendado: usar un **development build** o build real para obtener token.
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token; // ej: ExponentPushToken[xxxxxxxxxxxxxx]
}
