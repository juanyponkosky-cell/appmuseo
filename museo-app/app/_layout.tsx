// app/_layout.tsx
import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

// 🟩 Configurar cómo se muestran las notificaciones en foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,   // Muestra el banner en pantalla
    shouldShowAlert: true,    // Necesario para iOS
    shouldShowList: true,     // Agrega a la bandeja (Android)
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// 🟩 Función auxiliar para pedir permisos
async function askNotificationPermissions() {
  try {
    const settings = await Notifications.requestPermissionsAsync();
    return settings.status === 'granted';
  } catch (e) {
    console.warn('Error al pedir permisos:', e);
    return false;
  }
}

export default function RootLayout() {
  const router = useRouter();

  const receivedSub = useRef<Notifications.Subscription | null>(null);
  const responseSub = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    // ✅ Canal obligatorio en Android
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.DEFAULT,
      }).catch(() => {});
    }

    // ✅ Pedir permisos y obtener token opcionalmente
    (async () => {
      const granted = await askNotificationPermissions();
      if (!granted) return;

      try {
        const projectId =
          Constants.expoConfig?.extra?.eas?.projectId ??
          Constants.easConfig?.projectId;

        const token = await Notifications.getExpoPushTokenAsync({ projectId });
        console.log('Expo push token:', token.data);
        // 👉 Guardalo en backend o mostralo en pantalla
      } catch (err) {
        console.warn('No se pudo obtener token push:', err);
      }
    })();

    // ✅ Listener: notificación recibida mientras la app está abierta
    receivedSub.current = Notifications.addNotificationReceivedListener((notif) => {
      console.log('📩 Notificación en foreground:', notif);
    });

    // ✅ Listener: cuando el usuario toca la notificación
    responseSub.current = Notifications.addNotificationResponseReceivedListener((resp) => {
      const data = resp.notification.request.content.data as any;
      if (data?.obraId) {
        router.push(`/obra/${data.obraId}`);
      }
    });

    // ✅ Limpieza al desmontar
    return () => {
      receivedSub.current?.remove();
      responseSub.current?.remove();
    };
  }, [router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Grupo de pestañas (Home, Explore...) */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Rutas fuera de tabs */}
      <Stack.Screen name="qr" options={{ headerShown: true, title: 'Escanear QR' }} />
      <Stack.Screen name="obra/[id]" options={{ headerShown: true, title: 'Detalle de obra' }} />
      <Stack.Screen name="testNoti" options={{ headerShown: true, title: 'Probar notificación' }} />
    </Stack>
  );
}
