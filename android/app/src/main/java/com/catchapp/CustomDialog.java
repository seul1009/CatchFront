package com.catchapp;

import android.app.Dialog;
import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.view.Window;

import androidx.annotation.NonNull;

public class CustomDialog extends Dialog {

    public CustomDialog(@NonNull Context context) {
        super(context);

        requestWindowFeature(Window.FEATURE_NO_TITLE);

        setContentView(R.layout.dialog_overlay_permission);

        if (getWindow() != null) {
            getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
        }

        setCancelable(false);
    }
}
