(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/ai/mcts.js":
/*!************************!*\
  !*** ./app/ai/mcts.js ***!
  \************************/
/*! exports provided: MonteCarloTreeSearch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MonteCarloTreeSearch", function() { return MonteCarloTreeSearch; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MonteCarloTreeSearch =
/*#__PURE__*/
function () {
  function MonteCarloTreeSearch() {
    _classCallCheck(this, MonteCarloTreeSearch);
  }

  _createClass(MonteCarloTreeSearch, [{
    key: "init",
    value: function init() {
      return {
        scoreForWin: 10
      };
    }
  }, {
    key: "findNextmove",
    value: function findNextmove(board, player) {
      var opponent = 3 - player;
      var tree = new Tree();
      var rootNode = tree.root;
      rootNode.state.board = board;
      rootNode.state.player = opponent;
      var startTime = Date.now();

      while (Date.now() - startTime < 1000) {
        var promisingNode = this.selectPromisingNode(rootNode);

        if (promisingNode.state.board.checkWinner() === false) {
          this.expandNode(promisingNode);
        }

        var nodeToExplore = promisingNode;

        if (promisingNode.childs.length > 0) {
          nodeToExplore = promisingNode.randomChild();
        }

        var playoutResult = this.simulateRandomPlayout(nodeToExplore, opponent);
        this.backPropogation(nodeToExplore, playoutResult);
      }

      var winnerNode = rootNode.childs.reduce(function (acc, cur) {
        return cur.state.visits > acc.state.visits ? cur : acc;
      }); // console.log(rootNode)
      // tree.root = winnerNode

      return winnerNode.state.board;
    }
  }, {
    key: "selectPromisingNode",
    value: function selectPromisingNode(rootNode) {
      var node = rootNode;

      while (node.childs.length !== 0) {
        node = UCT.findBestChild(node);
      }

      return node;
    }
  }, {
    key: "expandNode",
    value: function expandNode(node) {
      var possibleStates = node.state.getPossibleStates();
      possibleStates.forEach(function (state) {
        var newNode = new Node(state, node);
        newNode.state.player = 3 - node.state.player;
        node.childs.push(newNode);
      });
    }
  }, {
    key: "simulateRandomPlayout",
    value: function simulateRandomPlayout(nodeToExplore, opponent) {
      var tempNode = new Node(nodeToExplore.state, nodeToExplore.parent);
      var tempState = tempNode.state;
      var winner = tempState.board.checkWinner(); // if (winner) {
      //   console.log(winner, opponent)
      //   console.log(tempState)
      //   console.log(tempNode)
      // }

      if (winner === opponent) {
        console.log(123, JSON.parse(JSON.stringify(nodeToExplore.state)));
        console.log(123, JSON.parse(JSON.stringify(nodeToExplore.parent.state)));
        console.log(JSON.parse(JSON.stringify(tempNode.state)));
        tempNode.parent.state.score = Number.MIN_SAFE_INTEGER;
        return winner;
      }

      tempNode.parent = null;

      while (winner === false) {
        tempState.togglePlayer();
        tempState.randomMove();
        winner = tempState.board.checkWinner();
      }

      return winner;
    }
  }, {
    key: "backPropogation",
    value: function backPropogation(nodeToExplore, winner) {
      var tempNode = nodeToExplore;

      while (tempNode !== null) {
        tempNode.state.visits++;

        if (tempNode.state.player === winner) {
          tempNode.state.addScore(1);
        }

        tempNode = tempNode.parent;
      }
    }
  }]);

  return MonteCarloTreeSearch;
}();
var UCT = {
  uctValue: function uctValue(totalVisit, nodeWinScore, nodeVisit) {
    if (nodeVisit === 0) {
      return Number.MAX_SAFE_INTEGER;
    }

    return nodeWinScore / nodeVisit + 1.41 * Math.sqrt(Math.log(totalVisit) / nodeVisit);
  },
  findBestChild: function findBestChild(node) {
    var parentVisits = node.state.visits;
    var values = node.childs.map(function (child) {
      return UCT.uctValue(parentVisits, child.state.score, child.state.visits);
    });
    var id = values.reduce(function (iMax, cur, i, arr) {
      return cur > arr[iMax] ? i : iMax;
    }, 0);
    return node.childs[id];
  }
};

var Tree = function Tree(root) {
  _classCallCheck(this, Tree);

  this.root = new Node();
};

var Node =
/*#__PURE__*/
function () {
  function Node() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new State();
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var childs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    _classCallCheck(this, Node);

    if (arguments.length === 1) {
      this.state = new State(state);
      this.parent = parent;
      this.childs = childs;
    } else if (arguments.length === 2) {
      this.state = new State(state);
      this.parent = parent;
      this.childs = childs;
    } else {
      this.state = state;
      this.parent = parent;
      this.childs = childs;
    }
  }

  _createClass(Node, [{
    key: "randomChild",
    value: function randomChild() {
      return this.childs[Math.floor(Math.random() * this.childs.length)];
    }
  }]);

  return Node;
}();

var State =
/*#__PURE__*/
function () {
  function State(state) {
    _classCallCheck(this, State);

    if (arguments.length === 1) {
      this.visits = state.visits;
      this.score = state.score;
      this.board = state.board.makeCopy();
      this.player = state.player;
    } else {
      this.visits = 0;
      this.score = 10;
      this.board = null;
      this.player = null;
    }
  }

  _createClass(State, [{
    key: "togglePlayer",
    value: function togglePlayer() {
      this.player = 3 - this.player;
    }
  }, {
    key: "addScore",
    value: function addScore(score) {
      if (this.score !== Number.MIN_SAFE_INTEGER) {
        this.score += score;
      }
    }
  }, {
    key: "getPossibleStates",
    value: function getPossibleStates() {
      var _this = this;

      var availableMoves = this.board.getAvailableMoves();
      return availableMoves.map(function (move) {
        var newState = new State();
        newState.board = _this.board.makeCopy();
        newState.player = 3 - _this.player;
        newState.board.performMove(move, newState.player);
        return newState;
      });
    }
  }, {
    key: "randomMove",
    value: function randomMove() {
      var availableMoves = this.board.getAvailableMoves();
      var randId = Math.floor(Math.random() * availableMoves.length);
      this.board.performMove(availableMoves[randId], this.player);
    }
  }]);

  return State;
}();

/***/ }),

/***/ "./app/ai/player.js":
/*!**************************!*\
  !*** ./app/ai/player.js ***!
  \**************************/
/*! exports provided: PlayerController0, PlayerController1, PlayerController2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerController0", function() { return PlayerController0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerController1", function() { return PlayerController1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerController2", function() { return PlayerController2; });
/* harmony import */ var _mcts_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mcts.js */ "./app/ai/mcts.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var PlayerController0 =
/*#__PURE__*/
function () {
  function PlayerController0() {
    _classCallCheck(this, PlayerController0);
  }

  _createClass(PlayerController0, [{
    key: "init",
    value: function init() {}
  }, {
    key: "setState",
    value: function setState(state) {// console.log('player')
      // if (condition) {
      //   this.handler({ row: 1, col: 2 })
      // } else {
      // }
    }
  }]);

  return PlayerController0;
}();
var PlayerController1 =
/*#__PURE__*/
function () {
  function PlayerController1() {
    _classCallCheck(this, PlayerController1);
  }

  _createClass(PlayerController1, [{
    key: "init",
    value: function init() {
      this.motecarlo = new _mcts_js__WEBPACK_IMPORTED_MODULE_0__["MonteCarloTreeSearch"]();
    }
  }, {
    key: "setState",
    value: function setState(state) {
      var _this = this;

      // console.log('MCTS', this.player, state.step)
      if (this.player === 1 + state.step % 2) {
        setTimeout(function () {
          return _this.handler(state);
        }, 1);
      }
    }
  }]);

  return PlayerController1;
}();
var PlayerController2 =
/*#__PURE__*/
function () {
  function PlayerController2() {
    _classCallCheck(this, PlayerController2);
  }

  _createClass(PlayerController2, [{
    key: "init",
    value: function init() {}
  }, {
    key: "setState",
    value: function setState(state) {
      console.log('fdsf'); // if (condition) {
      //   this.handler({ row: 1, col: 2 })
      // } else {
      // }
    }
  }]);

  return PlayerController2;
}();

/***/ }),

/***/ "./app/ai/uttt.js":
/*!************************!*\
  !*** ./app/ai/uttt.js ***!
  \************************/
/*! exports provided: UTTTBoard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UTTTBoard", function() { return UTTTBoard; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UTTTBoard =
/*#__PURE__*/
function () {
  function UTTTBoard() {
    _classCallCheck(this, UTTTBoard);
  }

  _createClass(UTTTBoard, [{
    key: "init",
    value: function init() {
      return this.reset();
    }
  }, {
    key: "reset",
    value: function reset() {
      var size = [0, 1, 2];
      return {
        board: size.map(function (row) {
          return {
            id: row,
            cols: size.map(function (col) {
              return {
                id: col,
                board: size.map(function (row) {
                  return {
                    id: row,
                    cols: size.map(function (col) {
                      return {
                        id: col,
                        value: 0
                      };
                    })
                  };
                }),
                value: 0,
                step: 0,
                finished: false,
                available: 1
              };
            })
          };
        }),
        step: 0,
        finished: false
      };
    }
  }, {
    key: "makeMove",
    value: function makeMove(_ref, _ref2) {
      var col = _ref.col,
          row = _ref.row,
          value = _ref.value,
          subrow = _ref.subrow,
          subcol = _ref.subcol;
      var board = _ref2.board,
          step = _ref2.step,
          finished = _ref2.finished;
      var subboard = board[subrow].cols[subcol]; // console.log(subboard)

      if (!value && !finished && subboard.available === 1 && !subboard.value && !subboard.finished) {
        subboard.board[row].cols[col].value = 1 + step % 2;
        subboard.finished = this.checkFinished(subboard.board, step, subboard.step);
        subboard.step = 1 + subboard.step;
        board[subrow].cols[subcol] = subboard;

        if (subboard.finished) {
          subboard.value = subboard.finished % 3;
          subboard.available = false;
          board[subrow].cols[subcol] = subboard;
          finished = this.checkFinished(board, step, -1);
        }

        var avail = 1; // console.log(subrow)
        // console.log(subcol)

        if (board[row].cols[col].available !== false || finished) {
          avail = 0;
        }

        for (var r = 0; r < 3; r++) {
          for (var c = 0; c < 3; c++) {
            if (board[r].cols[c].available !== false) {
              board[r].cols[c].available = avail;
            }
          }
        }

        if (avail === 0 && !finished) {
          board[row].cols[col].available = 1;
        }

        return {
          board: JSON.parse(JSON.stringify(board)),
          step: step + 1,
          finished: finished
        };
      }
    }
  }, {
    key: "performMove",
    value: function performMove(cell, player) {
      var nextBoard = this.makeMove(cell, this);
      this.step = nextBoard.step;
      this.finished = nextBoard.finished;
    }
  }, {
    key: "checkFinished",
    value: function checkFinished(board, ultstep, step) {
      if (step < 2 && step !== -1) {
        return false;
      }

      var player = 1 + ultstep % 2;

      var _loop = function _loop(row) {
        if (board[row].cols.reduce(function (acc, cur) {
          return acc && cur.value === player;
        }, true)) {
          return {
            v: player
          };
        }

        if (board.reduce(function (acc, cur) {
          return acc && cur.cols[row].value === player;
        }, true)) {
          return {
            v: player
          };
        }
      };

      for (var row = 0; row < 3; row++) {
        var _ret = _loop(row);

        if (_typeof(_ret) === "object") return _ret.v;
      }

      if (board.reduce(function (acc, cur, ind) {
        return acc && cur.cols[ind].value === player;
      }, true)) {
        return player;
      }

      if (board.reduce(function (acc, cur, ind) {
        return acc && cur.cols[2 - ind].value === player;
      }, true)) {
        return player;
      }

      if (step === 8) {
        return 3;
      } // ultimative case


      if (step === -1) {
        // const numAvailable = 0
        for (var r = 0; r < 3; r++) {
          for (var c = 0; c < 3; c++) {
            if (board[r].cols[c].available !== false) {
              return false;
            }
          }
        }

        return 3;
      }

      return false;
    }
  }, {
    key: "checkWinner",
    value: function checkWinner() {
      return this.finished;
    }
  }, {
    key: "makeCopy",
    value: function makeCopy() {
      var copy = new UTTTBoard();
      copy.board = JSON.parse(JSON.stringify(this.board));
      copy.step = this.step;
      copy.finished = this.finished;
      return copy;
    }
  }, {
    key: "getAvailableMoves",
    value: function getAvailableMoves() {
      var moves = [];

      for (var subrow = 0; subrow < 3; subrow++) {
        for (var subcol = 0; subcol < 3; subcol++) {
          var subboard = this.board[subrow].cols[subcol];

          if (subboard.available !== 1) {
            continue;
          }

          for (var row = 0; row < 3; row++) {
            for (var col = 0; col < 3; col++) {
              if (subboard.board[row].cols[col].value === 0) {
                moves.push({
                  col: col,
                  row: row,
                  value: 0,
                  subrow: subrow,
                  subcol: subcol
                });
              }
            }
          }
        }
      }

      return moves;
    }
  }]);

  return UTTTBoard;
}();

/***/ }),

/***/ "./app/app.html":
/*!**********************!*\
  !*** ./app/app.html ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<component id=\"App\">\n  <NavigationService ui:ref=\"nav\" />\n  <ViewPort caption=\":top.title\" sidebarWidth=\"300\">\n    <ViewPort:aside>\n      <NavTree data=\":top.sitemap\" />\n    </ViewPort:aside>\n    <PageRouter ui:props=\"<- nav.route\" />\n  </ViewPort>\n</component>\n\n<component id=\"Navbar\">\n  <header class=\"navbar bg-primary\" style=\"min-height: 48px\">\n    <section class=\"navbar-section mx-2\">\n      <h4 class=\"m-1\" style=\"vertical-align: middle\" ui:if=\"{caption}\">\n        {caption}\n      </h4>\n      <ui:slot />\n    </section>\n    <section class=\"navbar-center\" ui:if=\"{logo}\">\n      <img src=\"{logo}\" alt=\"\" height=\"40\" width=\"140\" />\n    </section>\n    <section class=\"navbar-section mx-2\">\n      <ui:slot id=\"right\" />\n      <UserAvatar ui:props=\"{user}\" ui:if=\"{user}\" />\n    </section>\n  </header>\n</component>\n\n<component id=\"SimpleList\">\n  <ul class=\"nav\">\n    <li class=\"nav-item {item.class}\" ui:for=\"item of data\">\n      <span>{item.name}</span>\n    </li>\n  </ul>\n</component>\n\n<component id=\"NavTree\">\n  <ul class=\"nav\">\n    <li class=\"nav-item {item.class}\" ui:for=\"item of data\">\n      <NavLink href=\"{item.id}\">\n        <span>{item.name}</span>\n        <span ui:if=\"{item.label}\" class=\"label label-error\">{item.label}</span>\n      </NavLink>\n      <NavTree ui:if=\"{item.subs}\" data=\"{item.subs}\" />\n    </li>\n  </ul>\n</component>\n\n<component id=\"MainPage\">\n  <Navbar caption=\"Info\" />\n  <!-- <Panel caption=\"Icons\">\n    <LoadingIndicator />\n    Using Font\n    <Icon type=\"cog\" />\n  </Panel>\n  <Panel caption=\"Buttons\">\n    <Button caption=\"Default\" trackId=\"action1\" />\n    <Button\n            icon=\"cog\"\n            caption=\"Large primary with icon\"\n            primary\n            large\n            class=\"m-2\" />\n    <Button icon=\"123\" caption=\"Link\" link />\n  </Panel>\n  <Panel caption=\"Panel\" hint=\"with hint\"> here... </Panel> -->\n\n  <button click=\"->\" data-clicked={clicked|inc}>Clicked {clicked|or:0}</button>\n\n</component>\n\n<component id=\"ArrowsPage\">\n  <Navbar caption=\"Arrows\" />\n  <Panel caption=\"Subscribe and Action\">\n    <Tabs value=\"<- store.tab\" items=\":top.sitemap\" action=\"-> store.select\" />\n    <Button\n            caption=\"<- store.tab|or:none|str.capitalize\"\n            data-id=\"other\"\n            action=\"-> store.select\" />\n  </Panel>\n</component>");

/***/ }),

/***/ "./app/commons/Form.js":
/*!*****************************!*\
  !*** ./app/commons/Form.js ***!
  \*****************************/
/*! exports provided: FormField, Form */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormField", function() { return FormField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Form", function() { return Form; });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FIELD_TYPES = {
  bool: 'SwitchField'
};
var FormField =
/*#__PURE__*/
function () {
  function FormField() {
    _classCallCheck(this, FormField);
  }

  _createClass(FormField, [{
    key: "onChange",
    value: function onChange(_ref) {
      var value = _ref.value;
      var form = this.form;
      var field = this.field;
      var id = field.id;
      form.data = _objectSpread({}, form.data, _defineProperty({}, id, value));
      form.change && form.change(form.data);
    }
  }, {
    key: "TEMPLATE",
    get: function get() {
      return (
        /* html */
        "\n    <ui:fragment>\n      <ui:tag tag={fieldType} ui:props={fieldProps} onChange={onChange}/>\n    </ui:fragment>"
      );
    }
  }, {
    key: "fieldType",
    get: function get() {
      var type = this.field.type || 'text';
      return FIELD_TYPES[type] || String.capitalize(type) + 'Field';
    }
  }, {
    key: "fieldProps",
    get: function get() {
      var field = this.field;
      var form = this.form;
      var id = field.id;
      var data = form.data || {};
      var value = data[id];
      return _objectSpread({}, field, {
        error: form.error && form.error.fields && form.error.fields[id] || null,

        get disabled() {
          return field.disabled && field.disabled(this.value, this.data);
        },

        value: value === undefined ? null : value,
        caption: field.caption || field.name,
        data: data
      });
    }
  }]);

  return FormField;
}();
var Form =
/*#__PURE__*/
function () {
  function Form() {
    _classCallCheck(this, Form);
  }

  _createClass(Form, [{
    key: "getForm",
    value: function getForm() {
      return this;
    }
  }, {
    key: "getFields",
    value: function getFields() {
      return this.fields || Object.keys(this.data).map(function (id) {
        return {
          id: id,
          caption: id
        };
      });
    }
  }, {
    key: "TEMPLATE",
    get: function get() {
      return (
        /* html */
        "\n    <div autocomplete=\"off\" class=\"form-horizontal\">\n        <FormField ui:for=\"field of fields\" field={field} form={form}/>\n    </div>"
      );
    }
  }]);

  return Form;
}();

/***/ }),

/***/ "./app/commons/NavigationService.js":
/*!******************************************!*\
  !*** ./app/commons/NavigationService.js ***!
  \******************************************/
/*! exports provided: NavigationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigationService", function() { return NavigationService; });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./app/commons/services.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var NavigationService =
/*#__PURE__*/
function (_Service) {
  _inherits(NavigationService, _Service);

  function NavigationService() {
    _classCallCheck(this, NavigationService);

    return _possibleConstructorReturn(this, _getPrototypeOf(NavigationService).apply(this, arguments));
  }

  _createClass(NavigationService, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.prevHash = '';

      this.hashchange = function () {
        var hash = window.location.hash.slice(1);

        if (hash[0] === '/' && hash !== _this.prevHash) {
          _this.emit('this.hash', {
            value: hash.slice(1)
          });

          _this.prevHash = hash;
        } else if (!_this.prevHash) {
          _this.emit('this.hash', {
            value: 'main'
          });

          _this.prevHash = '/main';
        }
      };

      window.addEventListener('hashchange', this.hashchange);
      setTimeout(function () {
        return _this.hashchange();
      }, 0);
    }
  }, {
    key: "done",
    value: function done() {
      window.removeEventListener('hashchange', this.hashchange);
    }
  }, {
    key: "update",
    value: function update(d) {
      var _Object$urlParse = Object.urlParse(d),
          target = _Object$urlParse.target,
          _Object$urlParse$path = _Object$urlParse.path,
          path = _Object$urlParse$path === void 0 ? ['*'] : _Object$urlParse$path,
          params = _Object$urlParse.params;

      var state = {
        target: (!target || target === '*' ? this.target : target) || 'main',
        path: path[0] === '*' ? this.path : path,
        params: params.reset ? _objectSpread({}, params, {
          reset: null
        }) : _objectSpread({}, this.params, {}, params)
      };
      window.location.hash = this.prevHash = '/' + Object.urlStringify(state);
      return state;
    }
  }, {
    key: "getRoute",
    value: function getRoute() {
      return {
        target: this.target,
        path: this.path,
        params: this.params
      };
    }
  }, {
    key: "onHash",
    value: function onHash(_ref) {
      var value = _ref.value;
      return this.update(value);
    }
  }, {
    key: "onParams",
    value: function onParams(params) {
      return this.update({
        params: _objectSpread({}, params, {
          data: null
        })
      });
    }
  }]);

  return NavigationService;
}(_services__WEBPACK_IMPORTED_MODULE_0__["Service"]);

/***/ }),

/***/ "./app/commons/ServiceWorker.js":
/*!**************************************!*\
  !*** ./app/commons/ServiceWorker.js ***!
  \**************************************/
/*! exports provided: ServiceWorker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceWorker", function() { return ServiceWorker; });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./app/commons/services.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


var ServiceWorker =
/*#__PURE__*/
function (_Service) {
  _inherits(ServiceWorker, _Service);

  function ServiceWorker() {
    _classCallCheck(this, ServiceWorker);

    return _possibleConstructorReturn(this, _getPrototypeOf(ServiceWorker).apply(this, arguments));
  }

  _createClass(ServiceWorker, [{
    key: "init",
    value: function init() {
      var _this = this;

      try {
        Function.assert(this.api, 'Service Workers are not supported');
        var _this$source = this.source,
            source = _this$source === void 0 ? '/service-worker.js' : _this$source,
            _this$scope = this.scope,
            scope = _this$scope === void 0 ? '/' : _this$scope,
            push = this.push;
        this.api.register(source, {
          scope: scope
        }).then(function (registration) {
          return _this.registered(registration);
        }).then(function () {
          return _this.ready(function () {
            return _this.log('Service Worker Ready');
          });
        });
        this.api.addEventListener('message', function (ev) {
          return _this.onMessage(ev);
        });

        if (push) {
          this.subscribe();
        }
      } catch (error) {
        this.fallback(error);
      }
    } // ensures that `fn` executed when api is ready

  }, {
    key: "ready",
    value: function ready(fn) {
      return this.api.ready.then(fn);
    }
  }, {
    key: "fallback",
    value: function fallback(error) {
      this.log(error);
    } // hook on registered

  }, {
    key: "registered",
    value: function registered(registration) {
      this.log('Service Worker Registered');
      return registration;
    }
    /**
       * Push
       */

  }, {
    key: "withPushManager",
    value: function withPushManager(fn) {
      return this.ready(function (_ref) {
        var pushManager = _ref.pushManager;
        return pushManager;
      }).then(fn);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe() {
      var _this2 = this;

      this.withPushManager(function (pushManager) {
        return pushManager.getSubscription();
      }).then(function (ss) {
        return ss && ss.unsubscribe();
      }).then(function () {
        return _this2.saveSubscription();
      })["catch"](function (e) {
        console.log('Error thrown while unsubscribing from  push messaging.', e);
      });
    }
  }, {
    key: "subscribe",
    value: function subscribe() {
      var _this3 = this;

      function urlBase64ToUint8Array(base64String) {
        var padding = '='.repeat((4 - base64String.length % 4) % 4);
        var base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        var rawData = window.atob(base64);
        return Uint8Array.from(_toConsumableArray(rawData).map(function (_char) {
          return _char.charCodeAt(0);
        }));
      }

      if (Notification.permission === 'granted') {
        /* do our magic */
      } else if (Notification.permission === 'blocked') {
        /* the user has previously denied push. Can't reprompt. */
      } else {
          /* show a prompt to the user */
        }

      var applicationServerKey = urlBase64ToUint8Array(this.vapidPublicKey);
      this.withPushManager(function (pushManager) {
        return pushManager.getSubscription() // .then((ss) => ss && ss.unsubscribe())
        .then(function (ss) {
          return ss || pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
          });
        }).then(function (subscription) {
          return _this3.saveSubscription(subscription.toJSON());
        })["catch"](function (err) {
          if (Notification.permission === 'denied') {
            _this3.log('The user has blocked notifications.');
          }

          _this3.handleError(err);
        });
      });
    } // to be overriden from props

  }, {
    key: "saveSubscription",
    value: function saveSubscription(ss) {
      this.subscription = ss;
    }
    /**
       * Intercommunication between service worker.
       */
    // handles a message posted from Service worker.

  }, {
    key: "onMessage",
    value: function onMessage(payload) {
      this.log('onMessage', payload);
    }
  }, {
    key: "api",
    get: function get() {
      return navigator.serviceWorker;
    }
  }]);

  return ServiceWorker;
}(_services__WEBPACK_IMPORTED_MODULE_0__["Service"]);

/***/ }),

/***/ "./app/commons/effects.js":
/*!********************************!*\
  !*** ./app/commons/effects.js ***!
  \********************************/
/*! exports provided: Delay, Invoke, Loader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Delay", function() { return Delay; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Invoke", function() { return Invoke; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Loader", function() { return Loader; });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Delay =
/*#__PURE__*/
function () {
  function Delay() {
    _classCallCheck(this, Delay);
  }

  _createClass(Delay, [{
    key: "init",
    value: function init() {
      var _this = this;

      setTimeout(function () {
        if (!_this.isDone) {
          _this.action(_this.data);
        }
      }, (this.period || 5) * 1000);
    }
  }]);

  return Delay;
}();
var Invoke =
/*#__PURE__*/
function () {
  function Invoke() {
    _classCallCheck(this, Invoke);
  }

  _createClass(Invoke, [{
    key: "init",
    value: function init() {
      this.action(this.data);
    }
  }]);

  return Invoke;
}();
var Loader =
/*#__PURE__*/
function () {
  function Loader() {
    _classCallCheck(this, Loader);
  }

  _createClass(Loader, [{
    key: "init",
    value: function init() {
      this.reload();
    }
  }, {
    key: "setTrigger",
    value: function setTrigger(val) {
      this.trigger = val;
      this.reload();
    }
  }, {
    key: "reload",
    value: function reload() {
      var from = this.from,
          data = this.data,
          into = this.into;

      if (from && into) {
        from(_objectSpread({}, data, {
          callback: function callback(error, result) {
            return into(_objectSpread({
              error: error
            }, result));
          }
        }));
      }
    }
  }]);

  return Loader;
}();

/***/ }),

/***/ "./app/commons/elements.html":
/*!***********************************!*\
  !*** ./app/commons/elements.html ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<component id=\"Icon\">\n    <i class=\"fa{bundle|or:s} fa-{type} {class}\" style={style} data={data} click={click}></i>\n</component>\n\n<component id=\"Img\">\n    <img src={src|or:@default} alt={alt} class=\"img {class}\" style={style} />\n</component>\n\n<component id=\"Avatar\">\n    <figure class=\"avatar {large|then:avatar-lg}\">\n        <Img src={src}\n             alt={alt}\n             default=\"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==\" />\n    </figure>\n</component>\n\n<component id=\"Button\">\n    <button class=\"btn btn-{mode} {primary|then:btn-primary} {disabled|or:@busy|then:disabled} {class} {large|then:btn-lg} {link|then:btn-link} c-hand\"\n            style={style}\n            data={data}\n            click={action|track:@trackId:@caption}>\n        <i ui:if={busy} class=\"loading mx-2\"></i>\n        <Icon ui:if={icon} bundle={iconBundle} type={icon} class=\"mx-2\" />\n        <span ui:if={caption} style=\"white-space:nowrap; overflow: hidden; text-overflow: ellipsis;\">{caption}</span>\n    </button>\n</component>\n\n<component id=\"FAB\">\n    <button class=\"btn2 {tooltip|then:tooltip} tooltip-left fixed bg-primary circle c-hand {class}\"\n            style=\"position: fixed;border:none; right:1.5rem; bottom:1.5rem; width: 2.5rem; height: 2.5rem; z-index:5;\"\n            data={data} data-tooltip={tooltip|or:} click={action|track:@trackId:big}>\n        <Icon type={icon|or:plus} />\n    </button>\n</component>\n\n<component id=\"Modal\">\n    <div class=\"modal modal {open|then:active}\">\n        <a class=\"modal-overlay\" aria-label=\"Close\" data={data} click={close}></a>\n        <div class=\"modal-container\">\n            <div class=\"modal-header\">\n                <a class=\"btn btn-clear float-right\" aria-label=\":close\" data={data} click={close}></a>\n                <div class=\"modal-title h5\" ui:if={title}>{title}</div>\n                <ui:slot id=\"header\" />\n            </div>\n            <div class=\"modal-body\" style=\"max-height: 70vh;\">\n                <div class=\"content\">\n                    <ui:slot />\n                </div>\n            </div>\n            <div class=\"modal-footer\">\n                <ui:slot id=\"footer\" />\n            </div>\n        </div>\n    </div>\n</component>\n\n<component id=\"Tabs\">\n    <ul class=\"tab tab-block\">\n        <li class=\"tab-item {item.id|equals:@value|then:active} c-hand\" ui:for=\"item of items\">\n            <a data={data} data-id={item.id} click={action}>\n                <Icon ui:if={item.icon} type={item.icon} bundle={item.iconBundle} class=\"mx-2\" />\n                {item.name}\n            </a>\n        </li>\n    </ul>\n</component>");

/***/ }),

