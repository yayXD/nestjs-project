import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AdminService } from "./admin.service";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) {
    }

    @ApiOperation({ summary: 'Admin page' })
    @ApiResponse({ status: 200 })
    @Roles("admin")
    @UseGuards(RolesGuard)
    @Get()
    getAdminPage() {
        return this.adminService.getAdminPage();
    }
}
