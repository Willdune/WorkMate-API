import { LoginUser } from "../../domain/models/LoginUser";

export type LoginUserDTO = {
    uuid: string;
    password: string;
}

export function toUser(loginuserdto : LoginUserDTO): LoginUser{
    return {
        uuid: loginuserdto.uuid,
        password: loginuserdto.password
    };
}