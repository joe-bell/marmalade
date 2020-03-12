// Configure Styled Components CSS prop with TypeScript
import * as types from "styled-components/cssprop";

// Configure Styled Components to reference our theme schema.
import "styled-components";
import { Theme } from "../../src/types/marmalade";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
