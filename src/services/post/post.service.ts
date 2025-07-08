import { CreatePostDTO, UpdatePostDTO, QueryPostOptions } from "../../models/post/dto";
import { prisma } from "../db/prisma";

const findManyPosts = async (options: QueryPostOptions) => {
    const posts = await prisma.post.findMany({
        where: { ...options },
    });
    return posts;
};

const getPostDetail = async (id: string) => {
    const post = await prisma.post.findUnique({
        where: { id },
    });
    return post;
};

const createNewPost = async (data: CreatePostDTO) => {
    const newPost = await prisma.post.create({
        data: { ...data },
    });
    return newPost;
};

const createManyPosts = async (data: CreatePostDTO[]) => {
    const posts = await prisma.post.createManyAndReturn({
        data: [...data]
    })

    return posts;
}

const updatePostById = async (id: string, data: UpdatePostDTO) => {
    const updatedPost = await prisma.post.update({
        where: { id },
        data: { ...data },
    });
    return updatedPost;
};

const updateManyPosts = async (postIds: string[], data: UpdatePostDTO) => {
    const updatedPosts = await prisma.post.updateManyAndReturn({
        where: { id: { in: postIds } },
        data: { ...data }
    })
    return updatedPosts;
}

const deleteAPost = async (id: string) => {
    const deletedPost = await prisma.post.delete({
        where: { id },
    });
    return deletedPost;
};

const PostService = {
    findManyPosts,
    getPostDetail,
    createNewPost,
    createManyPosts,
    updatePostById,
    updateManyPosts,
    deleteAPost,
};

export default PostService;