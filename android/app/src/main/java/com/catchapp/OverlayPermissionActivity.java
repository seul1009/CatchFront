package com.catchapp;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.provider.Settings;

public class OverlayPermissionActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        new AlertDialog.Builder(this)
            .setTitle("오버레이 권한이 필요해요")
            .setMessage("통화 중 녹음 안내를 위해\n'다른 앱 위에 표시' 권한이 필요합니다.")
            .setCancelable(false)
            .setPositiveButton("설정하러 가기", (dialog, which) -> {
                Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                        Uri.parse("package:" + getPackageName()));
                startActivity(intent);
                finish();  // 설정으로 이동 후 종료
            })
            .setNegativeButton("취소", (dialog, which) -> {
                finish();  
            })
            .show();
    }
}
