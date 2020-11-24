export interface IContact {
  _id: string;
  name: string;
  email: string;
  cellphone: string;
}

export interface IResponseHttp {
  statusCode: string;
  message: string;
  data?: any;
}
