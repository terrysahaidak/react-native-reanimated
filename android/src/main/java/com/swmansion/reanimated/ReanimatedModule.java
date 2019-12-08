package com.swmansion.reanimated;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.NativeViewHierarchyManager;
import com.facebook.react.uimanager.UIBlock;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.UIManagerModuleListener;
import com.swmansion.reanimated.transitions.TransitionModule;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import javax.annotation.Nullable;

@ReactModule(name = ReanimatedModule.NAME)
public class ReanimatedModule extends ReactContextBaseJavaModule implements
        LifecycleEventListener, UIManagerModuleListener {

  public static final String NAME = "ReanimatedModule";

  public native void installJSI(long javaScriptContextHolder);

  private interface UIThreadOperation {
    void execute(NodesManager nodesManager);
  }

  private ArrayList<UIThreadOperation> mOperations = new ArrayList<>();

  private @Nullable NodesManager mNodesManager;
  private @Nullable TransitionModule mTransitionManager;

  public ReanimatedModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public void initialize() {
    ReactApplicationContext reactCtx = getReactApplicationContext();
    UIManagerModule uiManager = reactCtx.getNativeModule(UIManagerModule.class);
    reactCtx.addLifecycleEventListener(this);
    uiManager.addUIManagerListener(this);
    mTransitionManager = new TransitionModule(uiManager);
  }

  @Override
  public void onHostPause() {
    if (mNodesManager != null) {
      mNodesManager.onHostPause();
    }
  }

  @Override
  public void onHostResume() {
    if (mNodesManager != null) {
      mNodesManager.onHostResume();
    }
  }

  @Override
  public void onHostDestroy() {
    // do nothing
  }

  @Override
  public void willDispatchViewUpdates(final UIManagerModule uiManager) {
    if (mOperations.isEmpty()) {
      return;
    }
    final ArrayList<UIThreadOperation> operations = mOperations;
    mOperations = new ArrayList<>();
    uiManager.addUIBlock(new UIBlock() {
      @Override
      public void execute(NativeViewHierarchyManager nativeViewHierarchyManager) {
        NodesManager nodesManager = getNodesManager();
        for (UIThreadOperation operation : operations) {
          operation.execute(nodesManager);
        }
      }
    });
  }

  @Override
  public String getName() {
    return NAME;
  }

  private NodesManager getNodesManager() {
    if (mNodesManager == null) {
      mNodesManager = new NodesManager(getReactApplicationContext());
    }

    return mNodesManager;
  }

  @ReactMethod
  public void animateNextTransition(int tag, ReadableMap config) {
    mTransitionManager.animateNextTransition(tag, config);
  }

  @ReactMethod
  public void createNode(final int tag, final ReadableMap config) {
    mOperations.add(new UIThreadOperation() {
      @Override
      public void execute(NodesManager nodesManager) {
        nodesManager.createNode(tag, config);
      }
    });
  }

  @ReactMethod
  public void createNodeJSI(final ReadableMap config) {
    
  }

  public void createNodeOperator(final int nodeId, final String op, final int[] input) {
    mOperations.add(new UIThreadOperation() {
      @Override
      public void execute(NodesManager nodesManager) {
        nodesManager.createNodeOperator(nodeId, op, input);
      }
    });
  }
  public void createNodeCallFunc(final int nodeId, final int what, final int[] args, final int[] params) {
    mOperations.add(new UIThreadOperation() {
      @Override
      public void execute(NodesManager nodesManager) {
        nodesManager.createNodeCallFunc(nodeId, what, args, params);
      }
    });
  }
  public void createNodeFunction(final int nodeId, final int what) {
    mOperations.add(new UIThreadOperation() {
      @Override
      public void execute(NodesManager nodesManager) {
        nodesManager.createNodeFunction(nodeId, what);
      }
    });
  }

  public void createNodeParam(final int nodeId) {
    mOperations.add(new UIThreadOperation() {
      @Override
      public void execute(NodesManager nodesManager) {
        nodesManager.createNodeParam(nodeId);
      }
    });
  }

  public void createNodeConcat(final int nodeId, final int[] input) {
    mOperations.add(new UIThreadOperation() {
      @Override
      public void execute(NodesManager nodesManager) {
        nodesManager.createNodeConcat(nodeId, input);
      }
    });
  }

  public void createNodeAlways(final int nodeId, final int what) {
    mOperations.add(new UIThreadOperation() {
      @Override
      public void execute(NodesManager nodesManager) {
        nodesManager.createNodeAlways(nodeId, what);
      }
    });
  }

  public void createBlockNode(final int nodeId, final int[] block) {
    mOperations.add(new UIThreadOperation() {
      @Override
      public void execute(NodesManager nodesManager) {
        nodesManager.createBlockNode(nodeId, block);
      }
    });
  }

  public void createCondNode(final int nodeId, final int cond, final int ifBlock, final int elseBlock) {
    mOperations.add(new UIThreadOperation() {
      @Override
      public void execute(NodesManager nodesManager) {
        nodesManager.createCondNode(nodeId, cond, ifBlock, elseBlock);
      }
    });
  }

  public void createCondNodeOptional(final int nodeId, final int cond, final int ifBlock) {
    mOperations.add(new UIThreadOperation() {
      @Override
      public void execute(NodesManager nodesManager) {
        nodesManager.createCondNodeOptional(nodeId, cond, ifBlock);
      }
    });
  }

  public void createSetNode(final int nodeId, final int what, final int value) {
    mOperations.add(new UIThreadOperation() {
      @Override
      public void execute(NodesManager nodesManager) {
        nodesManager.createSetNode(nodeId, what, value);
      }
    });
  }

  public void createDebugNode(final int nodeId, final String message, final int value) {
    mOperations.add(new UIThreadOperation() {
      @Override
      public void execute(NodesManager nodesManager) {
        nodesManager.createDebugNode(nodeId, message, value);
      }
    });
  }

  public void createClockNode(final int nodeId) {
    mOperations.add(new UIThreadOperation() {
      @Override
      public void execute(NodesManager nodesManager) {
        nodesManager.createClockNode(nodeId);
      }
    });
  }

  public void createClockStartNode(final int nodeId, final int clock) {
    mOperations.add(new UIThreadOperation() {
      @Override
      public void execute(NodesManager nodesManager) {
        nodesManager.createClockStartNode(nodeId, clock);
      }
    });
  }

  public void createClockStopNode(final int nodeId, final int clock) {
    mOperations.add(new UIThreadOperation() {
      @Override
      public void execute(NodesManager nodesManager) {
        nodesManager.createClockStopNode(nodeId, clock);
      }
    });
  }

  public void createClockTestNode(final int nodeId, final int clock) {
    mOperations.add(new UIThreadOperation() {
      @Override
      public void execute(NodesManager nodesManager) {
        nodesManager.createClockTestNode(nodeId, clock);
      }
    });
  }

  public void createJSCallNode(final int nodeId, final int[] input) {
    mOperations.add(new UIThreadOperation() {
      @Override
      public void execute(NodesManager nodesManager) {
        nodesManager.createJSCallNode(nodeId, input);
      }
    });
  }

  public void createBezierNode(
          final int nodeId,
          final int input,
          final double mX1,
          final double mY1,
          final double mX2,
          final double mY2) {
    mOperations.add(new UIThreadOperation() {
      @Override
      public void execute(NodesManager nodesManager) {
        nodesManager.createBezierNode(nodeId, input, mX1, mY1, mX2, mY2);
      }
    });
  }

  @ReactMethod
  public void dropNode(final int tag) {
    mOperations.add(new UIThreadOperation() {
      @Override
      public void execute(NodesManager nodesManager) {
        nodesManager.dropNode(tag);
      }
    });
  }

  @ReactMethod
  public void connectNodes(final int parentID, final int childID) {
    mOperations.add(new UIThreadOperation() {
      @Override
      public void execute(NodesManager nodesManager) {
        nodesManager.connectNodes(parentID, childID);
      }
    });
  }

  @ReactMethod
  public void disconnectNodes(final int parentID, final int childID) {
    mOperations.add(new UIThreadOperation() {
      @Override
      public void execute(NodesManager nodesManager) {
        nodesManager.disconnectNodes(parentID, childID);
      }
    });
  }

  @ReactMethod
  public void connectNodeToView(final int nodeID, final int viewTag) {
    mOperations.add(new UIThreadOperation() {
      @Override
      public void execute(NodesManager nodesManager) {
        nodesManager.connectNodeToView(nodeID, viewTag);
      }
    });
  }

  @ReactMethod
  public void disconnectNodeFromView(final int nodeID, final int viewTag) {
    mOperations.add(new UIThreadOperation() {
      @Override
      public void execute(NodesManager nodesManager) {
        nodesManager.disconnectNodeFromView(nodeID, viewTag);
      }
    });
  }

  @ReactMethod
  public void attachEvent(final int viewTag, final String eventName, final int eventNodeID) {
    mOperations.add(new UIThreadOperation() {
      @Override
      public void execute(NodesManager nodesManager) {
        nodesManager.attachEvent(viewTag, eventName, eventNodeID);
      }
    });
  }

  @ReactMethod
  public void detachEvent(final int viewTag, final String eventName, final int eventNodeID) {
    mOperations.add(new UIThreadOperation() {
      @Override
      public void execute(NodesManager nodesManager) {
        nodesManager.detachEvent(viewTag, eventName, eventNodeID);
      }
    });
  }

  @ReactMethod
  public void configureProps(ReadableArray nativePropsArray, ReadableArray uiPropsArray) {
    int size = nativePropsArray.size();
    final Set<String> nativeProps = new HashSet<>(size);
    for (int i = 0; i < size; i++) {
      nativeProps.add(nativePropsArray.getString(i));
    }

    size = uiPropsArray.size();
    final Set<String> uiProps = new HashSet<>(size);
    for (int i = 0; i < size; i++) {
      uiProps.add(uiPropsArray.getString(i));
    }
    mOperations.add(new UIThreadOperation() {
      @Override
      public void execute(NodesManager nodesManager) {
        nodesManager.configureProps(nativeProps, uiProps);
      }
    });
  }

  @ReactMethod
  public void getValue(final int nodeID, final Callback callback) {
    mOperations.add(new UIThreadOperation() {
      @Override
      public void execute(NodesManager nodesManager) {
        nodesManager.getValue(nodeID, callback);
      }
    });
  }
}
