import { RoleUser } from "../../user/user.interface";
import { applyDecorators, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../guards/jwt.guard";
import { OnlyAdminGuard } from "../guards/admin.guard";
import { OnlyInstructorGuard } from "../guards/instructor.guard";

export const Auth = (role: RoleUser = "USER") => {
    return applyDecorators(role === "ADMIN" && UseGuards(JwtAuthGuard, OnlyAdminGuard)
        || role === "USER" && UseGuards(JwtAuthGuard))
        || role === "INSTRUCTOR" && UseGuards(JwtAuthGuard, OnlyInstructorGuard)
}