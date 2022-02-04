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
var User_1 = __importDefault(require("../models/User"));
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.default.findAll()];
                    case 1:
                        result = _a.sent();
                        if (result.length > 0) {
                            res.status(200);
                            res.json({
                                "codigo": 200,
                                "status": "sucesso",
                                "mensagem": "Operação realizada com sucesso.",
                                "dados": result
                            });
                        }
                        else if (result.length == 0) {
                            res.status(200);
                            res.json({
                                "codigo": 200,
                                "status": "sucesso",
                                "mensagem": "Nenhum usuário encontrado."
                            });
                        }
                        else {
                            res.status(400);
                            res.json({
                                "codigo": 400,
                                "status": "erro",
                                "mensagem": "Erro inesperado na hora de realizar a operação no banco."
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.findById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, User_1.default.searchId(id)];
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
                                "mensagem": "Nenhum usuário encontrado com o id informado."
                            });
                        }
                        else {
                            res.status(400);
                            res.json({
                                "codigo": 400,
                                "status": "erro",
                                "mensagem": "Erro inesperado na hora de realizar a operação no banco."
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, nome, sobrenome, email, telefone, cpf, valido, emailExiste, cpfExiste, cadastrado;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, nome = _a.nome, sobrenome = _a.sobrenome, email = _a.email, telefone = _a.telefone, cpf = _a.cpf;
                        if (nome == undefined) {
                            res.status(400);
                            res.json({
                                "codigo": 400,
                                "status": "erro",
                                "mensagem": "Nome é obrigatório e não foi informado!"
                            });
                            return [2 /*return*/];
                        }
                        if (sobrenome == undefined) {
                            res.status(400);
                            res.json({
                                "codigo": 400,
                                "status": "erro",
                                "mensagem": "Sobrenome é obrigatório e não foi informado!"
                            });
                            return [2 /*return*/];
                        }
                        if (email == undefined) {
                            res.status(400);
                            res.json({
                                "codigo": 400,
                                "status": "erro",
                                "mensagem": "Email é obrigatório e não foi informado!"
                            });
                            return [2 /*return*/];
                        }
                        if (telefone == undefined) {
                            res.status(400);
                            res.json({
                                "codigo": 400,
                                "status": "erro",
                                "mensagem": "Telefone é obrigatório e não foi informado!"
                            });
                            return [2 /*return*/];
                        }
                        if (cpf == undefined) {
                            res.status(400);
                            res.json({
                                "codigo": 400,
                                "status": "erro",
                                "mensagem": "CPF é obrigatório e não foi informado!"
                            });
                            return [2 /*return*/];
                        }
                        if (nome.length == 0 || sobrenome.length == 0 || email.length == 0 || telefone.length == 0 || cpf.length == 0) {
                            res.status(400);
                            res.json({
                                "codigo": 400,
                                "status": "erro",
                                "mensagem": "Os campos obrigatórios devem ser preenchidos!"
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, User_1.default.validateEmail(email)];
                    case 1:
                        valido = _b.sent();
                        if (!valido) {
                            res.status(400);
                            res.json({
                                "codigo": 400,
                                "status": "erro",
                                "mensagem": "E-mail informado não é válido!"
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, User_1.default.findEmail(email)];
                    case 2:
                        emailExiste = _b.sent();
                        if (emailExiste) {
                            res.status(400);
                            res.json({
                                "codigo": 400,
                                "status": "erro",
                                "mensagem": "E-mail informado já cadastrado para outro usuário!"
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, User_1.default.findCpf(cpf)];
                    case 3:
                        cpfExiste = _b.sent();
                        if (cpfExiste) {
                            res.status(400);
                            res.json({
                                "codigo": 400,
                                "status": "erro",
                                "mensagem": "CPF informado já cadastrado para outro usuário!"
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, User_1.default.new(nome, sobrenome, email, telefone, cpf)];
                    case 4:
                        cadastrado = _b.sent();
                        if (cadastrado) {
                            res.status(200);
                            res.json({
                                "codigo": 200,
                                "status": "sucesso",
                                "mensagem": "Usuário cadastrado com sucesso!"
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
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.edit = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, nome, sobrenome, email, telefone, cpf, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, nome = _a.nome, sobrenome = _a.sobrenome, email = _a.email, telefone = _a.telefone, cpf = _a.cpf;
                        return [4 /*yield*/, User_1.default.update(id, nome, sobrenome, email, telefone, cpf)];
                    case 1:
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
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.remove = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, User_1.default.searchId(id)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            res.status(400);
                            res.json({
                                "codigo": 400,
                                "status": "erro",
                                "mensagem": "Nenhum usuário cadastrado para o id informado."
                            });
                        }
                        return [4 /*yield*/, User_1.default.delete(id)];
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
                                "mensagem": "Erro inesperado ao tentar realizar a operação no banco."
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.default = UserController;
