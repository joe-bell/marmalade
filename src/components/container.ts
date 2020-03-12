import { Box, BoxProps } from "./box";
import styled from "styled-components";

export type ContainerProps = BoxProps;
export const Container = styled(Box)<ContainerProps>({});

Container.defaultProps = {
  paddingX: "medium",
  marginX: "auto",
  maxWidth: "medium",
};
