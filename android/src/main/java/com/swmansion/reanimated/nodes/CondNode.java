package com.swmansion.reanimated.nodes;

import com.facebook.react.bridge.ReadableMap;
import com.swmansion.reanimated.NodesManager;
import javax.annotation.Nullable;

public class CondNode extends Node {

  private final int mCondID, mIfBlockID, mElseBlockID;

  public CondNode(
          int nodeID,
          final int cond,
          @Nullable final Integer ifBlock,
          @Nullable final Integer elseBlock,
          NodesManager nodesManager) {
    super(nodeID, null, nodesManager);
    mCondID = cond;

    mIfBlockID = ifBlock != null ? ifBlock : -1;
    mElseBlockID = elseBlock != null ? elseBlock : -1;
  }

  @Override
  protected Object evaluate() {
    Object cond = mNodesManager.getNodeValue(mCondID);
    if (cond instanceof Number && ((Number) cond).doubleValue() != 0.0) {
      // This is not a good way to compare doubles but in this case it is what we want
      return mIfBlockID != -1 ? mNodesManager.getNodeValue(mIfBlockID) : ZERO;
    }
    return mElseBlockID != -1 ? mNodesManager.getNodeValue(mElseBlockID) : ZERO;
  }
}
