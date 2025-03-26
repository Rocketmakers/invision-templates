import { SafeString } from "handlebars";

interface IHandlebarsHelper {
  name: string;
  helper: (input: string) => string | SafeString;
}

export const handlebarsHelpers: IHandlebarsHelper[] = [
  {
    name: "toLowerCase",
    helper: (input: string) => {
      return input.toLowerCase();
    },
  },
  {
    name: "longText",
    helper: (input: string) => {
      // Replace all links with anchor tags first
      let response = input.replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>',
      );

      // Replace all line breaks with <br /> tags
      response = response.replace(/\n/g, "<br />");

      return new SafeString(response);
    },
  },
  {
    name: "friendlyDate",
    helper: (input: string) => {
      // Parse the date string (dd/MM/yyyy format)
      const [day, month, year] = input.split("/").map(Number);
      const date = new Date(year, month - 1, day); // Month is 0-based in JS Date

      // Format the date using Intl.DateTimeFormat
      return new Intl.DateTimeFormat("en-GB", {
        weekday: "short", // Fri
        day: "2-digit", // 11
        month: "short", // Oct
        year: "numeric", // 2024
      }).format(date);
    },
  },
];
