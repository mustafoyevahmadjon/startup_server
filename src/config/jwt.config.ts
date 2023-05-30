import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import {JwtModuleOptions} from "@nestjs/jwt";

export const getJwtConfig = async (
    configService: ConfigService,
): Promise<JwtModuleOptions> => {
    return {
        secret: configService.get<string>('SECRET_JWT'),
    };
};