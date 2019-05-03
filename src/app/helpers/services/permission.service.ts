import {Injectable} from "@angular/core";
import {UserService} from "./user.service";
import * as CONSTANT_LIST from "../constants/constant-list";

@Injectable()
export class PermissionService {

    private userService;
    private constantList = CONSTANT_LIST;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    private isValidateRole(): boolean {
        return typeof this.userService.user.role !== "undefined";
    }

    /**
     * The following method is used to check whether the user is admin
     * @return {boolean}
     */
    public isAdmin(): boolean {
        if (!this.isValidateRole()) {
            return false;
        }

        return this.userService.user.role.name === this.constantList.ADMIN_ROLE;
    }

    /**
     * The following method is used to check whether the user is brand manager
     * @return {boolean}
     */
    public isBrandManager(): boolean {
        if (!this.isValidateRole()) {
            return false;
        }

        return this.userService.user.role.name === this.constantList.BRAND_MANAGER_ROLE;
    }

    /**
     * The following method is used to check whether the user is support team
     * @return {boolean}
     */
    public isSupportTeam(): boolean {
        if (!this.isValidateRole()) {
            return false;
        }

        return this.userService.user.role.name === this.constantList.SUPPORT_TEAM_ROLE;
    }

    /**
     * The following method is used to check whether the user is landlord
     * @return {boolean}
     */
    public isLandLord(): boolean {
        if (!this.isValidateRole()) {
            return false;
        }

        return this.userService.user.role.name === this.constantList.LANDLORD_ROLE;
    }

    canAccessModule(moduleName: string): boolean {
        let bool: boolean = false;
        if (this.isAdmin()) {
            return true;
        }

        switch (moduleName) {
            case "home":
                bool = !this.isSupportTeam();
                break;
            case "dashboard":
                bool = !this.isSupportTeam();
                break;
                case "feed-offer":
                bool = !this.isSupportTeam();
                break;
            case "calendar":
                bool = !this.isSupportTeam();
                break;
            case "brands":
                bool = !this.isSupportTeam();
                break;
            case "products":
                bool = !this.isSupportTeam();
                break;
            case "requests":
                bool = !this.isSupportTeam();
                break;
            case "reservations":
                bool = !this.isSupportTeam();
                break;
            case "machine_maintenance":
                bool = this.isSupportTeam();
                break;
            case "machine_monitoring":
                bool = this.isSupportTeam();
                break;
            case "location":
                bool = false;
                break;
            case "machines":
                bool = this.isSupportTeam();
                break;
            case "settings":
                bool = false;
                break;
            
            default:
                bool = false;
                break;
        }

        return bool;
    }

}
