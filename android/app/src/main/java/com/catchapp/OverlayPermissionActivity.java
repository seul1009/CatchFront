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

public class OverlayPermissionActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        View dialogView = LayoutInflater.from(this).inflate(R.layout.dialog_overlay_permission, null);

        AlertDialog dialog = new AlertDialog.Builder(this)
            .setView(dialogView)
            .setCancelable(false)
            .create();

        Button goSettingsBtn = dialogView.findViewById(R.id.goSettingsBtn);
        Button cancelBtn = dialogView.findViewById(R.id.cancelBtn);

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

        dialog.show();
    
    }

}
