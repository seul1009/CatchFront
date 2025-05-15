package com.catchapp;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.uimanager.ViewManager;
import android.app.Application;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class OverlayPermissionPackage implements ReactPackage {
  @Override
  public List<NativeModule> createNativeModules(
      com.facebook.react.bridge.ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();
    modules.add(new OverlayPermissionModule(reactContext));
    return modules;
  }

  @Override
  public List<ViewManager> createViewManagers(
      com.facebook.react.bridge.ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }
}
