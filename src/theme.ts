import type {} from "@material-ui/lab/themeAugmentation";
import {
  createTheme as createMuiTheme,
  unstable_createMuiStrictModeTheme,
} from "@material-ui/core";

/**
 * uses an unstable version in development because of the use of deprecated findDOMNode
 * @see https://github.com/mui-org/material-ui/issues/13394#issuecomment-815452717
 */
const createTheme =
  process.env.NODE_ENV === "production"
    ? createMuiTheme
    : unstable_createMuiStrictModeTheme;

/**
 * Base theme to be used if not wrapped in theme provider
 */
export const theme = createTheme({
  props: {
    MuiToggleButton: {
      size: "small",
    },
  },
});
