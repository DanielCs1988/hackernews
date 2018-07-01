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
function link(root, args, context, info) {
    return context.prisma.query.link({
        where: { id: args.id }
    }, info);
}
exports.link = link;
function questions(root, args, context, info) {
    return context.prisma.query.questions({}, info);
}
exports.questions = questions;
function question(root, args, context, info) {
    return context.prisma.query.question({
        where: { id: args.id }
    }, info);
}
exports.question = question;
//# sourceMappingURL=Query.js.map