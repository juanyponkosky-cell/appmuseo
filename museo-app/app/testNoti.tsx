import * as Notifications from 'expo-notifications';
import { Button, View } from 'react-native';

export default function TestNoti() {
  const sendLocal = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: '📣 Museo',
      body: 'Notificación local de prueba',
      data: { obraId: 'obra_123' },
    },
    trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 2 },
  });
};


  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Button title="Probar notificación local" onPress={sendLocal} />
    </View>
  );
}
