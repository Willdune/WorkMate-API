

export interface RegisterRepository {
    checkUserExists(email: string): Promise<boolean>;
    createUser(email : string, password : string) :Promise<boolean>;
}