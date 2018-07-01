export function feed(root, args, context, info) {
    const where = args.filter ?
        {
            OR: [
                {url_contains: args.filter},
                {description_contains: args.filter}
            ]
        } : {};
    return context.prisma.query.links({where, skip: args.skip, first: args.first, orderBy: args.orderBy}, info);
}

export function link(root, args, context, info) {
    return context.prisma.query.link({
        where: {id: args.id}
    }, info);
}