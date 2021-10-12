import {
  createTheme as _createTheme,
  unstable_createMuiStrictModeTheme,
} from "@mui/material";

/**
 * uses an unstable version in development because of the use of deprecated findDOMNode
 * @see https://github.com/mui-org/material-ui/issues/13394#issuecomment-815452717
 */
const createTheme =
  process.env.NODE_ENV === "production"
    ? _createTheme
    : unstable_createMuiStrictModeTheme;

export const theme = createTheme({
  components: {
    MuiToggleButton: {
      defaultProps: {
        size: "small",
      },
    },
  },
});
