package com.catchapp.recording;

import java.io.File;
import okhttp3.*;
import java.io.IOException;
import org.json.JSONObject;
import android.util.Log;

public class FileUploader {

    public interface FileUploaderCallback {
        void onResult(String message);
    }

    public static void uploadToServer(File file, String userId) {
        uploadToServer(file, userId);
}

    public static void uploadToServer(File file, String userId, FileUploaderCallback callback) {
        OkHttpClient client = new OkHttpClient();

        RequestBody body = new MultipartBody.Builder()
            .setType(MultipartBody.FORM)
            .addFormDataPart("audio_file", file.getName(),
                RequestBody.create(file, MediaType.parse("audio/m4a")))
            .addFormDataPart("userId", userId)
            .build();

        Request request = new Request.Builder()
            .url("http://192.168.0.4:5000/upload")
            .post(body)
            .build();
            
        client.newCall(request).enqueue(new Callback() {
            @Override 
            public void onFailure(Call call, IOException e) { 
                e.printStackTrace(); 
                if (callback != null) {
                    callback.onResult("서버 업로드 실패");
            }
        }
            @Override 
            public void onResponse(Call call, Response response) throws IOException {
                Log.d("Response", "서버 응답: "+ request);
                if (response.isSuccessful()) {
                    String json = response.body().string();
                    try {
                        JSONObject obj = new JSONObject(json);
                        String decision = obj.getString("final_decision");
                        int score = obj.getInt("final_score");

                        String message = decision + "\n보이스피싱 확률: " + score + "%";
                        if (callback != null) {
                            callback.onResult(message);
                        }
                    } catch (Exception e) {
                        Log.e("FileUploader", "JSON 파싱 실패", e);
                        if (callback != null) {
                            callback.onResult("결과 파싱 실패");
                        }
                    }
                } else {
                    String responseBody = response.body() != null ? response.body().string() : "";
                    Log.e("FileUploader", "서버 응답 실패: 코드 " + response.code() + ", 바디: " + responseBody);
                    if (callback != null) {
                        callback.onResult("서버 응답 실패");
                    }
                }
            }
        });
    }
}