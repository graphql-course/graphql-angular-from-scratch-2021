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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const compression_1 = __importDefault(require("compression"));
const express_1 = __importDefault(require("express"));
const graphql_depth_limit_1 = __importDefault(require("graphql-depth-limit"));
const http_1 = require("http");
class GraphQLServer {
    constructor(schema) {
        this.DEFAULT_PORT = process.env.PORT || 3025;
        if (schema === undefined) {
            throw new Error("Necesitamos un schema de GraphQL para trabajar con APIs GraphQL");
        }
        this.schema = schema;
        this.init();
    }
    init() {
        this.configExpress();
        this.configApolloServerExpress();
        this.configRoutes();
    }
    configExpress() {
        this.app = (0, express_1.default)();
        this.app.use((0, compression_1.default)());
        this.httpServer = (0, http_1.createServer)(this.app);
    }
    configApolloServerExpress() {
        return __awaiter(this, void 0, void 0, function* () {
            const apolloServer = new apollo_server_express_1.ApolloServer({
                schema: this.schema,
                introspection: true,
                validationRules: [(0, graphql_depth_limit_1.default)(3)]
            });
            yield apolloServer.start();
            apolloServer.applyMiddleware({ app: this.app, cors: true });
        });
    }
    configRoutes() {
        this.app.get("/hello", (_, res) => {
            res.send("Bienvenid@s al primer proyecto");
        });
        this.app.get("/", (_, res) => {
            res.redirect("/graphql");
        });
    }
    listen(callback) {
        this.httpServer.listen(+this.DEFAULT_PORT, () => {
            callback(+this.DEFAULT_PORT);
        });
    }
}
exports.default = GraphQLServer;
