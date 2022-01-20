"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const books_json_1 = __importDefault(require("./books.json"));
const people_json_1 = __importDefault(require("./people.json"));
const data = {
    people: people_json_1.default,
    books: books_json_1.default
};
exports.default = data;
