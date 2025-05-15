package com.catchapp;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.provider.Settings;
import android.view.View;
import android.view.LayoutInflater;
import android.widget.Button;
import android.os.Build;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;

public class OverlayPermissionActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        CustomDialog dialog = new CustomDialog(this);

        // 버튼 바인딩
        Button goSettingsBtn = dialog.findViewById(R.id.goSettingsBtn);
        Button cancelBtn = dialog.findViewById(R.id.cancelBtn);

        // 클릭 이벤트 설정
        goSettingsBtn.setOnClickListener(v -> {
            Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                Uri.parse("package:" + getPackageName()));
            startActivity(intent);
            dialog.dismiss();
            finish();
        });

        cancelBtn.setOnClickListener(v -> {
            dialog.dismiss();
            finish();
        });

        // 다이얼로그 띄우기
        dialog.show();
            }

}