/***/ "./app/commons/fields.html":
/*!*********************************!*\
  !*** ./app/commons/fields.html ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<component id=\"FieldItem\">\n    <div class=\"columns form-group {error|then:has-error} {class}\">\n        <div class=\" col-4 col-sm-12\">\n            <label class=\"form-label\" for=\"input-example-1\">\n                {caption}\n                <sup ui:if={required}\n                     class=\"text-error\">✱</sup>\n            </label>\n        </div>\n        <div class=\"col-8 col-sm-12\">\n            <ui:slot />\n            <p class=\"form-input-hint\" ui:if={error}>{error}</p>\n        </div>\n    </div>\n</component>\n\n<component id=\"TextField\">\n    <FieldItem caption={caption} error={error} required={required}>\n        <input class=\"form-input\"\n               type=\"text\"\n               disabled={disabled}\n               placeholder={placeholder}\n               data={data}\n               value={value}\n               change={onChange}>\n    </FieldItem>\n</component>\n\n<component id=\"DateField\">\n    <FieldItem caption={caption} error={error} required={required}>\n        <input class=\"form-input\"\n               disabled={disabled}\n               type=\"date\"\n               placeholder={caption}\n               value={value}\n               change={onChange}>\n    </FieldItem>\n</component>\n\n<component id=\"DateTimeField\">\n    <FieldItem caption=\"{caption}\" error={error} required={required}>\n        <input class=\"form-input\"\n               disabled={disabled}\n               type=\"datetime-local\"\n               placeholder={caption}\n               value={value|date:yyyy-mm-ddTt}\n               change={onChange}>\n    </FieldItem>\n</component>\n\n<component id=\"NumberField\">\n    <FieldItem caption={caption} error={error} required={required}>\n        <input class=\"form-input\"\n               disabled={disabled}\n               type=\"number\"\n               placeholder={caption}\n               value={value}\n               change={onChange}>\n    </FieldItem>\n</component>\n\n<component id=\"TextareaField\">\n    <FieldItem caption={caption} error={error} required={required}>\n        <textarea\n                  class=\"form-input\"\n                  style=\"min-height: 15vw\"\n                  data={data}\n                  disabled={disabled} placeholder={caption} rows=\"3\" change={onChange} value={value}></textarea>\n    </FieldItem>\n</component>\n\n<component id=\"SwitchField\">\n    <div class=\"form-group\">\n        <div class=\"col-sm-12\">\n            <label class=\"form-switch\">\n                <span>{caption}</span>\n                <input type=\"checkbox\" toggle={onChange} data={data} checked={value|not|not}>\n                <i class=\"form-icon\"></i>\n            </label>\n        </div>\n    </div>\n</component>\n\n<component id=\"EnumField\">\n    <FieldItem caption={caption} class={class} error={error} required={required}>\n        <Select class=\"form-select\"\n                change={onChange}\n                value={value|or:@defaultValue}\n                data={data}\n                options=\":enums.{typeSpec}\"\n                emptyCaption={emptyCaption}\n                disabled={disabled} />\n    </FieldItem>\n</component>\n\n<component id=\"SelectField\">\n    <FieldItem caption={caption} class={class} error={error} required={required}>\n        <Select class=\"form-select\"\n                change={onChange}\n                value={value|or:@defaultValue}\n                data={data}\n                options={options}\n                emptyCaption={emptyCaption}\n                disabled={disabled} />\n    </FieldItem>\n</component>\n\n<component id=\"RadioField\">\n    <FieldItem caption={caption} error={error} required={required}>\n        <RadioGroup change={onChange}\n                    value={value} data={data} options=\":enums.{typeSpec}\"\n                    disabled={disabled} />\n    </FieldItem>\n</component>\n\n<component id=\"ReferenceField\">\n    <FieldItem caption={caption} error={error} required={required}>\n        <Loader from=\"-> references.{typeSpec}Search\"\n                data-value={keyword.value|orDataPropValueByKey:keyword}\n                trigger={keyword.value}\n                into=\"->options\" />\n        <Loader from=\"-> references.{typeSpec}Entry\" data-id={value} trigger={value} into=\"->entry\" />\n        <ReferenceInput change={onChange}\n                        value={value} entry={entry.data}\n                        onKeyword=\"->keyword\" keyword={keyword.value|orDataPropValueByKey:keyword}\n                        onSelectMenuItem=\"->entry\"\n                        options={options.data}\n                        disabled={disabled} />\n    </FieldItem>\n</component>\n\n<component id=\"RemoteEnumField\">\n    <FieldItem caption={caption} error={error} required={required}>\n        <Loader from=\"-> references.{typeSpec}Enum\" data={data} into=\"->options\" />\n        <Select class=\"form-select\" change={onChange} value={value} data={options.data} disabled={disabled} />\n    </FieldItem>\n</component>");

/***/ }),

/***/ "./app/commons/index.js":
/*!******************************!*\
  !*** ./app/commons/index.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _effects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./effects.js */ "./app/commons/effects.js");
/* harmony import */ var _elements_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./elements.html */ "./app/commons/elements.html");
/* harmony import */ var _table_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./table.html */ "./app/commons/table.html");
/* harmony import */ var _inputs_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./inputs.html */ "./app/commons/inputs.html");
/* harmony import */ var _fields_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fields.html */ "./app/commons/fields.html");
/* harmony import */ var _layouts_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./layouts.html */ "./app/commons/layouts.html");
/* harmony import */ var _viewport_html__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./viewport.html */ "./app/commons/viewport.html");
/* harmony import */ var _NavigationService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./NavigationService */ "./app/commons/NavigationService.js");
/* harmony import */ var _ServiceWorker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ServiceWorker */ "./app/commons/ServiceWorker.js");
/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Form */ "./app/commons/Form.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./services */ "./app/commons/services.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }












/* harmony default export */ __webpack_exports__["default"] = ([_ServiceWorker__WEBPACK_IMPORTED_MODULE_8__["ServiceWorker"], _NavigationService__WEBPACK_IMPORTED_MODULE_7__["NavigationService"]].concat(_toConsumableArray(Object.values(_effects_js__WEBPACK_IMPORTED_MODULE_0__)), _toConsumableArray(Object.values(_Form__WEBPACK_IMPORTED_MODULE_9__)), _toConsumableArray(Object.values(_services__WEBPACK_IMPORTED_MODULE_10__)), [_elements_html__WEBPACK_IMPORTED_MODULE_1__["default"], _table_html__WEBPACK_IMPORTED_MODULE_2__["default"], _fields_html__WEBPACK_IMPORTED_MODULE_4__["default"], _viewport_html__WEBPACK_IMPORTED_MODULE_6__["default"], _layouts_html__WEBPACK_IMPORTED_MODULE_5__["default"], _inputs_html__WEBPACK_IMPORTED_MODULE_3__["default"]]));

/***/ }),

/***/ "./app/commons/inputs.html":
/*!*********************************!*\
  !*** ./app/commons/inputs.html ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<component id=\"Select\">\n    <select class=\"{class}\" change={change} disabled={disabled} data={data}>\n        <option selected={value|not} value=\"\" ui:if={value|not|or:@emptyCaption}>{emptyCaption}</option>\n        <option ui:for=\"option of options\" selected={option.id|equals:@value} value={option.id}>\n            {option.name}\n        </option>\n    </select>\n</component>\n\n<component id=\"RadioGroup\">\n    <div class=\"{class}\">\n        <label class=\"form-radio\" ui:for=\"option of options\">\n            <input type=\"radio\" name={id|or:rg}\n                   value={option.id}\n                   checked={option.id|equals:@value} change={change} data={data}\n                   disabled={disabled}>\n            <i class=\"form-icon\"></i>{option.name}\n        </label>\n    </div>\n</component>\n<component id=\"InlineInput\">\n    <label class=\"{editing|then:hidden} silver\" data-editing=\"true\" click=\"->\">{value|or:___}</label>\n    <input type=\"number\"\n           autofocus\n           ui:if={editing}\n           style=\"width:50px;\"\n           value={value}\n           data-editing=\"false\"\n           data-key={key}\n           enter={onChange}\n           blur=\"->\" />\n</component>\n<component id=\"InlineText\">\n    <div class=\"{editing|then:hidden} silver\" data-editing=\"true\" click=\"->\">{value|or:___}</div>\n    <textarea\n              autofocus\n              style=\"width:100%;\"\n              ui:if={editing}\n              value={value}\n              data-editing=\"false\"\n              data-key={key}\n              enter={onChange}\n              blur=\"->\" />\n    </component>\n\n<component id=\"Dropdown\">\n    <div class=\"dropdown\">\n        <a href=\"#\" class=\"btn btn-link dropdown-toggle\" tabindex=\"0\">\n            {data|selectedName}<i class=\"icon icon-caret\"></i>\n        </a>\n        <!-- menu component -->\n        <ul class=\"menu\" style=\"right:0;left:auto;\">\n            <li ui:for=\"item of data\" class=\"menu-item {item.id|equals:@value|then:active}\"\n                data-id={item.id}\n                data-name={item.name}\n                click={change}>\n                <a>{item.name}</a>\n            </li>\n        </ul>\n    </div>\n</component>\n\n<component id=\"DateTimeInput\">\n    <input class=\"form-input flatpickr-input\"\n           init={:support.initFlatpickr}\n           disabled={disabled}\n           type=\"text\"\n           placeholder={placeholder}\n           value={value|support.setFlatpickrValue}\n           change={change}>\n</component>\n\n<component id=\"SearchBar\">\n    <span class=\"ant-input-search ant-input-affix-wrapper\">\n        <input placeholder=\"Поиск...\" class=\"ant-input\" type=\"text\"\n               value={value} enter={action}\n               style=\"min-height:40px;\">\n        <span class=\"ant-input-suffix\">\n            <i class=\"anticon anticon-search ant-input-search-icon\" style=\"margin-top: 4px;\"></i>\n        </span>\n    </span>\n</component>\n\n<component id=\"ReferenceInput\">\n    <div class=\"form-autocomplete\">\n        <div class=\"form-input has-icon-right\" data-showMenu={showMenu|not} click=\"->\">\n            <div>{entry.fullNameRu}</div>\n            <i class=\"form-icon icon icon-edit c-hand\"></i>\n        </div>\n        <Modal ui:if={showMenu} open=\"true\" title=\"Выбор опции {title}\" data-showMenu=\"false\" close=\"->\">\n            <div class=\"menu\" style=\"position:sticky;top:-20;z-index:101; border-bottom: none; box-shadow: unset\">\n                <div class=\"form-group has-icon-right\">\n                    <input class=\"form-input\" type=\"text\"\n                           value={keyword} placeholder=\"search...\" change={onKeyword}>\n                    <i class=\"form-icon icon icon-cross c-hand\" data-value=\"\" click={onKeyword}></i>\n                </div>\n                <div ui:if={options} class=\"menu-item\">\n                    <div class=\"tile tile-centered mx-1\">\n                        <b class=\"tile-content\">Найдено: {options.length}</b>\n                    </div>\n                </div>\n            </div>\n            <ul class=\"menu\" style=\"position:unset; border-top: none; box-shadow: unset\">\n                <li class=\"menu-item\" ui:for=\"item of options\" data-showMenu=\"false\" click=\"->\">\n                    <div click={change} data-value={item.id}>\n                        <div class=\"tile tile-centered mx-1\">\n                            <figure class=\"avatar avatar-xs bg-primary\" data-initial={item.fullNameRu|initials}>\n                            </figure>\n                            <div class=\"tile-content\">{item.fullNameRu}, {item.birthday|date}</div>\n                        </div>\n                    </div>\n                </li>\n            </ul>\n        </Modal>\n    </div>\n</component>");

/***/ }),

/***/ "./app/commons/layouts.html":
/*!**********************************!*\
  !*** ./app/commons/layouts.html ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<component id=\"Panel\">\n    <h6 class=\"mt-2 pt-2 px-2 text-gray\" ui:if=\"caption\">{caption}</h6>\n    <div class=\"panel\" style={style}>\n        <small class=\"p-2 bg-secondary\" ui:if={hint}>{hint}</small>\n        <div class=\"panel-header\" ui:if=\"slot(title)\">\n            <div class=\"panel-title\">\n                <ui:slot id=\"title\" key=\"panel-title\" />\n            </div>\n        </div>\n        <div class=\"panel-nav\" ui:if=\"slot(nav)\">\n            <ui:slot id=\"nav\" />\n        </div>\n        <div class=\"panel-body p1\">\n            <ui:slot />\n        </div>\n        <div class=\"panel-footer\" ui:if=\"slot(footer)\">\n            <ui:slot id=\"footer\" />\n        </div>\n    </div>\n</component>\n\n<component id=\"Grid\">\n    <div class=\"columns {class}\">\n        <ui:slot />\n    </div>\n</component>\n\n<component id=\"Col\">\n    <div class=\"col-{size|or:6} col-sm-12 {class}\">\n        <ui:slot />\n    </div>\n</component>\n<component id=\"Centroid\">\n    <div class=\"{class}\" style=\"display: flex;align-items: center;justify-content: center;{style}\">\n        <ui:slot />\n    </div>\n</component>\n\n<component id=\"FlexBox\">\n    <div class=\"{class}\" style=\"display: flex;align-items: stretch;justify-content:space-around;{style}\">\n        <ui:slot />\n    </div>\n</component>\n\n<component id=\"Tile\">\n    <div class=\"tile {centered|then:tile-centered} m-2 {class}\">\n        <div class=\"tile-icon\" ui:if={image}>\n            <Avatar src={image} />\n        </div>\n        <div class=\"tile-icon\" ui:if={icon}>\n            <Icon type={icon} />\n        </div>\n        <div class=\"tile-content\">\n            <div class=\"tile-title text-bold\" ui:if={title}>{title}</div>\n            <div class=\"tile-subtitle\" ui:if={subtitle}>{subtitle}</div>\n            <ui:slot />\n        </div>\n        <div class=\"tile-action btn-group\" ui:if=\"slot(actions)\">\n            <ui:slot id=\"actions\" />\n        </div>\n    </div>\n</component>\n\n\n<component id=\"Card\">\n    <div class=\"card\" style={style}>\n        <div class=\"card-image\" ui:if={image}>\n            <img src={image} class=\"img-responsive\" />\n        </div>\n        <div class=\"card-header\">\n            <a ui:if={title} href={link}>\n                <h5 class=\"card-title\">{title}</h5>\n            </a>\n            <div ui:if={subtitle} class=\"card-subtitle text-gray\">{subtitle}</div>\n            <ui:slot id=\"header\" />\n        </div>\n        <div class=\"card-body\">\n            <ui:slot />\n        </div>\n        <div class=\"card-footer\">\n            <ui:slot id=\"footer\" />\n        </div>\n    </div>\n</component>\n\n<component id=\"Popover\">\n    <div class=\"popover popover-right\">\n        <ui:slot />\n        <div class=\"popover-container\">\n            <div class=\"card\">\n                <div class=\"card-header\">\n                    <ui:slot id=\"body\" />\n                </div>\n            </div>\n        </div>\n    </div>\n</component>");

/***/ }),

/***/ "./app/commons/services.js":
/*!*********************************!*\
  !*** ./app/commons/services.js ***!
  \*********************************/
/*! exports provided: Service, ErrorHandlingService, ToastService, TestService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Service", function() { return Service; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorHandlingService", function() { return ErrorHandlingService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToastService", function() { return ToastService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestService", function() { return TestService; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Service =
/*#__PURE__*/
function () {
  function Service(state, $) {
    _classCallCheck(this, Service);

    this.state = state;
    this.$ = $;
  }
  /**
   * Framework
   */


  _createClass(Service, [{
    key: "lookupService",
    value: function lookupService(ref) {
      return this.$.app && this.$.app[ref] ? this.$.app[ref].impl : null;
    }
  }, {
    key: "up",
    value: function up() {
      var _this$$;

      return (_this$$ = this.$).up.apply(_this$$, arguments);
    }
  }, {
    key: "defer",
    value: function defer() {
      var _this$$2;

      return (_this$$2 = this.$).defer.apply(_this$$2, arguments);
    }
  }, {
    key: "emit",
    value: function emit() {
      var _this$$3;

      return (_this$$3 = this.$).emit.apply(_this$$3, arguments);
    }
  }, {
    key: "log",
    value: function log() {
      var _console;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_console = console).log.apply(_console, [this.$.ref + ': '].concat(args));

      return args[0];
    }
    /**
     * Error handling
     */

  }, {
    key: "handleError",
    value: function handleError(_ref) {
      var _ref$message = _ref.message,
          message = _ref$message === void 0 ? '' : _ref$message,
          _ref$code = _ref.code,
          code = _ref$code === void 0 ? '' : _ref$code;
      // may  overriden from props
      var handler = this.lookupService('errorHandler');

      if (handler) {
        handler.handleError({
          message: message,
          code: code,
          source: this.$.ref
        });
      } else {
        console.error(this.$.ref + ': ERROR: ', message, code);
      }
    }
  }, {
    key: "safe",
    value: function safe(p, def) {
      var _this = this;

      return p["catch"](function (error) {
        _this.handleError(error);

        return def ? def(error) : {
          error: error
        };
      });
    }
  }, {
    key: "onClearError",
    value: function onClearError() {
      return {
        error: null
      };
    }
  }]);

  return Service;
}();
var ErrorHandlingService =
/*#__PURE__*/
function (_Service) {
  _inherits(ErrorHandlingService, _Service);

  function ErrorHandlingService() {
    _classCallCheck(this, ErrorHandlingService);

    return _possibleConstructorReturn(this, _getPrototypeOf(ErrorHandlingService).apply(this, arguments));
  }

  _createClass(ErrorHandlingService, [{
    key: "handleError",
    value: function handleError(_ref2) {
      var _ref2$message = _ref2.message,
          message = _ref2$message === void 0 ? '' : _ref2$message,
          code = _ref2.code,
          _ref2$source = _ref2.source,
          source = _ref2$source === void 0 ? {} : _ref2$source;
      this.show({
        message: source + ': ' + message,
        code: code,
        mode: 'error'
      });
    }
  }, {
    key: "show",
    value: function show(_ref3) {
      var _ref3$message = _ref3.message,
          message = _ref3$message === void 0 ? '' : _ref3$message,
          _ref3$code = _ref3.code,
          code = _ref3$code === void 0 ? '' : _ref3$code,
          source = _ref3.source;
      console.error(source + ': ERROR: ', code, message);
    }
  }]);

  return ErrorHandlingService;
}(Service);
var ToastService =
/*#__PURE__*/
function (_Service2) {
  _inherits(ToastService, _Service2);

  function ToastService() {
    _classCallCheck(this, ToastService);

    return _possibleConstructorReturn(this, _getPrototypeOf(ToastService).apply(this, arguments));
  }

  _createClass(ToastService, [{
    key: "onSend",
    value: function onSend(_ref4) {
      var _this2 = this;

      var data = _ref4.data;
      return {
        top: _objectSpread({}, data, {
          close: function close() {
            return _this2.emit('this.close');
          },
          closeAfter: 5
        })
      };
    }
  }, {
    key: "onClose",
    value: function onClose() {
      return {
        top: null
      };
    }
  }]);

  return ToastService;
}(Service);
var TestService =
/*#__PURE__*/
function (_Service3) {
  _inherits(TestService, _Service3);

  function TestService() {
    _classCallCheck(this, TestService);

    return _possibleConstructorReturn(this, _getPrototypeOf(TestService).apply(this, arguments));
  }

  _createClass(TestService, [{
    key: "onMyClick",
    value: function onMyClick(_ref5) {
      var clicked = _ref5.clicked;
      return {
        clicked: clicked + 1
      };
    }
  }]);

  return TestService;
}(Service);

/***/ }),

/***/ "./app/commons/table.html":
/*!********************************!*\
  !*** ./app/commons/table.html ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<component id=\"LoadingIndicator\">\n    <div class=\"loading {large|then:loading-lg} {class}\" />\n</component>\n\n<component id=\"EmptyData\">\n    <div class=\"empty {class}\">\n        <div class=\"empty-icon\">\n            <Icon type={icon|or:people} />\n        </div>\n        <p class=\"empty-title h5\">{title}</p>\n        <p ui:if={subtitle} class=\"empty-subtitle\">{subtitle}</p>\n        <div class=\"empty-action\">\n            <ui:slot />\n        </div>\n    </div>\n</component>\n\n<component id=\"LoadableItems\">\n    <LoadingIndicator class=\"empty\" ui:if=\"data|not\">\n        <ui:else>\n            <h5 class=\"error text-error\" ui:if=\"data.error\">{data.error.message|or:@data.error}</h5>\n            <EmptyData title={emptyCaption|or:Empty} ui:if=\"data.length|not\">\n                <ui:else>\n                    <div style={style} ui:for=\"item of data\">\n                        <ui:tag tag={itemType} ui:props={item} item={item} context={context} action={action} />\n                    </div>\n                </ui:else>\n            </EmptyData>\n        </ui:else>\n    </LoadingIndicator>\n</component>\n\n<component id=\"LoadableEntity\">\n    <LoadingIndicator class=\"empty\" ui:if=\"data|not\">\n        <ui:else>\n            <h5 class=\"error text-error\" ui:if=\"data.error\">\n                <span>{data.error.message|or:@data.error}</span>\n                <ui:else>\n                    <EmptyData title={emptyCaption|or:Empty} ui:if=\"data.id|not\">\n                        <ui:else>\n                            <ui:tag tag={type} data={data} context={context} action={action} />\n                        </ui:else>\n                    </EmptyData>\n                </ui:else>\n            </h5>\n        </ui:else>\n    </LoadingIndicator>\n</component>\n\n<component id=\"Cell\">\n    <span class=\"\" style=\"padding-left: 0px;\">{value}</span>\n</component>\n\n<component id=\"EnumCell\">\n    <span class=\"\"\n          style=\"padding-left: 0px;\">:map.{typeSpec}.{value}</span>\n</component>\n\n<component id=\"DateCell\">\n    <span class=\"\" style=\"padding-left: 0px;\">{value|date}</span>\n</component>\n\n<component id=\"Table\">\n    <table style=\"position: relative;\">\n        <thead class=\"table-thead\">\n            <tr>\n                <th class=\"col-index\" style=\"position: sticky; top: -1;\"></th>\n                <th class=\"col-index\" style=\"position: sticky; top: -1;\" ui:for=\"item of columns\">\n                    <span>{item.name}</span>\n                    <div class=\"table-column-sorter\" ui:if=\"item.sortable\">\n                        <span class=\"table-column-sorter-up off\" title=\"↑\" data-id=\"-{item.id}\"\n                              click={doSort}><i class=\"anticon anticon-caret-up\"></i></span>\n                        <span class=\"table-column-sorter-down off\" title=\"↓\" data-id={item.id} click={doSort}><i\n                               class=\"anticon anticon-caret-down\"></i></span>\n                    </div>\n                </th>\n            </tr>\n        </thead>\n        <TableRow ui:for=\"item of data\" data={item} selected={item.selected} columns={columns} kind={kind} />\n    </table>\n</component>\n\n<component id=\"TableRow\">\n    <tbody class=\"table-tbody\">\n        <tr class=\"table-row table-row-level-0\" style=\"position:sticky;\">\n            <td class=\"col-index\" data-id={data.id} click={doItem}>\n                <div ui:if={expandable}\n                     role=\"button\"\n                     class=\"table-row-expand-icon table-row-expanded\"\n                     aria-label=\"Collapse row\"\n                     data-selected=\"false\" click=\"->\">\n                    <ui:else>\n                        <div role=\"button\"\n                             class=\"table-row-expand-icon table-row-collapsed\"\n                             aria-label=\"Expand row\"\n                             data-selected=\"true\" click=\"->\"></div>\n                    </ui:else>\n                </div>\n            </td>\n            <td class=\"col-index\" ui:for=\"col of columns\">\n                <ui:tag tag=\"{col.type|str.capitalize}Cell\" ui:props={col} value={col.id|propObjectValueByKey}\n                        data={data} />\n            </td>\n        </tr>\n        <tr ui:if={expanded} class=\"table-expanded-row table-expanded-row-level-1\">\n            <td class=\"\"></td>\n            <td class=\"\" colspan=\"100\">\n                <ui:tag tag=\"{kind|str.capitalize}RowInsider\" data={data} />\n            </td>\n        </tr>\n    </tbody>\n</component>");

/***/ }),

/***/ "./app/commons/viewport.html":
/*!***********************************!*\
  !*** ./app/commons/viewport.html ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<component id=\"ViewPort\">\n    <ToastService ui:ref=\"toaster\" />\n    <ErrorHandlingService ui:ref=\"errorHandler\" show=\"-> toaster.send\" />\n    <ui:fragment ui:if=\"slot(aside)\">\n        <Sidebar caption={caption} size={sidebarWidth}>\n            <Sidebar:aside>\n                <ui:slot id=\"aside\" />\n            </Sidebar:aside>\n            <main>\n                <Toast event=\"<- toaster.top\" />\n                <ui:slot />\n            </main>\n        </Sidebar>\n        <ui:else>\n            <main>\n                <Toast event=\"<- toaster.top\" />\n                <ui:slot />\n            </main>\n        </ui:else>\n    </ui:fragment>\n</component>\n\n<component id=\"Sidebar\">\n    <div class=\"off-canvas off-canvas-sidebar-show\">\n        <a class=\"off-canvas-toggle btn btn-primary btn-action show-lg bg-red\"\n           href=\"#sidebar\">\n            <Icon type=\"bars\" />\n        </a>\n        <div id=\"sidebar\" class=\"off-canvas-sidebar\">\n            <Aside caption={caption}>\n                <ui:slot id=\"aside\" />\n            </Aside>\n        </div>\n        <a class=\"off-canvas-overlay\" href=\"#\"></a>\n        <div class=\"off-canvas-content\">\n            <ui:slot />\n        </div>\n    </div>\n</component>\n\n<component id=\"Aside\">\n    <aside style=\"display:flex; flex-direction: column; height: 100vh; width:{size|or:300}px\">\n        <div class=\"text-center\" ui:if={caption}>\n            <a href=\"#/main\">\n                <h5 class=\"p-2\">{caption}</h5>\n            </a>\n        </div>\n        <div class=\"m-2\" style=\"flex:1; overflow-y: auto;\">\n            <ui:slot />\n        </div>\n    </aside>\n</component>\n\n<component id=\"Navbar\">\n    <header class=\"navbar {class}\" style=\"min-height:48px\">\n        <section class=\"navbar-section\">\n            <div class=\"mx-2\">\n                <NavLink href={back} ui:if={back}>\n                    <Button link class=\"text-primary\" icon=\"arrow-left\" title=\":action.back\" />\n                </NavLink>\n                <h4 class=\"m-1\" style=\"vertical-align: middle;\" ui:if={caption}>{caption}</h4>\n                <ui:slot id=\"left\" />\n            </div>\n        </section>\n        <section class=\"navbar-center\" ui:if={logo}>\n            <img src={logo} style=\"max-height:44px;\" />\n        </section>\n        <section class=\"navbar-section\">\n            <div class=\"mx-2\">\n\n                <ui:slot />\n            </div>\n\n        </section>\n    </header>\n</component>\n\n<component id=\"NavTree\">\n    <ul class=\"nav\">\n        <li class=\"nav-item {item.class}\" ui:for=\"item of data\">\n            <NavLink href={item.id}>\n                <span>{item.name}</span>\n                <span ui:if={item.label} class=\"label label-error\">{item.label}</span>\n            </NavLink>\n            <NavTree ui:if={item.subs} data={item.subs} />\n        </li>\n    </ul>\n</component>\n\n<component id=\"NavLink\">\n    <a data-value={href} click=\"-> nav.hash\" class=\"c-hand {class}\">\n        <ui:slot />\n    </a>\n</component>\n\n<component id=\"PageRouter\">\n    <ui:tag tag=\"{target|str.capitalize|or:Main}Page\" ui:props={params} params={params} />\n</component>\n\n<component id=\"Toast\">\n    <div class=\"toast toast-{event.mode|or:@mode|or:primary}\"\n         style=\"position:absolute;top:1rem;right:1rem;left:1rem;{style}\"\n         ui:if=\"event\">\n        <button class=\"btn btn-clear float-right\" click={event.close}></button>\n        <p>{event.message}</p>\n        <Delay ui:if={event.closeAfter} action={event.close} period={event.closeAfter} />\n    </div>\n</component>");

/***/ }),

/***/ "./app/index.js":
/*!**********************!*\
  !*** ./app/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var arrmatura__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! arrmatura */ "./node_modules/arrmatura/docs/index.js");
/* harmony import */ var arrmatura__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(arrmatura__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _commons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./commons */ "./app/commons/index.js");
/* harmony import */ var _app_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.html */ "./app/app.html");
/* harmony import */ var _pages__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages */ "./app/pages/index.js");
/* harmony import */ var _res__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./res */ "./app/res.js");
/* harmony import */ var _ttt_store_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ttt_store.js */ "./app/ttt_store.js");
/* harmony import */ var _uttt_store_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./uttt_store.js */ "./app/uttt_store.js");
/* harmony import */ var ultimus__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ultimus */ "./node_modules/ultimus/dist/main.js");
/* harmony import */ var ultimus__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(ultimus__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ai_player_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ai/player.js */ "./app/ai/player.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }










var types = [].concat(_toConsumableArray(_commons__WEBPACK_IMPORTED_MODULE_1__["default"]), [_app_html__WEBPACK_IMPORTED_MODULE_2__["default"]], _toConsumableArray(_pages__WEBPACK_IMPORTED_MODULE_3__["default"]), [_ttt_store_js__WEBPACK_IMPORTED_MODULE_5__["TTTStore"], _uttt_store_js__WEBPACK_IMPORTED_MODULE_6__["UTTT"], _ai_player_js__WEBPACK_IMPORTED_MODULE_8__["PlayerController0"], _ai_player_js__WEBPACK_IMPORTED_MODULE_8__["PlayerController1"], _ai_player_js__WEBPACK_IMPORTED_MODULE_8__["PlayerController2"]]);
Object(arrmatura__WEBPACK_IMPORTED_MODULE_0__["launch"])({
  template: '<App />',
  types: types,
  resources: _res__WEBPACK_IMPORTED_MODULE_4__["default"],
  pipes: _objectSpread({}, ultimus__WEBPACK_IMPORTED_MODULE_7__["pipes"], {
    fio: function fio(p) {
      return p.name || p.fullName;
    },
    now: function now() {
      return Date.now();
    },
    kv: function kv() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      return 't' + e + x;
    },
    age: function age() {
      return 34;
    },
    wrapWithKey: function wrapWithKey(v, k, r) {
      return _objectSpread({}, r, _defineProperty({}, k, v));
    },
    inc: function inc() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return x + 1;
    },
    gameState: function gameState(states, f, step) {
      if (f) {
        return states.gameWinner[f - 1];
      } else {
        return states.gameTurn[step % 2];
      }
    },
    subBoard: function subBoard(board, r, c) {
      return board[r].cols[c].board;
    }
  })
});

