"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function feed(root, args, context, info) {
    const where = args.filter ?
        {
            OR: [
                { url_contains: args.filter },
                { description_contains: args.filter }
            ]
        } : {};
    return context.prisma.query.links({ where, skip: args.skip, first: args.first, orderBy: args.orderBy }, info);
}
exports.feed = feed;
//# sourceMappingURL=Query.js.map