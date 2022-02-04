"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __importDefault(require("../database/connection"));
var Address = /** @class */ (function () {
    function Address() {
    }
    Address.searchId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var address, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, connection_1.default.select().table("endereços_usuario").where({ id_endereco_usuario: id })];
                    case 1:
                        address = _a.sent();
                        if (address.length > 0) {
                            return [2 /*return*/, address];
                        }
                        else {
                            return [2 /*return*/, undefined];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Address.searchUserId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var address, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, connection_1.default.select().table("endereços_usuario").where({ id_usuario: id })];
                    case 1:
                        address = _a.sent();
                        if (address.length > 0) {
                            return [2 /*return*/, address];
                        }
                        else {
                            return [2 /*return*/, undefined];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Address.new = function (id_usuario, logradouro, numero, cidade, uf, cep, bairro, complemento) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, connection_1.default.insert({ id_usuario: id_usuario, logradouro: logradouro, numero: numero, cidade: cidade, uf: uf, cep: cep, bairro: bairro, complemento: complemento }).table("endereços_usuario")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Address.update = function (id_endereco, id_usuario, logradouro, numero, cidade, uf, cep, bairro, complemento) {
        return __awaiter(this, void 0, void 0, function () {
            var address, editAddress, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.searchId(id_endereco)];
                    case 1:
                        address = _a.sent();
                        if (!address) return [3 /*break*/, 6];
                        editAddress = {};
                        if (id_usuario != undefined) {
                            editAddress.id_usuario = id_usuario;
                            if (editAddress.id_usuario.length == 0) {
                                return [2 /*return*/, { status: 0, msg: {
                                            "codigo": 400,
                                            "status": "erro",
                                            "mensagem": "id_usuario deve ser preenchido."
                                        } }];
                            }
                        }
                        if (logradouro != undefined) {
                            editAddress.logradouro = logradouro;
                            if (editAddress.logradouro.length == 0) {
                                return [2 /*return*/, { status: 0, msg: {
                                            "codigo": 400,
                                            "status": "erro",
                                            "mensagem": "logradouro deve ser preenchido."
                                        } }];
                            }
                        }
                        if (numero != undefined) {
                            editAddress.numero = numero;
                            if (editAddress.numero.length == 0) {
                                return [2 /*return*/, { status: 0, msg: {
                                            "codigo": 400,
                                            "status": "erro",
                                            "mensagem": "numero deve ser preenchido."
                                        } }];
                            }
                        }
                        if (cidade != undefined) {
                            editAddress.cidade = cidade;
                            if (editAddress.cidade.length == 0) {
                                return [2 /*return*/, { status: 0, msg: {
                                            "codigo": 400,
                                            "status": "erro",
                                            "mensagem": "cidade deve ser preenchida."
                                        } }];
                            }
                        }
                        if (uf != undefined) {
                            editAddress.uf = uf;
                            if (editAddress.uf.length == 0) {
                                return [2 /*return*/, { status: 0, msg: {
                                            "codigo": 400,
                                            "status": "erro",
                                            "mensagem": "uf deve ser preenchido."
                                        } }];
                            }
                        }
                        if (cep != undefined) {
                            editAddress.cep = cep;
                            if (editAddress.cep.length == 0) {
                                return [2 /*return*/, { status: 0, msg: {
                                            "codigo": 400,
                                            "status": "erro",
                                            "mensagem": "cep deve ser preenchido."
                                        } }];
                            }
                        }
                        if (bairro != undefined) {
                            editAddress.bairro = bairro;
                            if (editAddress.bairro.length == 0) {
                                return [2 /*return*/, { status: 0, msg: {
                                            "codigo": 400,
                                            "status": "erro",
                                            "mensagem": "bairro deve ser preenchido."
                                        } }];
                            }
                        }
                        if (complemento != undefined) {
                            editAddress.complemento = complemento;
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, (0, connection_1.default)('endereços_usuario').where({ id_endereco_usuario: id_endereco }).update(editAddress)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { status: 1, msg: {
                                    "codigo": 200,
                                    "status": "sucesso",
                                    "mensagem": "Edição de endereço realizada com sucesso."
                                } }];
                    case 4:
                        err_2 = _a.sent();
                        return [2 /*return*/, { status: 0, msg: {
                                    "codigo": 400,
                                    "status": "erro",
                                    "mensagem": err_2
                                } }];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, { status: 0, msg: {
                                "codigo": 400,
                                "status": "erro",
                                "mensagem": "Endere\u00E7o com id: " + id_endereco + " n\u00E3o existe no banco."
                            } }];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Address.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, connection_1.default.delete().table("endereços_usuario").where({ id_endereco_usuario: id })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Address;
}());
exports.default = Address;
