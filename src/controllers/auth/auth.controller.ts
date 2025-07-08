import UserService from "../../services/user/user.service";
import { compare } from 'bcrypt'

async function login(username: string, password: string) {
    // step 1: check user existed or not
    const user = await UserService.findUserByEmail(username);
    if (!user) {
        throw new Error("User is not existed");
    }

    // step 2: check credentials
    const result = await compare(password, user.password);
    if (!result) {
        throw new Error("Wrong credentials");
    }

    // return user if success
    return user;
}

const AuthController = {
    login,
}
export default AuthController;