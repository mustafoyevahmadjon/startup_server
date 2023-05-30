import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.model';
import { RegisterAuthDto } from "./dto/register.dto";
import { compare, genSalt, hash } from "bcryptjs"
import { LoginAuthDto } from './dto/login.dto';
import { JwtService } from "@nestjs/jwt";
import { TokenDto } from "./dto/token.dto";

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private readonly JWtService: JwtService) { }

    async register(dto: RegisterAuthDto) {
        const existUser = await this.isExostUser(dto.email)
        if (existUser) throw new BadRequestException("user with that email is already exist in the system")
        const salt = await genSalt(10)
        const passwordHash = await hash(dto.password, salt)
        const newUser = await this.userModel.create({ ...dto, password: passwordHash });
        const token = await this.issueTokenPair(String(newUser._id))
        return { user: this.getUserField(newUser), ...token }
    }
    // Login
    async login(dto: LoginAuthDto) {
        const existUser = await this.isExostUser(dto.email)
        if (!existUser) throw new BadRequestException("user Not Found")
        const currentPassword = await compare(dto.password, existUser.password)
        if (!currentPassword) throw new BadRequestException("Incorrect password")

        const token = await this.issueTokenPair(String(existUser._id))
        return { user: this.getUserField(existUser), ...token }
    }
    // Token
    async getNewTokens({ refreshToken }: TokenDto) {
        if (!refreshToken) throw new UnauthorizedException("Please Sign in !")
        const result = await this.JWtService.verifyAsync(refreshToken)
        if (!result) throw new UnauthorizedException("Invalid token or expired !")
        const user = await this.userModel.findById(result._id)
        const token = await this.issueTokenPair(String(user._id))
        return { user: this.getUserField(user), ...token }
    }

    async isExostUser(email: string): Promise<UserDocument> {
        const existUser = await this.userModel.findOne({ email })
        return existUser
    }

    async issueTokenPair(userId: string) {
        const data = { _id: userId }
        const refreshToken = await this.JWtService.signAsync(data, { expiresIn: "15d" })
        const accessToken = await this.JWtService.signAsync(data, { expiresIn: "1h" })
        return { refreshToken, accessToken }
    }
    getUserField(user: UserDocument) {
        return {
            id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    }
}