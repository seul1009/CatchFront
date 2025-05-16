package com.catchapp.recording;

import android.content.Intent;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class RecordingModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public RecordingModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    @Override
    public String getName() {
        return "RecordingModule";
    }

    @ReactMethod
    public void startService() {
        Intent serviceIntent = new Intent(reactContext, RecordingWatcherService.class);
        reactContext.startService(serviceIntent);
    }
}
