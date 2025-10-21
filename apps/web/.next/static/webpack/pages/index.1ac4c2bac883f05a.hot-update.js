"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "../../packages/common/dist/supabaseClient.js":
/*!****************************************************!*\
  !*** ../../packages/common/dist/supabaseClient.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval(__webpack_require__.ts("/* provided dependency */ var process = __webpack_require__(/*! process */ \"./node_modules/next/dist/build/polyfills/process.js\");\n\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.createSupabaseClient = void 0;\nconst supabase_js_1 = __webpack_require__(/*! @supabase/supabase-js */ \"../../node_modules/@supabase/supabase-js/dist/module/index.js\");\nconst URL = process.env.SUPABASE_URL || \"https://vgzlftijghwltdxrcnfk.supabase.co\";\nconst ANON = process.env.SUPABASE_ANON_KEY || \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnemxmdGlqZ2h3bHRkeHJjbmZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3NjI3NTEsImV4cCI6MjA3NjMzODc1MX0.RFKE2hWUmRfRfzicIw7LD9EZy3YsXfr6eSLubZGQ_UM\";\nconst createSupabaseClient = (opts) => {\n    const url = opts?.url || URL;\n    const anon = opts?.anonKey || ANON;\n    if (!url || !anon)\n        throw new Error('SUPABASE env vars missing');\n    return (0, supabase_js_1.createClient)(url, anon, { auth: { persistSession: true } });\n};\nexports.createSupabaseClient = createSupabaseClient;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi4vLi4vcGFja2FnZXMvY29tbW9uL2Rpc3Qvc3VwYWJhc2VDbGllbnQuanMiLCJtYXBwaW5ncyI6IjtBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELDRCQUE0QjtBQUM1QixzQkFBc0IsbUJBQU8sQ0FBQyw0RkFBdUI7QUFDckQsWUFBWSxPQUFPLHFCQUFxQiwwQ0FBb0M7QUFDNUUsYUFBYSxPQUFPLDBCQUEwQixrTkFBeUM7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxRQUFRLHdCQUF3QjtBQUN4RjtBQUNBLDRCQUE0QiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi4vLi4vcGFja2FnZXMvY29tbW9uL2Rpc3Qvc3VwYWJhc2VDbGllbnQuanM/ODAzMSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3JlYXRlU3VwYWJhc2VDbGllbnQgPSB2b2lkIDA7XG5jb25zdCBzdXBhYmFzZV9qc18xID0gcmVxdWlyZShcIkBzdXBhYmFzZS9zdXBhYmFzZS1qc1wiKTtcbmNvbnN0IFVSTCA9IHByb2Nlc3MuZW52LlNVUEFCQVNFX1VSTCB8fCBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkw7XG5jb25zdCBBTk9OID0gcHJvY2Vzcy5lbnYuU1VQQUJBU0VfQU5PTl9LRVkgfHwgcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVk7XG5jb25zdCBjcmVhdGVTdXBhYmFzZUNsaWVudCA9IChvcHRzKSA9PiB7XG4gICAgY29uc3QgdXJsID0gb3B0cz8udXJsIHx8IFVSTDtcbiAgICBjb25zdCBhbm9uID0gb3B0cz8uYW5vbktleSB8fCBBTk9OO1xuICAgIGlmICghdXJsIHx8ICFhbm9uKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NVUEFCQVNFIGVudiB2YXJzIG1pc3NpbmcnKTtcbiAgICByZXR1cm4gKDAsIHN1cGFiYXNlX2pzXzEuY3JlYXRlQ2xpZW50KSh1cmwsIGFub24sIHsgYXV0aDogeyBwZXJzaXN0U2Vzc2lvbjogdHJ1ZSB9IH0pO1xufTtcbmV4cG9ydHMuY3JlYXRlU3VwYWJhc2VDbGllbnQgPSBjcmVhdGVTdXBhYmFzZUNsaWVudDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///../../packages/common/dist/supabaseClient.js\n"));

/***/ })

});