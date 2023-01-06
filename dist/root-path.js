import * as path from "path";
import { fileURLToPath } from "url";
export const RootDir = path.dirname(fileURLToPath(import.meta.url));
export const StaticDir = RootDir + "/dist/assets";
