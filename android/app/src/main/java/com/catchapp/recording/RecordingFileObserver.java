package com.catchapp.recording;

import android.os.FileObserver;
import android.util.Log;
import java.io.File;
import android.content.Context;
import android.content.SharedPreferences;

public class RecordingFileObserver extends FileObserver {
    private static final String TAG = "RecordingObserver";
    private final String directory;
    private final Context context;

    public RecordingFileObserver(String path, Context context) {
        super(path, FileObserver.CREATE);
        this.directory = path;
        this.context = context;
    }

    @Override
    public void onEvent(int event, String fileName) {
        if (fileName != null && fileName.endsWith(".m4a")) {
            File newFile = new File(directory, fileName);
            Log.d(TAG, "녹음 파일 감지됨: " + newFile.getAbsolutePath());

            SharedPreferences prefs = context.getSharedPreferences("LoginStatusPrefs", Context.MODE_PRIVATE);
            String userId = prefs.getString("userId", null);

            if (userId != null) {
                FileUploader.uploadToServer(newFile, userId);
            } else {
                Log.e(TAG, "userId가 SharedPreferences에 없습니다.");
            }
        }
    }
}