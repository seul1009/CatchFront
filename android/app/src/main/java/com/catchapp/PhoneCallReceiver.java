package com.catchapp;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.telephony.TelephonyManager;
public class PhoneCallReceiver extends BroadcastReceiver {
    private static boolean wasRinging = false;

    @Override
    public void onReceive(Context context, Intent intent) {
        String state = intent.getStringExtra(TelephonyManager.EXTRA_STATE);

        if (TelephonyManager.EXTRA_STATE_RINGING.equals(state)) {
            wasRinging = true;
        }

        if (TelephonyManager.EXTRA_STATE_OFFHOOK.equals(state)) {
            // 통화 연결
            wasRinging = false;
            context.startService(new Intent(context, RecordPromptService.class));
        }

        if (TelephonyManager.EXTRA_STATE_IDLE.equals(state)) {
            // 통화 종료
            if (!wasRinging) {
                context.stopService(new Intent(context, RecordPromptService.class));
            }
        }
    }
}
 
