import { ZUserResponse } from "../../models/user/dto";
import UserService from "../../services/user/user.service";

async function getUserInformationByUserId(userId: string) {
    const userInfo = await UserService.findUserById(userId);
    if (userInfo) {
        return ZUserResponse.parse(userInfo);
    }
}

const UserController = {
    getUserInformationByUserId,
}
export default UserController;