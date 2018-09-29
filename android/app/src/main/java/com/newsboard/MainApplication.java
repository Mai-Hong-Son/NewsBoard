package com.newsboard;

import android.app.Application;
// import org.reactnative.camera.RNCameraPackage;

import com.newsboard.BuildConfig;
// import com.imagepicker.ImagePickerPackage;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
// import io.invertase.firebase.RNFirebasePackage;
// import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.BV.LinearGradient.LinearGradientPackage;
// import com.airbnb.android.react.maps.MapsPackage;
// import org.reactnative.camera.RNCameraPackage;
// import com.RNFetchBlob.RNFetchBlobPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(),
          // new RNFirebasePackage(),
          // new RNFirebaseCrashlyticsPackage(),
          new VectorIconsPackage(), new LinearGradientPackage()
      // new MapsPackage(),
      // new RNCameraPackage(),
      // new RNFetchBlobPackage(),
      // new ImagePickerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
