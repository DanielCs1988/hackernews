"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
function getUserId(context) {
    const auth = context.request.get('Authorization');
    if (!auth) {
        throw new Error('Not authenticated!');
    }
    const token = auth.replace('Bearer ', '');
    const { userId } = jsonwebtoken_1.verify(token, process.env.JWT_SECRET);
    return userId;
}
exports.getUserId = getUserId;
//# sourceMappingURL=utils.js.map