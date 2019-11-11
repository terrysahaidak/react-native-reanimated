package com.swmansion.reanimated.example;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.ReactInstanceManager;
import com.swmansion.reanimated.ReanimatedModule;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity implements ReactInstanceManager.ReactInstanceEventListener {
    @Override
    public void onResume() {
        super.onResume();
        getReactInstanceManager().addReactInstanceEventListener(this);
    }

    @Override
    public void onPause() {
        super.onPause();
        getReactInstanceManager().removeReactInstanceEventListener(this);
    }

    @Override
    public void onReactContextInitialized(ReactContext context) {
        ReanimatedModule reanimatedModule = context.getNativeModule(ReanimatedModule.class);

         reanimatedModule.installJSI(context.getJavaScriptContextHolder().get());
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ReanimatedExample";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
      return new ReactActivityDelegate(this, getMainComponentName()) {
        @Override
        protected ReactRootView createRootView() {
          return new RNGestureHandlerEnabledRootView(MainActivity.this);
        }
      };
    }
}
