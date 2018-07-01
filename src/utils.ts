import {verify} from "jsonwebtoken";

export function getUserId(context) {
    const auth = context.request.get('Authorization');
    if (!auth) {
        throw new Error('Not authenticated!');
    }
    const token = auth.replace('Bearer ', '');
    const {userId} = <JwtResult>verify(token, process.env.JWT_SECRET!);
    return userId;
}

interface JwtResult {
    userId: string;
    iat: number;
}