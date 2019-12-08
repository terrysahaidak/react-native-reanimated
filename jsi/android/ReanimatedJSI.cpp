// put this file to node_modules/react-native/ReactAndroid/src/main/java/com/facebook/react/jscexecutor

#include <jsi/jsi.h>
#include <fb/fbjni.h>
#include <jni.h>
#include "./ReanimatedJSI.h"

void JNICALL Java_com_swmansion_reanimated_ReanimatedModule_installJSI(
  JNIEnv *env,
  jobject thiz,
  jlong runtimePtr
) {
  auto &runtime = *(facebook::jsi::Runtime *)runtimePtr;

  auto clazz = env->FindClass("com/swmansion/reanimated/ReanimatedModule");
  auto connectNodes = env->GetMethodID(clazz, "connectNodes", "(II)V");

  auto moduleObject = env->NewGlobalRef(thiz);
  // auto connectNodes = env->GetMethodID(clazz, "disconnectNodes", "(II)V");

  auto module = std::make_shared<ReanimatedJSI>(
    // clazz,
    moduleObject,
    connectNodes
    // disconnectNodes
  );

  ReanimatedJSI::install(runtime, module);
}

using namespace facebook;
using namespace facebook::jni;
// using namespace facebook::react;

ReanimatedJSI::ReanimatedJSI(
  // jclass moduleClass,
  jobject moduleObject,
  jmethodID connectNodes
  // jmethodID disconnectNodes
): 
  // _moduleClass(moduleClass),
  _moduleObject(moduleObject),
  _connectNodes(connectNodes)
  // _disconnectNodes(disconnectNodes)
{}

void ReanimatedJSI::install(
  jsi::Runtime &runtime,
  const std::shared_ptr<ReanimatedJSI> module
) {
  auto name = "NativeReanimated";
  auto object = jsi::Object::createFromHostObject(runtime, module);

  runtime.global().setProperty(runtime, name, std::move(object));
}

jsi::Value ReanimatedJSI::get(
  jsi::Runtime &runtime,
  const jsi::PropNameID &name
) {
  auto methodName = name.utf8(runtime);

  if (methodName == "connectNodes") {
    auto &method = _connectNodes;
    auto &moduleObject = _moduleObject;

    auto callback = [moduleObject, method](
      jsi::Runtime &runtime,
      const jsi::Value &thisValue,
      const jsi::Value *arguments,
      size_t count
    ) -> jsi::Value {
      auto env = Environment::current();

      auto nodeId = (jint)arguments[0].asNumber();
      auto parentId = (jint)arguments[1].asNumber();

      env->CallVoidMethod(moduleObject, method, nodeId, parentId);

      return jsi::Value::undefined();
    };

    return jsi::Function::createFromHostFunction(runtime, name, 2, callback);
  }

  // if (methodName == "disconnectNodes") {
  //   auto &method = _disconnectNodes;
  //   auto &moduleObject = _moduleObject;

  //   auto callback = [moduleObject, method](
  //     jsi::Runtime &runtime,
  //     const jsi::Value &thisValue,
  //     const jsi::Value *arguments,
  //     size_t count
  //   ) -> jsi::Value {
  //     auto env = Environment::current();

  //     env->CallVoidMethod(moduleObject, method, (jint)arguments[0].asNumber(), (jint)arguments[1].asNumber());

  //     return jsi::Value::undefined();
  //   };

  //   return jsi::Function::createFromHostFunction(runtime, name, 2, callback);
  // }

  return jsi::Value::undefined();
}
