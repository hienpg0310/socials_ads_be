import { CreateUploadFileDTO } from "../../models/upload/dto";
import { prisma } from "../db/prisma";


const findManyByIds = async (ids: string[]) => {
    const uploads = await prisma.uploadFile.findMany({
        where: { id: { in: ids } }
    });
    return uploads;
}
const createUploadRecord = async (data: CreateUploadFileDTO) => {
    const newUpload = await prisma.uploadFile.create({
        data: { ...data }
    });
    return newUpload;
}

const createManyUploadRecords = async (data: CreateUploadFileDTO[]) => {
    const uploads = await prisma.uploadFile.createManyAndReturn({
        data: [
            ...data,
        ]
    });
    return uploads;
}

const deleteUploadRecord = async (id: string) => {
    const upload = await prisma.uploadFile.delete({
        where: { id: id }
    });

    return upload;
}

const deleteManyUploadRecords = async (ids: string[]) => {
    const uploads = await prisma.uploadFile.deleteMany({
        where: {
            id: { in: ids }
        }
    });
    return uploads.count;
}

const UploadService = {
    findManyByIds,
    createUploadRecord,
    createManyUploadRecords,
    deleteUploadRecord,
    deleteManyUploadRecords,
}

export default UploadService;