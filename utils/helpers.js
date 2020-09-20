import * as Notifications from 'expo-notifications';
import { AsyncStorage } from 'react-native';

const NOTIFICATION_KEY = 'FlashCards:Notifications';

export function clearNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

export function setLocalNotifications() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data == null) {
        Notifications.getPermissionsAsync().then(({ granted }) => {
          if (granted) {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(21);
            tomorrow.setMinutes(0);
            tomorrow.setSeconds(0);

            Notifications.scheduleNotificationAsync({
              content: {
                title: 'Take a quiz',
                body: "👋 Don't forget to test your knowledge",
              },
              tomorrow,
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}
