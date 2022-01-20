"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = __importDefault(require("../../data"));
const queryBookResolvers = {
    Query: {
        booksList: () => {
            return {
                status: true,
                message: "Lista de libros correctamente cargada",
                list: data_1.default.books
            };
        },
        book: (_, args) => {
            const bookFind = data_1.default.books.filter((value) => value.id === args.id)[0];
            return {
                status: bookFind === undefined ? false : true,
                message: bookFind === undefined ?
                    `Libro con el id ${args.id} no ha sido encontrado` :
                    `Libro con el id ${args.id} ha sido encontrado`,
                item: bookFind
            };
        }
    },
};
exports.default = queryBookResolvers;
