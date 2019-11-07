import { SetMetadata } from "@nestjs/common";
/**
 * Declare Roles decorator
 *
 * @param {...string[]} roles
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);