import { NativeModules } from 'react-native';

const Module =
  typeof global.NativeReanimated !== 'undefined'
    ? global.NativeReanimated
    : NativeModules.ReanimatedModule;

// let count = 0;
// const ReanimatedModule = new Proxy(Module, {
//   get(target, method) {
//     const origMethod = target[method];

//     return function(...args) {
//       try {
//         origMethod.apply(this, args);
//         console.log(++count, method, args);
//       } catch (err) {
//         console.error(`Error calling ${method} with args ${args}`);
//       }
//     };
//   },
// });

export default Module;
