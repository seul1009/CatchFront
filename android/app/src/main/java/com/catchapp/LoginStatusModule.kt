package com.catchapp

import android.content.Context
import android.content.SharedPreferences
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class LoginStatusModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private val prefs: SharedPreferences =
        reactContext.getSharedPreferences("LoginStatusPrefs", Context.MODE_PRIVATE)

    override fun getName(): String = "LoginStatusModule"

    @ReactMethod
    fun setLoggedIn(status: Boolean) {
        prefs.edit().putBoolean("isLoggedIn", status).apply()
    }
}
