"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = __importDefault(require("../../data"));
const mutationBookResolvers = {
    Mutation: {
        addBook: (_, args) => {
            if (data_1.default.books.filter((value) => value.title === args.book.title).length > 0) {
                return {
                    status: false,
                    message: "El libro que estás introduciendo ya existe. Prueba con otro por favor",
                };
            }
            const idValue = +data_1.default.books[data_1.default.books.length - 1].id + 1;
            args.book.id = String(idValue);
            data_1.default.books.push(args.book);
            return {
                status: true,
                message: `Libro con el título ${args.book.title} ha sido añadido correctamente`,
                item: args.book,
            };
        },
        updateBook: (_, args) => {
            if (data_1.default.books.filter((bookItem) => bookItem.id === args.book.id)
                .length === 0) {
                return {
                    status: false,
                    message: "El libro que estás introduciendo no existe y no puedes actualizarlo. Revisa que ese id sea el correcto",
                };
            }
            for (let i = 0; i < data_1.default.books.length; i++) {
                if (data_1.default.books[i].id === args.book.id) {
                    data_1.default.books[i] = args.book;
                    break;
                }
            }
            return {
                status: true,
                message: "Actualizado correctamente el libro seleccionado",
                item: args.book,
            };
        },
        deleteBook: (_, args) => {
            let deleteItem = false;
            for (let i = 0; i < data_1.default.books.length; i++) {
                if (data_1.default.books[i].id === args.id) {
                    data_1.default.books.splice(i, 1);
                    deleteItem = true;
                    break;
                }
            }
            return {
                status: deleteItem,
                message: deleteItem ? "Eliminado" : "No se ha eliminado ningún libro",
            };
        }
    },
};
exports.default = mutationBookResolvers;
