package com.swmansion.reanimated.nodes;

import com.facebook.react.bridge.ReadableMap;
import com.swmansion.reanimated.NodesManager;

public abstract class ClockOpNode extends Node {

  public static class ClockStartNode extends ClockOpNode {
    public ClockStartNode(int nodeID, int clock, NodesManager nodesManager) {
      super(nodeID, clock, nodesManager);
    }

    @Override
    protected Double eval(ClockNode clock) {
      clock.start();
      return ZERO;
    }
  }

  public static class ClockStopNode extends ClockOpNode {
    public ClockStopNode(int nodeID, int clock, NodesManager nodesManager) {
      super(nodeID, clock, nodesManager);
    }

    @Override
    protected Double eval(ClockNode clock) {
      clock.stop();
      return ZERO;
    }
  }

  public static class ClockTestNode extends ClockOpNode {
    public ClockTestNode(int nodeID, int clock, NodesManager nodesManager) {
      super(nodeID, clock, nodesManager);
    }

    @Override
    protected Double eval(ClockNode clock) {
      return clock.isRunning ? 1. : 0.;
    }
  }

  private int clockID;

  public ClockOpNode(int nodeID, int clock, NodesManager nodesManager) {
    super(nodeID, null, nodesManager);
    clockID = clock;
  }

  @Override
  protected Double evaluate() {
    ClockNode clock = mNodesManager.findNodeById(clockID, ClockNode.class);
    return eval(clock);
  }

  protected abstract Double eval(ClockNode clock);
}
