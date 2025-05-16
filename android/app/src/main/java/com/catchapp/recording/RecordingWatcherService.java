package com.catchapp.recording;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;

public class RecordingWatcherService extends Service {
    private RecordingFileObserver observer;

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        startForegroundService();

        String pathToWatch = "/sdcard/Call/"; 
        observer = new RecordingFileObserver(pathToWatch);
        observer.startWatching();

        return START_STICKY;
    }

    private void startForegroundService() {
        String channelId = "recording_channel";
        String channelName = "녹음 감지 서비스";

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel chan = new NotificationChannel(
                channelId, channelName, NotificationManager.IMPORTANCE_LOW
            );
            NotificationManager manager = getSystemService(NotificationManager.class);
            manager.createNotificationChannel(chan);
        }

        Notification notification = new Notification.Builder(this, channelId)
            .setContentTitle("CatchApp 실행 중")
            .setContentText("통화 녹음을 감지하고 있습니다.")
            .setSmallIcon(android.R.drawable.ic_btn_speak_now)
            .build();

        startForeground(1, notification);
    }

    @Override
    public void onDestroy() {
        if (observer != null) observer.stopWatching();
        super.onDestroy();
    }

    @Override
    public IBinder onBind(Intent intent) { return null; }
}