"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundError = exports.ParamMissingError = exports.CustomError = void 0;
var http_status_codes_1 = __importDefault(require("http-status-codes"));
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    function CustomError(msg, httpStatus) {
        var _this = _super.call(this, msg) || this;
        _this.HttpStatus = http_status_codes_1.default.BAD_REQUEST;
        _this.HttpStatus = httpStatus;
        return _this;
    }
    return CustomError;
}(Error));
exports.CustomError = CustomError;
var ParamMissingError = /** @class */ (function (_super) {
    __extends(ParamMissingError, _super);
    function ParamMissingError() {
        return _super.call(this, ParamMissingError.Msg, ParamMissingError.HttpStatus) || this;
    }
    ParamMissingError.Msg = "One or more of the required parameters was missing.";
    ParamMissingError.HttpStatus = http_status_codes_1.default.BAD_REQUEST;
    return ParamMissingError;
}(CustomError));
exports.ParamMissingError = ParamMissingError;
var UserNotFoundError = /** @class */ (function (_super) {
    __extends(UserNotFoundError, _super);
    function UserNotFoundError() {
        return _super.call(this, UserNotFoundError.Msg, UserNotFoundError.HttpStatus) || this;
    }
    UserNotFoundError.Msg = "A user with the given id does not exists in the database.";
    UserNotFoundError.HttpStatus = http_status_codes_1.default.NOT_FOUND;
    return UserNotFoundError;
}(CustomError));
exports.UserNotFoundError = UserNotFoundError;
