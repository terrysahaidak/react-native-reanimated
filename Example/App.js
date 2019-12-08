// // import { createBrowserApp } from '@react-navigation/web';
// import React from 'react';
// import {
//   FlatList,
//   Platform,
//   StyleSheet,
//   Text,
//   View,
//   YellowBox,
// } from 'react-native';
// // import { RectButton, ScrollView } from 'react-native-gesture-handler';
// // import { createAppContainer } from 'react-navigation';
// // import { createStackNavigator } from 'react-navigation-stack';

// // import ChatHeads from './chatHeads';
// // import Code from './code';
// // import Colors from './colors';
// // import DifferentSpringConfigs from './differentSpringConfigs';
// // import ImageViewer from './imageViewer';
// // import Imperative from './imperative';
// // import InteractablePlayground, {
// //   SCREENS as INTERACTABLE_SCREENS,
// // } from './interactablePlayground';
// // import PanRotateAndZoom from './PanRotateAndZoom';
// // import ProgressBar from './progressBar';
// // import Rotations from './rotations';
// // import Snappable from './snappable';
// import Interpolate from './src/interpolate';
// // import StartAPI from './startAPI';
// // import Test from './test';
// // import TransitionsProgress from './transitions/progress';
// // import TransitionsSequence from './transitions/sequence';
// // import TransitionsShuffle from './transitions/shuffle';
// // import TransitionsTicket from './transitions/ticket';
// // import WidthAndHeight from './widthAndHeight';

// // YellowBox.ignoreWarnings([
// //   'Warning: isMounted(...) is deprecated',
// //   'Module RCTImageLoader',
// // ]);
// // // refers to bug in React Navigation which should be fixed soon
// // // https://github.com/react-navigation/react-navigation/issues/3956

// // const SCREENS = {
// //   // Snappable: { screen: Snappable, title: 'Snappable' },
// //   // Test: { screen: Test, title: 'Test' },
// //   // ImageViewer: { screen: ImageViewer, title: 'Image Viewer' },
// //   // Interactable: { screen: InteractablePlayground, title: 'Interactable' },
// //   // Interpolate: { screen: Interpolate, title: 'Interpolate' },
// //   // Colors: { screen: Colors, title: 'Colors' },
// //   // StartAPI: { screen: StartAPI, title: 'Start API' },
// //   // chatHeads: { screen: ChatHeads, title: 'Chat heads (iOS only)' },
// //   // code: { screen: Code, title: 'Animated.Code component' },
// //   width: { screen: WidthAndHeight, title: 'width & height & more' },
// //   // rotations: { screen: Rotations, title: 'rotations (concat node)' },
// //   // imperative: {
// //   //   screen: Imperative,
// //   //   title: 'imperative (set value / toggle visibility)',
// //   // },
// //   // panRotateAndZoom: {
// //   //   screen: PanRotateAndZoom,
// //   //   title: 'Pan, rotate and zoom (via native event function)',
// //   // },
// //   // progressBar: {
// //   //   screen: ProgressBar,
// //   //   title: 'Progress bar',
// //   // },
// //   // differentSpringConfigs: {
// //   //   screen: DifferentSpringConfigs,
// //   //   title: 'Different Spring Configs',
// //   // },
// //   // transitionsSequence: {
// //   //   screen: TransitionsSequence,
// //   //   title: 'Transitions sequence',
// //   // },
// //   // transitionsShuffle: {
// //   //   screen: TransitionsShuffle,
// //   //   title: 'Transitions shuffle',
// //   // },
// //   // transitionsProgress: {
// //   //   screen: TransitionsProgress,
// //   //   title: 'Transitions progress bar',
// //   // },
// //   // transitionsTicket: {
// //   //   screen: TransitionsTicket,
// //   //   title: 'Transitions – flight ticket demo',
// //   // },
// // };

// // class MainScreen extends React.Component {
// //   static navigationOptions = {
// //     title: '🎬 Reanimated Examples',
// //   };
// //   render() {
// //     const data = Object.keys(SCREENS).map(key => ({ key }));
// //     return (
// //       <FlatList
// //         style={styles.list}
// //         data={data}
// //         ItemSeparatorComponent={ItemSeparator}
// //         renderItem={props => (
// //           <MainScreenItem
// //             {...props}
// //             onPressItem={({ key }) => this.props.navigation.navigate(key)}
// //           />
// //         )}
// //         renderScrollComponent={props => <ScrollView {...props} />}
// //       />
// //     );
// //   }
// // }

// // const ItemSeparator = () => <View style={styles.separator} />;

// // class MainScreenItem extends React.Component {
// //   _onPress = () => this.props.onPressItem(this.props.item);
// //   render() {
// //     const { key } = this.props.item;
// //     return (
// //       <RectButton style={styles.button} onPress={this._onPress}>
// //         <Text style={styles.buttonText}>{SCREENS[key].title || key}</Text>
// //       </RectButton>
// //     );
// //   }
// // }

// // const ExampleApp = createStackNavigator(
// //   {
// //     Main: { screen: MainScreen },
// //     ...SCREENS,
// //     ...INTERACTABLE_SCREENS,
// //   },
// //   {
// //     initialRouteName: 'Main',
// //     headerMode: 'screen',
// //   }
// // );

// // const styles = StyleSheet.create({
// //   list: {
// //     backgroundColor: '#EFEFF4',
// //   },
// //   separator: {
// //     height: 1,
// //     backgroundColor: '#DBDBE0',
// //   },
// //   buttonText: {
// //     backgroundColor: 'transparent',
// //   },
// //   button: {
// //     flex: 1,
// //     height: 60,
// //     padding: 10,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: '#fff',
// //   },
// // });

// // const createApp = Platform.select({
// //   web: input => createBrowserApp(input, { history: 'hash' }),
// //   default: input => createAppContainer(input),
// // });

// // export default createApp(ExampleApp);

// export default Interpolate;
import React from 'react';
import { View } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';

const {
  Clock,
  Value,
  set,
  cond,
  startClock,
  clockRunning,
  timing,
  debug,
  stopClock,
  block,
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 5000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(
      clockRunning(clock),
      [
        // if the clock is already running we update the toValue, in case a new dest has been passed in
        set(config.toValue, dest),
      ],
      [
        // if the clock isn't running we reset all the animation params and start the clock
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ]
    ),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, stopClock(clock), state.position),
    // we made the block return the updated position
    state.position,
  ]);
}

export default class AnimatedBox extends React.Component {
  // we create a clock node
  clock = new Clock();
  value = new Value();
  // and use runTiming method defined above to create a node that is going to be mapped
  // to the translateX transform.
  // transX = runTiming(this.clock, -120, 120);

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Animated.View
          style={[
            { height: 30, width: 30 },
            { transform: [{ translateX: this.value }] },
          ]}
        />
      </View>
    );
  }
}
