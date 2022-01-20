"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queryBasicResolvers = {
    Query: {
        hello: () => "Hola a la API de GraphQL",
        helloWithName: (_, args, context, info) => {
            console.log(info);
            return `Hola ${args.name}`;
        },
        peopleNumber: () => 189303,
    },
};
exports.default = queryBasicResolvers;
