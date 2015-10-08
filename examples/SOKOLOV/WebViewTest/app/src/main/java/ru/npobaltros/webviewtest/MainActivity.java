package ru.npobaltros.webviewtest;



import android.app.Activity;


import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.res.Configuration;
import android.graphics.Bitmap;
import android.graphics.Matrix;
import android.graphics.Point;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.Display;
import android.view.MenuItem;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.view.animation.TranslateAnimation;
import android.view.inputmethod.InputMethodManager;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.ProgressBar;


import android.widget.RelativeLayout;
import android.widget.RelativeLayout.LayoutParams;
import android.widget.TextView;

//import android.app.acti  v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;




public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        Button button = (Button)findViewById(R.id.btnFirst);
        button.setOnClickListener(onBtn);

        Button button2 = (Button)findViewById(R.id.btnSecond);
        button2.setOnClickListener(onBtn2);
    }
    private int i = 0;

    private View.OnClickListener onBtn2 = new View.OnClickListener()
    {
        public void onClick(View v)
        {
            try {

                /*Button button = (Button) findViewById(R.id.btnSecond);
                button.setText(Integer.toString(i));

                i++;//
                WebView lWV = (WebView) findViewById(R.id.webView);
                lWV.loadUrl("javascript:changeText('WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW')");*/
            }catch(Exception exc)
            {

                i++;
            }
        }
    };

    private View.OnClickListener onBtn = new View.OnClickListener()
    {
        public void onClick(View v)
        {

            try
            {
            Button button = (Button)findViewById(R.id.btnFirst);
            button.setText(Integer.toString(i));
                i++;
            WebView lWV = (WebView) findViewById(R.id.webView);
            lWV.getSettings().setDefaultTextEncodingName("UTF-8");
            lWV.getSettings().setJavaScriptEnabled(true);
            lWV.getSettings().setSaveFormData(true);
            lWV.getSettings().setBuiltInZoomControls(true);
            lWV.setWebViewClient(new WebViewClient());
            lWV.loadUrl("file:///android_asset/test1.html");
            }catch(Exception exc)
            {

                i++;
            }
        }
    };




    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        //getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        //if (id == R.id.action_settings)
        //{
          //  return true;
        //}

        return super.onOptionsItemSelected(item);
    }
}
