import axios, { AxiosError } from 'axios';
import { } from 'multer'
import { appConfig } from '../../utils/config';

const uploadImages = async (images: Express.Multer.File[]) => {
    const httpClient = axios.create({
        baseURL: 'https://api.imgbb.com',
    });
    const imageUrls = await Promise.all([
        ...images.map(async (img) => {
            try {
                const formData = new FormData();
                formData.append('image', img.buffer.toString('base64'))
                const response = await httpClient.post(`/1/upload?key=${appConfig.upload.imgbbApiToken}`, formData)
                if (response.status == 200) {
                    const url = response.data['data'].display_url as string;

                    return {
                        fileName: img.originalname,
                        url: url,
                        metadata: {
                            size: img.size,
                            mimetype: img.mimetype,
                        }
                    }
                }

            } catch (error) {
                console.error("Error upload image " + img.originalname);
                if (error instanceof AxiosError) {
                    console.log(error.response?.data)
                }
            }

        })
    ])
    return imageUrls.filter((img) => img != undefined);
}

const ImgBBImageController = {
    uploadImages,
}

export default ImgBBImageController