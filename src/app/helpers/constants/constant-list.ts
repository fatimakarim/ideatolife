"use strict";
import { AppConfig } from "../../app.config";

const apiConfig = new AppConfig();

export const URL_SERVER: string = apiConfig.config.apiUrl.backendUrl;

// GENERIC Constants
export const DEFAULT_SNACKBAR_DURATION: number = 3000;
export const DEFAULT_REDIRECTION_WAIT_TIME: number = 3000;
export const DEFAULT_REQUEST_LONG_TIME_INTERVAL: number = 3000;
export const DEFAULT_DEBOUNCE_TIME: number = 200;
export const DEFAULT_SCROLL_DELAY_TIME: number = 500;
export const DEFAULT_SCROLL_OFFSET: number = 1000;
export const DEFAULT_LOGO_SIZE_BYTES: number = 2097152;
export const DEFAULT_SNACKBAR_LABEL: string = "OK";
export const DEFAULT_REMEMBER_ME_MONTHS: number = 2;
export const DEFAULT_SESSION_HOURS: number = 1;
export const DEFAULT_SORT_KEY: string = "createdAt";
export const DEFAULT_SORT_ORDER: string = "DESC";
export const DEFAULT_REQUEST_TOO_LONG_TEXT: string = "Your request is in progress. Don't go away!";
export const DEFAULT_INVALID_TOKEN_SERVER_RESPONSE: string = "Token not provided";
export const DEFAULT_INVALID_TOKEN_SIGNATURE_SERVER_RESPONSE: string = "Token Signature could not be verified.";
export const DEFAULT_COOKIE_ENCRYPTION_KEY: string = "pxMqZPuwWVyFFfCKDxXB09kgbJNdSkE0";
export const SEARCH = "search";
export const POP_UP_LARGE_WIDTH: string = "60%";
export const DEFAULT_UPLOAD_ICON: string = "/assets/images/logos/ic-upload.png";
export const DEFAULT_FLOOR_MAP_SLOT_COLOR: string = "#E72E74";

// Status Constant
export const STATUS = "status";
export const STATUS_BOTH = "";
export const STATUS_AVAILABLE = "1";
export const STATUS_OFFLINE = "1";

// LOGIN page constants
export const PASSWORD_MIN_LENGTH: number = 6;
export const NAME_MAX_LENGTH: number = 50;
export const DESCRIPTION_MAX_LENGTH: number = 250;
export const MOBILE_NUMBER_MIN_LENGTH: number = 6;
export const MAX_AUTO_SIZE_MIN_ROWS: number = 1;
export const MAX_AUTO_SIZE_MAX_ROWS: number = 5;
export const ACCOUNT_STATUS_ACTIVE: string = "active";
export const ACCOUNT_STATUS_PENDING: string = "pending";
export const POP_UP_DEFAULT_WIDTH: string = "500px";
export const NUMBER_RECORDS_PER_PAGE: number = 15;
export const DEFAULT_PAGE_INDEX: number = 0;
export const SUCCESS_RESPONSE: number = 200;
export const SUCCESS_STATUS: string = "success";
export const FAILURE_RESPONSE: string = "0";
export const FAILURE_STATUS: string = "error";
export const VALID_FORM_STATE: string = "VALID";
export const DISABLED_FORM_STATE: string = "DISABLED";

// ACCOUNT Constants
export const INACTIVE_ACCOUNT: number = 0;
export const ALL_ACCOUNT_STATUS: number = 0;
export const ACTIVE_ACCOUNT_STATUS: number = 1;
export const PENDING_ACCOUNT_STATUS: number = 4;
export const REJECTION_ACCOUNT_STATUS: number = 3;
export const INACTIVE_ACCOUNT_STATUS: number = 2;
export const RESET_PASSWORD_CONFIRMATION_MESSAGE: string = "An email has been sent to the user";

// User Constant
export const NUMBER_USER_STATUS_ACTIVE: number = 1;
export const STRING_USER_STATUS_ACTIVE: string = "Active";
export const NUMBER_USER_STATUS_INACTIVE: number = 2;
export const STRING_USER_STATUS_INACTIVE: string = "Inactive";
export const NUMBER_USER_STATUS_REJECTED: number = 3;
export const STRING_USER_STATUS_REJECTED: string = "Rejected";
export const STRING_USER_STATUS_PENDING: string = "Pending";

// Role Constants
export const ADMIN_ROLE: string = "administrator";
export const SUPPORT_TEAM_ROLE: string = "support team";
export const BRAND_MANAGER_ROLE: string = "brand manager";
export const LANDLORD_ROLE: string = "land lord";

// Event Constants
export const ALL_EVENTS_TYPE: number = 0;
export const RECCURING_EVENT_TYPE: number = 1;
export const ONE_TIME_EVENT_TYPE: number = 2;
export const DIFFERENCE_BETWEEN_PUBLISH_END_DATE: number = 7;

// YEARS CONSTANT
export const DEFAULT_YEARS: any[] = [
  { value: "2018", viewValue: "2018" },
  { value: "2019", viewValue: "2019" },
  { value: "2020", viewValue: "2020" },
  { value: "2021", viewValue: "2021" },
  { value: "2022", viewValue: "2022" },
  { value: "2023", viewValue: "2023" },
  { value: "2024", viewValue: "2024" },
  { value: "2025", viewValue: "2025" },
  { value: "2026", viewValue: "2026" },
  { value: "2027", viewValue: "2027" },
  { value: "2028", viewValue: "2028" },
  { value: "2029", viewValue: "2029" },
  { value: "2030", viewValue: "2030" },
];
