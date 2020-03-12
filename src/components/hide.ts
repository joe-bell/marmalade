import { Box, BoxProps } from "./box";
import styled from "styled-components";
import { hideVisually } from "polished";

export type HideProps = {
  hideVisually?: boolean;
  hideCompletely?: boolean;
} & BoxProps;

export const Hide = styled(Box.withComponent("span"))<HideProps>(props => [
  props.hideVisually && hideVisually(),
  props.hideCompletely && { display: "none" },
]);
