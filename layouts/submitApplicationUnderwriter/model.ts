/**
 * Specify required object
 *
 * @examples require(".").sampleData
 */
export interface IModel {
  name?: string;
  returnUrl: string;
}

export const sampleData: IModel[] = [
  {
    name: "name",
    returnUrl: "https://www.rocketmakers.com",
  },
  {
    returnUrl: "https://www.rocketmakers.com",
  },
];
