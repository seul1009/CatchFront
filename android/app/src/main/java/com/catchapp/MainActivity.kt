package com.catchapp

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.content.Intent
import android.provider.Settings
import android.os.Bundle
import android.net.Uri
import android.app.AlertDialog

class MainActivity : ReactActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // 오버레이 권한 확인
        if (!Settings.canDrawOverlays(this)) {
            // 권한이 없으면 OverlayPermissionActivity를 호출
            val intent = Intent(this, OverlayPermissionActivity::class.java)
            startActivity(intent)
        }
    }

    override fun getMainComponentName(): String {
        return "CatchApp"
    }

    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
    }
}