public class CallReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        String state = intent.getStringExtra(TelephonyManager.EXTRA_STATE);
        if (TelephonyManager.EXTRA_STATE_OFFHOOK.equals(state)) {
            Intent popupServiceIntent = new Intent(context, PopupService.class);
            context.startService(popupServiceIntent);
        }
    }
}