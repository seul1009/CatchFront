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
import com.catchapp.R;
import android.os.Environment;
import android.os.FileObserver;
import java.io.File;
import android.os.Handler;
import android.os.Looper;
import android.widget.TextView;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import com.catchapp.recording.FileUploader;

public class RecordPromptService extends Service {
    private WindowManager windowManager;
    private View floatingView;
    private FileObserver observer;

    private static final String CHANNEL_ID = "record_service_channel";

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) { 
        boolean isLoggedIn = getSharedPreferences("LoginStatusPrefs", MODE_PRIVATE)
                           .getBoolean("isLoggedIn", false);

        if (!isLoggedIn) {
            Log.d("RecordPromptService", "로그인되지 않음. 서비스 종료");
            stopSelf();
            return START_NOT_STICKY;
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID,
                "통화 녹음 안내",
                NotificationManager.IMPORTANCE_LOW
            );
            NotificationManager manager = getSystemService(NotificationManager.class);
            if (manager != null) {
                manager.createNotificationChannel(channel);
            }

            Notification notification = new Notification.Builder(this, CHANNEL_ID)
                .setContentTitle("CatchApp")
                .setContentText("통화 중 녹음 안내 표시 중...")
                .setSmallIcon(R.mipmap.ic_launcher) 
                .build();

            startForeground(1, notification);
        }
        showFloatingPrompt();

        return START_NOT_STICKY;
    }

    private void showFloatingPrompt() {
        Log.d("RecordPromptService", "🟡 showFloatingPrompt() 호출됨");
        if (floatingView != null) return;
            floatingView = LayoutInflater.from(this).inflate(R.layout.record_prompt_overlay, null);
            Log.d("RecordPromptService", "🟢 Layout inflate 완료");

        WindowManager.LayoutParams params = new WindowManager.LayoutParams(
                WindowManager.LayoutParams.WRAP_CONTENT,
                WindowManager.LayoutParams.WRAP_CONTENT,
                Build.VERSION.SDK_INT >= Build.VERSION_CODES.O ?
                    WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY :
                    WindowManager.LayoutParams.TYPE_PHONE,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE,
                PixelFormat.TRANSLUCENT);

        params.gravity = Gravity.TOP | Gravity.CENTER_HORIZONTAL;
        params.x = 0;    
        params.y = 100;  
        
        windowManager = (WindowManager) getSystemService(WINDOW_SERVICE);
        windowManager.addView(floatingView, params);
        Log.d("RecordPromptService", "✅ 오버레이 뷰 추가됨");

        floatingView.findViewById(R.id.closeButton).setOnClickListener(v -> {
            Log.d("RecordPromptService", "녹음 시작됨");
        if (floatingView != null && windowManager != null) {
            windowManager.removeView(floatingView);
            floatingView = null;

            // 서비스 종료
            stopSelf();
        }
    });
        File recordingsDir = new File(Environment.getExternalStorageDirectory(), "Recordings/Call");

        observer = new FileObserver(recordingsDir.getPath(), 
        FileObserver.CREATE | FileObserver.MODIFY | FileObserver.MOVED_TO) {
            @Override
            public void onEvent(int event, String path) {
                if (path == null) return;

                File file = new File(recordingsDir, path);
                if (!file.exists()) return;

                if (event == FileObserver.CREATE || event == FileObserver.MOVED_TO) {
                    Log.i("RecordWatcher", "녹음 시작됨: " + path);
                    new Handler(Looper.getMainLooper()).post(() -> updateDialogText("녹음 중... \n 최소 10초를 유지해 주세요.  \n 검사를 원하시면 녹음을 종료해 주세요."));
                }

                if (event == FileObserver.MODIFY) {
                    Log.i("RecordWatcher", "파일 수정됨: " + path);
                    CheckFinished(file);
                }
            }
        };
        observer.startWatching();
    }

    private void CheckFinished(File file) {
        new Thread(() -> {
            try {
                long initialSize = file.length();
                Thread.sleep(3000); // 3초 동안 변화 없으면 녹음 종료 간주
                long newSize = file.length();

                if (initialSize == newSize) {
                    Log.i("RecordWatcher", "판별 중");
                    new Handler(Looper.getMainLooper()).post(() -> {
                        updateDialogText("보이스피싱 판별 중...");
                    });

                    // 업로드
                    FileUploader.uploadToServer(file);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }).start();
    }

    private void updateDialogText(String message) {
        if (floatingView != null) {
            TextView promptText = floatingView.findViewById(R.id.promptText);
            promptText.setText(message);
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (floatingView != null && windowManager != null) {
            windowManager.removeView(floatingView);
            floatingView = null;
        }
        if (observer != null) {
            observer.stopWatching();
            observer = null;
    }
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
}
}
