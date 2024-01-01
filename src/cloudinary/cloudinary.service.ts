import { BadRequestException, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { CreateImageEntity } from './entities/created-image.entity';

@Injectable()
export class CloudinaryService {
    async uploadFile(file: Express.Multer.File): Promise<CreateImageEntity> {
        return new Promise<CreateImageEntity>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                (error, result) => {
                    if (error)
                        return reject(new BadRequestException(error.message));
                    const { url, public_id } = result;
                    resolve(new CreateImageEntity(url, public_id));
                },
            );
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
    }
}
