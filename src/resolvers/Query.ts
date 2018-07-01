export function feed(root, args, context, info) {
    return context.prisma.query.links({}, info);
}