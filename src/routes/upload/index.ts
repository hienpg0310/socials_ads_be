import { Router } from "express"
import multer, { memoryStorage } from "multer";
import UploadController from "../../controllers/upload/upload.controller";
import { successResponse } from "../../models/response";

export const setUpUploadRouter = () => {
    const router = Router();
    const upload = multer({ storage: memoryStorage() });
    router.post('/image', upload.array('images', 10), async (req, res) => {
        const files = req.files as Express.Multer.File[];
        const uploadedImages = await UploadController.uploadPhotos(files);
        return successResponse(res, uploadedImages, uploadedImages.length)
    });

    router.post('/video', upload.array('videos', 10), async (req, res) => {
        const files = req.files as Express.Multer.File[];
        const uploadedVideos = await UploadController.uploadVideos(files);
        return successResponse(res, uploadedVideos, uploadedVideos.length)
    })

    return router;
}