function linkSubscribe(parent, args, context, info) {
    return context.prisma.subscription.link({}, info);
}

export const linkSub = {
    subscribe: linkSubscribe
};

function newVoteSubscribe(parent, args, context, info) {
    return context.prisma.subscription.vote({
        where: {mutation_in: ['CREATED']}
    }, info);
}

export const newVote = {
    subscribe: newVoteSubscribe
};