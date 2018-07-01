"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function user(root, args, context, info) {
    return context.prisma.query.user({ where: { id: root.user.id } }, info);
}
exports.user = user;
//# sourceMappingURL=AuthPayload.js.map