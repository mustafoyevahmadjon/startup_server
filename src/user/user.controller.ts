import { Body, Controller, Get, HttpCode, Put } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from './decorators/user.decorator';
import { UserService } from './user.service';
import { InterfaceEmailAndPassword } from './user.interface';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @HttpCode(200)
    @Get('profile')
    @Auth()
    async getProfile(@User('_id') _id: string) {
        return this.userService.byId(_id);
    }

    @HttpCode(200)
    @Put("edit-password")
    async editPassword(@Body() dto: InterfaceEmailAndPassword) { 
        return this.userService.editPassword(dto)
    }
}