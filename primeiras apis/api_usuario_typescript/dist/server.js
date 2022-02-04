"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var index_1 = __importDefault(require("./routes/index"));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use("/", index_1.default); //precisa estar depois do bodyParser
app.listen(3000, function () {
    console.log('Servidor rodando na porta 3000');
});
