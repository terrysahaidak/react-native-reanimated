---
id: useAnimatedScrollHandler
title: useAnimatedScrollHandler
sidebar_label: useAnimatedScrollHandler
---

This is a convinience hook that returns an event handler reference which can be used with React Native's scrollable components.

### Arguments

#### `scrollHandlerOrHandlersObject` [worklet|object with worklets]

This hooks can be used in two ways.
Either by passing a single worklet that corresponds to a scroll handler.
The second way can be used if we are interested in processing other events related to scrolling such as `onBeginDrag` or `onMomentumBegin`.

In the first case, the argument should be a worklet that will be triggered when `onScroll` event is dispatched for the connected Scrollable component.
In such a case the worklet will receive the following parameters:

In the case where we are interested in handling other scroll related events, instead of passing a single worklet we can pass an object containing any of the following keys: `onScroll`, `onBeginDrag`, `onEndDrag`, `onMomentumBegin`, `onMomentumEnd`.
The values in the object should be individual worklets.
Each of the worklet will be triggered when the corresponding event is dispatched on the connected Scrollable component.
Note that momentum events are only dispatched on iOS.

In either case (regardless of whether we pass a single handler worklet, or an object of worklets), each of the event worklets will receive the following parameters when called:
##### `event` [object]
Event object carrying the information about the scroll.
The payload can differ depending on the type of the event (`onScroll`, `onBeginDrag`, etc.).
Please consult [React Native's ScrollView documentation](https://reactnative.dev/docs/scrollview) to learn about scroll event structure.

##### `context` [object]
A plain JS object that can be used to store some state.
This object will persist in between scroll event occurences and you can read and write any data to it.
When there are several event handlers provided in a form of an object of worklets, the `context` object will be shared in between the worklets allowing them to communicate between each other.


### Returns

The hook returns a handler object that can be hooked into a scrollable container.
Note that in order for the handler to be properly triggered, you should use containers that are wrapped with `Animated` (e.g. `Animated.ScrollView` and not just `ScrollView`).
The handler should be passed under `onScroll` parameter regardless of whether it is configured to receive only scroll or also momentum or drag events.

## Example

In the below example we define a scroll handler by passing a single worklet handler.
The worklet handler is triggered for each of the scroll event dispatched to the `Animated.ScrollView` component to which we attach the handler.

```js {11-13,30}

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

function ScrollExample() {
  const translationY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translationY.value = event.contentOffset.y;
  });

  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: transY.value,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, stylez]} />
      <Animated.ScrollView
        style={styles.scroll}
        onScroll={scrollHandler}
        scrollEventThrottle={16}>
        <Content />
      </Animated.ScrollView>
    </View>
  );
}

```

If we are interested in receiving drag or momentum events instead of passing a single worklet object we can pass an object of worklets.
Below for convinience, we only show how the `scrollHandler` should be defined in such a case.
The place where we attach handler to a scrollable component remains unchaned regardless of the event types we want to receive:

```js
const isScrolling = useSharedValue(false);

const scrollHandler = useAnimatedScrollHandler({
  onScroll: event => {
    translationY.value = event.contentOffset.y;
  },
  onBeginDrag: e => {
    isScrolling.value = true;
  },
  onEndDrag: e => {
    isScrolling.value = false;
  },
});
```
