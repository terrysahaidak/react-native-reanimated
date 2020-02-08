import ReanimatedModule from '../ReanimatedModule';

let shouldLog = true;

const UPDATED_NODES = [];

let loopID = 1;
let propUpdatesEnqueued = null;

function sanitizeConfig(config) {
  for (const key in config) {
    const value = config[key];
    if (value instanceof AnimatedNode) {
      config[key] = value.__nodeID;
    }
  }
  return config;
}

function runPropUpdates() {
  const visitedNodes = new Set();
  const findAndUpdateNodes = node => {
    if (!node) {
      console.warn('findAndUpdateNodes was passed a nullish node');
      return;
    }

    if (visitedNodes.has(node)) {
      return;
    } else {
      visitedNodes.add(node);
    }
    if (typeof node.update === 'function') {
      node.update();
    } else {
      const nodes = node.__getChildren();
      if (nodes) {
        for (let i = 0, l = nodes.length; i < l; i++) {
          findAndUpdateNodes(nodes[i]);
        }
      }
    }
  };
  for (let i = 0; i < UPDATED_NODES.length; i++) {
    const node = UPDATED_NODES[i];
    findAndUpdateNodes(node);
  }
  UPDATED_NODES.length = 0; // clear array
  propUpdatesEnqueued = null;
  loopID += 1;
}

let nodeCount = 0;

export default class AnimatedNode {
  constructor(nodeConfig, inputNodes) {
    this.__nodeID = ++nodeCount;
    this.__nodeConfig = sanitizeConfig(nodeConfig);
    this.__initialized = false;
    this.__inputNodes =
      inputNodes && inputNodes.filter(node => node instanceof AnimatedNode);
  }

  __attach() {
    this.__nativeInitialize();

    const nodes = this.__inputNodes;

    if (nodes) {
      for (let i = 0, l = nodes.length; i < l; i++) {
        nodes[i].__addChild(this);
      }
    }
  }

  __detach() {
    const nodes = this.__inputNodes;

    if (nodes) {
      for (let i = 0, l = nodes.length; i < l; i++) {
        nodes[i].__removeChild(this);
      }
    }

    this.__nativeTearDown();
  }

  __lastLoopID = 0;
  __memoizedValue = null;

  __children = [];

  __getValue() {
    if (this.__lastLoopID < loopID) {
      this.__lastLoopID = loopID;
      return (this.__memoizedValue = this.__onEvaluate());
    }
    return this.__memoizedValue;
  }

  __forceUpdateCache(newValue) {
    this.__memoizedValue = newValue;
    this.__markUpdated();
  }

  __dangerouslyRescheduleEvaluate() {
    this.__lastLoopID = 0;
    this.__markUpdated();
  }

  __markUpdated() {
    UPDATED_NODES.push(this);
    if (!propUpdatesEnqueued) {
      propUpdatesEnqueued = setImmediate(runPropUpdates);
    }
  }

