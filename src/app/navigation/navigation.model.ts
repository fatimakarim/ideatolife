import { FeedNavigationModelInterface } from "../theme-core/components/navigation/navigation.model";
import * as ROUTE_LIST from "../helpers/constants/routes-list";
import { PermissionService } from "../helpers/services/permission.service";
import { AfterViewChecked } from "@angular/core";

export class FeedNavigationModel implements FeedNavigationModelInterface, AfterViewChecked {
    public model: any[];
    protected permissionService: PermissionService;

    constructor(permissionService: PermissionService) {
        this.permissionService = permissionService;
        this.initSideNavigationModel();
    }

    /**
     * the following method is used to init the navigation model as per current state
     */
    initSideNavigationModel() {
        this.model = [
            {
                "id": "home",
                "title": "Home",
                "type": "collapse",
                "translate": "NAV.HOME_TITLE",
                "icon": "home",
                "isAllow": this.permissionService.canAccessModule("home"),
                children: [
                    {
                        "id": "dashboard",
                        "title": "Dashboard",
                        "type": "item",
                        "translate": "NAV.DASHBOARD_TITLE",
                        "url": "/" + ROUTE_LIST.DASHBOARD_HOME,
                        "isAllow": this.permissionService.canAccessModule("dashboard"),
                    }, {
                        "id": "feed-offer",
                        "title": "Feed-Offer",
                        "type": "item",
                        "translate": "NAV.OFFER_TITLE",
                        "url": "/" + ROUTE_LIST.OFFER_HOME,
                        "isAllow": this.permissionService.canAccessModule("feed-offer"),
                    },
                    {
                        "id": "calendar",
                        "title": "Calendar",
                        "type": "item",
                        "translate": "NAV.CALENDAR_TITLE",
                        "url": "/" + ROUTE_LIST.CALENDAR_HOME,
                        "isAllow": this.permissionService.canAccessModule("calendar"),
                    },
                    {
                        "id": "brands",
                        "title": "Brands",
                        "type": "item",
                        "translate": "NAV.BRAND_TITLE",
                        "url": "/" + ROUTE_LIST.BRAND_HOME,
                        "isAllow": this.permissionService.canAccessModule("brands")
                    },
                    {
                        "id": "products",
                        "title": "Products",
                        "type": "item",
                        "translate": "NAV.PRODUCT_TITLE",
                        "url": "/" + ROUTE_LIST.PRODUCT_HOME,
                        "isAllow": this.permissionService.canAccessModule("products")
                    },
                    {
                        "id": "requests",
                        "title": "Requests",
                        "type": "item",
                        "translate": "NAV.REQUEST_TITLE",
                        "url": "/" + ROUTE_LIST.REQUEST_HOME,
                        "isAllow": this.permissionService.canAccessModule("requests")
                    },
                    {
                        "id": "reservations",
                        "title": "Reservations",
                        "type": "item",
                        "translate": "NAV.RESERVATION_TITLE",
                        "url": "/" + ROUTE_LIST.RESERVATION_HOME,
                        "isAllow": this.permissionService.canAccessModule("reservations")
                    },
                ]
            },
            {
                "id": "location",
                "title": "Location",
                "type": "collapse",
                "translate": "NAV.LOCATION_TITLE",
                "icon": "map",
                "url": "/" + ROUTE_LIST.LOCATION_HOME,
                "isAllow": this.permissionService.canAccessModule("location"),
                children: [
                    {
                        "id": "zones",
                        "title": "Zone",
                        "type": "item",
                        "translate": "NAV.ZONE_TITLE",
                        "url": "/" + ROUTE_LIST.ZONE_HOME,
                        "isAllow": this.permissionService.canAccessModule("zones")
                    },
                    {
                        "id": "networks",
                        "title": "Networks",
                        "type": "item",
                        "translate": "NAV.NETWORK_TITLE",
                        "url": "/" + ROUTE_LIST.NETWORK_HOME,
                        "isAllow": this.permissionService.canAccessModule("networks")
                    },
                    {
                        "id": "establishment",
                        "title": "Establishment",
                        "type": "item",
                        "translate": "NAV.ESTABLISHMENT_TITLE",
                        "url": "/" + ROUTE_LIST.ESTABLISHMENT_HOME,
                        "isAllow": this.permissionService.canAccessModule("establishment")
                    },
                    {
                        "id": "location",
                        "title": "Location",
                        "type": "item",
                        "translate": "NAV.LOCATION_TITLE",
                        "url": "/" + ROUTE_LIST.LOCATION_HOME,
                        "isAllow": this.permissionService.canAccessModule("location")
                    }
                ]
            },
            {
                "id": "machines",
                "title": "Machines",
                "type": "collapse",
                "translate": "NAV.MACHINE_TITLE",
                "icon": "computer",
                "isAllow": this.permissionService.canAccessModule("machines"),
                children: [
                    {
                        "id": "machines",
                        "title": "Machines",
                        "type": "item",
                        "translate": "NAV.MACHINE_TITLE",
                        "url": "/" + ROUTE_LIST.MACHINE_HOME,
                        "isAllow": this.permissionService.canAccessModule("machines")
                    },
                    {
                        "id": "machine_maintenance",
                        "title": "Maintenance Schedule",
                        "type": "item",
                        "translate": "NAV.MAINTENANCE_TITLE",
                        "url": "/" + ROUTE_LIST.MACHINE_MAINTENANCE_HOME,
                        "isAllow": this.permissionService.canAccessModule("machine_maintenance")
                    },
                    {
                        "id": "floor_mapping",
                        "title": "Floor Mapping",
                        "type": "item",
                        "translate": "NAV.FLOOR_MAPPING",
                        "url": "/" + ROUTE_LIST.MACHINE_FLOOR_MAPPING,
                        "isAllow": this.permissionService.canAccessModule("floor_mapping")
                    },
                    /*
                    {
                        "id": "machine_monitoring",
                        "title": "Machine Monitoring",
                        "type": "item",
                        "translate": "NAV.MACHINE_MONITORING_TITLE",
                        "url": "/" + ROUTE_LIST.DASHBOARD_HOME,
                        "isAllow": this.permissionService.canAccessModule("machine_monitoring")
                    }*/
                ]
            },
            {
                "id": "settings",
                "title": "Settings",
                "type": "collapse",
                "translate": "NAV.SETTING_TITLE",
                "icon": "settings",
                "isAllow": this.permissionService.canAccessModule("settings"),
                children: [
                    /*{
                        "id": "categories",
                        "title": "Categories",
                        "type": "item",
                        "translate": "NAV.CATEGORY_TITLE",
                        "url": "/" + ROUTE_LIST.CATEGORY_HOME,
                        "isAllow": this.permissionService.canAccessModule("categories")
                    },
                    {
                        "id": "sub_categories",
                        "title": "Sub Categories",
                        "type": "item",
                        "translate": "NAV.SUB_CATEGORY_TITLE",
                        "url": "/" + ROUTE_LIST.SUB_CATEGORY_HOME,
                        "isAllow": this.permissionService.canAccessModule("sub_categories")
                    },*/
                    {
                        "id": "teams",
                        "title": "Teams",
                        "type": "item",
                        "translate": "NAV.TEAM_TITLE",
                        "url": "/" + ROUTE_LIST.TEAM_HOME,
                        "isAllow": this.permissionService.canAccessModule("teams")
                    },
                    {
                        "id": "users",
                        "title": "Users",
                        "type": "item",
                        "translate": "NAV.USER_TITLE",
                        "url": "/" + ROUTE_LIST.USERS_LISTING,
                        "isAllow": this.permissionService.canAccessModule("users")
                    },
                    {
                        "id": "roles",
                        "title": "Roles & Permissions",
                        "type": "item",
                        "translate": "NAV.ROLE_TITLE",
                        "url": "/" + ROUTE_LIST.ROLE_HOME,
                        "isAllow": this.permissionService.canAccessModule("roles")
                    }
                ]
            }
        ];
    }

    ngAfterViewChecked() {
        this.model = [];
        this.initSideNavigationModel();
    }
}
