/**
 * @class <%= commandname %>
 *
 * @author <%=author %> <<%=email %>>
 * @copyright MedTime - 2017 copyright
 */
'use strict';
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HttpClientBase = exports.<%= commandname %> = undefined;


var _stringify = require('babel-runtime/core-js/json/stringify');
var _stringify2 = _interopRequireDefault(_stringify);

var _Rx = require('rxjs/Rx');
var Rx = _interopRequireWildcard(_Rx);


class HttpClientBase {
}
exports.HttpClientBase = HttpClientBase;



class <%= commandname %> extends HttpClientBase {
    // @TODO
    /**
     * @constructor
     */
    constructor (data) {
        this._data = data;
    }

    execute (data) {
        return this._<%=operation %>(data);
    }

    _<%=operation %> () {

    }
}
exports.<%= commandname %> = <%= commandname %>;
<%= commandname %>.prototype._data = null;