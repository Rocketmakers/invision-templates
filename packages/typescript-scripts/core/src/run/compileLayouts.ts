import { LoggerLevel } from "@rocketmakers/log";
import { Args } from "@rocketmakers/shell-commands/lib/args";
import { FileSystem } from "@rocketmakers/shell-commands/lib/fs";
import {
  createLogger,
  setDefaultLoggerLevel,
} from "@rocketmakers/shell-commands/lib/logger";
import { Ajv } from "ajv";
import * as handlebars from "handlebars";
import * as path from "path";

import { handlebarsHelpers } from "../handlebarsHelpers";
import { resolve } from "../repositoryPaths";

const logger = createLogger("generate-schemas");

interface IPartial {
  path: string;
}

interface ILayout {
  path: string;
  templates: string[];
}

interface IServiceJson {
  partials: Record<string, IPartial>;
  layouts: Record<string, ILayout>;
}

async function run() {
  const args = await Args.match({
    log: Args.single({
      description: "The log level",
      shortName: "l",
      defaultValue: "info",
      validValues: ["trace", "debug", "info", "warn", "error", "fatal"],
    }),
    serviceName: Args.single({
      description: "Name of 3rd party service root json file is named after",
      shortName: "s",
      mandatory: true,
    }),
  });

  if (!args) {
    if (process.argv.includes("--help")) {
      return;
    }

    throw new Error("There was a problem parsing the arguments");
  }

  const { log, serviceName } = args;

  setDefaultLoggerLevel(log as LoggerLevel);

  const fileName = `${serviceName}.json`;
  const serviceJson = JSON.parse(
    FileSystem.readFile(resolve(fileName)),
  ) as IServiceJson;

  const serviceJsonSchema = JSON.parse(
    FileSystem.readFile(
      "node_modules/@rocketmakers/orbit-template-http-repository/lib/serviceJsonSchema.json",
    ),
  );

  const ajv = new Ajv({ allErrors: true, verbose: true });
  const validServiceJson = ajv.validate(serviceJsonSchema, serviceJson);

  if (!validServiceJson) {
    throw new Error(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- we don't have any proper typings
      `The file ${fileName} failed to meet the predefined schema with the following errors: ${ajv.errors ? ajv.errors.map((x: any) => x.message).toString() : ""}`,
    );
  }

  const { partials, layouts } = serviceJson;

  logger.info("Registering partials --> ");

  const partialKeys = Object.keys(partials);
  for (const partial of partialKeys) {
    const content = FileSystem.readFile(resolve(partials[partial].path));
    handlebars.registerPartial(partial, content);
    logger.info("Registered partial: ", partial);
  }

  logger.info("Registering helpers --> ");

  for (const helper of handlebarsHelpers) {
    handlebars.registerHelper(helper.name, helper.helper);
    logger.info("Registered helper: ", helper.name);
  }

  logger.info("Compiling layouts --> ");

  const layoutKeys = Object.keys(layouts);
  for (const layout of layoutKeys) {
    layouts[layout].templates.forEach(async (template: string) => {
      const content = FileSystem.readFile(
        resolve(`${layouts[layout].path}/${template}.handlebars`),
      );

      const data = JSON.parse(
        FileSystem.readFile(
          resolve(`${layouts[layout].path}/payloadSchema.json`),
        ),
      ).examples[0];
      const compile = handlebars.compile(content, { strict: true });

      const res = compile(data);
      const dir = resolve("compiledLayouts");
      if (!FileSystem.exists(dir)) {
        await FileSystem.makeDirectory(dir);
      }
      await FileSystem.writeFileAsync(
        path.join(dir, `${layout}.${template}`),
        res,
      );
      logger.trace("Compiled template: ", res);
    });
    logger.info("Compiled layout: ", layout);
  }

  logger.info("Templates successfully validated for service: ", serviceName);
}

run().catch((err) => {
  logger.fatal(err);
  process.exit(-1);
});
