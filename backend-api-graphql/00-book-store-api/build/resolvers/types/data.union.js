"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typesUnionResolvers = {
    Data: {
        __resolveType(obj) {
            if (obj.name) {
                return "People";
            }
            if (obj.isbn) {
                return "Book";
            }
            return null;
        },
    }
};
exports.default = typesUnionResolvers;
