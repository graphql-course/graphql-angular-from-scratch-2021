"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = __importDefault(require("../../data"));
const typesPeopleResolvers = {
    People: {
        booksBuy: (root) => {
            return data_1.default.books.filter((book) => root.books.indexOf(book.id) > -1);
        },
        website: (root) => {
            return root.website === undefined ? "" : root.website;
        },
        twitter: (root) => {
            return root.twitter === undefined
                ? ""
                : `https://twitter.com/${root.twitter}`;
        },
        github: (root) => {
            return root.github === undefined
                ? ""
                : `https://github.com/${root.github}`;
        },
    }
};
exports.default = typesPeopleResolvers;
