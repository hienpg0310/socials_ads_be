import dayjs from "dayjs";
import { CreatePostDTO, CreatePostWithConfigDTO, UpdatePostDTO } from "../../models/post/dto";
import PostService from "../../services/post/post.service";
import SocialSettingService from "../../services/social-setting/social_setting.service";
import { GeminiContentGenerator } from "../content/gemini";
import UploadService from "../../services/upload/upload.service";

async function getAllPostsByCampaignId(campaignId: string) {
    const posts = await PostService.findManyPosts({
        campaignId: campaignId,
    });
    const fileIds = posts.flatMap((p) => p.imageIds);
    const images = await UploadService.findManyByIds(fileIds);
    const imageMap = new Map<string, string>();
    images.forEach((img) => imageMap.set(img.id, img.url));

    return posts.map((p) => {
        const { imageIds, ...postDetail } = p;
        return {
            ...postDetail,
            images: imageIds.map((imgId) => {
                return {
                    id: imgId,
                    url: imageMap.get(imgId),
                }
            })
        }
    });
}

async function getPostDetail(id: string) {
    const post = await PostService.getPostDetail(id);
    if (!post) {
        return null;
    }
    const fileIds = post.imageIds ?? [];
    const images = await UploadService.findManyByIds(fileIds);
    const imageMap = new Map<string, string>();
    images.forEach((img) => imageMap.set(img.id, img.url));
    const { imageIds, ...postDetail } = post;
    return {
        ...postDetail,
        images: imageIds.map((imgId) => {
            return {
                id: imgId,
                url: imageMap.get(imgId),
            }
        })
    }

}

async function createNewPost(data: CreatePostDTO) {
    const post = await PostService.createNewPost(data);
    return post;
}

async function createPostsWithConfig(data: CreatePostWithConfigDTO) {

    const { config, ...postData } = data;
    // handle posted time
    let timestamps = [];

    if (config.repeat > 1) {
        const interval = (config.end.getTime() - config.start.getTime()) / (config.repeat - 1);

        for (let i = 0; i < config.repeat; i++) {
            timestamps.push(config.start.getTime() + (interval * i));
        }
    } else {
        timestamps = [config.start.getTime()];
    }

    // handle social platform
    const socialPlatforms = await SocialSettingService.findManySocialSettings({
        id: { in: config.platforms }
    })

    const posts = await PostService.createManyPosts([
        ...timestamps.map((timestamp) => {
            return {
                ...postData,
                platformIds: socialPlatforms.map((sp) => sp.id),
                postedTime: dayjs(timestamp).toDate(),

            }
        })
    ])

    // run in background post generate
    handleNewPostCreated(posts.map((p) => p.id), posts[0].description);

    return posts;
}

async function handleNewPostCreated(postIds: string[], description: string) {
    // update processing status for posts
    try {
        await PostService.updateManyPosts(postIds, { status: 'processing', })
        const content = await GeminiContentGenerator.generatePostContent(description);
        if (!content) {
            throw new Error("Error generate post content");
        }
        // update content for post
        const updatedPosts = await PostService.updateManyPosts(postIds, {
            content: content,
            status: 'draft',
        })
        return updatedPosts;
    } catch (error) {
        console.log(`Error processing post:${error}`)
    }

    return [];

}
async function updateAPost(id: string, data: UpdatePostDTO) {
    await PostService.updatePostById(id, data);
    return true;
}

async function deleteAPost(id: string) {
    await PostService.deleteAPost(id);
    return true;
}

const PostController = {
    getAllPostsByCampaignId,
    createPostsWithConfig,
    getPostDetail,
    createNewPost,
    updateAPost,
    deleteAPost,
};

export default PostController;