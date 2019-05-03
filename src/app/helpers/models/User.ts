import {BaseModel} from "./BaseModel";

export class User extends BaseModel {
  private _first_name: string;
  private _last_name: string;
  private _email: string;
  private _access_token: string;
  private _password: string;
  private _phone_number: number | string;
  private _country_code: number | string;
  private _remember_me: boolean | number | string;
  private _active: number | boolean | string;
  private _role?: Object;
  private _role_id: string | null;
  private _type: string;
  private _countryCodeFlagString: null | string;

  constructor() {
    super();
  }

  get business_reference_id(): string {
    return this._business_reference_id;
  }

  set business_reference_id(value: string) {
    this._business_reference_id = value;
  }
  get businessReferenceId(): string {
    return this._business_reference_id;
  }

  set businessReferenceId(value: string) {
    this._business_reference_id = value;
  }

  get id(): string {
    return this._business_reference_id;
  }

  set id(value: string) {
    this._business_reference_id = value;
  }

  get role_id(): string {
    return this._role_id;
  }

  set role_id(value: string) {
    this._role_id = value;
  }

  get roleId(): string {
    return this._role_id;
  }

  set roleId(value: string) {
    this._role_id = value;
  }

  get role(): any {
    return this._role;
  }

  set role(value: any) {
    this._role = value;
  }

  get active(): number | boolean | string {
    return this._active;
  }

  set active(value: number | boolean | string) {
    this._active = value;
  }

  get country_code(): number | string {
    return this._country_code;
  }

  set country_code(value: number | string) {
    this._country_code = value;
  }

  get countryCode(): number | string {
    return this._country_code;
  }

  set countryCode(value: number | string) {
    this._country_code = value;
  }

  get phone_number(): number | string {
    return this._phone_number;
  }

  set phone_number(value: number | string) {
    this._phone_number = value;
  }

  get phoneNumber(): number | string {
    return this._phone_number;
  }

  set phoneNumber(value: number | string) {
    this._phone_number = value;
  }

  get access_token(): string {
    return this._access_token;
  }

  set access_token(value: string) {
    this._access_token = value;
  }

  get full_name(): string {
    return `${this._first_name} ${this._last_name}`;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get firstName(): string {
    return this._first_name;
  }

  set firstName(value: string) {
    this._first_name = value;
  }

  get first_name(): string {
    return this._first_name;
  }

  set first_name(value: string) {
    this._first_name = value;
  }

  get last_name(): string {
    return this._last_name;
  }

  set lastName(value: string) {
    this._last_name = value;
  }

  get lastName(): string {
    return this._last_name;
  }

  set last_name(value: string) {
    this._last_name = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get remember_me(): (number | boolean | string) {
    return this._remember_me;
  }

  set remember_me(value: number | boolean | string) {
    this._remember_me = value;
  }

  get countryCodeFlagString() {
    return this._countryCodeFlagString;
  }

  set countryCodeFlagString(value) {
    this._countryCodeFlagString = value;
  }

  get created_at(): string {
    return this._created_at;
  }

  set created_at(value: string) {
    this._created_at = value;
  }

  get userType(): string {
    return this._type;
  }

  set userType(value: string) {
    this._type = value;
  }

  get user_type(): string {
    return this._type;
  }

  set user_type(value: string) {
    this._type = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get createdAt(): string {
    return this._created_at;
  }

  set createdAt(value: string) {
    this._created_at = value;
  }

  get updated_at(): string {
    return this._updated_at;
  }

  set updated_at(value: string) {
    this._updated_at = value;
  }

  get modifiedAt(): string {
    return this._updated_at;
  }

  set modifiedAt(value: string) {
    this._updated_at = value;
  }

  get deleted_at(): string {
    return this._deleted_at;
  }

  set deleted_at(value: string) {
    this._deleted_at = value;
  }
}
