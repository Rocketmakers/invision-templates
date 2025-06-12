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
    name: "David Kendall",
    returnUrl: "https://www.rocketmakers.com",
  },
  {
    returnUrl: "https://www.rocketmakers.com",
  },
];
