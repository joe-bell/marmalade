import polishedRem from "polished/lib/helpers/rem";
import { foundationLight } from "../../themes/foundation";

export const rem = (
  value: string | number,
  baseFontSize: string | number = 16
) => {
  return polishedRem(value, baseFontSize || foundationLight.base.fontSize);
};
