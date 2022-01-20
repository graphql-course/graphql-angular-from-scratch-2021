"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = __importDefault(require("../../data"));
const mutationPeopleResolvers = {
    Mutation: {
        addPeople: (_, args) => {
            if (data_1.default.people.filter((value) => value.name === args.people.name).length > 0) {
                return {
                    status: false,
                    message: "La persona que estás introduciendo ya existe. Prueba con otro por favor",
                };
            }
            const idValue = +data_1.default.people[data_1.default.people.length - 1].id + 1;
            args.people.id = String(idValue);
            data_1.default.people.push(args.people);
            return {
                status: true,
                message: `Persona con el nombre ${args.people.name} ha sido añadido correctamente`,
                item: args.people,
            };
        },
        updatePeople: (_, args) => {
            if (data_1.default.people.filter((peopleItem) => peopleItem.id === args.people.id)
                .length === 0) {
                return {
                    status: false,
                    message: "El libro que estás introduciendo no existe y no puedes actualizarlo. Revisa que ese id sea el correcto",
                };
            }
            for (let i = 0; i < data_1.default.books.length; i++) {
                if (data_1.default.books[i].id === args.people.id) {
                    data_1.default.people[i] = args.people;
                    break;
                }
            }
            return {
                status: true,
                message: "Actualizado correctamente la persona seleccionada",
                item: args.people,
            };
        },
        deletePeople: (_, args) => {
            let deleteItem = false;
            for (let i = 0; i < data_1.default.people.length; i++) {
                if (data_1.default.people[i].id === args.id) {
                    data_1.default.people.splice(i, 1);
                    deleteItem = true;
                    break;
                }
            }
            return {
                status: deleteItem,
                message: deleteItem ? "Eliminado" : "No se ha eliminado ninguna persona",
            };
        },
    },
};
exports.default = mutationPeopleResolvers;
