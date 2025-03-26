/**
 * Specify required object
 *
 * @examples require(".").sampleData
 */
export interface IModel {
  firstName?: string;
  returnUrl: string;
}

export const sampleData: IModel[] = [
  {
    firstName: "firstName",
    returnUrl: "https://www.rocketmakers.com",
  },
  {
    returnUrl: "https://www.rocketmakers.com",
  },
];
