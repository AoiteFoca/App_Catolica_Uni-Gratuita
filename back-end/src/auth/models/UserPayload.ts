export interface UserPayload {
    sub: number;
    login: string;
    iat?: number;
    exp?: number;
}