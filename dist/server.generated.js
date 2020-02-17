module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./server/TutGenerator.js":
/*!********************************!*\
  !*** ./server/TutGenerator.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const path = __webpack_require__(/*! path */ \"path\");\n\nconst XLSX = __webpack_require__(/*! xlsx */ \"xlsx\"); // import pd from 'pretty-data';\n\n\nconst pd = __webpack_require__(/*! pretty-data */ \"pretty-data\").pd;\n\nfunction MyTutFunction(xlsxJSON) {\n  var options = {\n    indentation: '  ',\n    stripComments: true,\n    collapseContent: true\n  };\n  var questionObj = {};\n  var arrayOfTemplateIdsCols = [];\n  var feedbacks = 0;\n  questionObj['paramsArr'] = [];\n  var tutXml = '';\n  var tutRef = '';\n  var param = '';\n  var refParam = '';\n  var tutID = '';\n  questionObj['prob_tmp_name'] = 'zzzzzz';\n\n  for (let arrEle of xlsxJSON) {\n    // var m = 0;\n    try {\n      if (typeof arrEle.A !== \"number\") {\n        if (arrEle.A.includes('Error Table')) {\n          // console.log(\"HI\");\n          var qType = arrEle.C.toUpperCase(); // var tGroup = arrEle.B;\n\n          if (\"D\" in arrEle && typeof arrEle.D == \"string\") {\n            var forFib1 = arrEle.D;\n\n            if (typeof arrEle.D !== \"number\") {\n              var forFib2 = forFib1.replace(/\\s/g, '');\n              var refFib = forFib2.split(',');\n            }\n          }\n\n          if (\"D\" in arrEle && typeof arrEle.D == \"number\") {\n            refFib = arrEle.D;\n          }\n        }\n\n        if (arrEle.A.includes('Tutelage ID')) {\n          tutXml = `<tutelage_tmpl name=\"${arrEle.B}\">`;\n          tutRef = `<tutelage_ref name=\"${arrEle.B}\">`; // console.log(tutXml);\n\n          tutID = arrEle.B;\n        }\n\n        if (arrEle.A.includes('Tutelage Variables') && \"B\" in arrEle) {\n          // console.log(arrEle.A)\n          var varSpace = arrEle.B;\n          var varSpace1 = varSpace.replace(/\\s/g, '');\n          var tutVar = varSpace1.split(',');\n          param = `<params>`;\n\n          for (let x of tutVar) {\n            param += `<param name=\"${x}\" type=\"int\"/>`;\n            refParam += `<bind name=\"${x}\" val=\"${x}\"/>`;\n          }\n\n          param += `</params>`;\n        } // refParam += `</tutelage_ref>`;\n\n      }\n    } // }\n    catch (err) {\n      console.log(err);\n    }\n  } // tutXml += `</tutelage_tmpl>`\n  // var final = pd.xml(tutXml);\n  // console.log(final);\n\n\n  return `${tutXml}${param}${feedBack(xlsxJSON, refFib, qType, tutID)}</tutelage_tmpl>`; // return `${tutXml}${param}${feedBack(xlsxJSON, refFib, qType, tutID)}</tutelage_tmpl>${tutRef}${refParam}</tutelage_ref>`;\n  // var final = `${tutXml}${param}${feedBack(xlsxJSON, refFib, qType)}</tutelage_tmpl>${tutRef}${refParam}</tutelage_ref> `;\n  // return pd.xml(final);\n}\n\nfunction feedBack(arrJSON, ref, qType, tutID) {\n  var ret = '';\n\n  for (let arr of arrJSON) {\n    if (qType == \"FIB\" && \"E\" in arr) {\n      // var ret = await fibTutelageTemplate(arr, refFib);\n      ret += `${fibTutelageTemplate(arr, ref)}`; // console.log(pd.xml(ret));\n      // tutXml += ret;\n      // tutXml = `${tutXml}${ret}`;\n    }\n\n    if (qType == 'MCQ' && \"E\" in arr) {\n      ret += `${mcqTutelageTemplate(arr)}`;\n    }\n\n    if (qType == 'MANS' && \"E\" in arr) {\n      ret += `${mansTutelageTemplate(arr)}`;\n    }\n\n    if (qType == 'FIB/MCQ' && \"E\" in arr && tutID.includes('M', 0)) {\n      console.log('Valid');\n      ret += `${mcqTutelageTemplate(arr)}`;\n    }\n\n    if (qType == 'FIB/MCQ' && \"E\" in arr && !tutID.includes('M', 0)) {\n      ret += `${fibTutelageTemplate(arr, ref)}`;\n    }\n\n    if (qType == 'SLOT' && \"E\" in arr) {\n      ret += `${slotTutelageTemplate(arr)}`;\n    }\n\n    if (qType == 'NBL' && \"E\" in arr) {\n      ret += `${nblTutelageTemplate(arr)}`;\n    }\n\n    if (qType == 'ARR' && \"E\" in arr) {\n      ret += `${arrTutelageTemplate(arr)}`;\n    }\n\n    if (qType == 'AWS' && \"E\" in arr) {\n      ret += `${awsTutelageTemplate(arr)}`;\n    }\n\n    if (qType == 'BOX' && \"E\" in arr) {\n      ret += `${boxTutelageTemplate(arr)}`;\n    }\n\n    if (qType == 'TAPE' && \"E\" in arr) {\n      ret += `${tapeTutelageTemplate(arr)}`;\n    }\n\n    if (qType == 'BS' && \"E\" in arr) {\n      ret += `${bsTutelageTemplate(arr)}`;\n    }\n\n    if (qType == 'BG' && \"E\" in arr) {\n      ret += `${bgTutelageTemplate(arr)}`;\n    }\n\n    if (qType == 'LP' && \"E\" in arr) {\n      ret += `${lpTutelageTemplate(arr)}`;\n    }\n  }\n\n  return ret;\n}\n\nfunction fibTutelageTemplate(arrEle, refFib) {\n  var xml = '';\n\n  if (arrEle.B !== \"NA\") {\n    xml += `<feedback name=\"${arrEle.B}\"><trigger>`;\n\n    if (arrEle.A === \"Other\" || arrEle.B === \"_UNCOMMON\") {\n      xml = xml.replace(\"<trigger>\", \"\");\n      return `${xml}</feedback>`;\n    } else if (typeof arrEle.A === \"number\") {\n      xml += `<cond><fib_ref name=\"fib${refFib}\"/>==${arrEle.A}</cond>`;\n      return `${xml}</trigger></feedback>`;\n    } else if (typeof refFib === \"number\" && !arrEle.A.includes(\",\") && !arrEle.A.includes(\"FIB\")) {\n      xml += `<cond><fib_ref name=\"fib${refFib}\"/>==${arrEle.A}</cond>`;\n      return `${xml}</trigger></feedback>`;\n    } else if (!arrEle.A.includes(\",\") && arrEle.A.includes(\"FIB\")) {\n      arrEle.A = arrEle.A.replace(/\\s/g, '');\n      arrEle.A = arrEle.A.replace(/(<FIB_)(\\d)(>)/g, `<fib_ref name=\"fib` + \"$2\" + `\"/>`);\n      xml += `<cond>${arrEle.A}</cond>`;\n      return `${xml}</trigger></feedback>`;\n    } else if (arrEle.A.includes(\",\")) {\n      let fibVal = arrEle.A.replace(/\\s/g, '');\n      let fibEle = fibVal.split(','); // console.log(fibEle);\n\n      if (typeof refFib == \"number\") {\n        if (!fibEle[0].search(\"fib\")) {\n          xml += `<cond><fib_ref name=\"fib${refFib}\"/>==${fibEle[0]}</cond>`;\n        } else {\n          fibEle[0] = fibEle[0].replace(/\\s/g, '');\n          fibEle[0] = fibEle[0].replace(/(<FIB_)(\\d)(>)/g, `<fib_ref name=\"fib` + \"$2\" + `\"/>`);\n          xml += `<cond>${fibEle[0]}</cond>`;\n        }\n\n        for (var i = 1; i < fibEle.length; i++) {\n          fibEle[i] = fibEle[i].replace(/\\s/g, '');\n          fibEle[i] = fibEle[i].replace(/(<FIB_)(\\d)(>)/g, `<fib_ref name=\"fib` + \"$2\" + `\"/>`);\n          xml += `<cond>${fibEle[i]}</cond>`;\n        }\n      } else {\n        for (let i = 0; i < fibEle.length; i++) {\n          if (i < refFib.length && !fibEle[i].includes(\"FIB\")) {\n            if (!fibEle[i].includes(\"Other\")) {\n              xml += `<cond><fib_ref name=\"fib${refFib[i]}\"/>==${fibEle[i]}</cond>`;\n            } else if (fibEle[i].includes(\"Other\")) {\n              var matches = fibEle[i].match(/\\[(.*?)\\]/);\n\n              if (matches != null) {\n                xml += `<cond><fib_ref name=\"fib${refFib[i]}\"/>!=${matches[1]}</cond>`;\n              }\n            }\n          } else {\n            fibEle[i] = fibEle[i].replace(/\\s/g, '');\n            fibEle[i] = fibEle[i].replace(/(<FIB_)(\\d)(>)/g, `<fib_ref name=\"fib` + \"$2\" + `\"/>`);\n            xml += `<cond>${fibEle[i]}</cond>`;\n          }\n        }\n      }\n\n      return `${xml}</trigger></feedback>`;\n    }\n  } else {\n    return '';\n  }\n} //\n\n\nfunction mcqTutelageTemplate(arrEle) {\n  var xml = '';\n\n  if (arrEle.B !== \"NA\") {\n    xml += `<feedback name = \"${arrEle.B}\"><trigger><cond><choice_ref name =\"${arrEle.A}\"/>==1</cond>`; // console.log(\"Function\", xml);\n\n    return `${xml}</trigger></feedback>`;\n  } else {\n    return '';\n  } // xml += `</trigger></feedback>`;\n\n}\n\nfunction mansTutelageTemplate(arrEle) {\n  var xml = '';\n\n  if (arrEle.B !== \"NA\") {\n    if (arrEle.A === \"Other\" || arrEle.B === \"_UNCOMMON\") {\n      xml = `<feedback name=\"${arrEle.B}\">`;\n      return `${xml}</feedback>`;\n    } else {\n      let mansVal = arrEle.A.replace(/\\s/g, '');\n      let mansEle = mansVal.split(',');\n      xml += `<feedback name = \"${arrEle.B}\"><trigger>`;\n\n      for (let i = 0; i < mansEle.length; i++) {\n        xml += `<cond><choice_ref name =\"C${i + 1}\"/>==${mansEle[i]}</cond>`;\n      } // console.log(\"Function\", xml);\n\n\n      return `${xml}</trigger></feedback>`;\n    }\n  } else {\n    return '';\n  } // xml += `</trigger></feedback>`;\n\n}\n\nfunction slotTutelageTemplate(arrEle) {\n  var xml = '';\n\n  if (arrEle.B !== \"NA\") {\n    if (arrEle.A === \"Other\" || arrEle.B === \"_UNCOMMON\") {\n      xml = `<feedback name=\"${arrEle.B}\">`;\n      return `${xml}</feedback>`;\n    } else {\n      var slotVar = arrEle.A.split('≠'); // var slotVar1 = slotVar[1].split(',');\n      // var slotVarR = '';\n      // if(typeof slotVar1 == \"object\") {\n      //\n      //   for (let slotEle in slotVar1) {\n      //     slotVarR +=\n      //   }\n      // }\n      // for (let slotEle in slotVarR) {\n      //   slotVarR +=\n      // }\n\n      xml += `<feedback name = \"${arrEle.B}\"><trigger><cond>!<slot_ref name=\"${slotVar[0].replace(/\\s/g, '')}\"/>.contains(\"${slotVar[1].replace(/\\s/g, '')}\")</cond>`; // console.log(\"Function\", xml);\n\n      return `${xml}</trigger></feedback>`;\n    }\n  } else {\n    return '';\n  } // xml += `</trigger></feedback>`;\n\n}\n\nfunction bsTutelageTemplate(arrEle) {\n  var xml = '';\n\n  if (arrEle.B !== \"NA\" && arrEle.A !== \"Other\") {\n    // var slotVar = arrEle.A.split('≠');\n    // <boxing_shading_ref name=\"shading1\"/>==4\n    xml += `<feedback name = \"${arrEle.B}\"><trigger><cond><boxing_shading_ref name=\"shading1\"/>==${arrEle.A}</cond>`; // console.log(\"Function\", xml);\n\n    return `${xml}</trigger></feedback>`;\n  } else if (arrEle.A == \"Other\") {\n    xml += `<feedback name = \"${arrEle.B}\">`;\n    console.log(\"Function\", xml);\n    return `${xml}</feedback>`;\n  } else {\n    return '';\n  } // xml += `</trigger></feedback>`;\n\n}\n\nfunction nblTutelageTemplate(arrEle) {\n  var xml = '';\n\n  if (arrEle.B !== \"NA\" && arrEle.A !== \"Other\") {\n    xml += `<feedback name = \"${arrEle.B}\"><trigger><cond><number_line_ref name=\"nbl1\"/>.containsExactly(\"${arrEle.A}\")</cond>`;\n    console.log(\"Function\", arrEle.A);\n    return `${xml}</trigger></feedback>`;\n  } else if (arrEle.A == \"Other\") {\n    xml += `<feedback name = \"${arrEle.B}\">`;\n    console.log(\"Function\", xml);\n    return `${xml}</feedback>`;\n  } else {\n    return '';\n  } // xml += `</trigger></feedback>`;\n\n}\n\nfunction boxTutelageTemplate(arrEle) {\n  var xml = '';\n  var xml = '';\n\n  if (\"E\" in arrEle) {\n    if (arrEle.B !== \"NA\" && arrEle.A !== \"Other\") {\n      var y1 = arrEle.A.replace(/\\s/g, '');\n      var z = y1.split(/[,;=]/);\n      console.log(z);\n\n      if (z[0].includes(\"group\")) {\n        xml += `<feedback name=\"${arrEle.B}\"><trigger><cond><boxing_ref name=\"Boxing1\" field=\"group\"/>== ${z[1]}</cond><cond><boxing_ref name=\"Boxing1\" field=\"size\"/>== ${z[3]}</cond></trigger></feedback>`;\n        console.log(xml);\n      } else if (z[2].includes(\"group\")) {\n        xml += `<feedback name=\"${arrEle.B}\"><trigger><cond><boxing_ref name=\"Boxing1\" field=\"group\"/>== ${z[3]}</cond><cond><boxing_ref name=\"Boxing1\" field=\"size\"/>== ${z[1]}</cond></trigger></feedback>`;\n        console.log(xml);\n      }\n    }\n\n    if (arrEle.B !== \"NA\" && arrEle.A == \"Other\") {\n      xml += `<feedback name=\"${arrEle.B}\"></feedback>`;\n      console.log(xml);\n    }\n  }\n\n  return xml;\n}\n\nfunction arrTutelageTemplate(arrEle) {\n  var xml = '';\n\n  if (\"E\" in arrEle) {\n    if (arrEle.B !== \"NA\" && arrEle.A !== \"Other\") {\n      var y1 = arrEle.A.replace(/\\s/g, '');\n      var z = y1.split(/[,;=]/);\n      console.log(z);\n\n      if (z[0].includes(\"row\")) {\n        xml += `<feedback name=\"${arrEle.B}\"><trigger><cond><array_ref name=\"Array1\" field=\"row\"/>== ${z[1]}</cond><cond><array_ref name=\"Array1\" field=\"column\"/>== ${z[3]}</cond></trigger></feedback>`;\n        console.log(xml);\n      } else if (z[2].includes(\"row\")) {\n        xml += `<feedback name=\"${arrEle.B}\"><trigger><cond><array_ref name=\"Array1\" field=\"row\"/>== ${z[3]}</cond><cond><array_ref name=\"Array1\" field=\"column\"/>== ${z[1]}</cond></trigger></feedback>`;\n        console.log(xml);\n      }\n    }\n\n    if (arrEle.B !== \"NA\" && arrEle.A == \"Other\") {\n      xml += `<feedback name=\"${arrEle.B}\"></feedback>`;\n      console.log(xml);\n    }\n  }\n\n  return xml;\n}\n\nfunction awsTutelageTemplate(arrEle) {\n  var xml = '';\n\n  if (\"E\" in arrEle) {\n    if (arrEle.B !== \"NA\" && arrEle.A !== \"Other\") {\n      var y1 = arrEle.A.replace(/\\s/g, '');\n      var z = y1.split(/[,;=]/);\n      console.log(z);\n\n      if (z[0].includes(\"row\")) {\n        xml += `<feedback name=\"${arrEle.B}\"><trigger><cond><boxing_array_ref name=\"BoxArr1\"/>.row== ${z[1]}</cond><cond><boxing_array_ref name=\"BoxArr1\"/>.column== ${z[3]}</cond></trigger></feedback>`;\n        console.log(xml);\n      } else if (z[2].includes(\"row\")) {\n        xml += `<feedback name=\"${arrEle.B}\"><trigger><cond><boxing_array_ref name=\"BoxArr1\"/>.row== ${z[3]}</cond><cond><boxing_array_ref name=\"BoxArr1\"/>.column== ${z[1]}</cond></trigger></feedback>`;\n        console.log(xml);\n      }\n    }\n\n    if (arrEle.B !== \"NA\" && arrEle.A == \"Other\") {\n      xml += `<feedback name=\"${arrEle.B}\"></feedback>`;\n      console.log(xml);\n    }\n  }\n\n  return xml;\n}\n\nfunction tapeTutelageTemplate(arrEle) {\n  var xml = ''; // var xml = '';\n\n  if (\"E\" in arrEle) {\n    if (arrEle.B !== \"NA\" && arrEle.A !== \"Other\") {\n      var y1 = arrEle.A.replace(/\\s/g, '');\n      var z = y1.split(/[,;=]/);\n      console.log(z);\n      let a = `\"${z[3]}\"`,\n          k = [],\n          b = parseInt(z[1]);\n\n      while (b > 0) {\n        k.push(a);\n        --b;\n      }\n\n      xml += `<feedback name=\"${arrEle.B}\"><trigger><cond><tape_ref name=\"tape1\"/>.inOrder(${k.toString()})</cond></trigger></feedback>`;\n    }\n\n    if (arrEle.B !== \"NA\" && arrEle.A == \"Other\") {\n      xml += `<feedback name=\"${arrEle.B}\"></feedback>`;\n      console.log(xml);\n    }\n  }\n\n  return xml;\n}\n\nfunction bgTutelageTemplate(arrEle) {\n  var xml = '';\n\n  if (\"E\" in arrEle) {\n    if (arrEle.B !== \"NA\" && arrEle.A !== \"Other\") {\n      xml = `<feedback name=\"${arrEle.B}\"><trigger>`;\n      var y1 = arrEle.A.replace(/\\s/g, '');\n      var z = y1.split(\"||\");\n      xml += `<cond>`;\n\n      for (let i = 0; i < z.length; i++) {\n        var be = z[i].split(\"≠\");\n        console.log(be);\n        xml += `(<bar_ref name=\"bar1\"/>.columnHeightAtXIndex(${be[0]})!=${be[1]})`;\n\n        if (i !== z.length - 1) {\n          xml += ` || `;\n        }\n      }\n\n      console.log(xml);\n      xml += `</cond></trigger></feedback>`;\n    }\n\n    if (arrEle.A.includes(\"Other\")) {\n      xml += `<feedback name=\"${arrEle.B}\"></feedback>`;\n      console.log(xml);\n    }\n  }\n\n  return xml;\n}\n\nfunction lpTutelageTemplate(arrEle) {\n  var xml = '';\n\n  if (\"E\" in arrEle) {\n    if (arrEle.B !== \"NA\" && arrEle.A !== \"Other\") {\n      xml = `<feedback name=\"${arrEle.B}\"><trigger>`;\n      var y1 = arrEle.A.replace(/\\s/g, '');\n      var z = y1.split(\"||\");\n      xml += `<cond>`;\n\n      for (let i = 0; i < z.length; i++) {\n        var be = z[i].split(\"≠\");\n        console.log(be);\n        xml += `(<line_plot_ref name=\"lp1\"/>.columnCountAtXIndex(${be[0]})!=${be[1]})`;\n\n        if (i !== z.length - 1) {\n          xml += ` || `;\n        }\n      }\n\n      console.log(xml);\n      xml += `</cond></trigger></feedback>`;\n    }\n\n    if (arrEle.A.includes(\"Other\")) {\n      xml += `<feedback name=\"${arrEle.B}\"></feedback>`;\n      console.log(xml);\n    }\n  }\n\n  return xml;\n}\n\nmodule.exports = MyTutFunction;\n\n//# sourceURL=webpack:///./server/TutGenerator.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! body-parser */ \"body-parser\");\n/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! formidable */ \"formidable\");\n/* harmony import */ var formidable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(formidable__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! xlsx */ \"xlsx\");\n/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(xlsx__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n // import pd from 'pretty-data';\n\nconst pd = __webpack_require__(/*! pretty-data */ \"pretty-data\").pd;\n\nconst MyTutFunction = __webpack_require__(/*! ./TutGenerator.js */ \"./server/TutGenerator.js\");\n\nconst app = express__WEBPACK_IMPORTED_MODULE_0___default()();\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.urlencoded({\n  extended: false\n}));\napp.use(body_parser__WEBPACK_IMPORTED_MODULE_2___default.a.json());\nconst CURRENT_WORKING_DIR = process.cwd();\napp.use(express__WEBPACK_IMPORTED_MODULE_0___default.a.static(path__WEBPACK_IMPORTED_MODULE_1___default.a.join(CURRENT_WORKING_DIR, 'public')));\napp.get('/test', (req, res) => {\n  res.send('My page');\n});\napp.get('/test1', (req, res) => {\n  res.send('My page 2');\n});\napp.get('/getfile', (req, res) => {\n  console.log(req.query);\n  res.send('My page 2');\n});\napp.post('/getfile', (req, res) => {\n  new formidable__WEBPACK_IMPORTED_MODULE_3___default.a.IncomingForm().parse(req).on('file', function (name, file) {\n    let workbook = xlsx__WEBPACK_IMPORTED_MODULE_4___default.a.readFile(`${file.path}`);\n    let xlsxJSON = '';\n    let tuteXml = ''; // console.log(workbook)\n\n    let sheet_name_list = workbook.SheetNames;\n\n    for (let x of sheet_name_list) {\n      xlsxJSON = xlsx__WEBPACK_IMPORTED_MODULE_4___default.a.utils.sheet_to_json(workbook.Sheets[x], {\n        defVal: \"\"\n      });\n      console.log(xlsxJSON);\n      let xml = MyTutFunction(xlsxJSON);\n      console.log(pd.xml(xml));\n      tuteXml += MyTutFunction(xlsxJSON);\n    }\n\n    return res.send( // tuteXml\n    pd.xml(tuteXml));\n  });\n});\napp.get('*', (req, res) => {\n  res.send('My web page');\n});\nconst PORT = process.env.PORT || 3000;\napp.listen(PORT);\n\n//# sourceURL=webpack:///./server/server.js?");

/***/ }),

/***/ 0:
/*!***********************************************!*\
  !*** multi babel-polyfill ./server/server.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! babel-polyfill */\"babel-polyfill\");\nmodule.exports = __webpack_require__(/*! D:\\Work\\GIT\\Javascript\\Tutor\\server\\server.js */\"./server/server.js\");\n\n\n//# sourceURL=webpack:///multi_babel-polyfill_./server/server.js?");

/***/ }),

/***/ "babel-polyfill":
/*!*********************************!*\
  !*** external "babel-polyfill" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-polyfill\");\n\n//# sourceURL=webpack:///external_%22babel-polyfill%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "formidable":
/*!*****************************!*\
  !*** external "formidable" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"formidable\");\n\n//# sourceURL=webpack:///external_%22formidable%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "pretty-data":
/*!******************************!*\
  !*** external "pretty-data" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"pretty-data\");\n\n//# sourceURL=webpack:///external_%22pretty-data%22?");

/***/ }),

/***/ "xlsx":
/*!***********************!*\
  !*** external "xlsx" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"xlsx\");\n\n//# sourceURL=webpack:///external_%22xlsx%22?");

/***/ })

/******/ });