import {compare, hash} from "bcryptjs";
import {sign} from "jsonwebtoken";
import {getUserId} from "../utils";

export async function signup(parent, args, context, info) {
    const password = await hash(args.password, 10);
    const user = await context.prisma.mutation.createUser({
        data: { ...args, password }
    }, '{ id }');
    const token = sign({userId: user.id}, process.env.JWT_SECRET!);
    return {token, user};
}

export async function login(parent, args, context, info) {
    const user = await context.prisma.query.user({where: {email: args.email}}, '{ id password }');
    if (!user) {
        throw new Error('Invalid credentials!');
    }
    const isPwValid = await compare(args.password, user.password);
    if (!isPwValid) {
        throw new Error('Invalid credentials!');
    }
    const token = sign({userId: user.id}, process.env.JWT_SECRET!);
    return {token, user};
}

export function post(parent, args, context, info) {
    const userId = getUserId(context);
    return context.prisma.mutation.createLink({
        data: {
            url: args.url,
            description: args.description,
            postedBy: {connect: {id: userId}}
        }
    }, info);
}

export async function vote(parent, args, context, info) {
    const userId = getUserId(context);
    const linkExists = await context.prisma.exists.Vote({
        user: {id: userId},
        link: {id: args.linkId}
    });
    if (linkExists) {
        throw new Error(`Already voted for link: ${args.linkId}`);
    }
    return context.prisma.mutation.createVote({
        data: {
            user: {connect: {id: userId}},
            link: {connect: {id: args.linkId}}
        }
    }, info);
}