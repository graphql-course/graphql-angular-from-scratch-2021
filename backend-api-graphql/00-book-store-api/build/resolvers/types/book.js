"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = __importDefault(require("../../data"));
const typesBookResolvers = {
    Book: {
        byPeoplesBuy: (root) => {
            return data_1.default.people.filter((people) => people.books.indexOf(root.id) > -1);
        },
        publishedDate: (root) => {
            return root.publishedDate === undefined ? "?" : root.publishedDate;
        },
        thumbnailUrl: (root) => {
            return root.thumbnailUrl === undefined ? "-" : root.thumbnailUrl;
        },
        shortDescription: (root) => {
            return root.shortDescription === undefined ? "-" : root.shortDescription;
        },
        longDescription: (root) => {
            return root.longDescription === undefined ? "-" : root.longDescription;
        },
    },
};
exports.default = typesBookResolvers;
