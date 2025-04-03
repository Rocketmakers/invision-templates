/**
 * Specify required object
 *
 * @examples require(".").sampleData
 */
export interface IModel {
  name: string;
  inviteeName: string;
  applicationName: string;
  returnUrl: string;
}

export const sampleData: IModel[] = [
  {
    name: "name",
    inviteeName: "inviteeName",
    applicationName: "Rocketmakers",
    returnUrl: "https://www.rocketmakers.com",
  },
];
