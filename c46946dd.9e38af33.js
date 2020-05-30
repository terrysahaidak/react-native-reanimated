(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{167:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return u}));var a=n(2),r=n(9),i=(n(0),n(180)),o={id:"withTiming",title:"withTiming",sidebar_label:"withTiming"},c={id:"api/withTiming",title:"withTiming",description:"Starts a time based animation.",source:"@site/docs/api/withTiming.md",permalink:"/react-native-reanimated/docs/api/withTiming",editUrl:"https://github.com/software-mansion/react-native-reanimated/tree/master/docs/docs/api/withTiming.md",sidebar_label:"withTiming",sidebar:"someSidebar",previous:{title:"useAnimatedGestureHandler",permalink:"/react-native-reanimated/docs/api/useAnimatedGestureHandler"},next:{title:"withSpring",permalink:"/react-native-reanimated/docs/api/withSpring"}},l=[{value:"Arguments",id:"arguments",children:[]},{value:"Returns",id:"returns",children:[]},{value:"Example",id:"example",children:[]}],b={rightToc:l};function u(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},b,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Starts a time based animation."),Object(i.b)("h3",{id:"arguments"},"Arguments"),Object(i.b)("h4",{id:"tovalue-number"},Object(i.b)("inlineCode",{parentName:"h4"},"toValue")," ","[number]"),Object(i.b)("p",null,"The target value at which the animation should conclude."),Object(i.b)("h4",{id:"options-object"},Object(i.b)("inlineCode",{parentName:"h4"},"options")," ","[object]"),Object(i.b)("p",null,"Object containing animation configuration.\nAllowed parameters are listed below:"),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Options"),Object(i.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Default"),Object(i.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Description"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"duration"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"300"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"How long the animation should last")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"easing"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"in-out quad easing"),Object(i.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Worklet that drives the easing curve for the animation")))),Object(i.b)("p",null,"For ",Object(i.b)("inlineCode",{parentName:"p"},"easing")," parameter we recommend to use one of the pre-configured worklets defined in ",Object(i.b)("inlineCode",{parentName:"p"},"Easing")," module."),Object(i.b)("h4",{id:"callback-function-optional"},Object(i.b)("inlineCode",{parentName:"h4"},"callback")," ","[function]"," (optional)"),Object(i.b)("p",null,"The provided function will be called when the animation is complete.\nIn case the animation is cancelled, the callback will receive ",Object(i.b)("inlineCode",{parentName:"p"},"false")," as the argument, otherwise it will receive ",Object(i.b)("inlineCode",{parentName:"p"},"true"),"."),Object(i.b)("h3",{id:"returns"},"Returns"),Object(i.b)("p",null,"This method returns an animation object. It can be either assigned directly to a Shared Value or can be used as a value for a style object returned from ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"useAnimatedStyle"}),Object(i.b)("inlineCode",{parentName:"a"},"useAnimatedStyle")),"."),Object(i.b)("h2",{id:"example"},"Example"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),"\nimport { Button } from 'react-native';\nimport {\n  useSharedValue,\n  useAnimatedStyle,\n  withTiming,\n  Easing,\n} from 'react-native-reanimated';\n\nfunction App() {\n  const width = useSharedValue(50);\n\n  const style = useAnimatedStyle(() => {\n    return {\n      width: withTiming(width.value, {\n        duration: 500,\n        easing: Easing.bezier(0.25, 0.1, 0.25, 1),\n      }),\n    };\n  });\n\n  return (\n    <View>\n      <Animated.View style={[styles.box, style]} />\n      <Button onPress={() => (width.value = Math.random() * 300)} title=\"Hey\" />\n    </View>\n  );\n}\n\n")))}u.isMDXComponent=!0},180:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return s}));var a=n(0),r=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var b=r.a.createContext({}),u=function(e){var t=r.a.useContext(b),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=u(e.components);return r.a.createElement(b.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,b=l(e,["components","mdxType","originalType","parentName"]),p=u(n),d=a,s=p["".concat(o,".").concat(d)]||p[d]||m[d]||i;return n?r.a.createElement(s,c(c({ref:t},b),{},{components:n})):r.a.createElement(s,c({ref:t},b))}));function s(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var b=2;b<i;b++)o[b]=n[b];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);