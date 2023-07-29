import { theme01 } from "./theme01";
import { theme02 } from "./theme02";
import { theme03 } from "./theme03";

type IThemes = {
  [propName in IThemeName]: any;
};

export type IThemeName = "theme01" | "theme02" | "theme03";

export const themes: IThemes = { theme01, theme02, theme03 };
