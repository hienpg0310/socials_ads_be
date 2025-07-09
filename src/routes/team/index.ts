import { Router } from "express"
import { getUserInRequest } from "../../utils/route/utils";
import TeamController from "../../controllers/team/team.controller";
import { successResponse } from "../../models/response";
import { MissingPathParamsRequestError } from "../../utils/types/error/common";
import { TeamRole } from "@prisma/client";
import TeamService from "../../services/team/team.service";
import { ForbiddenError } from "../../utils/types/error";
import { ZAddMemberDTO, ZCreateTeamDTO, ZUpdateTeamMemberDTO } from "../../models/team/dto";

export const setUpTeamRouter = () => {
    const router = Router();

    const allowWithTeam = async (teamId: string, userId: string, roles?: TeamRole[]) => {
        const relation = await TeamService.getTeamMemberDetail(teamId, userId);
        if (relation) {
            if (!roles) {
                return true;
            } else {
                return roles.includes(relation.role);
            }
        }
        return false;

    }

    router.get('/', async (req, res) => {
        const user = getUserInRequest(req, res);
        const userId = user.id;
        const teams = await TeamController.getAllTeamByUser(userId);
        return successResponse(res, teams, teams.length);
    });

    router.get('/:teamId/member', async (req, res) => {
        const teamId = req.params.teamId as string;
        if (!teamId) {
            throw MissingPathParamsRequestError(['teamId']);
        }
        const userId = getUserInRequest(req, res).id;
        // check permission
        const isAllow = await allowWithTeam(teamId, userId);
        if (!isAllow) {
            throw new ForbiddenError("You have no authorization to do with team");
        }
        const teamMembers = await TeamController.getTeamMembersByTeam(teamId);
        return successResponse(res, teamMembers, teamMembers.length);
    })

    router.get("/:teamId", async (req, res) => {
      const teamId = req.params.teamId as string;
      if (!teamId) {
        throw MissingPathParamsRequestError(["teamId"]);
      }

      const userId = getUserInRequest(req, res).id;

      // check permission: user must belong to the team
      const isAllow = await allowWithTeam(teamId, userId);
      if (!isAllow) {
        throw new ForbiddenError("You have no authorization to view this team");
      }

      const team = await TeamController.getTeamDetail(teamId);
      if (!team) {
        return res.status(404).json({ error: "Team not found" });
      }

      return successResponse(res, team);
    })
    

    router.post('/', async (req, res) => {
        const userId = getUserInRequest(req, res).id;
        const newTeamData = ZCreateTeamDTO.parse(req.body);
        const newTeam = await TeamController.createNewTeam(newTeamData);
        // add owner role to user
        await TeamController.createNewTeamMember({ teamId: newTeam.id, userId: userId, role: 'OWNER' });
        return successResponse(res, newTeam);
    })

    router.post('/:teamId/member', async (req, res) => {
        const teamId = req.params.teamId as string;
        if (!teamId) {
            throw MissingPathParamsRequestError(['teamId']);
        }
        const userId = getUserInRequest(req, res).id;
        const isAllow = await allowWithTeam(teamId, userId, ['ADMIN', 'OWNER']);
        if (!isAllow) {
            throw new ForbiddenError("You do not have enough permission to do with team");
        }
        const newMemberData = ZAddMemberDTO.parse({ ...req.body, teamId: teamId });
        const newMember = await TeamController.addNewMember(newMemberData);
        return successResponse(res, newMember);
    })

    router.put('/:teamId/member/:memberId', async (req, res) => {
        const teamId = req.params.teamId as string;
        const memberId = req.params.memberId as string;

        if (!teamId || !memberId) {
            throw MissingPathParamsRequestError(['teamId', 'memberId']);
        }
        const userId = getUserInRequest(req, res).id;
        const isAllow = await allowWithTeam(teamId, userId, ['ADMIN', 'OWNER']);
        if (!isAllow) {
            throw new ForbiddenError("You do not have enough permission to do with team");
        }
        const updateMemberData = ZUpdateTeamMemberDTO.parse({ ...req.body, teamId: teamId, userId: memberId });
        const updatedResult = await TeamController.updateMemberInTeam(updateMemberData);
        return successResponse(res, updatedResult);
    })

    router.delete('/:teamId/member/:memberId', async (req, res) => {
        const teamId = req.params.teamId as string;
        const memberId = req.params.memberId as string;
        if (!teamId || !memberId) {
            throw MissingPathParamsRequestError(['teamId', 'memberId']);
        }
        const userId = getUserInRequest(req, res).id;
        const isAllow = await allowWithTeam(teamId, userId, ['ADMIN', 'OWNER']);
        if (!isAllow) {
            throw new ForbiddenError("You do not have enough permission to do with team");
        }
        if (userId === memberId) {
          throw new ForbiddenError("You cannot remove yourself from the team");
        }

        const deletedResult = await TeamController.removeMemberInTeam(
          teamId,
          memberId
        );
        return successResponse(res, deletedResult);
    })

    router.delete('/:teamId', async (req, res) => {
        const teamId = req.params.teamId as string;
        if (!teamId) {
            throw MissingPathParamsRequestError(['teamId']);
        }
        const userId = getUserInRequest(req, res).id;
        // check permission
        const isAllow = await allowWithTeam(teamId, userId, ['OWNER']);
        if (!isAllow) {
            throw new ForbiddenError("You have no authorization to do with team");
        }
        const deletedResult = await TeamController.deleteTeam(teamId);
        return successResponse(res, deletedResult);
    })

    return router;
}