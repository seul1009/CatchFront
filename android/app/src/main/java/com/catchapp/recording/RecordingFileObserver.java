package com.catchapp.recording;

import android.os.FileObserver;
import android.util.Log;
import java.io.File;

public class RecordingFileObserver extends FileObserver {
    private static final String TAG = "RecordingObserver";
    private final String directory;

    public RecordingFileObserver(String path) {
        super(path, FileObserver.CREATE);
        this.directory = path;
    }

    @Override
    public void onEvent(int event, String fileName) {
        if (fileName != null && fileName.endsWith(".m4a")) {
            File newFile = new File(directory, fileName);
            Log.d(TAG, "녹음 파일 감지됨: " + newFile.getAbsolutePath());
            FileUploader.uploadToServer(newFile);
        }
    }
}