/***/ }),

/***/ "./app/pages/index.js":
/*!****************************!*\
  !*** ./app/pages/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tictactoe_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tictactoe.html */ "./app/pages/tictactoe.html");
/* harmony import */ var _ulttictactoe_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ulttictactoe.html */ "./app/pages/ulttictactoe.html");


/* harmony default export */ __webpack_exports__["default"] = ([_tictactoe_html__WEBPACK_IMPORTED_MODULE_0__["default"], _ulttictactoe_html__WEBPACK_IMPORTED_MODULE_1__["default"]]);

/***/ }),

/***/ "./app/pages/tictactoe.html":
/*!**********************************!*\
  !*** ./app/pages/tictactoe.html ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<component id=\"Cell\">\n  <div class=\"column col-sm-4 cell-box\">\n    <div class=\"cell cell-{value}\" click=\"->store.step\" data-col={col} data-row={row}\n         data-value={value}>\n      <!-- {value|or:0} -->\n    </div>\n  </div>\n</component>\n\n<component id=\"Board\">  \n  <h6>{:gameStates|gameState:@finished:@step} </h6>\n  <div class=\"container\">\n    <div class=\"columns\" ui:for=\"row of board\">\n      <Cell ui:for=\"col of row.cols\" col={col.id} row={row.id} value={col.value}/>\n    </div>\n  </div>\n</component>\n\n<component id=\"TicTacToe\">\n  <div class=\"container\">\n    <div class=\"columns\">\n      <div class=\"column col-6\">\n        <Board board=\"<- store.board\" step=\"<- store.step\" finished=\"<- store.finished\" />\n      </div>\n      <div class=\"column col-1\"></div>\n      <div class=\"column col-3\">\n        <button class=\"btn btn-error control\" click=\"->store.reset\">Reset</button>\n      </div>\n    </div>\n  </div>\n</component>\n\n<component id=\"TictactoePage\">\n  <h4>TicTacToe</h4>\n\n  <TTTStore ui:ref=\"store\" />\n  <TicTacToe />\n</component>");

/***/ }),

/***/ "./app/pages/ulttictactoe.html":
/*!*************************************!*\
  !*** ./app/pages/ulttictactoe.html ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<component id=\"UCell\">\n  <div class=\"column col-4 cell-box\">\n    <div class=\"ucell cell-{value}\" click=\"->ustore.stepcell\" \n         data-col={col} data-row={row}\n         data-subcol={subcol} data-subrow={subrow}\n         data-value={value}>         \n    </div>\n  </div>\n</component>\n\n<component id=\"USubBoard\">  \n  <div class=\"column col-4 subBoard subBoard-{available} subWin-{finished}\">  \n    <div class=\"hider\"></div>\n    <div class=\"columns\" ui:for=\"row of board\">      \n      <UCell ui:for=\"col of row.cols\" col={col.id} row={row.id} value={col.value} subcol={subcol} subrow={subrow} />      \n    </div>\n    \n  </div>\n</component>\n\n<component id=\"UBoard\">  \n  <h6>{:gameStates|gameState:@finished:@step} </h6>\n  <div class=\"container\">\n    <div class=\"columns\" ui:for=\"row of board\">\n      <USubBoard \n        ui:for=\"col of row.cols\" \n        board=\"{board|subBoard:@row.id:@col.id}\" \n        subcol={col.id}\n        subrow={row.id} \n        available={col.available}\n        finished={col.finished}\n        uvalue={col.value} />\n    </div>\n  </div>\n</component>\n <!-- state=\"<-ustore.state\" handler=\"->ustore.stepcell\" -->\n <component id=\"UTTTPlayer\">\n\n  <ui:tag tag=\"PlayerController{type}\" player={pplayer} state=\"<-ustore.state\" handler=\"->ustore.airequest\" />\n  <div>\n    <h6>Select {name}</h6>      \n    <button ui:for=\"pl of :players\"  class=\"btn control btn-{pl.id|equals:@type|then:primary}\" data-player={pplayer} data-type=\"{pl.id}\" click=\"-> ustore.switch\">{pl.name}</button>\n  </div>\n</component> \n\n<component id=\"UTicTacToe\">\n  <div class=\"container\">\n    <div class=\"columns\">\n      <div class=\"column col-8 board\">\n        <UBoard board=\"<- ustore.board\" step=\"<- ustore.step\" finished=\"<- ustore.finished\" />\n      </div>\n      <!-- <div class=\"column col-1\"></div> -->\n      <div class=\"column col-2\">\n        <h6>Options</h6>\n        <button class=\"btn btn-error control\" click=\"->ustore.reset\">Reset</button>\n        <button class=\"btn btn-error control\" click=\"->ustore.airequest\">AI move</button>\n        <UTTTPlayer pplayer=\"1\" name=\"Cross\" type=\"<- ustore.cross\" />\n        <UTTTPlayer pplayer=\"2\" name=\"Circle\" type=\"<- ustore.circle\" />               \n      </div>\n    </div>\n  </div>\n</component> \n\n\n<component id=\"UlttictactoePage\">\n  <h4>UltimateTicTacToe</h4>\n\n  <UTTT ui:ref=\"ustore\" />\n  <UTicTacToe />\n</component>");

/***/ }),

/***/ "./app/res.js":
/*!********************!*\
  !*** ./app/res.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  top: {
    title: 'TicTacToe',
    sitemap: [{
      id: 'main',
      name: 'Info',
      icon2: 'home'
    }, {
      id: 'tictactoe',
      name: 'TicTacToe',
      icon: 'work'
    }, {
      id: 'ulttictactoe',
      name: 'UltimateTicTacToe',
      icon: 'work'
    }]
  },
  gameStates: {
    gameWinner: ['Red won', 'White won', 'Draw'],
    gameTurn: ['Red turn', 'White turn']
  },
  players: [{
    id: 0,
    name: 'Person'
  }, {
    id: 1,
    name: 'MCTS'
  }]
});

/***/ }),

/***/ "./app/ttt_store.js":
/*!**************************!*\
  !*** ./app/ttt_store.js ***!
  \**************************/
/*! exports provided: TTTStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TTTStore", function() { return TTTStore; });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable space-before-function-paren */
function reset() {
  var size = [0, 1, 2];
  return {
    board: size.map(function (row) {
      return {
        id: row,
        cols: size.map(function (col) {
          return {
            id: col,
            value: 0
          };
        })
      };
    }),
    step: 0,
    finished: false
  };
} // function checkWin(acc, cur){
//   return (acc&&(cur.value==player))
// }


function checkFinished(board, step) {
  if (step < 4) {
    return false;
  }

  var player = 1 + step % 2; // board.map()

  var _loop = function _loop(row) {
    if (board[row].cols.reduce(function (acc, cur) {
      return acc && cur.value === player;
    }, true)) {
      return {
        v: player
      };
    }

    if (board.reduce(function (acc, cur) {
      return acc && cur.cols[row].value === player;
    }, true)) {
      return {
        v: player
      };
    }
  };

  for (var row = 0; row < 3; row++) {
    var _ret = _loop(row);

    if (_typeof(_ret) === "object") return _ret.v;
  }

  if (board.reduce(function (acc, cur, ind) {
    return acc && cur.cols[ind].value === player;
  }, true)) {
    return player;
  }

  if (board.reduce(function (acc, cur, ind) {
    return acc && cur.cols[2 - ind].value === player;
  }, true)) {
    return player;
  }

  if (step === 8) {
    return 3;
  }

  return false;
}

var TTTStore =
/*#__PURE__*/
function () {
  function TTTStore() {
    _classCallCheck(this, TTTStore);
  }

  _createClass(TTTStore, [{
    key: "init",
    value: function init() {
      return reset();
    }
  }, {
    key: "onStep",
    value: function onStep(_ref, _ref2) {
      var col = _ref.col,
          row = _ref.row,
          value = _ref.value;
      var board = _ref2.board,
          step = _ref2.step,
          finished = _ref2.finished;

      if (!value && !finished) {
        board[row].cols[col].value = 1 + step % 2;
        finished = checkFinished(board, step);
        return {
          board: _toConsumableArray(board),
          step: step + 1,
          finished: finished
        };
      }
    } // setBoard(v) {
    //   this.board = v
    // }

  }, {
    key: "onReset",
    value: function onReset(_, _ref3) {
      var board = _ref3.board;

      for (var row = 0; row < 3; row++) {
        for (var col = 0; col < 3; col++) {
          board[row].cols[col].value = 0;
        }
      }

      return {
        board: _toConsumableArray(board),
        step: 0,
        finished: false
      };
    }
  }]);

  return TTTStore;
}();
;

/***/ }),

/***/ "./app/uttt_store.js":
/*!***************************!*\
  !*** ./app/uttt_store.js ***!
  \***************************/
/*! exports provided: UTTT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UTTT", function() { return UTTT; });
/* harmony import */ var _ai_uttt_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ai/uttt.js */ "./app/ai/uttt.js");
/* harmony import */ var _ai_mcts_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ai/mcts.js */ "./app/ai/mcts.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* eslint-disable space-before-function-paren */


var UTTT =
/*#__PURE__*/
function (_UTTTBoard) {
  _inherits(UTTT, _UTTTBoard);

  function UTTT() {
    _classCallCheck(this, UTTT);

    return _possibleConstructorReturn(this, _getPrototypeOf(UTTT).apply(this, arguments));
  }

  _createClass(UTTT, [{
    key: "init",
    value: function init() {
      return _objectSpread({}, this.reset(), {
        cross: 0,
        circle: 1
      });
    }
  }, {
    key: "getState",
    value: function getState() {
      return _objectSpread({}, this);
    }
  }, {
    key: "onStepcell",
    value: function onStepcell(cell, game) {
      if (this.toggledAI) {
        if (this.toggledAI !== 1 + game.step % 2) {
          var nextState = this.makeMove(cell, game);
          return _objectSpread({}, nextState, {
            '...': Promise.resolve(this.airequest(nextState))
          });
        }
      }

      return this.makeMove(cell, game);
    }
  }, {
    key: "onSwitch",
    value: function onSwitch(_ref) {
      var player = _ref.player,
          type = _ref.type;

      if (player === 1) {
        return _objectSpread({}, this, {
          cross: type
        });
      } else {
        return _objectSpread({}, this, {
          circle: type
        });
      }
    }
  }, {
    key: "onAirequest",
    value: function onAirequest() {
      return this.airequest(this);
    }
  }, {
    key: "onToggleai",
    value: function onToggleai(_ref2) {
      var state = _ref2.state;
      this.toggledAI = state;

      if (state === 1 + this.step % 2) {
        return this.airequest(this);
      }
    }
  }, {
    key: "onReset",
    value: function onReset(_, _ref3) {
      var board = _ref3.board;
      return _objectSpread({}, this.reset(), {
        cross: 0,
        circle: 1
      });
    }
  }, {
    key: "airequest",
    value: function airequest(state) {
      if (!this.montecarlo) {
        this.montecarlo = new _ai_mcts_js__WEBPACK_IMPORTED_MODULE_1__["MonteCarloTreeSearch"]();
      }

      return this.montecarlo.findNextmove(this.makeCopy(), 1 + state.step % 2);
    }
  }]);

  return UTTT;
}(_ai_uttt_js__WEBPACK_IMPORTED_MODULE_0__["UTTTBoard"]);
;

/***/ }),

