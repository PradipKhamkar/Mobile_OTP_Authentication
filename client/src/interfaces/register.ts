export interface IUserRegister {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phoneNumber: string;
  profilePic?: any;
  userLocationData?: any;
}
export interface ILoginUserInterface {
  phoneNumber: string;
  password: string;
}