  __nativeInitialize() {
    if (!this.__initialized) {
      if (this.__nodeConfig.type === 'op') {
        global.NativeReanimated.createNodeOperator(
          this.__nodeID,
          this.__nodeConfig.op,
          this.__nodeConfig.input
        );
      } else if (this.__nodeConfig.type === 'block') {
        global.NativeReanimated.createBlockNode(
          this.__nodeID,
          this.__nodeConfig.block
        );
      } else if (this.__nodeConfig.type === 'cond') {
        if (typeof this.__nodeConfig.elseBlock !== 'undefined') {
          global.NativeReanimated.createCondNode(
            this.__nodeID,
            this.__nodeConfig.cond,
            this.__nodeConfig.ifBlock,
            this.__nodeConfig.elseBlock
          );
        } else {
          global.NativeReanimated.createCondNodeOptional(
            this.__nodeID,
            this.__nodeConfig.cond,
            this.__nodeConfig.ifBlock
          );
        }
      } else if (this.__nodeConfig.type === 'set') {
        global.NativeReanimated.createSetNode(
          this.__nodeID,
          this.__nodeConfig.what,
          this.__nodeConfig.value
        );
      } else if (this.__nodeConfig.type === 'debug') {
        global.NativeReanimated.createDebugNode(
          this.__nodeID,
          this.__nodeConfig.message,
          this.__nodeConfig.value
        );
      } else if (this.__nodeConfig.type === 'clock') {
        global.NativeReanimated.createClockNode(this.__nodeID);
      } else if (this.__nodeConfig.type === 'clockStart') {
        global.NativeReanimated.createClockStartNode(
          this.__nodeID,
          this.__nodeConfig.clock
        );
      } else if (this.__nodeConfig.type === 'clockStop') {
        global.NativeReanimated.createClockStopNode(
          this.__nodeID,
          this.__nodeConfig.clock
        );
      } else if (this.__nodeConfig.type === 'clockTest') {
        global.NativeReanimated.createClockTestNode(
          this.__nodeID,
          this.__nodeConfig.clock
        );
      } else if (this.__nodeConfig.type === 'call') {
        global.NativeReanimated.createJSCallNode(
          this.__nodeID,
          this.__nodeConfig.input
        );
      } else if (this.__nodeConfig.type === 'bezier') {
        global.NativeReanimated.createBezierNode(
          this.__nodeID,
          this.__nodeConfig.input,
          this.__nodeConfig.mX1,
          this.__nodeConfig.mY1,
          this.__nodeConfig.mX2,
          this.__nodeConfig.mY2
        );
      } else if (this.__nodeConfig.type === 'callfunc') {
        global.NativeReanimated.createNodeCallFunc(
          this.__nodeID,
          this.__nodeConfig.what,
          this.__nodeConfig.args,
          this.__nodeConfig.params
        );
      } else if (this.__nodeConfig.type === 'func') {
        global.NativeReanimated.createNodeFunction(
          this.__nodeID,
          this.__nodeConfig.what
        );
      } else if (this.__nodeConfig.type === 'param') {
        global.NativeReanimated.createNodeParam(this.__nodeID);
      } else if (this.__nodeConfig.type === 'concat') {
        global.NativeReanimated.createNodeConcat(
          this.__nodeID,
          this.__nodeConfig.input
        );
      } else if (this.__nodeConfig.type === 'always') {
        global.NativeReanimated.createNodeConcat(
          this.__nodeID,
          this.__nodeConfig.what
        );
      } else {
        global.NativeReanimated.createNode(this.__nodeID, {
          ...this.__nodeConfig,
        });
      }

      this.__initialized = true;
    }
  }

  __nativeTearDown() {
    if (this.__initialized) {
      global.NativeReanimated.dropNode(this.__nodeID);
      this.__initialized = false;
    }
  }

  isNativelyInitialized() {
    return this.__initialized;
  }

  __onEvaluate() {
    throw new Error('Missing implementation of onEvaluate');
  }

  __getProps() {
    return this.__getValue();
  }

  __getChildren() {
    return this.__children;
  }

  __addChild(child) {
    if (this.__children.length === 0) {
      this.__attach();
    }
    this.__children.push(child);
    child.__nativeInitialize();

    if (global.NativeReanimated.connectNodes) {
      global.NativeReanimated.connectNodes(this.__nodeID, child.__nodeID);
    } else {
      this.__dangerouslyRescheduleEvaluate();
    }
  }

  __removeChild(child) {
    const index = this.__children.indexOf(child);
    if (index === -1) {
      console.warn("Trying to remove a child that doesn't exist");
      return;
    }
    global.NativeReanimated.disconnectNodes(this.__nodeID, child.__nodeID);

    this.__children.splice(index, 1);
    if (this.__children.length === 0) {
      this.__detach();
    }
  }

  _connectAnimatedView(nativeViewTag) {
    if (global.NativeReanimated.connectNodeToView) {
      global.NativeReanimated.connectNodeToView(this.__nodeID, nativeViewTag);
    } else {
      this.__dangerouslyRescheduleEvaluate();
    }
  }

  _disconnectAnimatedView(nativeViewTag) {
    global.NativeReanimated.disconnectNodeFromView(
      this.__nodeID,
      nativeViewTag
    );
  }
}
