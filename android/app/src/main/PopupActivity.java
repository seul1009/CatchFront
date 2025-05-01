public class PopupActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Intent intent = new Intent(Intent.ACTION_MAIN);
        intent.setClassName("com.android.soundrecorder", "com.android.soundrecorder.SoundRecorder");
        startActivity(intent);
        finish();
    }
}
