"use strict";
import {AppConfig} from "../../app.config";

const apiConfig = new AppConfig();

export const SERVER_URL: string = apiConfig.config.apiUrl.backendUrl;

// User/Account
export const LOGIN_API: string = SERVER_URL + "ApplicationUsers/login";
export const REGISTER_API: string = SERVER_URL + "ApplicationUsers/register";
export const CONTACT_API: string = SERVER_URL + "ApplicationUsers/contact-form";
export const FORGOT_PASSWORD: string = SERVER_URL + "ApplicationUsers/forgot-password";
export const RESET_PASSWORD: string = SERVER_URL + "ApplicationUsers/reset-password";
export const UPDATE_ACCOUNT_STATUS: string = SERVER_URL + "admin/users/update-status";
export const UPDATE_ACCOUNT: string = SERVER_URL + "admin/users/update";
export const ADD_ACCOUNT: string = SERVER_URL + "admin/users/add";
export const UPDATE_PASSWORD: string = SERVER_URL + "app/auth/forgot-password";

// User Profile
export const PROFILE_DETAILS: string = SERVER_URL + "ApplicationUsers/get-details";
export const PROFILE_UPDATE: string = SERVER_URL + "ApplicationUsers/update-user";
export const PROFILE_UPDATE_PASSWORD: string = SERVER_URL + "ApplicationUsers/update-password";

// Roles
export const GET_ROLES: string = `${SERVER_URL}ApplicationUsers/get-roles`;

// User
export const GET_USERS: string = SERVER_URL + "ApplicationUsers/get-all";
export const GET_USER: string = SERVER_URL + "ApplicationUsers/get-details";
export const ADD_USER: string = SERVER_URL + "ApplicationUsers/register";
export const EDIT_USER: string = SERVER_URL + "ApplicationUsers/update-user";

// User Roles & Permissions
export const ROLES: string = SERVER_URL + "ApplicationUsers/get-roles";

// Country
export const GET_COUNTRIES: string = SERVER_URL + "Countries/get-all-countries";

// Product
export const GET_PRODUCTS: string = SERVER_URL + "Products/get-products";
export const GET_PRODUCT: string = SERVER_URL + "Products/get-details";
export const ADD_PRODUCT: string = SERVER_URL + "Products/add-product";
export const EDIT_PRODUCT: string = SERVER_URL + "Products/edit-product";

// Network
export const GET_NETWORKS: string = SERVER_URL + "Networks/get-networks";
export const GET_RESERVED_NETWORKS: string = SERVER_URL + "Networks/get-reserved-networks";
export const ADD_NETWORK: string = SERVER_URL + "Networks/add-network";
export const GET_NETWORK: string = SERVER_URL + "Networks/get-details";
export const EDIT_NETWORK: string = SERVER_URL + "Networks/edit-network";

// Team
export const GET_TEAMS: string = SERVER_URL + "Teams/get-teams";
export const ADD_TEAM: string = SERVER_URL + "Teams/add-team";
export const GET_TEAM: string = SERVER_URL + "Teams/get-details";
export const EDIT_TEAM: string = SERVER_URL + "Teams/edit-team";

// Machine
export const GET_MACHINES: string = SERVER_URL + "Machines/get-machines";
export const ADD_MACHINE: string = SERVER_URL + "Machines/add-machine";
export const GET_MACHINE: string = SERVER_URL + "Machines/get-details";
export const EDIT_MACHINE: string = SERVER_URL + "Machines/edit-machine";
export const GET_MACHINES_MAINTENANCE: string = SERVER_URL + "app/machines-maintenance/";
export const ADD_MAINTENANCE: string = SERVER_URL + "app/machines-maintenance/";
export const EDIT_MAINTENANCE: string = SERVER_URL + "app/machines-maintenance/";
export const GET_MAINTENANCE: string = SERVER_URL + "app/machines-maintenance/";
// Floor Mapping
export const ADD_FLOOR_MAPPING: string = SERVER_URL + "FloorMappings/add-floor-mapping";
export const EDIT_FLOOR_MAPPING: string = SERVER_URL + "FloorMappings/edit-floor-mapping";
export const GET_FLOOR_MAPPINGS: string = SERVER_URL + "FloorMappings/get-floor-mappings";
export const GET_FLOOR_MAPPING: string = SERVER_URL + "FloorMappings/get-details";

