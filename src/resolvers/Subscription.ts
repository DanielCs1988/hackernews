function newLinkSubscribe(parent, args, context, info) {
    return context.prisma.subscription.link({
        where: { mutation_in: ['CREATED'] }
    }, info);
}

export const newLink = {
    subscribe: newLinkSubscribe
};

function newVoteSubscribe(parent, args, context, info) {
    return context.prisma.subscription.vote({
        where: {mutation_in: ['CREATED']}
    }, info);
}

export const newVote = {
    subscribe: newVoteSubscribe
};