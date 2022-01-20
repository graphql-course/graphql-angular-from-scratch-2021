"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("graphql-import-node");
const schema_1 = require("@graphql-tools/schema");
const path_1 = __importDefault(require("path"));
const load_files_1 = require("@graphql-tools/load-files");
const merge_1 = require("@graphql-tools/merge");
const typesArray = (0, load_files_1.loadFilesSync)(path_1.default.join(__dirname, "./graphql"), {
    extensions: ["graphql"],
});
const typeDefs = (0, merge_1.mergeTypeDefs)(typesArray);
const resolvers_1 = __importDefault(require("./../resolvers"));
const schema = (0, schema_1.makeExecutableSchema)({
    typeDefs,
    resolvers: resolvers_1.default,
});
exports.default = schema;
