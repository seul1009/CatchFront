public class PopupService extends Service {
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Intent popupIntent = new Intent(this, PopupActivity.class);
        popupIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(popupIntent);
        return START_NOT_STICKY;
    }
}

