export default interface loginInterface {
  status: number;
  message?: string;
  token?: object | string | null;
  role?: string | object | null;
}
