import { join } from "path";

const repositoryRootPath = join(__dirname, "../../../..");
export function resolve(...relative: string[]) {
  return join(...[repositoryRootPath, ...relative]);
}
