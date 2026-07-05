export interface ITransformTableTitle {
  type : TTypeTransofrm
  function : (value? : any) => any
}

export type TTypeTransofrm = 'icon' | 'make' | 'active';
