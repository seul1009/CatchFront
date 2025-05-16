package com.catchapp.recording;

import java.io.File;
import okhttp3.*;
import java.io.IOException;

public class FileUploader {
    public static void uploadToServer(File file) {
        OkHttpClient client = new OkHttpClient();

        RequestBody body = new MultipartBody.Builder()
            .setType(MultipartBody.FORM)
            .addFormDataPart("file", file.getName(),
                RequestBody.create(file, MediaType.parse("audio/m4a")))
            .build();

        Request request = new Request.Builder()
            .url("http://192.168.0.4:5000/upload")
            .post(body)
            .build();

        client.newCall(request).enqueue(new Callback() {
            @Override public void onFailure(Call call, IOException e) { e.printStackTrace(); }
            @Override public void onResponse(Call call, Response response) throws IOException {
                if (response.isSuccessful()) {
                    System.out.println("서버 업로드 성공: " + response.body().string());
                } else {
                    System.err.println("서버 응답 실패: " + response.code());
                }
            }
        });
    }
}
