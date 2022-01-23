import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {

    getAdminPage() {
        return "Admin page";
    }
}
