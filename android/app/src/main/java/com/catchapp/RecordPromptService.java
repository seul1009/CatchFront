package com.catchapp;

import android.app.Service;
import android.content.Intent;
import android.graphics.PixelFormat;
import android.os.Build;
import android.os.IBinder;
import android.provider.Settings;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.WindowManager;
import android.net.Uri;
import android.app.AlertDialog;
import android.widget.Toast;
import android.util.Log;

public class RecordPromptService extends Service {
    private WindowManager windowManager;
    private View floatingView;

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(this)) {
            showCustomOverlayPermissionDialog();
        } else {
            showFloatingPrompt();
        }
        return START_NOT_STICKY;
    }

    private void showFloatingPrompt() {
        if (floatingView != null) return;
        floatingView = LayoutInflater.from(this).inflate(R.layout.record_prompt_overlay, null);

        WindowManager.LayoutParams params = new WindowManager.LayoutParams(
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.WRAP_CONTENT,
                Build.VERSION.SDK_INT >= Build.VERSION_CODES.O ?
                    WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY :
                    WindowManager.LayoutParams.TYPE_PHONE,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
                PixelFormat.TRANSLUCENT);

        params.gravity = Gravity.TOP | Gravity.CENTER_HORIZONTAL;
        params.x = 0;    // 중앙 정렬이므로 x는 0
        params.y = 100;  // 상단 여백 조절
        windowManager = (WindowManager) getSystemService(WINDOW_SERVICE);
        windowManager.addView(floatingView, params);

        // 버튼 클릭 시 오버레이 제거
        floatingView.findViewById(R.id.closeButton).setOnClickListener(v -> {
        if (floatingView != null && windowManager != null) {
            startRecording();
            windowManager.removeView(floatingView);
            floatingView = null;

            // 서비스 종료
            stopSelf();
        }
    });
    }

    private void showCustomOverlayPermissionDialog() {
        Log.d("OverlayCheck", "OverlayPermissionActivity 호출 시도");
        Intent intent = new Intent(this, OverlayPermissionActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
    }

    private void startRecording() {
    // TODO: 녹음 시작 로직 추가
    Log.d("RecordPromptService", "녹음 시작됨");
}

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (floatingView != null && windowManager != null) {
            windowManager.removeView(floatingView);
            floatingView = null;
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
}
}
