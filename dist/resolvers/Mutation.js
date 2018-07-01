"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const utils_1 = require("../utils");
function signup(parent, args, context, info) {
    return __awaiter(this, void 0, void 0, function* () {
        const password = yield bcryptjs_1.hash(args.password, 10);
        const user = yield context.prisma.mutation.createUser({
            data: Object.assign({}, args, { password })
        }, '{ id }');
        const token = jsonwebtoken_1.sign({ userId: user.id }, process.env.JWT_SECRET);
        return { token, user };
    });
}
exports.signup = signup;
function login(parent, args, context, info) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield context.prisma.query.user({ where: { email: args.email } }, '{ id password }');
        if (!user) {
            throw new Error('Invalid credentials!');
        }
        const isPwValid = yield bcryptjs_1.compare(args.password, user.password);
        if (!isPwValid) {
            throw new Error('Invalid credentials!');
        }
        const token = jsonwebtoken_1.sign({ userId: user.id }, process.env.JWT_SECRET);
        return { token, user };
    });
}
exports.login = login;
function post(parent, args, context, info) {
    const userId = utils_1.getUserId(context);
    return context.prisma.mutation.createLink({
        data: {
            url: args.url,
            description: args.description,
            postedBy: { connect: { id: userId } }
        }
    }, info);
}
exports.post = post;
//# sourceMappingURL=Mutation.js.map