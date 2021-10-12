import type {} from "@mui/lab/themeAugmentation";
import {
  createTheme as _createTheme,
  unstable_createMuiStrictModeTheme,
  adaptV4Theme,
} from "@mui/material";

/**
 * uses an unstable version in development because of the use of deprecated findDOMNode
 * @see https://github.com/mui-org/material-ui/issues/13394#issuecomment-815452717
 */
const createTheme =
  process.env.NODE_ENV === "production"
    ? _createTheme
    : unstable_createMuiStrictModeTheme;

/**
 * Base theme to be used if not wrapped in theme provider
 */
export const theme = createTheme(adaptV4Theme({
  props: {
    MuiToggleButton: {
      size: "small",
    },
  },
}));
