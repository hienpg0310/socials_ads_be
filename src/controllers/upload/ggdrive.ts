import { drive } from "@googleapis/drive";
import { GoogleAuth } from "google-auth-library";
import { Readable } from "stream";
import { appConfig } from "../../utils/config";

const auth = new GoogleAuth({
    keyFile: './techfis-marketing.json',
    scopes: ['https://www.googleapis.com/auth/drive'],
});

const ggDrive = drive({ version: 'v3', auth: auth });

const uploadVideos = async (files: Express.Multer.File[]) => {
    // new google.auth.JWT()
    const uploads = files.map(async (file) => {
        // console.log(file.filename, file.size,)

        const mediaStream = Readable.from(file.buffer);

        const uploadFile = await ggDrive.files.create({
            requestBody: {
                name: file.originalname,
                parents: [appConfig.upload.publicGGFolderId],
            },
            media: {
                mimeType: file.mimetype,
                body: mediaStream,
            },
            fields: 'id,webViewLink,webContentLink,thumbnailLink,iconLink,exportLinks',
        });
        const fileId = uploadFile.data.id!;
        console.log(uploadFile.data,);
        const webViewLink = uploadFile.data.webViewLink!;
        await ggDrive.permissions.create({
            fileId,
            requestBody: { role: 'reader', type: 'anyone' },
        });
        return {
            fileName: file.originalname,
            url: webViewLink,
            metadata: {
                size: file.size,
                mimetype: file.mimetype,
                drive_id: fileId,
            }
        };
    });

    const uploadedFiles = await Promise.all(uploads);
    return uploadedFiles;

}

const GoogleDriveUploader = {
    uploadVideos,
}
export default GoogleDriveUploader;