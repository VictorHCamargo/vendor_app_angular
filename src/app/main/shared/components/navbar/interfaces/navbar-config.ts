export interface INavbarConfig {
  name: string;
  way: string;
  children: INavbarConfig[];
  external?: boolean;
}
