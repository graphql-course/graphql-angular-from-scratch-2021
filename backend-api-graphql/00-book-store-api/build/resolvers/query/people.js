"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = __importDefault(require("../../data"));
const queryPeopleResolvers = {
    Query: {
        peoplesList: () => {
            return {
                status: true,
                message: "Lista de personas correctamente cargada",
                list: data_1.default.people
            };
        },
        people: (_, args) => {
            const peopleFind = data_1.default.people.filter((value) => value.id === args.id)[0];
            return {
                status: peopleFind === undefined ? false : true,
                message: peopleFind === undefined ?
                    `Persona con el id ${args.id} no ha sido encontrado` :
                    `Persona con el id ${args.id} ha sido encontrado`,
                item: peopleFind
            };
        }
    },
};
exports.default = queryPeopleResolvers;
