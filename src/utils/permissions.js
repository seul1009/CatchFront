import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';

export async function checkAllPermissions() {
  if (Platform.OS !== 'android') return { granted: false };

  // 초기 권한 상태 확인
  let phone = await check(PERMISSIONS.ANDROID.READ_PHONE_STATE);
  let mic = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
  let overlay = await check(PERMISSIONS.ANDROID.SYSTEM_ALERT_WINDOW);

  // 권한 요청 
  if (phone !== RESULTS.GRANTED) {
    phone = await request(PERMISSIONS.ANDROID.READ_PHONE_STATE);
  }

  if (mic !== RESULTS.GRANTED) {
    mic = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
  }

  if (overlay !== RESULTS.GRANTED) {
    overlay = await request(PERMISSIONS.ANDROID.SYSTEM_ALERT_WINDOW);
  }

  return { phone, mic, overlay };
}
