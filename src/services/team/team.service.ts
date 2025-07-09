import { CreateTeamDTO, CreateTeamMemberDTO, UpdateTeamDTO, UpdateTeamMemberDTO } from "../../models/team/dto";
import { prisma } from "../db/prisma";

const findTeamsByUserId = async (userId: string) => {
    const teams = await prisma.team.findMany({ where: { members: { some: { userId: userId } } } })
    return teams;
}

const getTeamMemberDetail = async (teamId: string, userId: string) => {
    const relation = await prisma.teamMember.findFirst({
        where: { teamId: teamId, userId: userId },
    })
    return relation;
}

const getTeamMemberByTeamId = async (teamId: string) => {
    const members = await prisma.teamMember.findMany({
        where: { teamId: teamId },
        include: {
            user: {
                select: { name: true, email: true }
            }
        }
    });
    return members.map((member) => {
        const { user, ...memberRole } = member;
        return {
            ...memberRole,
            ...user,
        }
    });
}

const getTeamDetailById = async (teamId: string) => {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    include: {
      members: true, // Optional: include team members
    },
  });
  return team;
};

const createNewTeam = async (data: CreateTeamDTO) => {
    const newTeam = await prisma.team.create({
        data: { ...data }
    })
    return newTeam;
}

const updateTeam = async (teamId: string, data: UpdateTeamDTO) => {
    const updatedTeam = await prisma.team.update({
        where: { id: teamId },
        data: { ...data }
    })
    return updatedTeam;
}

const deleteTeam = async (teamId: string) => {
    const deletedTeam = await prisma.team.delete({
        where: { id: teamId },
    });
    return deletedTeam;
}

const addNewMember = async (data: CreateTeamMemberDTO) => {
    const newMember = await prisma.teamMember.create({
        data: {
            ...data
        }
    })
    return newMember;
}


const deleteTeamMember = async (teamId: string, userId: string) => {
    const deleteMember = await prisma.teamMember.delete({
        where: {
            userId_teamId: {
                teamId: teamId,
                userId: userId,
            }
        }
    });
    return deleteMember;
}

const updateMemberInTeam = async (data: UpdateTeamMemberDTO) => {
    const { teamId, userId, ...updateData } = data;
    const updatedMember = await prisma.teamMember.update({
        where: {
            userId_teamId: {
                userId: userId,
                teamId: teamId
            },
        }, data: { ...updateData },
    })
    return updatedMember;
}
const TeamService = {
    findTeamsByUserId,
    getTeamMemberDetail,
    getTeamMemberByTeamId,
    getTeamDetailById,
    createNewTeam,
    updateTeam,
    deleteTeam,
    addNewMember,
    updateMemberInTeam,
    deleteTeamMember,
}
export default TeamService;