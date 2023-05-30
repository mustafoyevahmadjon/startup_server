import { Controller, Get } from '@nestjs/common';
import { Auth } from "../auth/decorators/auth.decorator";
import { User } from './decorators/user.decorator';
import { UserDocument } from './user.model';
import {UserService} from "./user.service";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get("profile")
    @Auth()
    async getProfile(@User("_id") _id: string) {
        return this.userService.byId(_id)
    }
}