/***/ "./node_modules/arrmatura/docs/index.js":
/*!**********************************************!*\
  !*** ./node_modules/arrmatura/docs/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

(function webpackUniversalModuleDefinition(root, factory) {
  if (( false ? undefined : _typeof2(exports)) === 'object' && ( false ? undefined : _typeof2(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else { var i, a; }
})(this, function () {
  return (
    /******/
    function (modules) {
      // webpackBootstrap

      /******/
      // The module cache

      /******/
      var installedModules = {};
      /******/

      /******/
      // The require function

      /******/

      function __webpack_require__(moduleId) {
        /******/

        /******/
        // Check if module is in cache

        /******/
        if (installedModules[moduleId]) {
          /******/
          return installedModules[moduleId].exports;
          /******/
        }
        /******/
        // Create a new module (and put it into the cache)

        /******/


        var module = installedModules[moduleId] = {
          /******/
          i: moduleId,

          /******/
          l: false,

          /******/
          exports: {}
          /******/

        };
        /******/

        /******/
        // Execute the module function

        /******/

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/

        /******/
        // Flag the module as loaded

        /******/

        module.l = true;
        /******/

        /******/
        // Return the exports of the module

        /******/

        return module.exports;
        /******/
      }
      /******/

      /******/

      /******/
      // expose the modules object (__webpack_modules__)

      /******/


      __webpack_require__.m = modules;
      /******/

      /******/
      // expose the module cache

      /******/

      __webpack_require__.c = installedModules;
      /******/

      /******/
      // define getter function for harmony exports

      /******/

      __webpack_require__.d = function (exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
          /******/
          Object.defineProperty(exports, name, {
            enumerable: true,
            get: getter
          });
          /******/
        }
        /******/

      };
      /******/

      /******/
      // define __esModule on exports

      /******/


      __webpack_require__.r = function (exports) {
        /******/
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          /******/
          Object.defineProperty(exports, Symbol.toStringTag, {
            value: 'Module'
          });
          /******/
        }
        /******/


        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        /******/
      };
      /******/

      /******/
      // create a fake namespace object

      /******/
      // mode & 1: value is a module id, require it

      /******/
      // mode & 2: merge all properties of value into the ns

      /******/
      // mode & 4: return value when already ns object

      /******/
      // mode & 8|1: behave like require

      /******/


      __webpack_require__.t = function (value, mode) {
        /******/
        if (mode & 1) value = __webpack_require__(value);
        /******/

        if (mode & 8) return value;
        /******/

        if (mode & 4 && _typeof2(value) === 'object' && value && value.__esModule) return value;
        /******/

        var ns = Object.create(null);
        /******/

        __webpack_require__.r(ns);
        /******/


        Object.defineProperty(ns, 'default', {
          enumerable: true,
          value: value
        });
        /******/

        if (mode & 2 && typeof value != 'string') for (var key in value) {
          __webpack_require__.d(ns, key, function (key) {
            return value[key];
          }.bind(null, key));
        }
        /******/

        return ns;
        /******/
      };
      /******/

      /******/
      // getDefaultExport function for compatibility with non-harmony modules

      /******/


      __webpack_require__.n = function (module) {
        /******/
        var getter = module && module.__esModule ?
        /******/
        function getDefault() {
          return module['default'];
        } :
        /******/
        function getModuleExports() {
          return module;
        };
        /******/

        __webpack_require__.d(getter, 'a', getter);
        /******/


        return getter;
        /******/
      };
      /******/

      /******/
      // Object.prototype.hasOwnProperty.call

      /******/


      __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/

      /******/
      // __webpack_public_path__

      /******/


      __webpack_require__.p = "";
      /******/

      /******/

      /******/
      // Load entry module and return exports

      /******/

      return __webpack_require__(__webpack_require__.s = 0);
      /******/
    }(
    /************************************************************************/

    /******/
    {
      /***/
      "./index.js":
      /*!******************!*\
        !*** ./index.js ***!
        \******************/

      /*! exports provided: launch */

      /***/
      function indexJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony import */


        var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! ./lib */
        "./lib/index.js");
        /* harmony reexport (safe) */


        __webpack_require__.d(__webpack_exports__, "launch", function () {
          return _lib__WEBPACK_IMPORTED_MODULE_0__["launch"];
        });
        /***/

      },

      /***/
      "./lib/compile.expr.js":
      /*!*****************************!*\
        !*** ./lib/compile.expr.js ***!
        \*****************************/

      /*! exports provided: withPipes, compileExpression */

      /***/
      function libCompileExprJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "withPipes", function () {
          return withPipes;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "compileExpression", function () {
          return compileExpression;
        });
        /* harmony import */


        var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! ./utils */
        "./lib/utils.js");

        function _toConsumableArray(arr) {
          return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
        }

        function _nonIterableSpread() {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }

        function _arrayWithoutHoles(arr) {
          if (Array.isArray(arr)) return _arrayLikeToArray(arr);
        }

        function _toArray(arr) {
          return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
        }

        function _nonIterableRest() {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }

        function _unsupportedIterableToArray(o, minLen) {
          if (!o) return;
          if (typeof o === "string") return _arrayLikeToArray(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          if (n === "Object" && o.constructor) n = o.constructor.name;
          if (n === "Map" || n === "Set") return Array.from(o);
          if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
        }

        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length) len = arr.length;

          for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i];
          }

          return arr2;
        }

        function _iterableToArray(iter) {
          if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
        }

        function _arrayWithHoles(arr) {
          if (Array.isArray(arr)) return arr;
        }

        var RE_SINGLE_PLACEHOLDER = /^\{([^}]+)\}$/;
        var RE_PLACEHOLDER = /\{([^}]+)\}/g;

        function pipe(value, key) {
          var _key$split = key.split(':'),
              _key$split2 = _toArray(_key$split),
              id = _key$split2[0],
              args = _key$split2.slice(1);

          try {
            var fn = this.pipes(id);
            var $ = this;
            return fn.apply($.impl, [value].concat(_toConsumableArray(args.map(function (a) {
              return a[0] === '@' ? $.container.get(a.slice(1)) : Object(_utils__WEBPACK_IMPORTED_MODULE_0__["parseValue"])(a);
            }))));
          } catch (ex) {
            console.error('ERROR: pipe ' + id, ex);
            return value;
          }
        }

        function withPipes(pipes) {
          return !pipes.length ? function (c, v) {
            return v;
          } : function (c, initialValue) {
            return pipes.reduce(function (r, pk) {
              return pipe.call(c, r, pk);
            }, initialValue);
          };
        }

        function stringInterpolation(v) {
          var fnx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
          var pattern = v.replace(RE_PLACEHOLDER, function (_, expr) {
            fnx.push(placeholder(expr));
            return '{{' + (fnx.length - 1) + '}}';
          });
          return function (c) {
            return !fnx.length ? pattern : pattern.replace(/\{\{(\d+)\}\}/g, function (s, idx) {
              var r = fnx[idx](c);
              return !r && r !== 0 ? '' : r;
            });
          };
        }

        function resourceExpression(expr) {
          var _expr$split$map = expr.split('|').map(function (s) {
            return s.trim();
          }),
              _expr$split$map2 = _toArray(_expr$split$map),
              key = _expr$split$map2[0],
              pipes = _expr$split$map2.slice(1);

          var intrpltn = stringInterpolation(key);
          return !pipes.length ? function (c) {
            return c.res(intrpltn(c));
          } : function (pipec) {
            return function (c) {
              return pipec(c, c.res(intrpltn(c)));
            };
          }(withPipes(pipes));
        }

        function placeholder(expr) {
          var _expr$split$map3 = expr.split('|').map(function (s) {
            return s.trim();
          }),
              _expr$split$map4 = _toArray(_expr$split$map3),
              key = _expr$split$map4[0],
              pipes = _expr$split$map4.slice(1);

          var fn = key[0] === ':' ? function (c) {
            return c.res(key.slice(1));
          } : function (c) {
            return c.container.get(key);
          };
          if (!pipes.length) return fn;
          return function (c) {
            return pipes.reduce(function (r, pk) {
              return pipe.call(c, r, pk);
            }, fn(c));
          };
        }

        function compileExpression(v) {
          if (typeof v !== 'string') {
            return function () {
              return v;
            };
          }

          if (v[0] === ':') {
            return resourceExpression(v.slice(1).trim());
          }

          if (!v.includes('{')) {
            var vv = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["parseValue"])(v);
            return function () {
              return vv;
            };
          }

          if (v.match(RE_SINGLE_PLACEHOLDER)) {
            return placeholder(v.slice(1, -1).trim());
          }

          return stringInterpolation(v);
        }
        /***/

      },

      /***/
      "./lib/compile.js":
      /*!************************!*\
        !*** ./lib/compile.js ***!
        \************************/

      /*! exports provided: compiledNodeMap, compileFor, compileIf, compileTag, compileRegularNode, compileNode, compileTemplate */

      /***/
      function libCompileJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "compiledNodeMap", function () {
          return compiledNodeMap;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "compileFor", function () {
          return compileFor;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "compileIf", function () {
          return compileIf;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "compileTag", function () {
          return compileTag;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "compileRegularNode", function () {
          return compileRegularNode;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "compileNode", function () {
          return compileNode;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "compileTemplate", function () {
          return compileTemplate;
        });
        /* harmony import */


        var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! ./node */
        "./lib/node.js");
        /* harmony import */


        var _compile_expr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./compile.expr */
        "./lib/compile.expr.js");
        /* harmony import */


        var _xml_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./xml.js */
        "./lib/xml.js");
        /* harmony import */


        var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        /*! ./utils */
        "./lib/utils.js");

        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }

          return obj;
        }

        function _slicedToArray(arr, i) {
          return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
        }

        function _nonIterableRest() {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }

        function _unsupportedIterableToArray(o, minLen) {
          if (!o) return;
          if (typeof o === "string") return _arrayLikeToArray(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          if (n === "Object" && o.constructor) n = o.constructor.name;
          if (n === "Map" || n === "Set") return Array.from(o);
          if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
        }

        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length) len = arr.length;

          for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i];
          }

          return arr2;
        }

        function _iterableToArrayLimit(arr, i) {
          if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = undefined;

          try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);

              if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i["return"] != null) _i["return"]();
            } finally {
              if (_d) throw _e;
            }
          }

          return _arr;
        }

        function _arrayWithHoles(arr) {
          if (Array.isArray(arr)) return arr;
        }

        var compiledNodeMap = function compiledNodeMap(nodes) {
          return nodes ? nodes.map(compileNode).reduce(function (map, node) {
            return map.set(node.uid, node);
          }, new Map()) : null;
        };

        function compileFor(r) {
          var _r$extractAttr$split = r.extractAttr('ui:for').split(' '),
              _r$extractAttr$split2 = _slicedToArray(_r$extractAttr$split, 3),
              itemName = _r$extractAttr$split2[0],
              prep = _r$extractAttr$split2[1],
              _r$extractAttr$split3 = _r$extractAttr$split2[2],
              expr = _r$extractAttr$split3 === void 0 ? prep : _r$extractAttr$split3;

          return compileNode(new _node__WEBPACK_IMPORTED_MODULE_0__["Node"]('ui:for', new Map([['items', '{:<'.includes(expr[0]) ? expr : "{".concat(expr, "}")]]), [new _node__WEBPACK_IMPORTED_MODULE_0__["Node"]('ui:item', new Map([['itemName', itemName]]), [r])]));
        }

        function compileIf(r) {
          var tag = r.tag,
              nodes = r.nodes;

          var _filterMapKey = Object(_utils__WEBPACK_IMPORTED_MODULE_3__["filterMapKey"])(r.attrs, 'ui:if'),
              _filterMapKey2 = _slicedToArray(_filterMapKey, 2),
              expr = _filterMapKey2[0],
              attrs = _filterMapKey2[1];

          var iff = {};
          var ifNode = new _node__WEBPACK_IMPORTED_MODULE_0__["Node"]('ui:fragment');

          if (expr[0] === '<' && expr[1] === '-') {
            ifNode.addPropertyConnector(expr, function (condition) {
              return {
                condition: condition
              };
            });
          } else if (expr.slice(0, 5) === 'slot(') {
            ifNode.addPropertyResolver(function (slotId) {
              return function (c) {
                return Object(_utils__WEBPACK_IMPORTED_MODULE_3__["hasSlot"])(c, slotId);
              };
            }(expr.slice(5, -1)), 'condition');
          } else {
            ifNode.addPropertyResolver(Object(_compile_expr__WEBPACK_IMPORTED_MODULE_1__["compileExpression"])(expr[0] === '{' ? expr : "{".concat(expr, "}")), 'condition');
          }

          var $then = new _node__WEBPACK_IMPORTED_MODULE_0__["Node"](tag, attrs, nodes);

          if (nodes && nodes.length) {
            var ifElse = nodes.find(function (e) {
              return e.tag === 'ui:else';
            });
            var ifThen = nodes.find(function (e) {
              return e.tag === 'ui:then';
            });

            if (ifElse) {
              iff["else"] = compiledNodeMap(ifElse.nodes);
              $then.nodes = ifThen ? ifThen.nodes : nodes.filter(function (e) {
                return e !== ifElse;
              });
            } else if (ifThen) {
              $then.nodes = ifThen.nodes;
            }
          }

          iff.then = compiledNodeMap([$then]);
          return Object.assign(ifNode, {
            getNodes: function getNodes($) {
              return $.state.condition ? iff.then : iff["else"];
            }
          });
        }

        function compileTag(r) {
          var uid0 = r.uid,
              nodes = r.nodes;

          var _filterMapKey3 = Object(_utils__WEBPACK_IMPORTED_MODULE_3__["filterMapKey"])(r.attrs, 'tag'),
              _filterMapKey4 = _slicedToArray(_filterMapKey3, 2),
              expr = _filterMapKey4[0],
              attrs = _filterMapKey4[1];

          var node = compileRegularNode(new _node__WEBPACK_IMPORTED_MODULE_0__["Node"]('', attrs, nodes));

          if (expr[0] === '<' && expr[1] === '-') {
            r.addPropertyConnector(expr, function (tag) {
              return {
                tag: tag
              };
            });
          } else {
            r.addPropertyResolver(Object(_compile_expr__WEBPACK_IMPORTED_MODULE_1__["compileExpression"])(expr), 'tag');
          }

          return Object.assign(r, {
            tag: 'ui:fragment',
            getNodes: function getNodes($) {
              var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : $.state.tag;
              var uid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : uid0 + ':' + tag;
              return Object(_utils__WEBPACK_IMPORTED_MODULE_3__["wrapNode"])(Object.assign(node, {
                tag: tag,
                uid: uid
              }));
            }
          });
        }

        function compileRegularNode(r) {
          r.attrs.forEach(function (v, k) {
            if (k === 'id') {
              r.id = v;
              r.addInitialState(_defineProperty({}, k, v));
            } else if (k === 'ui:ref') {
              r.refId = v;
            } else if (k === 'ui:props') {
              if (v[0] === '<' && v[1] === '-') {
                r.addPropertyConnector(v, Function.ID);
              } else {
                r.addPropertyResolver(Object(_compile_expr__WEBPACK_IMPORTED_MODULE_1__["compileExpression"])(v));
              }
            } else {
              if (typeof v !== 'string') {
                r.addInitialState(_defineProperty({}, k, v));
              } else {
                if (v[0] === '<' && v[1] === '-') {
                  r.addPropertyConnector(v, function (rr) {
                    return _defineProperty({}, k, rr);
                  });
                } else if (v[0] === '-' && v[1] === '>') {
                  r.addEmitter(v, k);
                } else {
                  if (!v.includes('{') && v[0] !== ':') {
                    r.addInitialState(_defineProperty({}, k, v));
                  } else {
                    r.addPropertyResolver(Object(_compile_expr__WEBPACK_IMPORTED_MODULE_1__["compileExpression"])(v), k);
                  }
                }
              }
            }
          });
          return Object.assign(r, {
            nodeMap: compiledNodeMap(r.nodes)
          });
        }

        function compileNode(node) {
          if (node.attrs.has('ui:for')) {
            return compileFor(node);
          }

          if (node.attrs.has('ui:if')) {
            return compileIf(node);
          }

          if (node.tag === 'ui:tag') {
            return compileTag(node);
          }

          return compileRegularNode(node);
        }

        function compileTemplate(text, name) {
          try {
            var T = compiledNodeMap(text ? Object(_xml_js__WEBPACK_IMPORTED_MODULE_2__["parseXML"])(text, name).nodes : []);
            return T;
          } catch (ex) {
            // eslint-disable-next-line no-console
            console.error('compile ' + name, ex);
          }

          return [];
        }
        /***/

      },

      /***/
      "./lib/component.js":
      /*!**************************!*\
        !*** ./lib/component.js ***!
        \**************************/

      /*! exports provided: ContainerComponent */

      /***/
      function libComponentJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "ContainerComponent", function () {
          return ContainerComponent;
        });
        /* harmony import */


        var _component_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! ./component.utils */
        "./lib/component.utils.js");
        /* harmony import */


        var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./utils.js */
        "./lib/utils.js");
        /* harmony import */


        var _register_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./register.js */
        "./lib/register.js");
        /* harmony import */


        var _element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        /*! ./element */
        "./lib/element.js");

        function _typeof(obj) {
          "@babel/helpers - typeof";

          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function _get(target, property, receiver) {
          if (typeof Reflect !== "undefined" && Reflect.get) {
            _get = Reflect.get;
          } else {
            _get = function _get(target, property, receiver) {
              var base = _superPropBase(target, property);

              if (!base) return;
              var desc = Object.getOwnPropertyDescriptor(base, property);

              if (desc.get) {
                return desc.get.call(receiver);
              }

              return desc.value;
            };
          }

          return _get(target, property, receiver || target);
        }

        function _superPropBase(object, property) {
          while (!Object.prototype.hasOwnProperty.call(object, property)) {
            object = _getPrototypeOf(object);
            if (object === null) break;
          }

          return object;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };

          return _setPrototypeOf(o, p);
        }

        function _createSuper(Derived) {
          var hasNativeReflectConstruct = _isNativeReflectConstruct();

          return function _createSuperInternal() {
            var Super = _getPrototypeOf(Derived),
                result;

            if (hasNativeReflectConstruct) {
              var NewTarget = _getPrototypeOf(this).constructor;

              result = Reflect.construct(Super, arguments, NewTarget);
            } else {
              result = Super.apply(this, arguments);
            }

            return _possibleConstructorReturn(this, result);
          };
        }

        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === "object" || typeof call === "function")) {
            return call;
          }

          return _assertThisInitialized(self);
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return self;
        }

        function _isNativeReflectConstruct() {
          if (typeof Reflect === "undefined" || !Reflect.construct) return false;
          if (Reflect.construct.sham) return false;
          if (typeof Proxy === "function") return true;

          try {
            Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
            return true;
          } catch (e) {
            return false;
          }
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }

        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }

          return obj;
        }

        function _slicedToArray(arr, i) {
          return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
        }

        function _nonIterableRest() {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }

        function _unsupportedIterableToArray(o, minLen) {
          if (!o) return;
          if (typeof o === "string") return _arrayLikeToArray(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          if (n === "Object" && o.constructor) n = o.constructor.name;
          if (n === "Map" || n === "Set") return Array.from(o);
          if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
        }

        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length) len = arr.length;

          for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i];
          }

          return arr2;
        }

        function _iterableToArrayLimit(arr, i) {
          if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = undefined;

          try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);

              if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i["return"] != null) _i["return"]();
            } finally {
              if (_d) throw _e;
            }
          }

          return _arr;
        }

        function _arrayWithHoles(arr) {
          if (Array.isArray(arr)) return arr;
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }
        /* eslint-disable no-console */

        /**
         * Component class.
         */


        var Component =
        /*#__PURE__*/
        function () {
          function Component(Ctor, node, parent, container) {
            var _this = this;

            _classCallCheck(this, Component);

            Object.assign(this, {
              node: node,
              uid: node.uid,
              tag: node.tag,
              id: node.id,
              state: {},
              parent: parent,
              container: container
            });

            if (parent) {
              this.parent = parent;
              this.app = parent.app;
              this.impl = new Ctor(this.getInitialState(), this);
            } else {
              this.impl = this.app = new Ctor(this.getInitialState(), this);
            }

            this.impl.$ = this;

            if (this.refId) {
              var hidden = this.app[this.refId];
              this.app[this.refId] = this;
              this.defer(function () {
                _this.app[_this.refId] = hidden;
              });
            }
          }

          _createClass(Component, [{
            key: "getInitialState",
            value: function getInitialState() {
              return this.node.resolveProps(this, true);
            } // --- State

          }, {
            key: "up",
            value: function up() {
              var _this2 = this;

              var Δ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
              var force = arguments.length > 1 ? arguments[1] : undefined;

              if (this.isDone) {
                return null;
              }

              if (Δ.then && Δ["catch"]) {
                return Object(_component_utils__WEBPACK_IMPORTED_MODULE_0__["upAsync"])(this, Δ);
              }

              var changes = [];
              Object.entries(Δ).forEach(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    k = _ref2[0],
                    v = _ref2[1];

                if (v && v.then && v["catch"]) {
                  Object(_component_utils__WEBPACK_IMPORTED_MODULE_0__["upAsync"])(_this2, v, k);
                } else if (k && typeof v !== 'undefined' && v !== _this2.state[k]) {
                  changes.push([v, k]);
                  _this2.state[k] = v;
                }
              });

              if (changes.length || force) {
                if (this.impl.stateChanged) {
                  this.impl.stateChanged(changes);
                } else {
                  changes.forEach(function (_ref3) {
                    var _ref4 = _slicedToArray(_ref3, 2),
                        v = _ref4[0],
                        k = _ref4[1];

                    var setter = _this2.impl[Object(_component_utils__WEBPACK_IMPORTED_MODULE_0__["methodName"])(k, 'set')];

                    if (setter) {
                      setter.call(_this2.impl, v);
                    } else {
                      _this2.impl[k] = v;
                    }
                  });
                }

                this.recontent();

                if (this.refId) {
                  this.notify();
                }
              }
            }
          }, {
            key: "get",
            value: function get(propId) {
              return Object(_component_utils__WEBPACK_IMPORTED_MODULE_0__["propGetter"])(this, propId)();
            } // --- Left Arrow.

          }, {
            key: "notify",
            value: function notify() {
              if (this.listeners && !this.notifying) {
                this.notifying = true;
                this.listeners.forEach(function (e) {
                  return e();
                });
                this.notifying = false;
              }
            }
          }, {
            key: "subscribe",
            value: function subscribe(target, fn) {
              var _this3 = this;

              var uuid = Object(_component_utils__WEBPACK_IMPORTED_MODULE_0__["nextId"])();
              var listeners = this.listeners || (this.listeners = new Map());
              listeners.set(uuid, function () {
                try {
                  target.up(fn(_this3));
                } catch (ex) {
                  console.error(_this3.tag + _this3.uid + ' notify ', ex);
                }
              });
              return {
                payload: fn(this),
                cancel: function cancel() {
                  return listeners["delete"](uuid);
                }
              };
            }
          }, {
            key: "connect",
            value: function connect(key, applicator) {
              var _key$split = key.split('.'),
                  _key$split2 = _slicedToArray(_key$split, 2),
                  refId = _key$split2[0],
                  propId = _key$split2[1];

              var ref = refId === 'this' ? this.impl : this.app[refId];

              if (!ref) {
                return console.error('connect: No such ref ' + refId, key);
              }

              return ref.subscribe(this, function (c) {
                return Object(_component_utils__WEBPACK_IMPORTED_MODULE_0__["applyValue"])(c.get(propId), applicator);
              });
            } // --- Right Arrow.

          }, {
            key: "emit",
            value: function emit(key, data) {
              var $ = this;

              if (!key || !key.includes('.')) {
                return $.up(key ? _defineProperty({}, key, data) : data);
              }

              var _key$split3 = key.split('.'),
                  _key$split4 = _slicedToArray(_key$split3, 2),
                  type = _key$split4[0],
                  target = _key$split4[1]; // const event = { data, ...data }


              var ref = type === 'this' ? $ : $.app[type];

              if (!ref) {
                console.warn('emit: No such ref ' + type);
                return;
              }

              try {
                var propId = Object(_component_utils__WEBPACK_IMPORTED_MODULE_0__["methodName"])(target, 'on');
                var impl = ref.impl;
                var method = impl[propId];

                if (!method) {
                  Function["throw"]('emit ' + type + ': No such method ' + propId);
                }

                var result = method.call(impl, data, impl, ref);
                this.log(type + ':' + propId, result, data, impl);

                if (result) {
                  ref.up(result);
                }
              } catch (ex) {
                console.error('emit ' + key + ':', ex);
              }
            } // --- Life-cycle hooks.

          }, {
            key: "init",
            value: function init(initials) {
              var _this4 = this;

              if (this.isDone || this.isInited) {
                return;
              }

              this.isInited = true;
              var all = [];
              var initializers = this.node.initializers;

              if (initializers && initializers.length) {
                initializers.map(function (f) {
                  return f(_this4);
                }).forEach(function (r) {
                  if (!r) return;
                  var payload = r.payload,
                      cancel = r.cancel;

                  _this4.defer(cancel);

                  if (payload && payload.then) {
                    all.push(payload);
                  } else {
                    Object.assign(initials, payload);
                  }
                });
              }

              if (all.length) {
                Promise.all(all).then(function (args) {
                  _this4.up(args.reduce(function (r, e) {
                    return Object.assign(r, e);
                  }, initials), true);

                  if (_this4.impl.init) {
                    var d = _this4.impl.init(_this4);

                    if (d) {
                      _this4.up(d);
                    }
                  }
                });
              } else {
                this.up(initials, true);

                if (this.impl.init) {
                  var d = this.impl.init(this);

                  if (d) {
                    this.up(d);
                  }
                }
              }

              return this;
            }
          }, {
            key: "done",
            value: function done() {
              var _this5 = this;

              if (this.isDone) {
                return;
              }

              this.isDone = true;

              if (this.impl.done) {
                this.impl.done(this);
              }

              if (this.children) {
                this.children.forEach(function (c) {
                  c.parent = null;
                  c.done();
                });
              }

              if (this.parent) {
                this.parent.children["delete"](this.uid);
              }

              if (this.defered) {
                this.defered.forEach(function (f) {
                  return f(_this5);
                });
                delete this.defered;
              }

              this.impl.$ = null;
              ['parent', 'app', 'children', 'container', 'impl', 'state'].forEach(function (k) {
                delete _this5[k];
              });
            } // --- Routines.

          }, {
            key: "raceCondition",
            value: function raceCondition(key) {
              var COUNTERS = this.$weak || (this.$weak = new Map());
              var counter = 1 + (COUNTERS.get(key) || 0);
              COUNTERS.set(key, counter);
              return function (fn) {
                if (counter === COUNTERS.get(key)) {
                  counter = 0;
                  fn();
                }
              };
            }
          }, {
            key: "defer",
            value: function defer(fn) {
              if (fn && typeof fn === 'function') {
                (this.defered || (this.defered = [])).push(fn);
              }
            }
          }, {
            key: "log",
            value: function log() {
              var _console;

              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              (_console = console).log.apply(_console, ['' + this.tag + '@' + this.uid].concat(args));
            }
          }, {
            key: "res",
            value: function res(key) {
              return Object(_component_utils__WEBPACK_IMPORTED_MODULE_0__["res"])(this.app, key);
            }
          }, {
            key: "pipes",
            value: function pipes(key) {
              return Object(_component_utils__WEBPACK_IMPORTED_MODULE_0__["pipes"])(this.app, key);
            }
          }, {
            key: "toString",
            value: function toString() {
              return Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["stringifyComponent"])(this);
            } // --- Content Reconciliation.

          }, {
            key: "recontent",
            value: function recontent() {
              _recontent(this, this.container, this.content);
            }
          }, {
            key: "refId",
            get: function get() {
              return this.node.refId;
            }
          }, {
            key: "content",
            get: function get() {
              return this.node.getNodes ? this.node.getNodes(this) : this.node.nodeMap;
            }
          }]);

          return Component;
        }();

        function _recontent(parent, container, content) {
          parent.last = parent.first = null;
          container.app.requestReflow();
          (parent.children || Array.EMPTY).forEach(function (c) {
            return !content || !content.has(c.uid) ? c.done() : 0;
          });
          if (!content || !content.size) return;
          var children = parent.children || (parent.children = new Map());
          var p = null;
          content.forEach(function (node, uid) {
            var c = null;

            if (node.tag === 'ui:slot') {
              var snode = node.clone(node.uid);
              snode.id = node.id;
              snode.nodeMap = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["filterSlotNodes"])(node.id, container);
              c = children.get(uid) || Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["setNodeMap"])(children, new Component(Object(_register_js__WEBPACK_IMPORTED_MODULE_2__["getByTag"])('ui:fragment'), snode, parent, container.container));
            } else {
              c = children.get(uid);

              if (!c) {
                var Registered = Object(_register_js__WEBPACK_IMPORTED_MODULE_2__["getByTag"])(node.tag);
                var Ctor = Ctors[node.tag] || (Registered ? ContainerComponent : Component);
                c = Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["setNodeMap"])(children, new Ctor(Registered || _element__WEBPACK_IMPORTED_MODULE_3__["Element"], node, parent, container));
              }
            }

            c.next = null;
            p = (p || parent)[p ? 'next' : 'first'] = c;
          });
          children.forEach(function (c) {
            return !c.isInited ? c.init(c.node.resolveProps(c, true)) : c.up(c.node.resolveProps(c, false), true);
          });
        }

        var ContainerComponent =
        /*#__PURE__*/
        function (_Component) {
          _inherits(ContainerComponent, _Component);

          var _super = _createSuper(ContainerComponent);

          function ContainerComponent() {
            _classCallCheck(this, ContainerComponent);

            return _super.apply(this, arguments);
          }

          _createClass(ContainerComponent, [{
            key: "recontent",
            value: function recontent() {
              _recontent(this, this, this.impl.constructor.getTemplate());
            }
          }]);

          return ContainerComponent;
        }(Component);

        var ForComponent =
        /*#__PURE__*/
        function (_Component2) {
          _inherits(ForComponent, _Component2);

          var _super2 = _createSuper(ForComponent);

          function ForComponent() {
            _classCallCheck(this, ForComponent);

            return _super2.apply(this, arguments);
          }

          _createClass(ForComponent, [{
            key: "recontent",
            value: function recontent() {
              var _this6 = this;

              var nodes = new Map();
              var items = this.state.items;

              if (items && items.length) {
                if (!items.forEach) {
                  Function["throw"]('[ui:for] Items has no forEach() ' + items);
                }

                var itemNode = this.node.nodes[0];
                var itemName = itemNode.get('itemName');
                this.pkHash = {};
                items.forEach(function (datum) {
                  var pk = "".concat(datum.id || '');

                  if (pk == null || _this6.pkHash[pk]) {
                    console.error('ERROR: empty/duplicate item id: ' + pk, datum);
                    return;
                  }

                  _this6.pkHash[pk] = datum;
                  Object(_utils_js__WEBPACK_IMPORTED_MODULE_1__["setNodeMap"])(nodes, itemNode.clone(_this6.uid + '#' + pk).addPropertyResolver(function () {
                    return _this6.pkHash[pk];
                  }, itemName));
                });
              }

              _recontent(this, this.container, nodes);
            }
          }]);

          return ForComponent;
        }(Component);

        var ItemComponent =
        /*#__PURE__*/
        function (_Component3) {
          _inherits(ItemComponent, _Component3);

          var _super3 = _createSuper(ItemComponent);

          function ItemComponent() {
            _classCallCheck(this, ItemComponent);

            return _super3.apply(this, arguments);
          }

          _createClass(ItemComponent, [{
            key: "recontent",
            value: function recontent() {
              _recontent(this, this, this.content);
            }
          }, {
            key: "emit",
            value: function emit(key, data) {
              return this.container.emit(key, data);
            }
          }, {
            key: "get",
            value: function get(propId) {
              return propId.startsWith(this.state.itemName) ? _get(_getPrototypeOf(ItemComponent.prototype), "get", this).call(this, propId) : this.container.get(propId);
            }
          }]);

          return ItemComponent;
        }(Component);

        var Ctors = {
          'ui:fragment': Component,
          'ui:for': ForComponent,
          'ui:item': ItemComponent
        };
        /***/
      },

      /***/
      "./lib/component.utils.js":
      /*!********************************!*\
        !*** ./lib/component.utils.js ***!
        \********************************/

      /*! exports provided: nextId, applyValue, methodName, upAsync, propGetter, res, pipes */

      /***/
      function libComponentUtilsJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "nextId", function () {
          return nextId;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "applyValue", function () {
          return applyValue;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "methodName", function () {
          return methodName;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "upAsync", function () {
          return upAsync;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "propGetter", function () {
          return propGetter;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "res", function () {
          return res;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "pipes", function () {
          return pipes;
        });

        function _toArray(arr) {
          return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
        }

        function _nonIterableRest() {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }

        function _unsupportedIterableToArray(o, minLen) {
          if (!o) return;
          if (typeof o === "string") return _arrayLikeToArray(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          if (n === "Object" && o.constructor) n = o.constructor.name;
          if (n === "Map" || n === "Set") return Array.from(o);
          if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
        }

        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length) len = arr.length;

          for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i];
          }

          return arr2;
        }

        function _iterableToArray(iter) {
          if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
        }

        function _arrayWithHoles(arr) {
          if (Array.isArray(arr)) return arr;
        }

        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }

          return obj;
        }

        var COUNTER = 1;

        var fnId = function fnId(e) {
          return e;
        };

        var nextId = function nextId() {
          var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
          return p + COUNTER++;
        };

        var applyValue = function applyValue(value) {
          var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : fnId;
          return value && value.then ? value.then(fn) : fn(value);
        };

        var methodName = function methodName(x) {
          var pre = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

          if (!x) {
            return pre;
          }

          var s = "".concat(x);
          return pre + s[0].toUpperCase() + s.slice(1);
        };

        var upAsync = function upAsync($, promise, key) {
          var racer = $.raceCondition('set:' + (key || 'up'));

          var up = function up(r) {
            return racer(function () {
              return $.up(r);
            });
          };

          if (key && key !== '...') {
            var akey = key.replace('Promise', '');
            promise.then(function (val) {
              var _up;

              return up((_up = {}, _defineProperty(_up, akey + 'Error', null), _defineProperty(_up, akey, val), _up));
            }, function (error) {
              return up(_defineProperty({}, akey + 'Error', error));
            });
          } else {
            promise.then(up, function (error) {
              return up({
                error: error
              });
            });
          }

          return promise;
        };

        var propGetter = function propGetter($, key) {
          var map = $.$propFnMap || ($.$propFnMap = {});
          var fn = map[key];

          if (fn) {
            return fn;
          }

          var impl = $.impl;
          var instant = impl[key];

          if (instant && typeof instant === 'function') {
            var bound = instant.bind(impl);

            fn = function fn() {
              return bound;
            };
          } else {
            var _key$split = key.split('.'),
                _key$split2 = _toArray(_key$split),
                pk = _key$split2[0],
                path = _key$split2.slice(1);

            var gettr = impl[methodName(pk, 'get')];
            var fn0 = gettr ? function () {
              return gettr.call(impl);
            } : function () {
              return impl[pk];
            };
            fn = !path.length ? fn0 : function () {
              return path.reduce(function (r, p) {
                return r && p in r ? r[p] : undefined;
              }, fn0());
            };
          }

          map[key] = fn;
          return fn;
        };

        var res = function res(app, key) {
          var _key$split3 = key.split('.'),
              _key$split4 = _toArray(_key$split3),
              id = _key$split4[0],
              deep = _key$split4.slice(1);

          var target = id === 'app' ? app : app.resources[id];

          if (!target || deep.length === 0) {
            return target;
          }

          if (deep.length === 1) {
            return target[deep[0]];
          }

          return deep.reduce(function (r, k) {
            return r ? r[k] : null;
          }, target);
        };

        var pipes = function pipes(app, key) {
          var _key$split5 = key.split('.'),
              _key$split6 = _toArray(_key$split5),
              id = _key$split6[0],
              deep = _key$split6.slice(1);

          var target = app.pipes && app.pipes[id];

          if (!target || deep.length === 0) {
            return target;
          }

          if (deep.length === 1) {
            return target[deep[0]];
          }

          return deep.reduce(function (r, k) {
            return r ? r[k] : null;
          }, target);
        };
        /***/

      },

      /***/
      "./lib/dom.attrs.js":
      /*!**************************!*\
        !*** ./lib/dom.attrs.js ***!
        \**************************/

      /*! exports provided: applyAttributes, cleanupAttributes */

      /***/
      function libDomAttrsJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "applyAttributes", function () {
          return applyAttributes;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "cleanupAttributes", function () {
          return cleanupAttributes;
        });

        function _slicedToArray(arr, i) {
          return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
        }

        function _nonIterableRest() {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }

        function _unsupportedIterableToArray(o, minLen) {
          if (!o) return;
          if (typeof o === "string") return _arrayLikeToArray(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          if (n === "Object" && o.constructor) n = o.constructor.name;
          if (n === "Map" || n === "Set") return Array.from(o);
          if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
        }

        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length) len = arr.length;

          for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i];
          }

          return arr2;
        }

        function _iterableToArrayLimit(arr, i) {
          if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = undefined;

          try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);

              if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i["return"] != null) _i["return"]();
            } finally {
              if (_d) throw _e;
            }
          }

          return _arr;
        }

        function _arrayWithHoles(arr) {
          if (Array.isArray(arr)) return arr;
        }

        function ownKeys(object, enumerableOnly) {
          var keys = Object.keys(object);

          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            if (enumerableOnly) symbols = symbols.filter(function (sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
            keys.push.apply(keys, symbols);
          }

          return keys;
        }

        function _objectSpread(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};

            if (i % 2) {
              ownKeys(Object(source), true).forEach(function (key) {
                _defineProperty(target, key, source[key]);
              });
            } else if (Object.getOwnPropertyDescriptors) {
              Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
            } else {
              ownKeys(Object(source)).forEach(function (key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
              });
            }
          }

          return target;
        }

        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }

          return obj;
        }

        var camelize = function camelize(key) {
          var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_';
          var jn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ' ';
          return ('' + key).split(sep).map(function (s, i) {
            return i ? s[0].toUpperCase() + s.slice(1) : s;
          }).join(jn);
        }; // DOM


        var ATTR_SETTERS = {
          '#text': function text(e, v) {
            return e.textContent = v == null ? '' : v;
          },
          disabled: function disabled(e, v) {
            return e.disabled = v ? true : null;
          },
          "class": function _class(e, v) {
            e.className = v;
          },
          selected: function selected(e, v) {
            return e.selected = v ? true : null;
          },
          value: function value(e, v) {
            return e.value = v == null ? '' : v;
          },
          checked: function checked(e, v) {
            return e.checked = !!v;
          },
          init: function init(e, v) {
            var _this = this;

            this.init = function () {
              return v(e, _this);
            };
          },
          data: function data(e, v) {
            if (v && e.$dataset) {
              Object.keys(e.$dataset).forEach(function (k) {
                if (v[k] == null) {
                  e.dataset[camelize(k, '-', '')] = null;
                }
              });
              e.$dataset = _objectSpread(_objectSpread({}, e.$dataset), v);
            } else {
              e.$dataset = v ? _objectSpread({}, v) : e.$dataset || {};
            }

            if (v) {
              Object.keys(v).forEach(function (k) {
                e.dataset[camelize(k, '-', '')] = v[k];
              });
            }
          },
          click: function click(e, v) {
            var _this2 = this;

            setAttribute.call(this, 'click:click', !v ? null : function (ev) {
              _this2.$attributes.click(_objectSpread({}, e.$dataset), ev);

              return false;
            });
          },
          'bubble-click': function bubbleClick(e, v) {
            var _this3 = this;

            setAttribute.call(this, 'bubbled-click:click', !v ? null : function (ev) {
              _this3.$attributes['bubble-click'](_objectSpread({}, e.$dataset), ev);

              return true;
            });
          },
          blur: function blur(e, v) {
            var _this4 = this;

            setAttribute.call(this, 'blur:blur', !v ? null : function (ev) {
              _this4.$attributes.blur(_objectSpread({}, e.$dataset), ev);

              return false;
            });
          },
          dblclick: function dblclick(e, v) {
            var _this5 = this;

            setAttribute.call(this, 'dblclick:dblclick', !v ? null : function (ev) {
              _this5.$attributes.dblclick(_objectSpread({}, e.$dataset), ev);

              return false;
            });
          },
          scroll: function scroll(e, v) {
            var _this6 = this;

            setAttribute.call(this, 'scroll:scroll', !v ? null : function (ev) {
              _this6.$attributes.scroll(_objectSpread({}, e.$dataset), ev);

              return false;
            });
          },
          touchstart: function touchstart(e, v) {
            var _this7 = this;

            var h = !v ? null : function (ev) {
              _this7.$attributes.touchstart(_objectSpread(_objectSpread({}, e.$dataset), {}, {
                x: ev.pageX || ev.changedTouches[0].screenX,
                y: ev.pageY || ev.changedTouches[0].screenY
              }), ev);

              return false;
            };
            setAttribute.call(this, 'touchstart:touchstart', h);
            setAttribute.call(this, 'touchstart:mousedown', h);
          },
          touch: function touch(e, v) {
            var _this8 = this;

            var data = _objectSpread({}, e.$dataset);

            var hs = !v ? null : function (ev) {
              data.active = true;
              data.x = ev.pageX || ev.changedTouches[0].screenX;
              data.y = ev.pageY || ev.changedTouches[0].screenY;
              return false;
            };
            setAttribute.call(this, 'touch:touchstart', hs);
            setAttribute.call(this, 'touch:mousedown', hs);
            var h = !v ? function () {
              return null;
            } : function (stop) {
              return function (ev) {
                if (data.active) {
                  data.active = !stop;
                  data.xx = ev.pageX || ev.changedTouches[0].screenX;
                  data.yy = ev.pageY || ev.changedTouches[0].screenY;
                  data.dx = data.xx - data.x;
                  data.dy = data.yy - data.y;

                  _this8.$attributes.touch(data, ev);
                }

                return false;
              };
            };
            setAttribute.call(this, 'touch:touchcancel', h(true));
            setAttribute.call(this, 'touch:touchend', h(true));
            setAttribute.call(this, 'touch:mouseup', h(true));
            setAttribute.call(this, 'touch:touchmove', h(false));
            setAttribute.call(this, 'touch:mousemove', h(false));
          },
          error: function error(e, v) {
            var _this9 = this;

            setAttribute.call(this, 'error:error', !v ? null : function (ev) {
              var fn = _this9.getAttribute('error');

              fn && fn(_objectSpread({}, e.$dataset), ev);
              return false;
            });
          },
          keypress: function keypress(e, v) {
            var _this10 = this;

            setAttribute.call(this, 'keypress:keyup', !v ? null : function (ev) {
              if (ev.keyCode !== 13 && ev.keyCode !== 27) {
                var fn = _this10.$attributes.keypress;
                fn && fn(_objectSpread({
                  value: e.value
                }, e.$dataset), ev);
                setTimeout(function () {
                  return e.focus();
                }, 0);
              }

              return false;
            });
          },
          enter: function enter(e, v) {
            var _this11 = this;

            setAttribute.call(this, 'enter:keyup', !v ? null : function (ev) {
              if (ev.keyCode === 13) {
                _this11.$attributes.enter(_objectSpread({
                  value: e.value
                }, e.$dataset), ev);
              }

              if (ev.keyCode === 13 || ev.keyCode === 27) {
                e.blur();
              }

              return false;
            });
          },
          change: function change(e, v) {
            var _this12 = this;

            setAttribute.call(this, 'change:change', !v ? null : function (ev) {
              _this12.$attributes.change(_objectSpread({
                value: e.value
              }, e.$dataset), ev);

              return false;
            });
          },
          toggle: function toggle(e, v) {
            var _this13 = this;

            setAttribute.call(this, 'toggle:change', !v ? null : function (ev) {
              _this13.$attributes.toggle(_objectSpread({
                value: e.checked
              }, e.$dataset), ev);

              return false;
            });
          }
        };

        function applyAttributes(changes) {
          var _this14 = this;

          var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.$attributes || (this.$attributes = {});
          var e = this.elt;
          changes.forEach(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                value = _ref2[0],
                key = _ref2[1];

            if (value !== attrs[key]) {
              var setter = ATTR_SETTERS[key];

              if (setter) {
                setter.call(_this14, e, value);
              } else if (key.slice(0, 5) === 'data-') {
                ATTR_SETTERS.data.call(_this14, e, _objectSpread(_objectSpread({}, e.$dataset), {}, _defineProperty({}, key.slice(5), value)));
              } else {
                setAttribute.call(_this14, key, value);
              }
            }

            attrs[key] = value;
          });
        }

        function cleanupAttributes() {
          this.$attributes = null;
        }

        function setAttribute(key, value) {
          var _this15 = this;

          if (value != null) {
            if (typeof value === 'function') {
              var fnValue = function fnValue() {
                if (!_this15.isDone) {
                  value.apply(void 0, arguments);
                }
              };

              if (!this.listeners) {
                this.listeners = new Map();
              }

              if (!this.listeners.has(key)) {
                var _key$split = key.split(':'),
                    _key$split2 = _slicedToArray(_key$split, 2),
                    akey = _key$split2[0],
                    _key$split2$ = _key$split2[1],
                    ekey = _key$split2$ === void 0 ? akey : _key$split2$;

                this.elt.addEventListener(ekey, fnValue, false);
                this.listeners.set(key, fnValue);
              }
            } else {
              this.elt.setAttribute(key, value);
            }
          } else {
            if (this.listeners && this.listeners.has(key)) {
              var _key$split3 = key.split(':'),
                  _key$split4 = _slicedToArray(_key$split3, 2),
                  _akey = _key$split4[0],
                  _key$split4$ = _key$split4[1],
                  _ekey = _key$split4$ === void 0 ? _akey : _key$split4$;

              this.elt.removeEventListener(_ekey, this.listeners.get(key));
              this.listeners["delete"](key);
            } else {
              this.elt.removeAttribute(key);
            }
          }
        }
        /***/

      },

      /***/
      "./lib/element.js":
      /*!************************!*\
        !*** ./lib/element.js ***!
        \************************/

      /*! exports provided: Element */

      /***/
      function libElementJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Element", function () {
          return Element;
        });
        /* harmony import */


        var _dom_attrs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! ./dom.attrs */
        "./lib/dom.attrs.js");

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var Element =
        /*#__PURE__*/
        function () {
          function Element(attrs, $, elt) {
            _classCallCheck(this, Element);

            this.$ = $;
            this.$.isElementary = true;
            this.elt = elt || ($.tag === '#text' ? document.createTextNode('') : document.createElement($.tag));
            this.elt.impl = this;
          }

          _createClass(Element, [{
            key: "done",
            value: function done() {
              this.elt.parentElement && this.elt.parentElement.removeChild(this.elt);

              _dom_attrs__WEBPACK_IMPORTED_MODULE_0__["cleanupAttributes"].call(this);

              this.elt = null;
            }
          }, {
            key: "stateChanged",
            value: function stateChanged(attrs) {
              _dom_attrs__WEBPACK_IMPORTED_MODULE_0__["applyAttributes"].call(this, attrs);
            }
          }]);

          return Element;
        }();
        /***/

      },

      /***/
      "./lib/index.js":
      /*!**********************!*\
        !*** ./lib/index.js ***!
        \**********************/

      /*! exports provided: launch */

      /***/
      function libIndexJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "launch", function () {
          return launch;
        });
        /* harmony import */


        var _component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! ./component.js */
        "./lib/component.js");
        /* harmony import */


        var _register_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./register.js */
        "./lib/register.js");
        /* harmony import */


        var _node__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./node */
        "./lib/node.js");
        /* harmony import */


        var _types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        /*! ../types */
        "./types/index.js");
        /* harmony import */


        var _pipes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
        /*! ../pipes */
        "./pipes/index.js");
        /* harmony import */


        var _utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
        /*! ./utils.js */
        "./lib/utils.js");

        function _typeof(obj) {
          "@babel/helpers - typeof";

          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function _toConsumableArray(arr) {
          return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
        }

        function _nonIterableSpread() {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }

        function _unsupportedIterableToArray(o, minLen) {
          if (!o) return;
          if (typeof o === "string") return _arrayLikeToArray(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          if (n === "Object" && o.constructor) n = o.constructor.name;
          if (n === "Map" || n === "Set") return Array.from(o);
          if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
        }

        function _iterableToArray(iter) {
          if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
        }

        function _arrayWithoutHoles(arr) {
          if (Array.isArray(arr)) return _arrayLikeToArray(arr);
        }

        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length) len = arr.length;

          for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i];
          }

          return arr2;
        }

        function ownKeys(object, enumerableOnly) {
          var keys = Object.keys(object);

          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            if (enumerableOnly) symbols = symbols.filter(function (sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
            keys.push.apply(keys, symbols);
          }

          return keys;
        }

        function _objectSpread(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};

            if (i % 2) {
              ownKeys(Object(source), true).forEach(function (key) {
                _defineProperty(target, key, source[key]);
              });
            } else if (Object.getOwnPropertyDescriptors) {
              Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
            } else {
              ownKeys(Object(source)).forEach(function (key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
              });
            }
          }

          return target;
        }

        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }

          return obj;
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        function _objectWithoutProperties(source, excluded) {
          if (source == null) return {};

          var target = _objectWithoutPropertiesLoose(source, excluded);

          var key, i;

          if (Object.getOwnPropertySymbols) {
            var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

            for (i = 0; i < sourceSymbolKeys.length; i++) {
              key = sourceSymbolKeys[i];
              if (excluded.indexOf(key) >= 0) continue;
              if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
              target[key] = source[key];
            }
          }

          return target;
        }

        function _objectWithoutPropertiesLoose(source, excluded) {
          if (source == null) return {};
          var target = {};
          var sourceKeys = Object.keys(source);
          var key, i;

          for (i = 0; i < sourceKeys.length; i++) {
            key = sourceKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            target[key] = source[key];
          }

          return target;
        }

        function launch() {
          var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
              types = _ref.types,
              _ref$template = _ref.template,
              template = _ref$template === void 0 ? '<App/>' : _ref$template,
              _ref$rootElement = _ref.rootElement,
              rootElement = _ref$rootElement === void 0 ? document.body : _ref$rootElement,
              pipes = _ref.pipes,
              props = _objectWithoutProperties(_ref, ["types", "template", "rootElement", "pipes"]);

          var $AppContext =
          /*#__PURE__*/
          function () {
            function $AppContext() {
              var _this = this;

              _classCallCheck(this, $AppContext);

              this.elt = rootElement;
              this.app = this;
              this.pipes = _objectSpread(_objectSpread({}, _pipes__WEBPACK_IMPORTED_MODULE_4__["default"]), pipes);

              this.reflow = function () {
                Object(_utils_js__WEBPACK_IMPORTED_MODULE_5__["arrangeElements"])(_this.$, _this.elt);
                _this.reflowId = null;
              };
            }

            _createClass($AppContext, [{
              key: "requestReflow",
              value: function requestReflow() {
                if (this.reflowId) return;
                this.reflowId = setTimeout(this.reflow, 10);
              }
            }]);

            return $AppContext;
          }();

          Object(_register_js__WEBPACK_IMPORTED_MODULE_1__["registerTypes"])([Object.assign($AppContext, {
            template: template
          })].concat(_toConsumableArray(_types__WEBPACK_IMPORTED_MODULE_3__["default"]), _toConsumableArray(types)));
          var top = new _component_js__WEBPACK_IMPORTED_MODULE_0__["ContainerComponent"]($AppContext, new _node__WEBPACK_IMPORTED_MODULE_2__["Node"]('#top'));
          top.up(props);
          return top.impl;
        }

        if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') {
          window.launch = launch;
        }
        /***/

      },

      /***/
      "./lib/node.js":
      /*!*********************!*\
        !*** ./lib/node.js ***!
        \*********************/

      /*! exports provided: Node */

      /***/
      function libNodeJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Node", function () {
          return Node;
        });
        /* harmony import */


        var _compile_expr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! ./compile.expr */
        "./lib/compile.expr.js");
        /* harmony import */


        var _xml_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./xml.utils */
        "./lib/xml.utils.js");

        function _toConsumableArray(arr) {
          return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
        }

        function _nonIterableSpread() {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }

        function _arrayWithoutHoles(arr) {
          if (Array.isArray(arr)) return _arrayLikeToArray(arr);
        }

        function ownKeys(object, enumerableOnly) {
          var keys = Object.keys(object);

          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            if (enumerableOnly) symbols = symbols.filter(function (sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
            keys.push.apply(keys, symbols);
          }

          return keys;
        }

        function _objectSpread(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};

            if (i % 2) {
              ownKeys(Object(source), true).forEach(function (key) {
                _defineProperty(target, key, source[key]);
              });
            } else if (Object.getOwnPropertyDescriptors) {
              Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
            } else {
              ownKeys(Object(source)).forEach(function (key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
              });
            }
          }

          return target;
        }

        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }

          return obj;
        }

        function _toArray(arr) {
          return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
        }

        function _iterableToArray(iter) {
          if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
        }

        function _slicedToArray(arr, i) {
          return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
        }

        function _nonIterableRest() {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }

        function _unsupportedIterableToArray(o, minLen) {
          if (!o) return;
          if (typeof o === "string") return _arrayLikeToArray(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          if (n === "Object" && o.constructor) n = o.constructor.name;
          if (n === "Map" || n === "Set") return Array.from(o);
          if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
        }

        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length) len = arr.length;

          for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i];
          }

          return arr2;
        }

        function _iterableToArrayLimit(arr, i) {
          if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = undefined;

          try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);

              if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i["return"] != null) _i["return"]();
            } finally {
              if (_d) throw _e;
            }
          }

          return _arr;
        }

        function _arrayWithHoles(arr) {
          if (Array.isArray(arr)) return arr;
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var UID = 1;
        var OBJ = {};

        var Node =
        /*#__PURE__*/
        function () {
          function Node(tag) {
            var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Map();
            var nodes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

            _classCallCheck(this, Node);

            this.uid = '' + UID++;
            this.tag = tag || '';
            this.attrs = attrs;
            this.nodes = nodes;
          } // --- attrs


          _createClass(Node, [{
            key: "updateAttrs",
            value: function updateAttrs(attrs) {
              var _this = this;

              attrs.forEach(function (v, k) {
                return _this.attrs.set(k, v);
              });
              return this;
            }
          }, {
            key: "updateAttrsFormObject",
            value: function updateAttrsFormObject(obj) {
              var _this2 = this;

              Object.entries(obj).forEach(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    k = _ref2[0],
                    v = _ref2[1];

                return _this2.attrs.set(k, v);
              });
              return this;
            }
          }, {
            key: "setAttrs",
            value: function setAttrs() {
              var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
              this.attrs = attrs;
              return this;
            }
          }, {
            key: "get",
            value: function get(key) {
              var val = this.attrs.get(key);
              return val;
            }
          }, {
            key: "extractAttr",
            value: function extractAttr(key) {
              var val = this.get(key);
              this.attrs["delete"](key);
              return val;
            } // --- Nodes

          }, {
            key: "setNodes",
            value: function setNodes() {
              var nodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
              this.nodes = nodes;
              return this;
            }
          }, {
            key: "addChild",
            value: function addChild(tag, attrs) {
              var e = new Node(tag, attrs);
              this.nodes.push(e);
              return e;
            } // ---  text

          }, {
            key: "setText",
            value: function setText(text) {
              this.attrs.set('#text', Object(_xml_utils__WEBPACK_IMPORTED_MODULE_1__["decodeXmlEntities"])(text));
            } // --- compiled

          }, {
            key: "addPropertyResolver",
            value: function addPropertyResolver(getter, propKey) {
              (this.$propertyResolvers || (this.$propertyResolvers = [])).push(propKey ? function (c, acc) {
                acc[propKey] = getter(c);
              } : function (c, acc) {
                return Object.entries(getter(c) || OBJ).forEach(function (_ref3) {
                  var _ref4 = _slicedToArray(_ref3, 2),
                      key = _ref4[0],
                      val = _ref4[1];

                  acc[key] = val;
                });
              });
              return this;
            }
          }, {
            key: "addInitialState",
            value: function addInitialState(values) {
              var acc = this.initialState || (this.initialState = {});
              Object.entries(values).forEach(function (_ref5) {
                var _ref6 = _slicedToArray(_ref5, 2),
                    key = _ref6[0],
                    val = _ref6[1];

                acc[key] = val;
              });
              return this;
            }
          }, {
            key: "addPropertyConnector",
            value: function addPropertyConnector(v, getter) {
              var _v$slice$split$map = v.slice(2).split('|').map(function (s) {
                return s.trim();
              }),
                  _v$slice$split$map2 = _toArray(_v$slice$split$map),
                  key = _v$slice$split$map2[0],
                  pipes = _v$slice$split$map2.slice(1);

              var pipec = Object(_compile_expr__WEBPACK_IMPORTED_MODULE_0__["withPipes"])(pipes);
              this.initializers.push(function (c) {
                return c.connect(key, function (rr) {
                  return getter(pipec(c, rr));
                });
              });
            }
          }, {
            key: "addEmitter",
            value: function addEmitter(v, k) {
              var _v$slice$split$map3 = v.slice(2).split('|').map(function (s) {
                return s.trim();
              }),
                  _v$slice$split$map4 = _toArray(_v$slice$split$map3),
                  key = _v$slice$split$map4[0],
                  pipes = _v$slice$split$map4.slice(1);

              var pipec = Object(_compile_expr__WEBPACK_IMPORTED_MODULE_0__["withPipes"])(pipes);
              this.initializers.push(function (c) {
                return {
                  payload: _defineProperty({}, k, function (data) {
                    return c.container.emit(key, pipec(c, data));
                  })
                };
              });
            }
          }, {
            key: "resolveProps",
            value: function resolveProps(c, isInitial) {
              var props = this.$propertyResolvers ? this.$propertyResolvers.reduce(function (r, fn) {
                fn(c, r);
                return r;
              }, {}) : {};
              var initialState = this.initialState;

              if (isInitial && initialState) {
                props = _objectSpread(_objectSpread({}, initialState), props);
              }

              if (props.data && initialState && initialState.data) {
                props.data = _objectSpread(_objectSpread({}, initialState.data), props.data);
              }

              return props;
            } // --- utils

          }, {
            key: "clone",
            value: function clone(uid) {
              var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.tag;
              return Object.assign(new Node(tag), {
                uid: uid,
                attrs: this.attrs,
                nodes: this.nodes,
                nodeMap: this.nodeMap,
                getNodes: this.getNodes,
                $propertyResolvers: this.$propertyResolvers ? _toConsumableArray(this.$propertyResolvers) : null,
                initialState: this.initialState ? _objectSpread({}, this.initialState) : null,
                $initializers: this.$initializers ? _toConsumableArray(this.$initializers) : null
              });
            }
          }, {
            key: "toString",
            value: function toString() {
              return Object(_xml_utils__WEBPACK_IMPORTED_MODULE_1__["stringifyNode"])(this);
            }
          }, {
            key: "firstChild",
            get: function get() {
              return this.nodes.values().next;
            }
          }, {
            key: "initializers",
            get: function get() {
              return this.$initializers || (this.$initializers = []);
            }
          }]);

          return Node;
        }();
        /***/

      },

      /***/
      "./lib/register.js":
      /*!*************************!*\
        !*** ./lib/register.js ***!
        \*************************/

      /*! exports provided: registerTypes, getByTag */

      /***/
      function libRegisterJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "registerTypes", function () {
          return registerTypes;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "getByTag", function () {
          return getByTag;
        });
        /* harmony import */


        var _compile_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! ./compile.js */
        "./lib/compile.js");

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var COUNTER = 1;

        var nextId = function nextId() {
          var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
          return p + COUNTER++;
        };

        var fnName = function fnName(ctor) {
          return (/^function\s+([\w$]+)\s*\(/.exec(ctor.toString()) || [])[1] || nextId('$C');
        };

        var Fragment = function Fragment() {
          _classCallCheck(this, Fragment);
        };

        var REGISTRY = new Map([['ui:fragment', Fragment], ['ui:for', Fragment], ['ui:item', Fragment], ['ui:slot', Fragment]]);

        var reg = function reg(ctr) {
          if (typeof ctr === 'string') {
            ctr.replace(/<component\sid="(.+)">([\s\S]*?)<\/component>/gm, function (_, NAME, TEMPLATE) {
              return reg({
                NAME: NAME,
                TEMPLATE: TEMPLATE
              });
            });
            return;
          }

          var ctor = typeof ctr === 'function' ? ctr : Object.assign(function () {}, ctr);
          var name = ctor.NAME || ctor.name || fnName(ctor);
          var text = ctor.TEMPLATE || ctor.template || ctor.prototype.TEMPLATE;

          ctor.getTemplate = function () {
            return ctor.$template || (ctor.$template = Object(_compile_js__WEBPACK_IMPORTED_MODULE_0__["compileTemplate"])(text, name));
          };

          REGISTRY.set(name, ctor);
        };

        var registerTypes = function registerTypes(types) {
          return types.forEach(reg);
        };

        var getByTag = function getByTag(tag) {
          return REGISTRY.get(tag);
        };
        /***/

      },

      /***/
      "./lib/utils.js":
      /*!**********************!*\
        !*** ./lib/utils.js ***!
        \**********************/

      /*! exports provided: parseValue, setNodeMap, wrapNode, arrangeElements, hasSlot, filterMapKey, stringifyComponent, filterSlotNodes */

      /***/
      function libUtilsJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "parseValue", function () {
          return parseValue;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "setNodeMap", function () {
          return setNodeMap;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "wrapNode", function () {
          return wrapNode;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "arrangeElements", function () {
          return arrangeElements;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "hasSlot", function () {
          return hasSlot;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "filterMapKey", function () {
          return filterMapKey;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "stringifyComponent", function () {
          return stringifyComponent;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "filterSlotNodes", function () {
          return filterSlotNodes;
        });

        function _toConsumableArray(arr) {
          return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
        }

        function _nonIterableSpread() {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }

        function _iterableToArray(iter) {
          if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
        }

        function _arrayWithoutHoles(arr) {
          if (Array.isArray(arr)) return _arrayLikeToArray(arr);
        }

        function _slicedToArray(arr, i) {
          return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
        }

        function _nonIterableRest() {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }

        function _unsupportedIterableToArray(o, minLen) {
          if (!o) return;
          if (typeof o === "string") return _arrayLikeToArray(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          if (n === "Object" && o.constructor) n = o.constructor.name;
          if (n === "Map" || n === "Set") return Array.from(o);
          if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
        }

        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length) len = arr.length;

          for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i];
          }

          return arr2;
        }

        function _iterableToArrayLimit(arr, i) {
          if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = undefined;

          try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);

              if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i["return"] != null) _i["return"]();
            } finally {
              if (_d) throw _e;
            }
          }

          return _arr;
        }

        function _arrayWithHoles(arr) {
          if (Array.isArray(arr)) return arr;
        }

        Array.EMPTY = [];
        Object.assign(Function, {
          ID: function ID(x) {
            return x;
          },
          next: function (COUNTER) {
            return function () {
              var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
              return p + COUNTER++;
            };
          }(1),
          // system
          "throw": function _throw(error) {
            var ErrorType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Error;
            throw typeof error === 'string' ? new ErrorType(error) : error;
          }
        });

        var parseValue = function (map) {
          return function (value) {
            if (value && '1234567890+-'.includes(value[0]) && value.length <= 17) {
              var num = +value;
              return isNaN(num) ? value : num;
            }

            return value in map ? map[value] : value;
          };
        }({
          "true": true,
          "false": false,
          "null": null,
          undefined: undefined
        });

        var setNodeMap = function setNodeMap() {
          var map = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Map();
          var node = arguments.length > 1 ? arguments[1] : undefined;

          if (node) {
            map.set(node.uid, node);
          }

          return node;
        };

        var wrapNode = function wrapNode(n) {
          return new Map([[n.uid, n]]);
        };

        function appendElt(e, p, cursor) {
          var before = cursor ? cursor.nextSibling : p.firstChild;

          if (!before) {
            if (p !== e.parentElement) {
              p.appendChild(e);
            }
          } else if (e !== before) {
            p.insertBefore(e, before);
          }

          return e;
        }

        function arrangeElements($, parent) {
          var cursor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

          for (var p = $.first; p; p = p.next) {
            if (p.isElementary) {
              var e = p.impl.elt;

              if (e) {
                arrangeElements(p, e);
                cursor = appendElt(e, parent, cursor);
              }
            } else {
              cursor = arrangeElements(p, parent, cursor);
            }
          }

          return cursor;
        }

        var hasSlot = function hasSlot(c, id) {
          var r = false;
          var _c$container = c.container,
              tag = _c$container.tag,
              content = _c$container.content;
          if (!content) return r;

          if (id && id !== 'default') {
            content.forEach(function (e) {
              r = r || e.tag === tag + ':' + id;
            });
          } else {
            content.forEach(function (e) {
              r = r || e.tag.slice(0, tag.length + 1) !== tag + ':';
            });
          }

          return r;
        };

        var filterMapKey = function filterMapKey(src, key) {
          var r = new Map();
          src.forEach(function (v, k) {
            if (k !== key) {
              r.set(k, v);
            }
          });
          return [src.get(key), r];
        };

        var stringifyAttrs = function stringifyAttrs(attrs) {
          if (!attrs) {
            return '';
          }

          var r = [];
          Object.entries(attrs).forEach(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                k = _ref2[0],
                v = _ref2[1];

            if (v && k !== '#text') {
              r.push(' ' + k + '="' + v + '"');
            }
          });
          return r.join('');
        };

        function stringifyComponent(_ref3) {
          var uid = _ref3.uid,
              tag = _ref3.tag,
              state = _ref3.state,
              container = _ref3.container,
              _ref3$children = _ref3.children,
              children = _ref3$children === void 0 ? new Map() : _ref3$children;
          var tab = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
          var sattrs = stringifyAttrs(state);

          var ssubs = _toConsumableArray(children.values()).map(function (c) {
            return stringifyComponent(c, "  ".concat(tab));
          }).join('\n');

          var text = state && state['#text'];
          var stext = text ? "  ".concat(tab).concat(text) : '';

          if (tag === '#text') {
            return stext.trim();
          }

          return "".concat(tab, "<").concat(tag, "#").concat(uid, " ").concat(container ? container.uid : '-').concat(sattrs) + (!ssubs && !stext ? '/>' : ">\n".concat(ssubs).concat(stext, "\n").concat(tab, "</").concat(tag, "#").concat(uid, ">"));
        }

        function filterSlotNodes(slotId, container) {
          var content = container.content,
              tag = container.tag;
          if (!content) return null;
          var r = new Map();
          content.forEach(function (v) {
            if (slotId) {
              if (v.tag === tag + ':' + slotId) {
                v.nodeMap.forEach(function (vv) {
                  return setNodeMap(r, vv);
                });
              }
            } else if (v.tag.slice(0, tag.length + 1) !== tag + ':') {
              setNodeMap(r, v);
            }
          });
          return r;
        }
        /***/

      },

      /***/
      "./lib/xml.js":
      /*!********************!*\
        !*** ./lib/xml.js ***!
        \********************/

      /*! exports provided: parseXML */

      /***/
      function libXmlJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "parseXML", function () {
          return parseXML;
        });
        /* harmony import */


        var _node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! ./node */
        "./lib/node.js");
        /* harmony import */


        var _xml_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./xml.utils */
        "./lib/xml.utils.js"); // XML Parse for templates. XML -> NodeTree


        var RE_EMPTY = /^\s*$/;
        var RE_XML_COMMENT = /<!--((?!-->)[\s\S])*-->/g;
        var RE_XML_TAG = /(<)(\/?)([a-zа-я][a-zа-я0-9-:]*)((?:\s+[a-z][a-z0-9-:]+(?:="[^"]*"|={[^}]*})?)*)\s*(\/?)>/gi;
        var SINGLE_TAGS = 'img input br col'.split(' ').reduce(function (r, e) {
          r[e] = 1;
          return r;
        }, {});

        var parseXML = function parseXML(_s, key) {
          var s = ('' + _s).trim().replace(RE_XML_COMMENT, '');

          var ctx = [new _node__WEBPACK_IMPORTED_MODULE_0__["Node"]()];
          var lastIndex = 0; // head text omitted

          for (var e = RE_XML_TAG.exec(s); e; e = RE_XML_TAG.exec(s)) {
            // preceding text
            var text = e.index && s.slice(lastIndex, e.index);

            if (text && !text.match(RE_EMPTY)) {
              ctx[0].addChild('#text').setText(text);
            } // closing tag


            if (e[2]) {
              if (ctx[0].tag !== e[3]) {
                throw new Error((key || '') + ' XML Parse closing tag does not match at: ' + e.index + ' near ' + e.input.slice(Math.max(e.index - 150, 0), e.index) + '^^^^' + e.input.slice(e.index, Math.min(e.index + 150, e.input.length)));
              }

              ctx.shift();
            } else {
              var sAttrs = e[4].trim();
              var elt = ctx[0].addChild(e[3], sAttrs ? Object(_xml_utils__WEBPACK_IMPORTED_MODULE_1__["parseAttrs"])(sAttrs) : undefined); // not single tag

              if (!(e[5] || e[3] in SINGLE_TAGS)) {
                ctx.unshift(elt);

                if (ctx.length === 1) {
                  throw new Error('Parse error at: ' + e[0]);
                }
              }
            } // up past index


            lastIndex = RE_XML_TAG.lastIndex;
          } // tail text omitted


          return ctx[0];
        };
        /***/

      },

      /***/
      "./lib/xml.utils.js":
      /*!**************************!*\
        !*** ./lib/xml.utils.js ***!
        \**************************/

      /*! exports provided: escapeXml, skipQoutes, decodeXmlEntities, parseAttrs, stringifyNode */

      /***/
      function libXmlUtilsJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "escapeXml", function () {
          return escapeXml;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "skipQoutes", function () {
          return skipQoutes;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "decodeXmlEntities", function () {
          return decodeXmlEntities;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "parseAttrs", function () {
          return parseAttrs;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "stringifyNode", function () {
          return stringifyNode;
        });
        /* harmony import */


        var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! ./utils */
        "./lib/utils.js");

        var RE_ESCAPE_XML_ENTITY = /["'&<>]/g;
        var ESCAPE_XML_ENTITY = {
          34: '&quot;',
          38: '&amp;',
          39: '&#39;',
          60: '&lt;',
          62: '&gt;'
        };

        var FN_ESCAPE_XML_ENTITY = function FN_ESCAPE_XML_ENTITY(m) {
          return ESCAPE_XML_ENTITY[m.charCodeAt(0)];
        };

        var RE_XML_ENTITY = /&#?[0-9a-z]{3,5};/g;
        var RE_ATTRS = /([a-z][a-zA-Z0-9-:]+)(="[^"]*"|={[^}]*})?/g;
        var SUBST_XML_ENTITY = {
          amp: '&',
          gt: '>',
          lt: '<',
          quot: '"',
          nbsp: ' '
        };

        var FN_XML_ENTITY = function FN_XML_ENTITY(_) {
          var s = _.substring(1, _.length - 1);

          return s[0] === '#' ? String.fromCharCode(+s.slice(1)) : SUBST_XML_ENTITY[s] || ' ';
        };

        var escapeXml = function escapeXml(s) {
          return !s ? '' : ('' + s).replace(RE_ESCAPE_XML_ENTITY, FN_ESCAPE_XML_ENTITY);
        };

        var skipQoutes = function skipQoutes(s) {
          return s[0] === '"' && s[s.length - 1] === '"' ? s.slice(1, -1) : s;
        };

        var decodeXmlEntities = function decodeXmlEntities() {
          var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
          return s.replace(RE_XML_ENTITY, FN_XML_ENTITY);
        };

        var parseAttrs = function parseAttrs(s) {
          var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Map();

          for (var e = RE_ATTRS.exec(s); e; e = RE_ATTRS.exec(s)) {
            r.set(e[1], !e[2] ? true : Object(_utils__WEBPACK_IMPORTED_MODULE_0__["parseValue"])(decodeXmlEntities(skipQoutes(e[2].slice(1)))));
          }

          return r;
        };

        var stringifyAttrs = function stringifyAttrs(attrs) {
          if (!attrs || !attrs.size) {
            return '';
          }

          var r = [];
          attrs.forEach(function (v, k) {
            if (v && k !== '#text') {
              r.push(' ' + k + '="' + escapeXml(v) + '"');
            }
          });
          return r.join('');
        };

        function stringifyNode(_ref) {
          var tag = _ref.tag,
              attrs = _ref.attrs,
              _ref$nodes = _ref.nodes,
              nodes = _ref$nodes === void 0 ? [] : _ref$nodes;
          var tab = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
          var sattrs = stringifyAttrs(attrs);
          var ssubs = nodes.map(function (c) {
            return stringifyNode(c, "  ".concat(tab));
          }).join('\n');
          var text = attrs && attrs.get('#text');
          var stext = text ? "  ".concat(tab).concat(escapeXml(text)) : '';

          if (tag === '#text') {
            return stext.trim();
          }

          return "".concat(tab, "<").concat(tag).concat(sattrs) + (!ssubs && !stext ? '/>' : ">\n".concat(ssubs).concat(stext, "\n").concat(tab, "</").concat(tag, ">"));
        }
        /***/

      },

      /***/
      "./pipes/arr.js":
      /*!**********************!*\
        !*** ./pipes/arr.js ***!
        \**********************/

      /*! exports provided: default */

      /***/
      function pipesArrJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /** ***********************
         * Arrays.
         */

        /* harmony default export */


        __webpack_exports__["default"] = {
          slice: function slice(x) {
            var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var e = arguments.length > 2 ? arguments[2] : undefined;
            return x ? x.slice(b, e) : [];
          },

          /**
          * Builds histogram on given field for given list.
          *
          * @param {*} list source
          * @param {*} field to be used as group key
          */
          groupBy: function groupBy(list) {
            var field = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'type';
            var result = {};
            var fieldFn = typeof field === 'string' ? function (e) {
              return e[field];
            } : field;

            var iter = function iter(v, entry) {
              var slot = result[v] || (result[v] = {
                id: v,
                count: 0,
                subs: []
              });
              slot.count++;
              (slot.items || (slot.items = slot.subs)).push(entry);
            };

            (list || []).forEach(function (e) {
              var value = fieldFn(e);

              if (Array.isArray(value)) {
                value.forEach(function (v) {
                  return iter(v, e);
                });
              } else {
                iter(value, e);
              }
            });
            return result;
          },

          /**
             * Sorts array by element property.
             *
             * @param {*} arr source
             * @param {*} property element property to sort by
             * @param {*} order
             */
          sortBy: function sortBy(arr) {
            var property = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'name';
            var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
            var fn = property;

            if (typeof property === 'string') {
              if (property[0] === '-') {
                /* eslint-disable */
                order = -1;
                property = property.substr(1);
              }

              fn = function fn(e) {
                return e[property];
              };
            }

            function compare(a, b) {
              var aa = fn(a);
              var bb = fn(b);
              /* eslint-disable */

              return aa < bb ? -order : aa > bb ? order : 0;
            }

            return (arr || []).slice(0).sort(compare);
          },

          /**
           * Produces key/value index on given array.
           * 
           * @param {*} arr source array
           * @param {*} idKey id key
           * @param {*} valKey value key
           */
          hash: function hash(arr) {
            var idKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
            var valKey = arguments.length > 2 ? arguments[2] : undefined;
            var r = {};

            if (arr) {
              var isKeyFn = typeof idKey === 'string' ? function (e) {
                return e[idKey];
              } : idKey;
              arr.forEach(function (e) {
                r[isKeyFn(e)] = valKey ? e[valKey] : e;
              });
            }

            return r;
          }
        };
        /***/
      },

      /***/
      "./pipes/date.js":
      /*!***********************!*\
        !*** ./pipes/date.js ***!
        \***********************/

      /*! exports provided: default */

      /***/
      function pipesDateJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);

        function _typeof(obj) {
          "@babel/helpers - typeof";

          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        var R = {
          ru: {
            monthNames: ['', 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthNamesShort: ['', 'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
          },
          en: {
            monthNames: ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthNamesShort: ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
          }
        };
        var DATE_FORMATTERS = {
          hh: function hh(date) {
            return String.pad(date.getHours());
          },
          ii: function ii(date) {
            return String.pad(date.getMinutes());
          },
          hi: function hi(date) {
            return String.pad(date.getHours()) + ':' + String.pad(date.getMinutes());
          },
          dd: function dd(date) {
            return String.pad(date.getDate());
          },
          w: function w(date) {
            return '' + Date.l18n("dayNames.".concat(date.getDay()));
          },
          ww: function ww(date) {
            return '' + Date.l18n("dayNamesShort.".concat(date.getDay()));
          },
          d: function d(date) {
            return '' + date.getDate();
          },
          mmmm: function mmmm(date) {
            return Date.monthName(date.getMonth() + 1, '');
          },
          mmm: function mmm(date) {
            return Date.monthName(date.getMonth() + 1, 'Short');
          },
          mm: function mm(date) {
            return String.pad(date.getMonth() + 1);
          },
          yyyy: function yyyy(date) {
            return "".concat(date.getFullYear());
          },
          ll: function ll(date) {
            return "".concat(date.getTime());
          },
          z: function z(date) {
            return "Z".concat(Date.formatTimezone(date.getTimezoneOffset()));
          }
        };
        /* harmony default export */

        __webpack_exports__["default"] = {
          orNow: function orNow(x) {
            return x ? Date.narrow(x) : new Date();
          },
          l18n: function l18n(key) {
            return Object.dig(R[Date.LOCALE || 'ru'], key);
          },
          daysInMonth: function daysInMonth(month, year) {
            return new Date(year, month + 1, 0).getDate();
          },
          firstOfWeek: function firstOfWeek(d) {
            var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Date.narrow(d);
            return new Date(x.getFullYear(), x.getMonth(), x.getDate() - x.getDay());
          },
          monthName: function monthName(m) {
            var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            return Date.l18n("monthNames".concat(mode, ".").concat(m));
          },
          fractions: function fractions() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
            return [x.getFullYear(), x.getMonth(), x.getDate(), x.getHours(), x.getMinutes(), x.getSeconds(), x.getMilliseconds()];
          },
          parseISO8601: function parseISO8601(x) {
            Function.assert(typeof x === 'string', "Date.parseISO8601: not a string: ".concat(x));

            if (x.length === 10) {
              x += 'T12:00';
            }

            var timebits = /^([0-9]{4})-([0-9]{2})-([0-9]{2})[ T]([0-9]{2}):([0-9]{2})(?::([0-9]*)(\.[0-9]*)?)?(Z?)(([+-])([0-9]{2})([0-9]{2}))?/;
            var m = timebits.exec(x);

            if (!m) {
              return null;
            }

            var tz = m[8] ? !m[9] ? 0 : (m[10] === '+' ? -1 : +1) * (parseInt(m[11]) * 60 + parseInt(m[12])) : new Date().getTimezoneOffset(); // utcdate is milliseconds since the epoch

            var utcdate = Date.UTC(parseInt(m[1]), parseInt(m[2]) - 1, // months are zero-offset (!)
            parseInt(m[3]), parseInt(m[4]), parseInt(m[5]), // hh:mm
            m[6] && parseInt(m[6]) || 0, // optional seconds
            m[7] && parseFloat(m[7]) || 0);
            return new Date(utcdate + tz * 60000);
          },

          /**
          * Universal all-weather converter to Date.
          *
          * @param {*} x any value to be converted to date
          * @returns Date instance or null
          */
          narrow: function narrow(x) {
            var type = _typeof(x);

            if (x == null) {
              return null;
            } // eslint-disable-next-line eqeqeq


            if (type === 'number' || +x == x) {
              return new Date(+x);
            }

            if (type === 'object') {
              // Date already
              if (x.getTime) {
                return x;
              } // having a date re-presentation method


              if (x.toDate) {
                return x.toDate();
              } // firestore timestamp for web


              if (x.seconds && x.nanoseconds != null) {
                return new Date(x.seconds * 1000 + x.nanoseconds);
              }
            }

            return Date.parseISO8601(x);
          },
          formatTimezone: function formatTimezone(tzOffset) {
            var toNumber = Number(tzOffset);
            return toNumber ? toNumber >= 0 ? "+".concat(String.pad(toNumber / 60), ":").concat(String.pad(toNumber % 60)) : "-".concat(String.pad(-toNumber / 60), ":").concat(String.pad(-toNumber % 60)) : '';
          },
          format: function format(x) {
            var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';

            if (!x) {
              return '';
            }

            var date = Date.narrow(x);
            return !date ? '' : format.replace(/[_]/g, '\n').replace(/[hidwmylz]+/g, function (key) {
              var fn = DATE_FORMATTERS[key];
              return fn ? fn(date) : key;
            });
          },
          dateKey: function dateKey(d) {
            var ms = Date.narrow(d).getTime();
            return Date.format(ms - ms % (24 * 3600000) + 12 * 3600000, 'yyyy-mm-dd');
          }
        };
        /***/
      },

      /***/
      "./pipes/index.js":
      /*!************************!*\
        !*** ./pipes/index.js ***!
        \************************/

      /*! exports provided: default */

      /***/
      function pipesIndexJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony import */


        var _obj_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! ./obj.js */
        "./pipes/obj.js");
        /* harmony import */


        var _str_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./str.js */
        "./pipes/str.js");
        /* harmony import */


        var _arr_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./arr.js */
        "./pipes/arr.js");
        /* harmony import */


        var _date_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        /*! ./date.js */
        "./pipes/date.js");

        function _toConsumableArray(arr) {
          return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
        }

        function _nonIterableSpread() {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }

        function _unsupportedIterableToArray(o, minLen) {
          if (!o) return;
          if (typeof o === "string") return _arrayLikeToArray(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          if (n === "Object" && o.constructor) n = o.constructor.name;
          if (n === "Map" || n === "Set") return Array.from(o);
          if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
        }

        function _iterableToArray(iter) {
          if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
        }

        function _arrayWithoutHoles(arr) {
          if (Array.isArray(arr)) return _arrayLikeToArray(arr);
        }

        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length) len = arr.length;

          for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i];
          }

          return arr2;
        }

        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }

          return obj;
        } // useful pipes

        /* harmony default export */


        __webpack_exports__["default"] = {
          ID: function ID(x) {
            return x;
          },
          next: function (COUNTER) {
            return function () {
              var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
              return p + COUNTER++;
            };
          }(1),
          // system
          "throw": function _throw(error) {
            var ErrorType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Error;
            throw typeof error === 'string' ? new ErrorType(error) : error;
          },
          assert: function assert(b, error) {
            var ErrorType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Error;

            if (!b) {
              throw typeof error === 'string' ? new ErrorType(error) : error;
            }
          },
          log: function log(x, pre) {
            console.log(pre || 'pipe', x);
            return x;
          },
          track: function track(fn, x, y) {
            return function () {
              console.log('track', x || y);
              return (fn || Function.ID).apply(void 0, arguments);
            };
          },
          // eslint-disable-next-line no-debugger
          "debugger": function _debugger() {
            debugger;
          },
          // data structures
          dot: function dot(x, k) {
            return x && k in x ? x[k] : undefined;
          },
          wrap: function wrap(x, k) {
            return _defineProperty({}, k, x);
          },
          includes: function includes(x, p) {
            return x.includes && x.includes(p);
          },
          dig: function dig(o, steps) {
            return (steps.reduce ? steps : steps.split('.')).reduce(function (r, e) {
              return r ? r[e] : undefined;
            }, o);
          },
          // logical
          then: function then(x) {
            var p = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
            return x ? p : n;
          },
          not: function not(x) {
            return !x;
          },
          isUndefined: function isUndefined(x) {
            return typeof x === 'undefined';
          },
          isTrue: function isTrue(x) {
            return x === true;
          },
          isFalse: function isFalse(x) {
            return x === false;
          },
          or: function or(x, s) {
            return x || s;
          },
          and: function and(x, s) {
            return x && s;
          },
          // math
          // eslint-disable-next-line eqeqeq
          equals: function equals(x, p) {
            return x == p;
          },
          greater: function greater(x, p) {
            return x > p;
          },
          less: function less(x, p) {
            return x < p;
          },
          plus: function plus(x, alt) {
            return +x + +alt;
          },
          minus: function minus(x, alt) {
            return +x - +alt;
          },
          multiply: function multiply(x, alt) {
            return +x * +alt;
          },
          compose: function compose() {
            for (var _len = arguments.length, ff = new Array(_len), _key = 0; _key < _len; _key++) {
              ff[_key] = arguments[_key];
            }

            return function (x0) {
              return ff.reduceRight(function (x, f) {
                return f(x);
              }, x0);
            };
          },
          swap: function swap(f) {
            return function (a, b) {
              return f(b, a);
            };
          },
          curry: function () {
            var _curry = function _curry(fn, args0, lengthLimit) {
              var fx = function fx(args) {
                return args.length >= lengthLimit ? fn.apply(void 0, _toConsumableArray(args)) : _curry(fn, args, lengthLimit - args.length);
              };

              return function () {
                for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                  args[_key2] = arguments[_key2];
                }

                return fx([].concat(_toConsumableArray(args0), args));
              };
            };

            return function (f) {
              for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                args[_key3 - 1] = arguments[_key3];
              }

              return _curry(f, args, f.length);
            };
          }(),

          /* Simple GUID generator. */
          guid: function (s4) {
            return function () {
              return "".concat(s4()).concat(s4(), "-").concat(s4(), "-").concat(s4(), "-").concat(s4(), "-").concat(s4()).concat(s4()).concat(s4());
            };
          }(function () {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
          }),

          /* Simple hash function. */
          hash: function hash(s) {
            var a = 1;
            var c = 0;
            var h;
            var o;

            if (s) {
              a = 0;
              /* jshint plusplus:false bitwise:false */

              for (h = s.length - 1; h >= 0; h--) {
                o = s.charCodeAt(h);
                a = (a << 6 & 268435455) + o + (o << 14);
                c = a & 266338304;
                a = c !== 0 ? a ^ c >> 21 : a;
              }
            }

            return String(a);
          },
          str: _str_js__WEBPACK_IMPORTED_MODULE_1__["default"],
          arr: _arr_js__WEBPACK_IMPORTED_MODULE_2__["default"],
          obj: _obj_js__WEBPACK_IMPORTED_MODULE_0__["default"],
          date: Object.assign(function (s, format) {
            return _date_js__WEBPACK_IMPORTED_MODULE_3__["default"].format(s, format);
          }, _date_js__WEBPACK_IMPORTED_MODULE_3__["default"])
        };
        /***/
      },

      /***/
      "./pipes/obj.js":
      /*!**********************!*\
        !*** ./pipes/obj.js ***!
        \**********************/

      /*! exports provided: default */

      /***/
      function pipesObjJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);

        function _typeof(obj) {
          "@babel/helpers - typeof";

          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        Object.EMPTY = Object.freeze({});
        /* harmony default export */

        __webpack_exports__["default"] = {
          /**
           * Checks if argument is empty .
           */
          isEmpty: function isEmpty(x) {
            if (!x) {
              return true;
            }

            if (x instanceof Object) {
              // (zero-length array)
              if (Array.isArray(x)) {
                return x.length === 0;
              } // (zero-size map)


              if (x instanceof Map) {
                return x.size === 0;
              } // (has no props)


              return Object.keys(x).length === 0;
            }

            return false;
          },
          decode: function decode(val) {
            var value = decodeURIComponent(val);

            if ('{['.indexOf(value[0]) > -1) {
              return JSON.parse(value);
            }

            return Object.decodePrimitive(val);
          },
          decodePrimitive: function (map) {
            return function (value) {
              if (value && '1234567890+-'.includes(value[0]) && value.length <= 17) {
                var num = +value;
                return isNaN(num) ? value : num;
              }

              return value in map ? map[value] : value;
            };
          }({
            "true": true,
            "false": false,
            "null": null,
            undefined: undefined
          }),
          encode: function encode(value) {
            return encodeURIComponent(_typeof(value) === 'object' ? JSON.stringify(value) : "".concat(value));
          }
        };
        /***/
      },

      /***/
      "./pipes/str.js":
      /*!**********************!*\
        !*** ./pipes/str.js ***!
        \**********************/

      /*! exports provided: default */

      /***/
      function pipesStrJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);

        function capitalize(x) {
          if (!x) {
            return x;
          }

          var s = "".concat(x);
          return s[0].toUpperCase() + s.slice(1);
        }

        function camelize(s) {
          var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_';
          return s && s.length && s.split(sep).map(function (t, i) {
            return i ? capitalize(t) : t;
          }).join('') || '';
        }
        /**
         * Formats given string template with params.
         *
         * Template should contain placeholders like `{someKey}`,
         * which will be replaced with value by key from params.
         *
         * @param {string} template string template
         * @param {object} params hash with parameters
         */

        /* harmony default export */


        __webpack_exports__["default"] = {
          format: function format(template, params) {
            return "".concat(template || '').replace(/\{([\S]+)\}/i, function (_, key) {
              return (params && params[key]) != null ? params[key] : '';
            });
          },
          wrap: function wrap(x, template) {
            return !x ? '' : "".concat(template || '*').replace('*', x);
          },
          tail: function tail(x) {
            var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';

            if (!x) {
              return '';
            }

            var pos = x.lastIndexOf(sep);
            return pos === -1 ? x : x.slice(pos + sep.length);
          },
          lastTail: function lastTail(key) {
            var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';
            return ('' + key).split(sep).slice(-1)[0];
          },
          head: function head(x) {
            var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';

            if (!x) {
              return '';
            }

            var pos = x.indexOf(sep);
            return pos === -1 ? x : x.slice(0, pos);
          },
          pad: function pad(x) {
            var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
            var fill = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0';
            var s = String(x);

            while (s.length < size) {
              s = "".concat(fill).concat(s);
            }

            return s;
          },
          capitalize: capitalize,
          camelize: camelize,
          mirror: function mirror(x) {
            return (x || '').split('').reduce(function (r, c) {
              return c + r;
            }, '');
          },
          snakeCase: function snakeCase(x) {
            return (x || '').replace(/([a-z])([A-Z])/g, '$1_$2');
          },
          proper: function proper(s) {
            return capitalize(camelize(s));
          },
          upper: function upper(s) {
            return ('' + s).toUpperCase();
          }
        };
        /***/
      },

      /***/
      "./pipes/url.js":
      /*!**********************!*\
        !*** ./pipes/url.js ***!
        \**********************/

      /*! exports provided: default */

      /***/
      function pipesUrlJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony import */


        var _obj_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! ./obj.js */
        "./pipes/obj.js");

        function _slicedToArray(arr, i) {
          return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
        }

        function _nonIterableRest() {
          throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }

        function _iterableToArrayLimit(arr, i) {
          if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = undefined;

          try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);

              if (i && _arr.length === i) break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i["return"] != null) _i["return"]();
            } finally {
              if (_d) throw _e;
            }
          }

          return _arr;
        }

        function _arrayWithHoles(arr) {
          if (Array.isArray(arr)) return arr;
        }

        function _createForOfIteratorHelper(o, allowArrayLike) {
          var it;

          if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
            if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
              if (it) o = it;
              var i = 0;

              var F = function F() {};

              return {
                s: F,
                n: function n() {
                  if (i >= o.length) return {
                    done: true
                  };
                  return {
                    done: false,
                    value: o[i++]
                  };
                },
                e: function e(_e2) {
                  throw _e2;
                },
                f: F
              };
            }

            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }

          var normalCompletion = true,
              didErr = false,
              err;
          return {
            s: function s() {
              it = o[Symbol.iterator]();
            },
            n: function n() {
              var step = it.next();
              normalCompletion = step.done;
              return step;
            },
            e: function e(_e3) {
              didErr = true;
              err = _e3;
            },
            f: function f() {
              try {
                if (!normalCompletion && it["return"] != null) it["return"]();
              } finally {
                if (didErr) throw err;
              }
            }
          };
        }

        function _unsupportedIterableToArray(o, minLen) {
          if (!o) return;
          if (typeof o === "string") return _arrayLikeToArray(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          if (n === "Object" && o.constructor) n = o.constructor.name;
          if (n === "Map" || n === "Set") return Array.from(o);
          if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
        }

        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length) len = arr.length;

          for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i];
          }

          return arr2;
        }

        function _typeof(obj) {
          "@babel/helpers - typeof";

          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function ownKeys(object, enumerableOnly) {
          var keys = Object.keys(object);

          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            if (enumerableOnly) symbols = symbols.filter(function (sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
            keys.push.apply(keys, symbols);
          }

          return keys;
        }

        function _objectSpread(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};

            if (i % 2) {
              ownKeys(Object(source), true).forEach(function (key) {
                _defineProperty(target, key, source[key]);
              });
            } else if (Object.getOwnPropertyDescriptors) {
              Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
            } else {
              ownKeys(Object(source)).forEach(function (key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
              });
            }
          }

          return target;
        }

        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }

          return obj;
        }
        /* harmony default export */


        __webpack_exports__["default"] = {
          /**
          * Parses string into URL object like `{type, target, path, params, data }`.
          *
          * @param {string} s string in format: `type:target/path?params#data`
          * @param {object} r optional target object
          * @returns URL object
          */
          parse: function parse(s) {
            var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (!s) {
              return _objectSpread({
                path: [],
                params: {},
                target: ''
              }, r);
            }

            if (_typeof(s) === 'object') {
              return _objectSpread(_objectSpread({
                path: [],
                params: {},
                target: ''
              }, r), s);
            }

            var p; // extract type:

            p = s.indexOf(':');

            if (p > -1) {
              r.type = s.slice(0, p);
              s = s.slice(p + 1);
            } // extract data:


            p = s.indexOf('#');

            if (p > -1) {
              r.data = Object.decode(s.slice(p + 1));
              s = s.slice(0, p);
            } // extract query params:


            p = s.indexOf('?');
            r.params = r.params || {};

            if (p > -1) {
              var _iterator = _createForOfIteratorHelper(s.slice(p + 1).split('&')),
                  _step;

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var param = _step.value;

                  var _param$split = param.split('='),
                      _param$split2 = _slicedToArray(_param$split, 2),
                      key = _param$split2[0],
                      value = _param$split2[1];

                  if (value) {
                    r.params[key] = _obj_js__WEBPACK_IMPORTED_MODULE_0__["default"].decode(value);
                  }
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }

              s = s.slice(0, p);
            } // target and path:


            var path = r.path = s.split('/').map(decodeURIComponent);

            while (path.length && !r.target) {
              r.target = path.shift();
            }

            return r;
          },

          /**
          *  Represents an URL object as a string
          *
          * @param {object} r URL object like `{type, target, path, params, data }`
          * @returns string in format `type://target/path?params#data`
          */
          stringify: function stringify(r) {
            var result = '';

            if (!r) {
              return result;
            }

            if (typeof r === 'string') {
              return r;
            }

            if (r.target) {
              if (r.type) {
                result += "".concat(r.type, "://");
              }

              result += r.target;
            }

            if (r.path) {
              result += "/".concat(Array.isArray(r.path) ? r.path.map(encodeURIComponent).join('/') : r.path);
            }

            var params = r.params;

            if (params) {
              var keys = Object.keys(params).filter(function (key) {
                return params[key] != null;
              });

              if (keys.length) {
                result += "?".concat(keys.map(function (key) {
                  return "".concat(key, "=").concat(_obj_js__WEBPACK_IMPORTED_MODULE_0__["default"].encode(params[key]));
                }).join('&'));
              }
            }

            if (r.data) {
              result += "#".concat(_obj_js__WEBPACK_IMPORTED_MODULE_0__["default"].encode(r.data));
            }

            return result;
          }
        };
        /***/
      },

      /***/
      "./types/Form.js":
      /*!***********************!*\
        !*** ./types/Form.js ***!
        \***********************/

      /*! exports provided: FormField, Form */

      /***/
      function typesFormJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "FormField", function () {
          return FormField;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Form", function () {
          return Form;
        });

        function ownKeys(object, enumerableOnly) {
          var keys = Object.keys(object);

          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            if (enumerableOnly) symbols = symbols.filter(function (sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
            keys.push.apply(keys, symbols);
          }

          return keys;
        }

        function _objectSpread(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};

            if (i % 2) {
              ownKeys(Object(source), true).forEach(function (key) {
                _defineProperty(target, key, source[key]);
              });
            } else if (Object.getOwnPropertyDescriptors) {
              Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
            } else {
              ownKeys(Object(source)).forEach(function (key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
              });
            }
          }

          return target;
        }

        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }

          return obj;
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var FIELD_TYPES = {
          bool: 'SwitchField'
        };

        var FormField =
        /*#__PURE__*/
        function () {
          function FormField() {
            _classCallCheck(this, FormField);
          }

          _createClass(FormField, [{
            key: "onChange",
            value: function onChange(_ref) {
              var value = _ref.value;
              var form = this.form;
              var field = this.field;
              var id = field.id;
              form.data = _objectSpread(_objectSpread({}, form.data), {}, _defineProperty({}, id, value));
              form.change && form.change(form.data);
            }
          }, {
            key: "TEMPLATE",
            get: function get() {
              return (
                /* html */
                "\n    <ui:fragment>\n      <ui:tag tag={fieldType} ui:props={fieldProps} onChange={onChange}/>\n    </ui:fragment>"
              );
            }
          }, {
            key: "fieldType",
            get: function get() {
              var type = this.field.type || 'text';
              return FIELD_TYPES[type] || String.capitalize(type) + 'Field';
            }
          }, {
            key: "fieldProps",
            get: function get() {
              var field = this.field;
              var form = this.form;
              var id = field.id;
              var data = form.data || {};
              var value = data[id];
              return _objectSpread(_objectSpread({}, field), {}, {
                error: form.error && form.error.fields && form.error.fields[id] || null,

                get disabled() {
                  return field.disabled && field.disabled(this.value, this.data);
                },

                value: value === undefined ? null : value,
                caption: field.caption || field.name,
                data: data
              });
            }
          }]);

          return FormField;
        }();

        var Form =
        /*#__PURE__*/
        function () {
          function Form() {
            _classCallCheck(this, Form);
          }

          _createClass(Form, [{
            key: "getForm",
            value: function getForm() {
              return this;
            }
          }, {
            key: "getFields",
            value: function getFields() {
              return this.fields || Object.keys(this.data).map(function (id) {
                return {
                  id: id,
                  caption: id
                };
              });
            }
          }, {
            key: "TEMPLATE",
            get: function get() {
              return (
                /* html */
                "\n    <div autocomplete=\"off\" class=\"form-horizontal\">\n        <FormField ui:for=\"field of fields\" field={field} form={form}/>\n    </div>"
              );
            }
          }]);

          return Form;
        }();
        /***/

      },

      /***/
      "./types/NavigationService.js":
      /*!************************************!*\
        !*** ./types/NavigationService.js ***!
        \************************************/

      /*! exports provided: NavigationService */

      /***/
      function typesNavigationServiceJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "NavigationService", function () {
          return NavigationService;
        });
        /* harmony import */


        var _Service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! ./Service */
        "./types/Service.js");
        /* harmony import */


        var _pipes_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ../pipes/url */
        "./pipes/url.js");

        function _typeof(obj) {
          "@babel/helpers - typeof";

          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function ownKeys(object, enumerableOnly) {
          var keys = Object.keys(object);

          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            if (enumerableOnly) symbols = symbols.filter(function (sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
            keys.push.apply(keys, symbols);
          }

          return keys;
        }

        function _objectSpread(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};

            if (i % 2) {
              ownKeys(Object(source), true).forEach(function (key) {
                _defineProperty(target, key, source[key]);
              });
            } else if (Object.getOwnPropertyDescriptors) {
              Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
            } else {
              ownKeys(Object(source)).forEach(function (key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
              });
            }
          }

          return target;
        }

        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }

          return obj;
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };

          return _setPrototypeOf(o, p);
        }

        function _createSuper(Derived) {
          var hasNativeReflectConstruct = _isNativeReflectConstruct();

          return function _createSuperInternal() {
            var Super = _getPrototypeOf(Derived),
                result;

            if (hasNativeReflectConstruct) {
              var NewTarget = _getPrototypeOf(this).constructor;

              result = Reflect.construct(Super, arguments, NewTarget);
            } else {
              result = Super.apply(this, arguments);
            }

            return _possibleConstructorReturn(this, result);
          };
        }

        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === "object" || typeof call === "function")) {
            return call;
          }

          return _assertThisInitialized(self);
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return self;
        }

        function _isNativeReflectConstruct() {
          if (typeof Reflect === "undefined" || !Reflect.construct) return false;
          if (Reflect.construct.sham) return false;
          if (typeof Proxy === "function") return true;

          try {
            Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
            return true;
          } catch (e) {
            return false;
          }
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }

        var NavigationService =
        /*#__PURE__*/
        function (_Service) {
          _inherits(NavigationService, _Service);

          var _super = _createSuper(NavigationService);

          function NavigationService() {
            _classCallCheck(this, NavigationService);

            return _super.apply(this, arguments);
          }

          _createClass(NavigationService, [{
            key: "init",
            value: function init() {
              var _this = this;

              this.prevHash = '';

              this.hashchange = function () {
                var hash = window.location.hash.slice(1);

                if (hash[0] === '/' && hash !== _this.prevHash) {
                  _this.emit('this.hash', {
                    value: hash.slice(1)
                  });

                  _this.prevHash = hash;
                } else if (!_this.prevHash) {
                  _this.emit('this.hash', {
                    value: 'main'
                  });

                  _this.prevHash = '/main';
                }
              };

              window.addEventListener('hashchange', this.hashchange);
              setTimeout(function () {
                return _this.hashchange();
              }, 0);
            }
          }, {
            key: "done",
            value: function done() {
              window.removeEventListener('hashchange', this.hashchange);
            }
          }, {
            key: "update",
            value: function update(d) {
              var _url$parse = _pipes_url__WEBPACK_IMPORTED_MODULE_1__["default"].parse(d),
                  target = _url$parse.target,
                  _url$parse$path = _url$parse.path,
                  path = _url$parse$path === void 0 ? ['*'] : _url$parse$path,
                  params = _url$parse.params;

              var state = {
                target: (!target || target === '*' ? this.target : target) || 'main',
                path: path[0] === '*' ? this.path : path,
                params: params.reset ? _objectSpread(_objectSpread({}, params), {}, {
                  reset: null
                }) : _objectSpread(_objectSpread({}, this.params), params)
              };
              window.location.hash = this.prevHash = '/' + _pipes_url__WEBPACK_IMPORTED_MODULE_1__["default"].stringify(state);
              return state;
            }
          }, {
            key: "getRoute",
            value: function getRoute() {
              return {
                target: this.target,
                path: this.path,
                params: this.params
              };
            }
          }, {
            key: "onHash",
            value: function onHash(_ref) {
              var value = _ref.value;
              return this.update(value);
            }
          }, {
            key: "onParams",
            value: function onParams(params) {
              return this.update({
                params: _objectSpread(_objectSpread({}, params), {}, {
                  data: null
                })
              });
            }
          }]);

          return NavigationService;
        }(_Service__WEBPACK_IMPORTED_MODULE_0__["Service"]);
        /***/

      },

      /***/
      "./types/Service.js":
      /*!**************************!*\
        !*** ./types/Service.js ***!
        \**************************/

      /*! exports provided: Service */

      /***/
      function typesServiceJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Service", function () {
          return Service;
        });

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var Service =
        /*#__PURE__*/
        function () {
          function Service(state, $) {
            _classCallCheck(this, Service);

            this.state = state;
            this.$ = $;
          }
          /**
           * Framework
           */


          _createClass(Service, [{
            key: "lookupService",
            value: function lookupService(ref) {
              return this.$.app && this.$.app[ref] ? this.$.app[ref].impl : null;
            }
          }, {
            key: "up",
            value: function up() {
              var _this$$;

              return (_this$$ = this.$).up.apply(_this$$, arguments);
            }
          }, {
            key: "defer",
            value: function defer() {
              var _this$$2;

              return (_this$$2 = this.$).defer.apply(_this$$2, arguments);
            }
          }, {
            key: "emit",
            value: function emit() {
              var _this$$3;

              return (_this$$3 = this.$).emit.apply(_this$$3, arguments);
            }
          }, {
            key: "log",
            value: function log() {
              var _console;

              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              (_console = console).log.apply(_console, [this.$.ref + ': '].concat(args));

              return args[0];
            }
            /**
             * Error handling
             */

          }, {
            key: "handleError",
            value: function handleError(_ref) {
              var _ref$message = _ref.message,
                  message = _ref$message === void 0 ? '' : _ref$message,
                  _ref$code = _ref.code,
                  code = _ref$code === void 0 ? '' : _ref$code; // may  overriden from props

              var handler = this.lookupService('errorHandler');

              if (handler) {
                handler.handleError({
                  message: message,
                  code: code,
                  source: this.$.ref
                });
              } else {
                console.error(this.$.ref + ': ERROR: ', message, code);
              }
            }
          }, {
            key: "safe",
            value: function safe(p, def) {
              var _this = this;

              return p["catch"](function (error) {
                _this.handleError(error);

                return def ? def(error) : {
                  error: error
                };
              });
            }
          }, {
            key: "onClearError",
            value: function onClearError() {
              return {
                error: null
              };
            }
          }]);

          return Service;
        }();
        /***/

      },

      /***/
      "./types/ServiceWorker.js":
      /*!********************************!*\
        !*** ./types/ServiceWorker.js ***!
        \********************************/

      /*! exports provided: ServiceWorker */

      /***/
      function typesServiceWorkerJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "ServiceWorker", function () {
          return ServiceWorker;
        });
        /* harmony import */


        var _Service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! ./Service */
        "./types/Service.js");

        function _typeof(obj) {
          "@babel/helpers - typeof";

          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function _toConsumableArray(arr) {
          return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
        }

        function _nonIterableSpread() {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }

        function _unsupportedIterableToArray(o, minLen) {
          if (!o) return;
          if (typeof o === "string") return _arrayLikeToArray(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          if (n === "Object" && o.constructor) n = o.constructor.name;
          if (n === "Map" || n === "Set") return Array.from(o);
          if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
        }

        function _iterableToArray(iter) {
          if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
        }

        function _arrayWithoutHoles(arr) {
          if (Array.isArray(arr)) return _arrayLikeToArray(arr);
        }

        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length) len = arr.length;

          for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i];
          }

          return arr2;
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };

          return _setPrototypeOf(o, p);
        }

        function _createSuper(Derived) {
          var hasNativeReflectConstruct = _isNativeReflectConstruct();

          return function _createSuperInternal() {
            var Super = _getPrototypeOf(Derived),
                result;

            if (hasNativeReflectConstruct) {
              var NewTarget = _getPrototypeOf(this).constructor;

              result = Reflect.construct(Super, arguments, NewTarget);
            } else {
              result = Super.apply(this, arguments);
            }

            return _possibleConstructorReturn(this, result);
          };
        }

        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === "object" || typeof call === "function")) {
            return call;
          }

          return _assertThisInitialized(self);
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return self;
        }

        function _isNativeReflectConstruct() {
          if (typeof Reflect === "undefined" || !Reflect.construct) return false;
          if (Reflect.construct.sham) return false;
          if (typeof Proxy === "function") return true;

          try {
            Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
            return true;
          } catch (e) {
            return false;
          }
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }

        var ServiceWorker =
        /*#__PURE__*/
        function (_Service) {
          _inherits(ServiceWorker, _Service);

          var _super = _createSuper(ServiceWorker);

          function ServiceWorker() {
            _classCallCheck(this, ServiceWorker);

            return _super.apply(this, arguments);
          }

          _createClass(ServiceWorker, [{
            key: "init",
            value: function init() {
              var _this = this;

              try {
                Function.assert(this.api, 'Service Workers are not supported');
                var _this$source = this.source,
                    source = _this$source === void 0 ? '/service-worker.js' : _this$source,
                    _this$scope = this.scope,
                    scope = _this$scope === void 0 ? '/' : _this$scope,
                    push = this.push;
                this.api.register(source, {
                  scope: scope
                }).then(function (registration) {
                  return _this.registered(registration);
                }).then(function () {
                  return _this.ready(function () {
                    return _this.log('Service Worker Ready');
                  });
                });
                this.api.addEventListener('message', function (ev) {
                  return _this.onMessage(ev);
                });

                if (push) {
                  this.subscribe();
                }
              } catch (error) {
                this.fallback(error);
              }
            } // ensures that `fn` executed when api is ready

          }, {
            key: "ready",
            value: function ready(fn) {
              return this.api.ready.then(fn);
            }
          }, {
            key: "fallback",
            value: function fallback(error) {
              this.log(error);
            } // hook on registered

          }, {
            key: "registered",
            value: function registered(registration) {
              this.log('Service Worker Registered');
              return registration;
            }
            /**
               * Push
               */

          }, {
            key: "withPushManager",
            value: function withPushManager(fn) {
              return this.ready(function (_ref) {
                var pushManager = _ref.pushManager;
                return pushManager;
              }).then(fn);
            }
          }, {
            key: "unsubscribe",
            value: function unsubscribe() {
              var _this2 = this;

              this.withPushManager(function (pushManager) {
                return pushManager.getSubscription();
              }).then(function (ss) {
                return ss && ss.unsubscribe();
              }).then(function () {
                return _this2.saveSubscription();
              })["catch"](function (e) {
                console.log('Error thrown while unsubscribing from  push messaging.', e);
              });
            }
          }, {
            key: "subscribe",
            value: function subscribe() {
              var _this3 = this;

              function urlBase64ToUint8Array(base64String) {
                var padding = '='.repeat((4 - base64String.length % 4) % 4);
                var base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
                var rawData = window.atob(base64);
                return Uint8Array.from(_toConsumableArray(rawData).map(function (_char) {
                  return _char.charCodeAt(0);
                }));
              }

              if (Notification.permission === 'granted') {
                /* do our magic */
              } else if (Notification.permission === 'blocked') {
                /* the user has previously denied push. Can't reprompt. */
              } else {
                  /* show a prompt to the user */
                }

              var applicationServerKey = urlBase64ToUint8Array(this.vapidPublicKey);
              this.withPushManager(function (pushManager) {
                return pushManager.getSubscription() // .then((ss) => ss && ss.unsubscribe())
                .then(function (ss) {
                  return ss || pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: applicationServerKey
                  });
                }).then(function (subscription) {
                  return _this3.saveSubscription(subscription.toJSON());
                })["catch"](function (err) {
                  if (Notification.permission === 'denied') {
                    _this3.log('The user has blocked notifications.');
                  }

                  _this3.handleError(err);
                });
              });
            } // to be overriden from props

          }, {
            key: "saveSubscription",
            value: function saveSubscription(ss) {
              this.subscription = ss;
            }
            /**
               * Intercommunication between service worker.
               */
            // handles a message posted from Service worker.

          }, {
            key: "onMessage",
            value: function onMessage(payload) {
              this.log('onMessage', payload);
            }
          }, {
            key: "api",
            get: function get() {
              return navigator.serviceWorker;
            }
          }]);

          return ServiceWorker;
        }(_Service__WEBPACK_IMPORTED_MODULE_0__["Service"]);
        /***/

      },

      /***/
      "./types/elements.html":
      /*!*****************************!*\
        !*** ./types/elements.html ***!
        \*****************************/

      /*! exports provided: default */

      /***/
      function typesElementsHtml(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony default export */


        __webpack_exports__["default"] = "<component id=\"Icon\">\n    <i class=\"fa{bundle|or:s} fa-{type} {class}\" style={style} data={data} click={click}></i>\n</component>\n\n<component id=\"Img\">\n    <img src={src|or:@default} alt={alt} class=\"img {class}\" style={style} />\n</component>\n\n<component id=\"Avatar\">\n    <figure class=\"avatar {large|then:avatar-lg}\">\n        <Img src={src}\n             alt={alt}\n             default=\"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==\" />\n    </figure>\n</component>\n\n<component id=\"Button\">\n    <button class=\"btn btn-{mode} {primary|then:btn-primary} {disabled|or:@busy|then:disabled} {class} {large|then:btn-lg} {link|then:btn-link} c-hand\"\n            style={style}\n            data={data}\n            click={action|track:@trackId:@caption}>\n        <i ui:if={busy} class=\"loading mx-2\"></i>\n        <Icon ui:if={icon} bundle={iconBundle} type={icon} class=\"mx-2\" />\n        <span ui:if={caption} style=\"white-space:nowrap; overflow: hidden; text-overflow: ellipsis;\">{caption}</span>\n    </button>\n</component>\n\n<component id=\"FAB\">\n    <button class=\"btn2 {tooltip|then:tooltip} tooltip-left fixed bg-primary circle c-hand {class}\"\n            style=\"position: fixed;border:none; right:1.5rem; bottom:1.5rem; width: 2.5rem; height: 2.5rem; z-index:5;\"\n            data={data} data-tooltip={tooltip|or:} click={action|track:@trackId:big}>\n        <Icon type={icon|or:plus} />\n    </button>\n</component>\n\n<component id=\"Modal\">\n    <div class=\"modal modal {open|then:active}\">\n        <a class=\"modal-overlay\" aria-label=\"Close\" data={data} click={close}></a>\n        <div class=\"modal-container\">\n            <div class=\"modal-header\">\n                <a class=\"btn btn-clear float-right\" aria-label=\":close\" data={data} click={close}></a>\n                <div class=\"modal-title h5\" ui:if={title}>{title}</div>\n                <ui:slot id=\"header\" />\n            </div>\n            <div class=\"modal-body\" style=\"max-height: 70vh;\">\n                <div class=\"content\">\n                    <ui:slot />\n                </div>\n            </div>\n            <div class=\"modal-footer\">\n                <ui:slot id=\"footer\" />\n            </div>\n        </div>\n    </div>\n</component>\n\n<component id=\"Tabs\">\n    <ul class=\"tab tab-block\">\n        <li class=\"tab-item {item.id|equals:@value|then:active} c-hand\" ui:for=\"item of items\">\n            <a data={data} data-id={item.id} click={action}>\n                <Icon ui:if={item.icon} type={item.icon} bundle={item.iconBundle} class=\"mx-2\" />\n                {item.name}\n            </a>\n        </li>\n    </ul>\n</component>";
        /***/
      },

      /***/
      "./types/fields.html":
      /*!***************************!*\
        !*** ./types/fields.html ***!
        \***************************/

      /*! exports provided: default */

      /***/
      function typesFieldsHtml(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony default export */


        __webpack_exports__["default"] = "<component id=\"FieldItem\">\n    <div class=\"columns form-group {error|then:has-error} {class}\">\n        <div class=\" col-4 col-sm-12\">\n            <label class=\"form-label\" for=\"input-example-1\">\n                {caption}\n                <sup ui:if={required}\n                     class=\"text-error\">✱</sup>\n            </label>\n        </div>\n        <div class=\"col-8 col-sm-12\">\n            <ui:slot />\n            <p class=\"form-input-hint\" ui:if={error}>{error}</p>\n        </div>\n    </div>\n</component>\n\n<component id=\"TextField\">\n    <FieldItem caption={caption} error={error} required={required}>\n        <input class=\"form-input\"\n               type=\"text\"\n               disabled={disabled}\n               placeholder={placeholder|or:@caption}\n               value={value}\n               change={onChange}>\n    </FieldItem>\n</component>\n\n<component id=\"DateField\">\n    <FieldItem caption={caption} error={error} required={required}>\n        <input class=\"form-input\"\n               disabled={disabled}\n               type=\"date\"\n               placeholder={caption}\n               value={value}\n               change={onChange}>\n    </FieldItem>\n</component>\n\n<component id=\"DateTimeField\">\n    <FieldItem caption=\"{caption}\" error={error} required={required}>\n        <input class=\"form-input\"\n               disabled={disabled}\n               type=\"datetime-local\"\n               placeholder={caption}\n               value={value|date:yyyy-mm-ddTt}\n               change={onChange}>\n    </FieldItem>\n</component>\n\n<component id=\"NumberField\">\n    <FieldItem caption={caption} error={error} required={required}>\n        <input class=\"form-input\"\n               disabled={disabled}\n               type=\"number\"\n               placeholder={caption}\n               value={value}\n               change={onChange}>\n    </FieldItem>\n</component>\n\n<component id=\"TextareaField\">\n    <FieldItem caption={caption} error={error} required={required}>\n        <textarea\n                  class=\"form-input\"\n                  style=\"min-height: 15vw\"\n                  disabled={disabled} placeholder={caption} rows=\"3\" change={onChange} value={value}></textarea>\n    </FieldItem>\n</component>\n\n<component id=\"SwitchField\">\n    <div class=\"form-group\">\n        <div class=\"col-sm-12\">\n            <label class=\"form-switch\">\n                <span>{caption}</span>\n                <input type=\"checkbox\" toggle={onChange} data={data} checked={value|not|not}>\n                <i class=\"form-icon\"></i>\n            </label>\n        </div>\n    </div>\n</component>\n\n<component id=\"EnumField\">\n    <FieldItem caption={caption} class={class} error={error} required={required}>\n        <Select class=\"form-select\"\n                change={onChange}\n                value={value|or:@defaultValue}\n                data={data}\n                options=\":enums.{typeSpec}\"\n                emptyCaption={emptyCaption}\n                disabled={disabled} />\n    </FieldItem>\n</component>\n\n<component id=\"SelectField\">\n    <FieldItem caption={caption} class={class} error={error} required={required}>\n        <Select class=\"form-select\"\n                change={onChange}\n                value={value|or:@defaultValue}\n                data={data}\n                options={options}\n                emptyCaption={emptyCaption}\n                disabled={disabled} />\n    </FieldItem>\n</component>\n\n<component id=\"RadioField\">\n    <FieldItem caption={caption} error={error} required={required}>\n        <RadioGroup change={onChange}\n                    value={value} data={data} options=\":enums.{typeSpec}\"\n                    disabled={disabled} />\n    </FieldItem>\n</component>";
        /***/
      },

      /***/
      "./types/index.js":
      /*!************************!*\
        !*** ./types/index.js ***!
        \************************/

      /*! exports provided: default */

      /***/
      function typesIndexJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony import */


        var _elements_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! ./elements.html */
        "./types/elements.html");
        /* harmony import */


        var _table_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./table.html */
        "./types/table.html");
        /* harmony import */


        var _inputs_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./inputs.html */
        "./types/inputs.html");
        /* harmony import */


        var _fields_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        /*! ./fields.html */
        "./types/fields.html");
        /* harmony import */


        var _layouts_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
        /*! ./layouts.html */
        "./types/layouts.html");
        /* harmony import */


        var _viewport_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
        /*! ./viewport.html */
        "./types/viewport.html");
        /* harmony import */


        var _NavigationService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
        /*! ./NavigationService */
        "./types/NavigationService.js");
        /* harmony import */


        var _ServiceWorker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
        /*! ./ServiceWorker */
        "./types/ServiceWorker.js");
        /* harmony import */


        var _Form__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
        /*! ./Form */
        "./types/Form.js");
        /* harmony import */


        var _services__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
        /*! ./services */
        "./types/services.js");

        function _toConsumableArray(arr) {
          return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
        }

        function _nonIterableSpread() {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }

        function _unsupportedIterableToArray(o, minLen) {
          if (!o) return;
          if (typeof o === "string") return _arrayLikeToArray(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          if (n === "Object" && o.constructor) n = o.constructor.name;
          if (n === "Map" || n === "Set") return Array.from(o);
          if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
        }

        function _iterableToArray(iter) {
          if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
        }

        function _arrayWithoutHoles(arr) {
          if (Array.isArray(arr)) return _arrayLikeToArray(arr);
        }

        function _arrayLikeToArray(arr, len) {
          if (len == null || len > arr.length) len = arr.length;

          for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i];
          }

          return arr2;
        }
        /* harmony default export */


        __webpack_exports__["default"] = [_ServiceWorker__WEBPACK_IMPORTED_MODULE_7__["ServiceWorker"], _NavigationService__WEBPACK_IMPORTED_MODULE_6__["NavigationService"]].concat(_toConsumableArray(Object.values(_Form__WEBPACK_IMPORTED_MODULE_8__)), _toConsumableArray(Object.values(_services__WEBPACK_IMPORTED_MODULE_9__)), [_elements_html__WEBPACK_IMPORTED_MODULE_0__["default"], _table_html__WEBPACK_IMPORTED_MODULE_1__["default"], _fields_html__WEBPACK_IMPORTED_MODULE_3__["default"], _viewport_html__WEBPACK_IMPORTED_MODULE_5__["default"], _layouts_html__WEBPACK_IMPORTED_MODULE_4__["default"], _inputs_html__WEBPACK_IMPORTED_MODULE_2__["default"]]);
        /***/
      },

      /***/
      "./types/inputs.html":
      /*!***************************!*\
        !*** ./types/inputs.html ***!
        \***************************/

      /*! exports provided: default */

      /***/
      function typesInputsHtml(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony default export */


        __webpack_exports__["default"] = "<component id=\"Select\">\n    <select class=\"{class}\" change={change} disabled={disabled} data={data}>\n        <option selected={value|not} value=\"\" ui:if={value|not|or:@emptyCaption}>{emptyCaption}</option>\n        <option ui:for=\"option of options\" selected={option.id|equals:@value} value={option.id}>\n            {option.name}\n        </option>\n    </select>\n</component>\n\n<component id=\"RadioGroup\">\n    <div class=\"{class}\">\n        <label class=\"form-radio\" ui:for=\"option of options\">\n            <input type=\"radio\" name={id|or:rg}\n                   value={option.id}\n                   checked={option.id|equals:@value} change={change} data={data}\n                   disabled={disabled}>\n            <i class=\"form-icon\"></i>{option.name}\n        </label>\n    </div>\n</component>\n\n<component id=\"Dropdown\">\n    <div class=\"dropdown\">\n        <a href=\"#\" class=\"btn btn-link dropdown-toggle\" tabindex=\"0\">\n            {data|selectedName}<i class=\"icon icon-caret\"></i>\n        </a>\n        <!-- menu component -->\n        <ul class=\"menu\" style=\"right:0;left:auto;\">\n            <li ui:for=\"item of data\" class=\"menu-item {item.id|equals:@value|then:active}\"\n                data-id={item.id}\n                data-name={item.name}\n                click={change}>\n                <a>{item.name}</a>\n            </li>\n        </ul>\n    </div>\n</component>\n\n<component id=\"DateTimeInput\">\n    <input class=\"form-input flatpickr-input\"\n           init={:support.initFlatpickr}\n           disabled={disabled}\n           type=\"text\"\n           placeholder={placeholder}\n           value={value|support.setFlatpickrValue}\n           change={change}>\n</component>\n\n<component id=\"SearchBar\">\n    <span class=\"ant-input-search ant-input-affix-wrapper\">\n        <input placeholder=\"Поиск...\" class=\"ant-input\" type=\"text\"\n               value={value} enter={action}\n               style=\"min-height:40px;\">\n        <span class=\"ant-input-suffix\">\n            <i class=\"anticon anticon-search ant-input-search-icon\" style=\"margin-top: 4px;\"></i>\n        </span>\n    </span>\n</component>";
        /***/
      },

      /***/
      "./types/layouts.html":
      /*!****************************!*\
        !*** ./types/layouts.html ***!
        \****************************/

      /*! exports provided: default */

      /***/
      function typesLayoutsHtml(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony default export */


        __webpack_exports__["default"] = "<component id=\"LoadingIndicator\">\n    <div class=\"loading {large|then:loading-lg} {class}\" />\n</component>\n\n<component id=\"EmptyData\">\n    <div class=\"empty {class}\">\n        <div class=\"empty-icon\">\n            <Icon type={icon|or:people} />\n        </div>\n        <p class=\"empty-title h5\">{title}</p>\n        <p ui:if={subtitle} class=\"empty-subtitle\">{subtitle}</p>\n        <div class=\"empty-action\">\n            <ui:slot />\n        </div>\n    </div>\n</component>\n\n<component id=\"Panel\">\n    <h6 class=\"mt-2 pt-2 px-2 text-gray\" ui:if=\"caption\">{caption}</h6>\n    <div class=\"panel {class}\" style={style}>\n        <small class=\"p-2 bg-secondary\" ui:if={hint}>{hint}</small>\n        <div class=\"panel-header\" ui:if=\"slot(title)\">\n            <div class=\"panel-title\">\n                <ui:slot id=\"title\" key=\"panel-title\" />\n            </div>\n        </div>\n        <div class=\"panel-nav\" ui:if=\"slot(nav)\">\n            <ui:slot id=\"nav\" />\n        </div>\n        <div class=\"panel-body p-2\">\n            <ui:slot />\n        </div>\n        <div class=\"panel-footer\" ui:if=\"slot(footer)\">\n            <ui:slot id=\"footer\" />\n        </div>\n    </div>\n</component>\n\n<component id=\"Grid\">\n    <div class=\"columns {class}\">\n        <ui:slot />\n    </div>\n</component>\n\n<component id=\"Col\">\n    <div class=\"col-{size|or:6} col-sm-12 {class}\">\n        <ui:slot />\n    </div>\n</component>\n<component id=\"Centroid\">\n    <div class=\"{class}\" style=\"display: flex;align-items: center;justify-content: center;{style}\">\n        <ui:slot />\n    </div>\n</component>\n\n<component id=\"FlexBox\">\n    <div class=\"{class}\" style=\"display: flex;align-items: stretch;justify-content:space-around;{style}\">\n        <ui:slot />\n    </div>\n</component>\n\n<component id=\"Tile\">\n    <div class=\"tile {centered|then:tile-centered} m-2 {class}\">\n        <div class=\"tile-icon\" ui:if={image}>\n            <Avatar src={image} />\n        </div>\n        <div class=\"tile-icon\" ui:if={icon}>\n            <Icon type={icon} />\n        </div>\n        <div class=\"tile-content\">\n            <div class=\"tile-title text-bold\" ui:if={title}>{title}</div>\n            <div class=\"tile-subtitle\" ui:if={subtitle}>{subtitle}</div>\n            <ui:slot />\n        </div>\n        <div class=\"tile-action btn-group\" ui:if=\"slot(actions)\">\n            <ui:slot id=\"actions\" />\n        </div>\n    </div>\n</component>\n\n\n<component id=\"Card\">\n    <div class=\"card\" style={style}>\n        <div class=\"card-image\" ui:if={image}>\n            <img src={image} class=\"img-responsive\" />\n        </div>\n        <div class=\"card-header\">\n            <a ui:if={title} href={link}>\n                <h5 class=\"card-title\">{title}</h5>\n            </a>\n            <div ui:if={subtitle} class=\"card-subtitle text-gray\">{subtitle}</div>\n            <ui:slot id=\"header\" />\n        </div>\n        <div class=\"card-body\">\n            <ui:slot />\n        </div>\n        <div class=\"card-footer\">\n            <ui:slot id=\"footer\" />\n        </div>\n    </div>\n</component>\n\n<component id=\"Popover\">\n    <div class=\"popover popover-right\">\n        <ui:slot />\n        <div class=\"popover-container\">\n            <div class=\"card\">\n                <div class=\"card-header\">\n                    <ui:slot id=\"body\" />\n                </div>\n            </div>\n        </div>\n    </div>\n</component>";
        /***/
      },

      /***/
      "./types/services.js":
      /*!***************************!*\
        !*** ./types/services.js ***!
        \***************************/

      /*! exports provided: Invoke, Loader, ErrorHandlingService, ToastService */

      /***/
      function typesServicesJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Invoke", function () {
          return Invoke;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "Loader", function () {
          return Loader;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "ErrorHandlingService", function () {
          return ErrorHandlingService;
        });
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "ToastService", function () {
          return ToastService;
        });
        /* harmony import */


        var _Service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! ./Service */
        "./types/Service.js");

        function _typeof(obj) {
          "@babel/helpers - typeof";

          if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
            _typeof = function _typeof(obj) {
              return _typeof2(obj);
            };
          } else {
            _typeof = function _typeof(obj) {
              return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
            };
          }

          return _typeof(obj);
        }

        function _inherits(subClass, superClass) {
          if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
          }

          subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
              value: subClass,
              writable: true,
              configurable: true
            }
          });
          if (superClass) _setPrototypeOf(subClass, superClass);
        }

        function _setPrototypeOf(o, p) {
          _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
          };

          return _setPrototypeOf(o, p);
        }

        function _createSuper(Derived) {
          var hasNativeReflectConstruct = _isNativeReflectConstruct();

          return function _createSuperInternal() {
            var Super = _getPrototypeOf(Derived),
                result;

            if (hasNativeReflectConstruct) {
              var NewTarget = _getPrototypeOf(this).constructor;

              result = Reflect.construct(Super, arguments, NewTarget);
            } else {
              result = Super.apply(this, arguments);
            }

            return _possibleConstructorReturn(this, result);
          };
        }

        function _possibleConstructorReturn(self, call) {
          if (call && (_typeof(call) === "object" || typeof call === "function")) {
            return call;
          }

          return _assertThisInitialized(self);
        }

        function _assertThisInitialized(self) {
          if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          }

          return self;
        }

        function _isNativeReflectConstruct() {
          if (typeof Reflect === "undefined" || !Reflect.construct) return false;
          if (Reflect.construct.sham) return false;
          if (typeof Proxy === "function") return true;

          try {
            Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
            return true;
          } catch (e) {
            return false;
          }
        }

        function _getPrototypeOf(o) {
          _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
          };
          return _getPrototypeOf(o);
        }

        function ownKeys(object, enumerableOnly) {
          var keys = Object.keys(object);

          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            if (enumerableOnly) symbols = symbols.filter(function (sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
            keys.push.apply(keys, symbols);
          }

          return keys;
        }

        function _objectSpread(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};

            if (i % 2) {
              ownKeys(Object(source), true).forEach(function (key) {
                _defineProperty(target, key, source[key]);
              });
            } else if (Object.getOwnPropertyDescriptors) {
              Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
            } else {
              ownKeys(Object(source)).forEach(function (key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
              });
            }
          }

          return target;
        }

        function _defineProperty(obj, key, value) {
          if (key in obj) {
            Object.defineProperty(obj, key, {
              value: value,
              enumerable: true,
              configurable: true,
              writable: true
            });
          } else {
            obj[key] = value;
          }

          return obj;
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function _defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        function _createClass(Constructor, protoProps, staticProps) {
          if (protoProps) _defineProperties(Constructor.prototype, protoProps);
          if (staticProps) _defineProperties(Constructor, staticProps);
          return Constructor;
        }

        var Invoke =
        /*#__PURE__*/
        function () {
          function Invoke() {
            _classCallCheck(this, Invoke);
          }

          _createClass(Invoke, [{
            key: "init",
            value: function init() {
              var _this = this;

              if (this.delay) {
                setTimeout(function () {
                  if (!_this.isDone) {
                    _this.action(_this.data);
                  }
                }, this.delay * 1000);
              } else {
                this.action(this.data);
              }
            }
          }]);

          return Invoke;
        }();

        var Loader =
        /*#__PURE__*/
        function () {
          function Loader() {
            _classCallCheck(this, Loader);
          }

          _createClass(Loader, [{
            key: "init",
            value: function init() {
              this.reload();
            }
          }, {
            key: "setTrigger",
            value: function setTrigger(val) {
              this.trigger = val;
              this.reload();
            }
          }, {
            key: "reload",
            value: function reload() {
              var from = this.from,
                  data = this.data,
                  into = this.into;

              if (from && into) {
                from({
                  data: data,
                  callback: function callback(error, result) {
                    return into(_objectSpread({
                      error: error
                    }, result));
                  }
                });
              }
            }
          }]);

          return Loader;
        }();

        var ErrorHandlingService =
        /*#__PURE__*/
        function (_Service) {
          _inherits(ErrorHandlingService, _Service);

          var _super = _createSuper(ErrorHandlingService);

          function ErrorHandlingService() {
            _classCallCheck(this, ErrorHandlingService);

            return _super.apply(this, arguments);
          }

          _createClass(ErrorHandlingService, [{
            key: "handleError",
            value: function handleError(_ref) {
              var _ref$message = _ref.message,
                  message = _ref$message === void 0 ? '' : _ref$message,
                  code = _ref.code,
                  _ref$source = _ref.source,
                  source = _ref$source === void 0 ? {} : _ref$source;
              this.show({
                message: source + ': ' + message,
                code: code,
                mode: 'error'
              });
            }
          }, {
            key: "show",
            value: function show(_ref2) {
              var _ref2$message = _ref2.message,
                  message = _ref2$message === void 0 ? '' : _ref2$message,
                  _ref2$code = _ref2.code,
                  code = _ref2$code === void 0 ? '' : _ref2$code,
                  source = _ref2.source;
              console.error(source + ': ERROR: ', code, message);
            }
          }]);

          return ErrorHandlingService;
        }(_Service__WEBPACK_IMPORTED_MODULE_0__["Service"]);

        var ToastService =
        /*#__PURE__*/
        function (_Service2) {
          _inherits(ToastService, _Service2);

          var _super2 = _createSuper(ToastService);

          function ToastService() {
            _classCallCheck(this, ToastService);

            return _super2.apply(this, arguments);
          }

          _createClass(ToastService, [{
            key: "onSend",
            value: function onSend(_ref3) {
              var _this2 = this;

              var data = _ref3.data;
              return {
                top: _objectSpread(_objectSpread({}, data), {}, {
                  close: function close() {
                    return _this2.emit('this.close');
                  },
                  closeAfter: 5
                })
              };
            }
          }, {
            key: "onClose",
            value: function onClose() {
              return {
                top: null
              };
            }
          }]);

          return ToastService;
        }(_Service__WEBPACK_IMPORTED_MODULE_0__["Service"]);
        /***/

      },

      /***/
      "./types/table.html":
      /*!**************************!*\
        !*** ./types/table.html ***!
        \**************************/

      /*! exports provided: default */

      /***/
      function typesTableHtml(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony default export */


        __webpack_exports__["default"] = "<component id=\"LoadableItems\">\n    <LoadingIndicator class=\"empty\" ui:if=\"data|not\">\n        <ui:else>\n            <h5 class=\"error text-error\" ui:if=\"data.error\">{data.error.message|or:@data.error}</h5>\n            <EmptyData title={emptyCaption|or:Empty} ui:if=\"data.length|not\">\n                <ui:else>\n                    <div style={style} ui:for=\"item of data\">\n                        <ui:tag tag={itemType} ui:props={item} item={item} context={context} action={action} />\n                    </div>\n                </ui:else>\n            </EmptyData>\n        </ui:else>\n    </LoadingIndicator>\n</component>\n\n<component id=\"LoadableEntity\">\n    <LoadingIndicator class=\"empty\" ui:if=\"data|not\">\n        <ui:else>\n            <h5 class=\"error text-error\" ui:if=\"data.error\">\n                <span>{data.error.message|or:@data.error}</span>\n                <ui:else>\n                    <EmptyData title={emptyCaption|or:Empty} ui:if=\"data.id|not\">\n                        <ui:else>\n                            <ui:tag tag={type} data={data} context={context} action={action} />\n                        </ui:else>\n                    </EmptyData>\n                </ui:else>\n            </h5>\n        </ui:else>\n    </LoadingIndicator>\n</component>\n\n<component id=\"Cell\">\n    <span class=\"\" style=\"padding-left: 0px;\">{value}</span>\n</component>\n\n<component id=\"EnumCell\">\n    <span class=\"\"\n          style=\"padding-left: 0px;\">:map.{typeSpec}.{value}</span>\n</component>\n\n<component id=\"DateCell\">\n    <span class=\"\" style=\"padding-left: 0px;\">{value|date}</span>\n</component>\n\n<component id=\"Table\">\n    <table style=\"position: relative;\">\n        <thead class=\"table-thead\">\n            <tr>\n                <th class=\"col-index\" style=\"position: sticky; top: -1;\"></th>\n                <th class=\"col-index\" style=\"position: sticky; top: -1;\" ui:for=\"item of columns\">\n                    <span>{item.name}</span>\n                    <div class=\"table-column-sorter\" ui:if=\"item.sortable\">\n                        <span class=\"table-column-sorter-up off\" title=\"↑\" data-id=\"-{item.id}\"\n                              click={doSort}><i class=\"anticon anticon-caret-up\"></i></span>\n                        <span class=\"table-column-sorter-down off\" title=\"↓\" data-id={item.id} click={doSort}><i\n                               class=\"anticon anticon-caret-down\"></i></span>\n                    </div>\n                </th>\n            </tr>\n        </thead>\n        <TableRow ui:for=\"item of data\" data={item} selected={item.selected} columns={columns} kind={kind} />\n    </table>\n</component>\n\n<component id=\"TableRow\">\n    <tbody class=\"table-tbody\">\n        <tr class=\"table-row table-row-level-0\" style=\"position:sticky;\">\n            <td class=\"col-index\" data-id={data.id} click={doItem}>\n                <div ui:if={expandable}\n                     role=\"button\"\n                     class=\"table-row-expand-icon table-row-expanded\"\n                     aria-label=\"Collapse row\"\n                     data-selected=\"false\" click=\"->\">\n                    <ui:else>\n                        <div role=\"button\"\n                             class=\"table-row-expand-icon table-row-collapsed\"\n                             aria-label=\"Expand row\"\n                             data-selected=\"true\" click=\"->\"></div>\n                    </ui:else>\n                </div>\n            </td>\n            <td class=\"col-index\" ui:for=\"col of columns\">\n                <ui:tag tag=\"{col.type|str.capitalize}Cell\" ui:props={col} value={col.id|propObjectValueByKey}\n                        data={data} />\n            </td>\n        </tr>\n        <tr ui:if={expanded} class=\"table-expanded-row table-expanded-row-level-1\">\n            <td class=\"\"></td>\n            <td class=\"\" colspan=\"100\">\n                <ui:tag tag=\"{kind|str.capitalize}RowInsider\" data={data} />\n            </td>\n        </tr>\n    </tbody>\n</component>";
        /***/
      },

      /***/
      "./types/viewport.html":
      /*!*****************************!*\
        !*** ./types/viewport.html ***!
        \*****************************/

      /*! exports provided: default */

      /***/
      function typesViewportHtml(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony default export */


        __webpack_exports__["default"] = "<component id=\"ViewPort\">\n    <ToastService ui:ref=\"toaster\" />\n    <ErrorHandlingService ui:ref=\"errorHandler\" show=\"-> toaster.send\" />\n    <ui:fragment ui:if=\"slot(aside)\">\n        <Sidebar caption={caption} size={sidebarWidth}>\n            <Sidebar:aside>\n                <ui:slot id=\"aside\" />\n            </Sidebar:aside>\n            <main>\n                <Toast event=\"<- toaster.top\" />\n                <ui:slot />\n            </main>\n        </Sidebar>\n        <ui:else>\n            <main>\n                <Toast event=\"<- toaster.top\" />\n                <ui:slot />\n            </main>\n        </ui:else>\n    </ui:fragment>\n</component>\n\n<component id=\"Sidebar\">\n    <div class=\"off-canvas off-canvas-sidebar-show\">\n        <a class=\"off-canvas-toggle btn btn-primary btn-action show-lg bg-red\"\n           href=\"#sidebar\">\n            <Icon type=\"bars\" />\n        </a>\n        <div id=\"sidebar\" class=\"off-canvas-sidebar\">\n            <Aside caption={caption}>\n                <ui:slot id=\"aside\" />\n            </Aside>\n        </div>\n        <a class=\"off-canvas-overlay\" href=\"#\"></a>\n        <div class=\"off-canvas-content\">\n            <ui:slot />\n        </div>\n    </div>\n</component>\n\n<component id=\"Aside\">\n    <aside style=\"display:flex; flex-direction: column; height: 100vh; width:{size|or:300}px\">\n        <div class=\"text-center\" ui:if={caption}>\n            <a href=\"#/main\">\n                <h5 class=\"p-2\">{caption}</h5>\n            </a>\n        </div>\n        <div class=\"m-2\" style=\"flex:1; overflow-y: auto;\">\n            <ui:slot />\n        </div>\n    </aside>\n</component>\n\n<component id=\"Navbar\">\n    <header class=\"navbar {class}\" style=\"min-height:48px\">\n        <section class=\"navbar-section\">\n            <div class=\"mx-2\">\n                <NavLink href={back} ui:if={back}>\n                    <Button link class=\"text-primary\" icon=\"arrow-left\" title=\":action.back\" />\n                </NavLink>\n                <h4 class=\"m-1\" style=\"vertical-align: middle;\" ui:if={caption}>{caption}</h4>\n                <ui:slot id=\"left\" />\n            </div>\n        </section>\n        <section class=\"navbar-center\" ui:if={logo}>\n            <img src={logo} style=\"max-height:44px;\" />\n        </section>\n        <section class=\"navbar-section\">\n            <div class=\"mx-2\">\n\n                <ui:slot />\n            </div>\n\n        </section>\n    </header>\n</component>\n\n<component id=\"NavTree\">\n    <ul class=\"nav\">\n        <li class=\"nav-item {item.class}\" ui:for=\"item of data\">\n            <NavLink href={item.id}>\n                <span>{item.name}</span>\n                <span ui:if={item.label} class=\"label label-error\">{item.label}</span>\n            </NavLink>\n            <NavTree ui:if={item.subs} data={item.subs} />\n        </li>\n    </ul>\n</component>\n\n<component id=\"NavLink\">\n    <a data-value={href} click=\"-> nav.hash\" class=\"c-hand {class}\">\n        <ui:slot />\n    </a>\n</component>\n\n<component id=\"PageRouter\">\n    <ui:tag tag=\"{target|str.capitalize|or:Main}Page\" ui:props={params} params={params} />\n</component>\n\n<component id=\"Toast\">\n    <div class=\"toast toast-{event.mode|or:@mode|or:primary}\"\n         style=\"position:absolute;top:1rem;right:1rem;left:1rem;{style}\"\n         ui:if=\"event\">\n        <button class=\"btn btn-clear float-right\" click={event.close}></button>\n        <p>{event.message}</p>\n        <Delay ui:if={event.closeAfter} action={event.close} period={event.closeAfter} />\n    </div>\n</component>";
        /***/
      },

      /***/
      0:
      /*!************************!*\
        !*** multi ./index.js ***!
        \************************/

      /*! no static exports found */

      /***/
      function _(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(
        /*! ./index.js */
        "./index.js");
        /***/
      }
      /******/

    })
  );
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/ultimus/dist/main.js":
/*!*******************************************!*\
  !*** ./node_modules/ultimus/dist/main.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function webpackUniversalModuleDefinition(root, factory) {
  if (( false ? undefined : _typeof(exports)) === 'object' && ( false ? undefined : _typeof(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else { var i, a; }
})(this, function () {
  return (
    /******/
    function (modules) {
      // webpackBootstrap

      /******/
      // The module cache

      /******/
      var installedModules = {};
      /******/

      /******/
      // The require function

      /******/

      function __webpack_require__(moduleId) {
        /******/

        /******/
        // Check if module is in cache

        /******/
        if (installedModules[moduleId]) {
          /******/
          return installedModules[moduleId].exports;
          /******/
        }
        /******/
        // Create a new module (and put it into the cache)

        /******/


        var module = installedModules[moduleId] = {
          /******/
          i: moduleId,

          /******/
          l: false,

          /******/
          exports: {}
          /******/

        };
        /******/

        /******/
        // Execute the module function

        /******/

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/

        /******/
        // Flag the module as loaded

        /******/

        module.l = true;
        /******/

        /******/
        // Return the exports of the module

        /******/

        return module.exports;
        /******/
      }
      /******/

      /******/

      /******/
      // expose the modules object (__webpack_modules__)

      /******/


      __webpack_require__.m = modules;
      /******/

      /******/
      // expose the module cache

      /******/

      __webpack_require__.c = installedModules;
      /******/

      /******/
      // define getter function for harmony exports

      /******/

      __webpack_require__.d = function (exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
          /******/
          Object.defineProperty(exports, name, {
            enumerable: true,
            get: getter
          });
          /******/
        }
        /******/

      };
      /******/

      /******/
      // define __esModule on exports

      /******/


      __webpack_require__.r = function (exports) {
        /******/
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          /******/
          Object.defineProperty(exports, Symbol.toStringTag, {
            value: 'Module'
          });
          /******/
        }
        /******/


        Object.defineProperty(exports, '__esModule', {
          value: true
        });
        /******/
      };
      /******/

      /******/
      // create a fake namespace object

      /******/
      // mode & 1: value is a module id, require it

      /******/
      // mode & 2: merge all properties of value into the ns

      /******/
      // mode & 4: return value when already ns object

      /******/
      // mode & 8|1: behave like require

      /******/


      __webpack_require__.t = function (value, mode) {
        /******/
        if (mode & 1) value = __webpack_require__(value);
        /******/

        if (mode & 8) return value;
        /******/

        if (mode & 4 && _typeof(value) === 'object' && value && value.__esModule) return value;
        /******/

        var ns = Object.create(null);
        /******/

        __webpack_require__.r(ns);
        /******/


        Object.defineProperty(ns, 'default', {
          enumerable: true,
          value: value
        });
        /******/

        if (mode & 2 && typeof value != 'string') for (var key in value) {
          __webpack_require__.d(ns, key, function (key) {
            return value[key];
          }.bind(null, key));
        }
        /******/

        return ns;
        /******/
      };
      /******/

      /******/
      // getDefaultExport function for compatibility with non-harmony modules

      /******/


      __webpack_require__.n = function (module) {
        /******/
        var getter = module && module.__esModule ?
        /******/
        function getDefault() {
          return module['default'];
        } :
        /******/
        function getModuleExports() {
          return module;
        };
        /******/

        __webpack_require__.d(getter, 'a', getter);
        /******/


        return getter;
        /******/
      };
      /******/

      /******/
      // Object.prototype.hasOwnProperty.call

      /******/


      __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/

      /******/
      // __webpack_public_path__

      /******/


      __webpack_require__.p = "";
      /******/

      /******/

      /******/
      // Load entry module and return exports

      /******/

      return __webpack_require__(__webpack_require__.s = 0);
      /******/
    }(
    /************************************************************************/

    /******/
    {
      /***/
      "./src/arr.js":
      /*!********************!*\
        !*** ./src/arr.js ***!
        \********************/

      /*! no static exports found */

      /***/
      function srcArrJs(module, exports) {
        /** ***********************
         * Arrays.
         */
        Array.EMPTY = Object.freeze([]);

        Array.slice = function (x) {
          var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
          var e = arguments.length > 2 ? arguments[2] : undefined;
          return x ? x.slice(b, e) : [];
        };
        /**
         * Builds histogram on given field for given list.
         *
         * @param {*} list source
         * @param {*} field to be used as group key
         */


        Array.groupBy = function (list) {
          var field = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'type';
          var result = {};
          var fieldFn = typeof field === 'string' ? function (e) {
            return e[field];
          } : field;

          var iter = function iter(v, entry) {
            var slot = result[v] || (result[v] = {
              id: v,
              count: 0,
              subs: []
            });
            slot.count++;
            (slot.items || (slot.items = slot.subs)).push(entry);
          };

          (list || []).forEach(function (e) {
            var value = fieldFn(e);

            if (Array.isArray(value)) {
              value.forEach(function (v) {
                return iter(v, e);
              });
            } else {
              iter(value, e);
            }
          });
          return result;
        };
        /**
         * Sorts array by element property.
         *
         * @param {*} arr source
         * @param {*} property element property to sort by
         * @param {*} order
         */


        Array.sortBy = function sortBy(arr) {
          var property = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'name';
          var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
          var fn = property;

          if (typeof property === 'string') {
            if (property[0] === '-') {
              /* eslint-disable */
              order = -1;
              property = property.substr(1);
            }

            fn = function fn(e) {
              return e[property];
            };
          }

          function compare(a, b) {
            var aa = fn(a);
            var bb = fn(b);
            /* eslint-disable */

            return aa < bb ? -order : aa > bb ? order : 0;
          }

          return (arr || []).slice(0).sort(compare);
        };
        /**
         * Produces key/value index on given array.
         * 
         * @param {*} arr source array
         * @param {*} idKey id key
         * @param {*} valKey value key
         */


        Array.index = Array.toHash = function (arr) {
          var idKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'id';
          var valKey = arguments.length > 2 ? arguments[2] : undefined;
          var r = {};

          if (arr) {
            var isKeyFn = typeof idKey === 'string' ? function (e) {
              return e[idKey];
            } : idKey;
            arr.forEach(function (e) {
              r[isKeyFn(e)] = valKey ? e[valKey] : e;
            });
          }

          return r;
        };
        /***/

      },

      /***/
      "./src/date.js":
      /*!*********************!*\
        !*** ./src/date.js ***!
        \*********************/

      /*! no static exports found */

      /***/
      function srcDateJs(module, exports) {
        var R = {
          ru: {
            monthNames: ['', 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthNamesShort: ['', 'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
          },
          en: {
            monthNames: ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthNamesShort: ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
          }
        };

        Date.orNow = function (x) {
          return x ? Date.narrow(x) : new Date();
        };

        Date.l18n = function (key) {
          return Object.dig(R[Date.LOCALE || 'ru'], key);
        };

        Date.daysInMonth = function (month, year) {
          return new Date(year, month + 1, 0).getDate();
        };

        Date.firstOfWeek = function (d) {
          var x = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Date.narrow(d);
          return new Date(x.getFullYear(), x.getMonth(), x.getDate() - x.getDay());
        };

        Date.monthName = function (m) {
          var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
          return Date.l18n("monthNames".concat(mode, ".").concat(m));
        };

        Date.fractions = function () {
          var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
          return [x.getFullYear(), x.getMonth(), x.getDate(), x.getHours(), x.getMinutes(), x.getSeconds(), x.getMilliseconds()];
        };

        Date.parseISO8601 = function (x) {
          Function.assert(typeof x === 'string', "Date.parseISO8601: not a string: ".concat(x));

          if (x.length === 10) {
            x += 'T12:00';
          }

          var timebits = /^([0-9]{4})-([0-9]{2})-([0-9]{2})[ T]([0-9]{2}):([0-9]{2})(?::([0-9]*)(\.[0-9]*)?)?(Z?)(([+-])([0-9]{2})([0-9]{2}))?/;
          var m = timebits.exec(x);

          if (!m) {
            return null;
          }

          var tz = m[8] ? !m[9] ? 0 : (m[10] === '+' ? -1 : +1) * (parseInt(m[11]) * 60 + parseInt(m[12])) : new Date().getTimezoneOffset(); // utcdate is milliseconds since the epoch

          var utcdate = Date.UTC(parseInt(m[1]), parseInt(m[2]) - 1, // months are zero-offset (!)
          parseInt(m[3]), parseInt(m[4]), parseInt(m[5]), // hh:mm
          m[6] && parseInt(m[6]) || 0, // optional seconds
          m[7] && parseFloat(m[7]) || 0);
          return new Date(utcdate + tz * 60000);
        };
        /**
         * Universal all-weather converter to Date.
         *
         * @param {*} x any value to be converted to date
         * @returns Date instance or null
         */


        Date.narrow = function (x) {
          var type = _typeof(x);

          if (x == null) {
            return null;
          }

          if (type === 'number' || +x == x) {
            return new Date(+x);
          }

          if (type === 'object') {
            // Date already
            if (x.getTime) {
              return x;
            } // having a date re-presentation method


            if (x.toDate) {
              return x.toDate();
            } // firestore timestamp for web


            if (x.seconds && x.nanoseconds != null) {
              return new Date(x.seconds * 1000 + x.nanoseconds);
            }
          }

          return Date.parseISO8601(x);
        };

        Date.formatTimezone = function (tzOffset) {
          var toNumber = Number(tzOffset);
          return toNumber ? toNumber >= 0 ? "+".concat(String.pad(toNumber / 60), ":").concat(String.pad(toNumber % 60)) : "-".concat(String.pad(-toNumber / 60), ":").concat(String.pad(-toNumber % 60)) : '';
        };

        var DATE_FORMATTERS = {
          hh: function hh(date) {
            return String.pad(date.getHours());
          },
          ii: function ii(date) {
            return String.pad(date.getMinutes());
          },
          hi: function hi(date) {
            return String.pad(date.getHours()) + ':' + String.pad(date.getMinutes());
          },
          dd: function dd(date) {
            return String.pad(date.getDate());
          },
          w: function w(date) {
            return '' + Date.l18n("dayNames.".concat(date.getDay()));
          },
          ww: function ww(date) {
            return '' + Date.l18n("dayNamesShort.".concat(date.getDay()));
          },
          d: function d(date) {
            return '' + date.getDate();
          },
          mmmm: function mmmm(date) {
            return Date.monthName(date.getMonth() + 1, '');
          },
          mmm: function mmm(date) {
            return Date.monthName(date.getMonth() + 1, 'Short');
          },
          mm: function mm(date) {
            return String.pad(date.getMonth() + 1);
          },
          yyyy: function yyyy(date) {
            return "".concat(date.getFullYear());
          },
          ll: function ll(date) {
            return "".concat(date.getTime());
          },
          z: function z(date) {
            return "Z".concat(Date.formatTimezone(date.getTimezoneOffset()));
          }
        };

        Date.format = function (x) {
          var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';

          if (!x) {
            return '';
          }

          var date = Date.narrow(x);
          return !date ? '' : format.replace(/[_]/g, '\n').replace(/[hidwmylz]+/g, function (key) {
            var fn = DATE_FORMATTERS[key];
            return fn ? fn(date) : key;
          });
        };

        Date.dateKey = function (d) {
          var ms = Date.narrow(d).getTime();
          return Date.format(ms - ms % (24 * 3600000) + 12 * 3600000, 'yyyy-mm-dd');
        };
        /***/

      },

      /***/
      "./src/fn.js":
      /*!*******************!*\
        !*** ./src/fn.js ***!
        \*******************/

      /*! no static exports found */

      /***/
      function srcFnJs(module, exports) {
        /**
         * Functions
         */
        Object.assign(Function, {
          ID: function ID(x) {
            return x;
          },
          next: function (COUNTER) {
            return function () {
              var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
              return p + COUNTER++;
            };
          }(1),
          // system
          "throw": function _throw(error) {
            var ErrorType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Error;
            throw typeof error === 'string' ? new ErrorType(error) : error;
          },
          assert: function assert(b, error) {
            var ErrorType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Error;

            if (!b) {
              throw typeof error === 'string' ? new ErrorType(error) : error;
            }
          },
          log: function log(x, pre) {
            console.log(pre || 'pipe', x);
            return x;
          },
          track: function track(fn, x, y) {
            return function () {
              console.log('track', x || y);
              return (fn || Function.ID).apply(void 0, arguments);
            };
          },
          // eslint-disable-next-line no-debugger
          "debugger": function _debugger() {
            debugger;
          },
          // data structures
          dot: function dot(x, k) {
            return x ? x[k] : null;
          },
          includes: function includes(x, p) {
            return x.includes && x.includes(p);
          },
          // logical
          then: function then(x) {
            var p = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
            return x ? p : n;
          },
          not: function not(x) {
            return !x;
          },
          isUndefined: function isUndefined(x) {
            return typeof x === 'undefined';
          },
          isTrue: function isTrue(x) {
            return x === true;
          },
          isFalse: function isFalse(x) {
            return x === false;
          },
          or: function or(x, s) {
            return x || s;
          },
          and: function and(x, s) {
            return x && s;
          },
          // math
          // eslint-disable-next-line eqeqeq
          equals: function equals(x, p) {
            return x == p;
          },
          greater: function greater(x, p) {
            return x > p;
          },
          less: function less(x, p) {
            return x < p;
          },
          plus: function plus(x, alt) {
            return +x + +alt;
          },
          minus: function minus(x, alt) {
            return +x - +alt;
          },
          multiply: function multiply(x, alt) {
            return +x * +alt;
          },
          compose: function compose() {
            for (var _len = arguments.length, ff = new Array(_len), _key = 0; _key < _len; _key++) {
              ff[_key] = arguments[_key];
            }

            return function (x0) {
              return ff.reduceRight(function (x, f) {
                return f(x);
              }, x0);
            };
          },
          swap: function swap(f) {
            return function (a, b) {
              return f(b, a);
            };
          },
          curry: function () {
            var _curry = function _curry(fn, args0, lengthLimit) {
              var fx = function fx(args) {
                return args.length >= lengthLimit ? fn.apply(void 0, _toConsumableArray(args)) : _curry(fn, args, lengthLimit - args.length);
              };

              return function () {
                for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                  args[_key2] = arguments[_key2];
                }

                return fx([].concat(_toConsumableArray(args0), args));
              };
            };

            return function (f) {
              for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                args[_key3 - 1] = arguments[_key3];
              }

              return _curry(f, args, f.length);
            };
          }(),

          /* Simple GUID generator. */
          guid: function (s4) {
            return function () {
              return "".concat(s4()).concat(s4(), "-").concat(s4(), "-").concat(s4(), "-").concat(s4(), "-").concat(s4()).concat(s4()).concat(s4());
            };
          }(function () {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
          }),

          /* Simple hash function. */
          hash: function hash(s) {
            var a = 1,
                c = 0,
                h,
                o;

            if (s) {
              a = 0;
              /* jshint plusplus:false bitwise:false */

              for (h = s.length - 1; h >= 0; h--) {
                o = s.charCodeAt(h);
                a = (a << 6 & 268435455) + o + (o << 14);
                c = a & 266338304;
                a = c !== 0 ? a ^ c >> 21 : a;
              }
            }

            return String(a);
          }
        });
        /***/
      },

      /***/
      "./src/index.js":
      /*!**********************!*\
        !*** ./src/index.js ***!
        \**********************/

      /*! exports provided: pipes */

      /***/
      function srcIndexJs(module, __webpack_exports__, __webpack_require__) {
        "use strict";

        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */


        __webpack_require__.d(__webpack_exports__, "pipes", function () {
          return pipes;
        });
        /* harmony import */


        var _obj_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! ./obj.js */
        "./src/obj.js");
        /* harmony import */


        var _obj_js__WEBPACK_IMPORTED_MODULE_0___default =
        /*#__PURE__*/
        __webpack_require__.n(_obj_js__WEBPACK_IMPORTED_MODULE_0__);
        /* harmony import */


        var _str_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
        /*! ./str.js */
        "./src/str.js");
        /* harmony import */


        var _str_js__WEBPACK_IMPORTED_MODULE_1___default =
        /*#__PURE__*/
        __webpack_require__.n(_str_js__WEBPACK_IMPORTED_MODULE_1__);
        /* harmony import */


        var _arr_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
        /*! ./arr.js */
        "./src/arr.js");
        /* harmony import */


        var _arr_js__WEBPACK_IMPORTED_MODULE_2___default =
        /*#__PURE__*/
        __webpack_require__.n(_arr_js__WEBPACK_IMPORTED_MODULE_2__);
        /* harmony import */


        var _fn_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
        /*! ./fn.js */
        "./src/fn.js");
        /* harmony import */


        var _fn_js__WEBPACK_IMPORTED_MODULE_3___default =
        /*#__PURE__*/
        __webpack_require__.n(_fn_js__WEBPACK_IMPORTED_MODULE_3__);
        /* harmony import */


        var _date_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
        /*! ./date.js */
        "./src/date.js");
        /* harmony import */


        var _date_js__WEBPACK_IMPORTED_MODULE_4___default =
        /*#__PURE__*/
        __webpack_require__.n(_date_js__WEBPACK_IMPORTED_MODULE_4__); // useful pipes


        var pipes = _objectSpread({}, Function, {
          str: String,
          arr: Array,
          obj: Object,
          date: Object.assign(function (s, format) {
            return Date.format(s, format);
          }, Date)
        });
        /***/

      },

      /***/
      "./src/obj.js":
      /*!********************!*\
        !*** ./src/obj.js ***!
        \********************/

      /*! no static exports found */

      /***/
      function srcObjJs(module, exports) {
        Object.EMPTY = Object.freeze({});
        /**
         * Checks if argument is empty .
         */

        Object.isEmpty = function (x) {
          if (!x) {
            return true;
          }

          if (x instanceof Object) {
            // (zero-length array)
            if (Array.isArray(x)) {
              return x.length === 0;
            } // (zero-size map)


            if (x instanceof Map) {
              return x.size === 0;
            } // (has no props)


            return Object.keys(x).length === 0;
          }

          return false;
        };
        /**
         * Digs value in a given object structure by a given path.
         *
         * @param {*} o source object
         * @param {*} steps path
         * @param {*} def default value
         */


        Object.dig = function (o, steps) {
          return steps.split('.').reduce(function (r, e) {
            return r ? r[e] : undefined;
          }, o);
        };

        Object.dot = function (x, k) {
          return x ? x[k] : null;
        };

        var VALUE_MAP = {
          "true": true,
          "false": false,
          undefined: undefined
        };

        Object.decode = function (val) {
          var value = decodeURIComponent(val);

          if ('{['.indexOf(value[0]) > -1) {
            return JSON.parse(value);
          }

          var num = +value;

          if (value.length <= 17 && !isNaN(num)) {
            return num;
          }

          return VALUE_MAP[value] || value;
        };

        Object.encode = function (value) {
          return encodeURIComponent(_typeof(value) === 'object' ? JSON.stringify(value) : "".concat(value));
        };
        /**
         * Parses string into URL object like `{type, target, path, params, data }`.
         *
         * @param {string} s string in format: `type:target/path?params#data`
         * @param {object} r optional target object
         * @returns URL object 
         */


        Object.urlParse = function (s) {
          var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          if (!s) {
            return _objectSpread({
              path: [],
              params: {},
              target: ''
            }, r);
          }

          if (_typeof(s) === 'object') {
            return _objectSpread({
              path: [],
              params: {},
              target: ''
            }, r, {}, s);
          }

          var p; // extract type:

          p = s.indexOf(':');

          if (p > -1) {
            r.type = s.slice(0, p);
            s = s.slice(p + 1);
          } // extract data:


          p = s.indexOf('#');

          if (p > -1) {
            r.data = Object.decode(s.slice(p + 1));
            s = s.slice(0, p);
          } // extract query params:


          p = s.indexOf('?');
          r.params = r.params || {};

          if (p > -1) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = s.slice(p + 1).split('&')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var param = _step.value;

                var _param$split = param.split('='),
                    _param$split2 = _slicedToArray(_param$split, 2),
                    key = _param$split2[0],
                    value = _param$split2[1];

                if (value) {
                  r.params[key] = Object.decode(value);
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            s = s.slice(0, p);
          } // target and path:


          var path = r.path = s.split('/').map(decodeURIComponent);

          while (path.length && !r.target) {
            r.target = path.shift();
          }

          return r;
        };
        /**
        *  Represents an URL object as a string
        *
        * @param {object} r URL object like `{type, target, path, params, data }`
        * @returns string in format `type://target/path?params#data`
        */


        Object.urlStringify = function (r) {
          var result = '';

          if (!r) {
            return result;
          }

          if (typeof r === 'string') {
            return r;
          }

          if (r.target) {
            if (r.type) {
              result += "".concat(r.type, "://");
            }

            result += r.target;
          }

          if (r.path) {
            result += "/".concat(Array.isArray(r.path) ? r.path.map(encodeURIComponent).join('/') : r.path);
          }

          var params = r.params;

          if (params) {
            var keys = Object.keys(params).filter(function (key) {
              return params[key] != null;
            });

            if (keys.length) {
              result += "?".concat(keys.map(function (key) {
                return "".concat(key, "=").concat(Object.encode(params[key]));
              }).join('&'));
            }
          }

          if (r.data) {
            result += "#".concat(Object.encode(r.data));
          }

          return result;
        };
        /***/

      },

      /***/
      "./src/str.js":
      /*!********************!*\
        !*** ./src/str.js ***!
        \********************/

      /*! no static exports found */

      /***/
      function srcStrJs(module, exports) {
        function capitalize(x) {
          if (!x) {
            return x;
          }

          var s = "".concat(x);
          return s[0].toUpperCase() + s.slice(1);
        }

        function camelize(s) {
          var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '_';
          return s && s.length && s.split(sep).map(function (t, i) {
            return i ? capitalize(t) : t;
          }).join('') || "";
        }
        /**
         * Formats given string template with params.
         *
         * Template should contain placeholders like `{someKey}`,
         * which will be replaced with value by key from params.
         *
         * @param {string} template string template
         * @param {object} params hash with parameters
         */


        String.format = function (template, params) {
          return "".concat(template || '').replace(/\{([\S]+)\}/i, function (_, key) {
            return (params && params[key]) != null ? params[key] : '';
          });
        };

        String.wrap = function (x, template) {
          return !x ? '' : "".concat(template || '*').replace('*', x);
        };

        String.tail = function (x) {
          var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';

          if (!x) {
            return '';
          }

          var pos = x.lastIndexOf(sep);
          return pos === -1 ? x : x.slice(pos + sep.length);
        };

        String.lastTail = function (key) {
          var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';
          return ('' + key).split(sep).slice(-1)[0];
        };

        String.head = function (x) {
          var sep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.';

          if (!x) {
            return '';
          }

          var pos = x.indexOf(sep);
          return pos === -1 ? x : x.slice(0, pos);
        };

        String.pad = function (x) {
          var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
          var fill = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0';
          var s = String(x);

          while (s.length < size) {
            s = "".concat(fill).concat(s);
          }

          return s;
        };

        String.capitalize = capitalize;
        String.camelize = camelize;

        String.mirror = function (x) {
          return (x || '').split('').reduce(function (r, c) {
            return c + r;
          }, '');
        };

        String.snakeCase = function (x) {
          return (x || '').replace(/([a-z])([A-Z])/g, '$1_$2');
        };

        String.proper = function (s) {
          return capitalize(camelize(s));
        };

        String.upper = function (s) {
          return ('' + s).toUpperCase();
        };
        /***/

      },

      /***/
      0:
      /*!****************************!*\
        !*** multi ./src/index.js ***!
        \****************************/

      /*! no static exports found */

      /***/
      function _(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(
        /*! ./src/index.js */
        "./src/index.js");
        /***/
      }
      /******/

    })
  );
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (module) {
  if (!module.webpackPolyfill) {
    module.deprecate = function () {};

    module.paths = []; // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function get() {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function get() {
        return module.i;
      }
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./app/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./app/index.js */"./app/index.js");


/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map