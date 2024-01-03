import { Injectable } from '@nestjs/common';
import { $Enums } from '@prisma/client';

interface IsAuthorizedParams {
    currentRole: $Enums.UserRole;
    requiredRole: $Enums.UserRole;
}

@Injectable()
export class RoleControlService {
    private hierarchies: Array<Map<string, number>> = [];
    private priority: number = 1;

    constructor() {
        this.buildRoles([$Enums.UserRole.ADMIN, $Enums.UserRole.USER]);
    }

    private buildRoles(roles: $Enums.UserRole[]) {
        const hierarchy: Map<string, number> = new Map();
        roles.forEach((role) => {
            hierarchy.set(role, this.priority);
            this.priority++;
        });
        this.hierarchies.push(hierarchy);
    }

    public isAuthorized({ currentRole, requiredRole }: IsAuthorizedParams) {
        for (const hierarchy of this.hierarchies) {
            const priority = hierarchy.get(currentRole);
            const requiredPriority = hierarchy.get(requiredRole);
            if (priority && requiredPriority && priority >= requiredPriority) {
                return true;
            }
        }
        return false;
    }
}
