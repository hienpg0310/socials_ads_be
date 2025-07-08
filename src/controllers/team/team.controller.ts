import { AddMemberDTO, CreateTeamDTO, CreateTeamMemberDTO, UpdateTeamDTO, UpdateTeamMemberDTO } from "../../models/team/dto";
import TeamService from "../../services/team/team.service";
import UserService from "../../services/user/user.service";

const getAllTeamByUser = async (userId: string) => {
    const teams = await TeamService.findTeamsByUserId(userId);
    return teams;
}

const getTeamMembersByTeam = async (teamId: string) => {
    const teamMembers = await TeamService.getTeamMemberByTeamId(teamId);
    return teamMembers;
}
const createNewTeam = async (data: CreateTeamDTO) => {
    const newTeam = await TeamService.createNewTeam(data);
    return newTeam;
}
const updateTeam = async (teamId: string, data: UpdateTeamDTO) => {
    const updatedTeam = await TeamService.updateTeam(teamId, data);
    return true;
}
const deleteTeam = async (teamId: string) => {
    const deletedTeam = await TeamService.deleteTeam(teamId);
    return true;
}

const addNewMember = async (data: AddMemberDTO) => {
    const { email, ...rest } = data;
    // check user valid
    const user = await UserService.findUserByEmail(email);
    if (!user) {
        throw new Error("User is not valid!");
    }
    const newMember = await createNewTeamMember({ ...rest, userId: user.id });
    return newMember;
}

const createNewTeamMember = async (data: CreateTeamMemberDTO) => {
    const newMember = await TeamService.addNewMember({ ...data });
    return newMember;
}
const updateMemberInTeam = async (data: UpdateTeamMemberDTO) => {
    const updatedMember = await TeamService.updateMemberInTeam(data);
    return true;
}
const removeMemberInTeam = async (teamId: string, userId: string) => {
    const removedMember = await TeamService.deleteTeamMember(teamId, userId);
    return true;
}

// helper
const isBelongToTeam = async (teamId: string, userId: string) => {
    const relation = await TeamService.getTeamMemberDetail(teamId, userId);
    if (relation) {
        return true;
    }
    return false;
}
const TeamController = {
    getAllTeamByUser,
    getTeamMembersByTeam,
    createNewTeam,
    createNewTeamMember,
    updateTeam,
    deleteTeam,
    addNewMember,
    updateMemberInTeam,
    removeMemberInTeam,
    isBelongToTeam,
}

export default TeamController;