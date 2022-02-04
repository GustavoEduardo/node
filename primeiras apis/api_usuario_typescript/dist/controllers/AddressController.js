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
var Address_1 = __importDefault(require("../models/Address"));
var User_1 = __importDefault(require("../models/User"));
var AddressController = /** @class */ (function () {
    function AddressController() {
    }
    AddressController.findById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id_endereco_usuario;
                        return [4 /*yield*/, Address_1.default.searchId(id)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            res.status(200);
                            res.json({
                                "codigo": 200,
                                "status": "sucesso",
                                "mensagem": "Operação realizada com sucesso.",
                                "dados": result[0]
                            });
                        }
                        else if (result == undefined) {
                            res.status(400);
                            res.json({
                                "codigo": 400,
                                "status": "erro",
                                "mensagem": "Nenhum endereço encontrado com o id informado."
                            });
                        }
                        else {
                            res.status(400);
                            res.json({
                                "codigo": 400,
                                "status": "erro",
                                "mensagem": "Erro inesperado ao tentar realizar a operação no banco."
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AddressController.findByUserId = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id_usuario;
                        return [4 /*yield*/, User_1.default.searchId(id)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            res.status(400);
                            res.json({
                                "codigo": 400,
                                "status": "erro",
                                "mensagem": "N\u00E3o existe usu\u00E1rio com id " + id + " cadastrado no banco."
                            });
                        }
                        return [4 /*yield*/, Address_1.default.searchUserId(id)];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            res.status(200);
                            res.json({
                                "codigo": 200,
                                "status": "sucesso",
                                "mensagem": "Operação realizada com sucesso.",
                                "dados": result
                            });
                        }
                        else if (result == undefined) {
                            res.status(400);
                            res.json({
                                "codigo": 400,
                                "status": "erro",
                                "mensagem": "Nenhum endere\u00E7o cadastrado para usuario com id " + id + "."
                            });
                        }
                        else {
                            res.status(400);
                            res.json({
                                "codigo": 400,
                                "status": "erro",
                                "mensagem": "Erro inesperado ao tentar realizar a operação no banco."
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AddressController.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id_usuario, logradouro, numero, cidade, uf, cep, bairro, _b, complemento, user, cadastrado;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, id_usuario = _a.id_usuario, logradouro = _a.logradouro, numero = _a.numero, cidade = _a.cidade, uf = _a.uf, cep = _a.cep, bairro = _a.bairro, _b = _a.complemento, complemento = _b === void 0 ? "" : _b;
                        if (!(id_usuario != undefined)) return [3 /*break*/, 6];
                        return [4 /*yield*/, User_1.default.searchId(id_usuario)];
                    case 1:
                        user = _c.sent();
                        if (!(user == false)) return [3 /*break*/, 2];
                        res.status(400);
                        res.json({
                            "codigo": 400,
                            "status": "erro",
                            "mensagem": "Erro inesperado na hora de procurar usuário no Banco."
                        });
                        return [2 /*return*/];
                    case 2:
                        if (!(user == undefined)) return [3 /*break*/, 3];
                        res.status(400);
                        res.json({
                            "codigo": 400,
                            "status": "erro",
                            "mensagem": "Nenhum usuário encontrado com o ID informado."
                        });
                        return [2 /*return*/];
                    case 3:
                        if (logradouro == undefined) {
                            res.status(400);
                            res.json({
                                "codigo": 400,
                                "status": "erro",
                                "mensagem": "Logradouro é obrigatório e não foi informado!"
                            });
                            return [2 /*return*/];
                        }
                        if (numero == undefined) {
                            res.status(400);
                            res.json({
                                "codigo": 400,
                                "status": "erro",
                                "mensagem": "Número é obrigatório e não foi informado!"
                            });
                            return [2 /*return*/];
                        }
                        if (cidade == undefined) {
                            res.status(400);
                            res.json({
                                "codigo": 400,
                                "status": "erro",
                                "mensagem": "Cidade é obrigatória e não foi informada!"
                            });
                            return [2 /*return*/];
                        }
                        if (uf == undefined) {
                            res.status(400);
                            res.json({
                                "codigo": 400,
                                "status": "erro",
                                "mensagem": "UF do estado é obrigatório e não foi informado!"
                            });
                            return [2 /*return*/];
                        }
                        if (cep == undefined) {
                            res.status(400);
                            res.json({
                                "codigo": 400,
                                "status": "erro",
                                "mensagem": "CEP é obrigatório e não foi informado!"
                            });
                            return [2 /*return*/];
                        }
                        if (bairro == undefined) {
                            res.status(400);
                            res.json({
                                "codigo": 400,
                                "status": "erro",
                                "mensagem": "Bairro é obrigatório e não foi informado!"
                            });
                            return [2 /*return*/];
                        }
                        if (id_usuario.length == 0 || logradouro.length == 0 || numero.length == 0 || cidade.length == 0 || uf.length == 0 || cep.length == 0 || bairro.length == 0) {
                            res.status(400);
                            res.json({
                                "codigo": 400,
                                "status": "erro",
                                "mensagem": "Os campos obrigatórios devem ser preenchidos!"
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, Address_1.default.new(id_usuario, logradouro, numero, cidade, uf.toUpperCase(), cep, bairro, complemento)];
                    case 4:
                        cadastrado = _c.sent();
                        if (cadastrado) {
                            res.status(200);
                            res.json({
                                "codigo": 200,
                                "status": "sucesso",
                                "mensagem": "Endere\u00E7o cadastrado para usu\u00E1rio com id: " + id_usuario + "."
                            });
                            return [2 /*return*/];
                        }
                        else {
                            res.status(400);
                            res.json({
                                "codigo": 400,
                                "status": "erro",
                                "mensagem": "Erro inesperado na hora de realizar a operação no Banco."
                            });
                            return [2 /*return*/];
                        }
                        _c.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        res.status(400);
                        res.json({
                            "codigo": 400,
                            "status": "erro",
                            "mensagem": "Id do usuário é obrigatório e não foi informado."
                        });
                        return [2 /*return*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AddressController.edit = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id_endereco, _a, id_usuario, logradouro, numero, cidade, uf, cep, bairro, complemento, user, user, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id_endereco = req.params.id_endereco_usuario;
                        _a = req.body, id_usuario = _a.id_usuario, logradouro = _a.logradouro, numero = _a.numero, cidade = _a.cidade, uf = _a.uf, cep = _a.cep, bairro = _a.bairro, complemento = _a.complemento;
                        if (!id_usuario) return [3 /*break*/, 2];
                        return [4 /*yield*/, User_1.default.searchId(id_usuario)];
                    case 1:
                        user = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        user = true;
                        _b.label = 3;
                    case 3:
                        if (!(user == false)) return [3 /*break*/, 4];
                        res.status(400);
                        res.json({
                            "codigo": 400,
                            "status": "erro",
                            "mensagem": "Erro inesperado na hora de procurar usuário no Banco."
                        });
                        return [2 /*return*/];
                    case 4:
                        if (!(user == undefined)) return [3 /*break*/, 5];
                        res.status(400);
                        res.json({
                            "codigo": 400,
                            "status": "erro",
                            "mensagem": "Nenhum usuário encontrado com o ID informado."
                        });
                        return [2 /*return*/];
                    case 5: return [4 /*yield*/, Address_1.default.update(id_endereco, id_usuario, logradouro, numero, cidade, uf, cep, bairro, complemento)];
                    case 6:
                        result = _b.sent();
                        if (result.status) {
                            res.status(200);
                            res.json(result.msg);
                            return [2 /*return*/];
                        }
                        else {
                            res.status(400);
                            res.json(result.msg);
                        }
                        _b.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AddressController.remove = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, endereco, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id_endereco_usuario;
                        return [4 /*yield*/, Address_1.default.searchId(id)];
                    case 1:
                        endereco = _a.sent();
                        if (!endereco) {
                            res.status(400);
                            res.json({
                                "codigo": 400,
                                "status": "erro",
                                "mensagem": "Nenhum endereço cadastrado para o id informado."
                            });
                        }
                        return [4 /*yield*/, Address_1.default.delete(id)];
                    case 2:
                        result = _a.sent();
                        if (result) {
                            res.status(200);
                            res.json({
                                "codigo": 200,
                                "status": "sucesso",
                                "mensagem": "Operação realizada com sucesso."
                            });
                        }
                        else {
                            res.status(400);
                            res.json({
                                "codigo": 400,
                                "status": "erro",
                                "mensagem": "Erro inesperado ao realizar a operação no banco."
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return AddressController;
}());
exports.default = AddressController;
