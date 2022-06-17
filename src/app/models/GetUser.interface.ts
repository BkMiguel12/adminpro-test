import { User } from "./User.model";

export interface GetUser {
    total: number;
    users: User[];
}