// Calendar
export const GET_CALENDARS: string = SERVER_URL + "Calendar/get-calendars";
export const ADD_CALENDAR: string = SERVER_URL + "Calendar/add-calendar";
export const GET_CALENDAR: string = SERVER_URL + "Calendar/get-details";
export const EDIT_CALENDAR: string = SERVER_URL + "Calendar/edit-calendar";

// Location
export const GET_LOCATIONS: string = SERVER_URL + "Locations/get-location";
export const ADD_LOCATION: string = SERVER_URL + "Locations/add-location";
export const GET_LOCATION: string = SERVER_URL + "Locations/get-details";
export const EDIT_LOCATION: string = SERVER_URL + "Locations/edit-location";

// Request
export const GET_REQUESTS: string = SERVER_URL + "ProductRequests/get-product-requests";
export const GET_REQUEST: string = SERVER_URL + "ProductRequests/get-details";
export const ADD_REQUEST: string = SERVER_URL + "ProductRequests/add-product-request";
export const EDIT_REQUEST: string = SERVER_URL + "ProductRequests/edit-product-request";
export const UPDATE_REQUEST_STATUS: string = SERVER_URL + "ProductRequests/update-status";

// Establishment
export const GET_ESTABLISHMENTS: string = SERVER_URL + "Establishments/get-establishment";
export const ADD_ESTABLISHMENT: string = SERVER_URL + "Establishments/add-establishment";
export const GET_ESTABLISHMENT: string = SERVER_URL + "Establishments/get-details";
export const EDIT_ESTABLISHMENT: string = SERVER_URL + "Establishments/edit-establishment";

// Reservation
export const GET_RESERVATIONS: string = SERVER_URL + "MachineReservations/get-machine-reservations";
export const GET_RESERVATION: string = SERVER_URL + "MachineReservations/get-details";
export const ADD_RESERVATION: string = SERVER_URL + "MachineReservations/add-machine-reservation";
export const EDIT_RESERVATION: string = SERVER_URL + "MachineReservations/edit-machine-reservation";
export const GET_RESERVED_BOOKINGS: string = SERVER_URL + "MachineReservations/get-reserved-bookings";
export const UPDATE_RESERVATION_STATUS: string = SERVER_URL + "MachineReservations/update-status";

// Zone
export const GET_ZONES: string = SERVER_URL + "Zones/get-zones";
export const ADD_ZONE: string = SERVER_URL + "Zones/add-zone";
export const GET_ZONE: string = SERVER_URL + "Zones/get-details";
export const EDIT_ZONE: string = SERVER_URL + "Zones/edit-zone";

// Category
export const GET_CATEGORIES: string = SERVER_URL + "Categories/get-categories";
export const ADD_CATEGORY: string = SERVER_URL + "Categories/add-category";
export const GET_CATEGORY: string = SERVER_URL + "Categories/get-category-details";
export const EDIT_CATEGORY: string = SERVER_URL + "Categories/edit-category";

// Brand
export const GET_BRANDS: string = SERVER_URL + "Brands/get-brands";
export const GET_BRAND: string = SERVER_URL + "Brands/get-details";
export const ADD_BRAND: string = SERVER_URL + "Brands/add-brand";
export const EDIT_BRAND: string = SERVER_URL + "Brands/edit-brand";

// Sub Category
export const GET_SUB_CATEGORIES: string = SERVER_URL + "Categories/get-sub-categories";
export const GET_SUB_CATEGORY: string = SERVER_URL + "Categories/get-sub-category-details";
export const ADD_SUB_CATEGORY: string = SERVER_URL + "Categories/add-sub-category";
export const EDIT_SUB_CATEGORY: string = SERVER_URL + "Categories/edit-sub-category";

