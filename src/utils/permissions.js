import { request, PERMISSIONS } from 'react-native-permissions';

export async function requestCallPermissions() {
  await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
  await request(PERMISSIONS.ANDROID.READ_PHONE_STATE);
  await request(PERMISSIONS.ANDROID.SYSTEM_ALERT_WINDOW);
}
