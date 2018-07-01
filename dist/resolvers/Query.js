"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function feed(root, args, context, info) {
    return context.prisma.query.links({}, info);
}
exports.feed = feed;
//# sourceMappingURL=Query.js.map