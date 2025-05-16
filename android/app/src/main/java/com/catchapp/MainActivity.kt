package com.catchapp

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.content.Intent
import android.provider.Settings
import android.os.Bundle
import android.net.Uri
import android.os.Build
import android.app.AlertDialog
import android.Manifest
import android.content.pm.PackageManager
import androidx.core.app.ActivityCompat

class MainActivity : ReactActivity() {
    private val REQUEST_CODE = 1001
    private var permissionDialog: AlertDialog? = null
    private var phoneMicDialog: AlertDialog? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        if (!hasPhonePermission() || !hasMicPermission()) {
        ActivityCompat.requestPermissions(
            this,
            arrayOf(
                Manifest.permission.READ_PHONE_STATE,
                Manifest.permission.RECORD_AUDIO
            ),
            REQUEST_CODE
        )
    } else if (!hasOverlayPermission()) {
        showPermissionDialog()
    }
 }

private fun showPhoneMicPermissionDialog() {
    phoneMicDialog?.dismiss()

    phoneMicDialog = AlertDialog.Builder(this)
        .setTitle("전화 및 마이크 권한 필요")
        .setMessage("앱을 사용하려면 전화 및 마이크 권한을 허용해 주세요.")
        .setCancelable(false)
        .setPositiveButton("설정") { _, _ ->
            val intent = Intent(
                Settings.ACTION_APPLICATION_DETAILS_SETTINGS,
                Uri.parse("package:$packageName")
            )
            startActivity(intent)
        }
        .setNegativeButton("종료") { _, _ ->
            finishAffinity()
        }
        .show()
}


    override fun onResume() {
        super.onResume()

        if (!hasPhonePermission() || !hasMicPermission()) {
            showPhoneMicPermissionDialog()
            return
        } else {
        phoneMicDialog?.dismiss()
        phoneMicDialog = null
    }
        if (!hasOverlayPermission()) {
            permissionDialog?.dismiss()
            permissionDialog = null
            showPermissionDialog()
        } else {
            permissionDialog?.dismiss()
            permissionDialog = null
        }
    }

    private fun hasPhonePermission(): Boolean {
    return ActivityCompat.checkSelfPermission(
        this,
        Manifest.permission.READ_PHONE_STATE
    ) == PackageManager.PERMISSION_GRANTED
    }

    private fun hasMicPermission(): Boolean {
        return ActivityCompat.checkSelfPermission(
            this,
            Manifest.permission.RECORD_AUDIO
        ) == PackageManager.PERMISSION_GRANTED
    }

    private fun hasOverlayPermission(): Boolean {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            Settings.canDrawOverlays(this)
        } else true
    }

    private fun showPermissionDialog() {
        if (permissionDialog?.isShowing == true) return  

        permissionDialog = AlertDialog.Builder(this)
            .setTitle("오버레이 권한 필요")
            .setMessage("앱을 사용하려면 다른 앱 위에 표시 권한을 허용해 주세요.")
            .setCancelable(false)
            .setPositiveButton("설정") { _, _ ->
                val intent = Intent(
                    Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                    Uri.parse("package:$packageName")
                )
                startActivity(intent)
            }
            .setNegativeButton("종료") { _, _ ->
                finishAffinity()
            }
            .create()

        permissionDialog?.show()
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)

        if (requestCode == REQUEST_CODE) {
            val phoneGranted = grantResults.getOrNull(0) == PackageManager.PERMISSION_GRANTED
            val micGranted = grantResults.getOrNull(1) == PackageManager.PERMISSION_GRANTED

            if (!phoneGranted || !micGranted) {
               showPhoneMicPermissionDialog()
            } else if (!hasOverlayPermission()) {
                showPermissionDialog()
            }
        }
    }

    private fun allPermissionsGranted(): Boolean {
        return hasPhonePermission() && hasMicPermission() && hasOverlayPermission()
}

    override fun getMainComponentName(): String = "CatchApp"
   
    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
    }
}