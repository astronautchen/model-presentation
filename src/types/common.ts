export interface IResponseType<P = {}> {
  code?: number;
  status: number;
  msg: string;
  data: P;
}

export interface ElMESSAGE {
  confirmDel: Function;
  sucAdd: Function;
  errAdd: Function;
  sucEdit: Function;
  errEdit: Function;
  sucDel: Function;
  errDel: Function;
  sucOper: Function;
  errOper: Function;
  sucSave: Function;
  errSave: Function;
}
