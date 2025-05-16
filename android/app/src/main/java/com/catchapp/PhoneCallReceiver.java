package com.catchapp;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.telephony.TelephonyManager;
import com.catchapp.RecordPromptService;
import android.os.Build;
import android.util.Log;

public class PhoneCallReceiver extends BroadcastReceiver {
    private static boolean wasRinging = false;

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d("PhoneCallReceiver", "onReceive 호출됨");
        String state = intent.getStringExtra(TelephonyManager.EXTRA_STATE);

        android.util.Log.d("PhoneCallReceiver", "onReceive: state=" + state);

        if (TelephonyManager.EXTRA_STATE_RINGING.equals(state)) {
            wasRinging = true;
        }

        if (TelephonyManager.EXTRA_STATE_OFFHOOK.equals(state)) {
            wasRinging = false;
            Intent serviceIntent = new Intent(context, RecordPromptService.class);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                context.startForegroundService(serviceIntent);
            } else {
                context.startService(serviceIntent);
            }

            Log.i("PhoneCallReceiver", "통화 시작");
}

        if (TelephonyManager.EXTRA_STATE_IDLE.equals(state)) {
            if (!wasRinging) {
                context.stopService(new Intent(context, RecordPromptService.class));
                android.util.Log.d("PhoneCallReceiver", "통화 종료");

            }
        }
    }
}
 
