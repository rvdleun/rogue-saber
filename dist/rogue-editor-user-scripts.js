"use strict";
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["rogue-editor-user-scripts"] = factory();
	else
		root["rogue-editor-user-scripts"] = factory();
})(self, function() {
return (self["webpackChunk_name_"] = self["webpackChunk_name_"] || []).push([["rogue-editor-user-scripts"],{},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./Assets/Components/Lightsaber.re.ts"), __webpack_exec__("./Assets/Components/LightsaberBlade.re.ts"), __webpack_exec__("./Assets/Components/VirtualRealityCamera.re.ts"), __webpack_exec__("./Assets/Components/VirtualRealityController.re.ts"));
/******/ return __webpack_exports__;
/******/ }
]);
});
//# sourceMappingURL=rogue-editor-user-scripts.js.map