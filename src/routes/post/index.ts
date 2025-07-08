import { Router } from "express"
import { MissingPathParamsRequestError, MissingQueryParamsRequestError } from "../../utils/types/error/common";
import PostController from "../../controllers/post/post.controller";
import { successResponse } from "../../models/response";
import { ZCreatePostWithConfigDTO, ZUpdatePostDTO } from "../../models/post/dto";

export const setUpPostRouter = () => {
    const router = Router();

    router.get('/:id', async (req, res) => {
        const id = req.params.id as string;
        if (!id) {
            throw MissingPathParamsRequestError(['id']);
        }
        const postDetail = await PostController.getPostDetail(id);
        return successResponse(res, postDetail);
    })

    router.get('/', async (req, res) => {
        const campaignId = req.query.campaignId as string;
        if (!campaignId) {
            throw MissingQueryParamsRequestError(['campaignId']);
        }
        const posts = await PostController.getAllPostsByCampaignId(campaignId);
        return successResponse(res, posts, posts.length);

    })

    router.post('/', async (req, res) => {
        const createPostData = ZCreatePostWithConfigDTO.parse(req.body);
        const posts = await PostController.createPostsWithConfig(createPostData);
        return successResponse(res, posts, posts.length);
    })

    router.put('/:id', async (req, res) => {
        const id = req.params.id as string;
        if (!id) {
            throw MissingPathParamsRequestError(['id']);
        }
        const updatePostData = ZUpdatePostDTO.parse(req.body);
        const result = await PostController.updateAPost(id, updatePostData);
        return successResponse(res, result);
    })

    router.put('/:id', async (req, res) => {
        const id = req.params.id as string;
        if (!id) {
            throw MissingPathParamsRequestError(['id']);
        }

        const result = await PostController.deleteAPost(id);
        return successResponse(res, result);
    })
    return router;
}