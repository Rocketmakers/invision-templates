/**
 * Specify required object
 *
 * @examples require(".").sampleData
 */
export interface IModel {
  name: string;
  removeeName: string;
  applicationName: string;
}

export const sampleData: IModel[] = [
  {
    name: "name",
    removeeName: "removeeName",
    applicationName: "Rocketmakers",
  },
];
