import { LoginUserDTO } from "../../infraestructure/models/LoginUserDTO";

export interface LoginRepository {
    getLogin(email: string): Promise<LoginUserDTO | undefined>;
    setLastLogin(email : string) : Promise<boolean>;
}