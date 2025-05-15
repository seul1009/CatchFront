package com.catchapp;

import android.content.Intent;
import android.app.Activity;
import android.os.Build;
import android.provider.Settings;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class OverlayPermissionModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public OverlayPermissionModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "OverlayPermissionModule";
    }

    @ReactMethod
    public void startOverlayPermissionActivity() {
        Activity activity = getCurrentActivity();
        if (activity != null) {
            Intent intent = new Intent(activity, OverlayPermissionActivity.class);
            activity.startActivity(intent);
        }
    }

    @ReactMethod
    public void checkOverlayPermission(Promise promise) {
        boolean granted = Build.VERSION.SDK_INT < Build.VERSION_CODES.M || Settings.canDrawOverlays(reactContext);
        promise.resolve(granted);
    }
    
}
