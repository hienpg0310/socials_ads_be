import UploadService from "../../services/upload/upload.service";
import GoogleDriveUploader from "./ggdrive";
import ImgBBImageController from "./imgbb";

const uploadPhotos = async (images: Express.Multer.File[]) => {
    const uploadedImages = await ImgBBImageController.uploadImages(images);
    const records = await UploadService.createManyUploadRecords(uploadedImages.map((image) => {
        return {
            url: image.url,
            type: 'image',
            originalName: image.fileName,
            source: 'img_bb',
            metadata: image.metadata,
        }
    }));

    return records;
}

const uploadVideos = async (videos: Express.Multer.File[]) => {
    const uploadedImages = await GoogleDriveUploader.uploadVideos(videos);
    const records = await UploadService.createManyUploadRecords(uploadedImages.map((video) => {
        return {
            url: video.url,
            type: 'video',
            originalName: video.fileName,
            source: 'google_drive',
            metadata: video.metadata,
        }
    }));

    return records;
}

const UploadController = {
    uploadPhotos,
    uploadVideos,
}
export default UploadController;