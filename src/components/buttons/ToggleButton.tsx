import React from "react";
import {
  ButtonBase,
  ButtonProps,
  capitalize as muiCapitalize,
} from "@material-ui/core";
import {
  makeStyles,
  fade,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import clsx from "clsx";

/**
 * @todo fix module typings
 * * Ignored any declaration below
 * * Weird type extensions are causing many props to appear as any,
 *   thus no type safety
 */

// fade is being deprecated in an upcoming release
// this alias will assist as a drop in replacement
const alpha = fade;

function capitalize<S extends string>(s: S): Capitalize<S> {
  return muiCapitalize(s) as Capitalize<S>;
}

type Size = "small" | "medium" | "large";

function getSizeClass<S extends Size>(size: S): `size${Capitalize<S>}` {
  return `size${capitalize(size)}` as `size${Capitalize<S>}`;
}

/**
 * ToggleButton styles taken from
 * @see https://github.com/mui-org/material-ui/blob/master/packages/material-ui-lab/src/ToggleButton/ToggleButton.js
 */
const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      root: {
        ...theme.typography.button,
        boxSizing: "border-box",
        borderRadius: theme.shape.borderRadius,
        padding: 11,
        border: `1px solid ${alpha(theme.palette.action.active, 0.12)}`,
        color: alpha(theme.palette.action.active, 0.38),
        "&$selected": {
          color: theme.palette.action.active,
          backgroundColor: alpha(theme.palette.action.active, 0.12),
          "&:hover": {
            backgroundColor: alpha(theme.palette.action.active, 0.15),
          },
          "& + &": {
            borderLeft: 0,
            marginLeft: 0,
          },
        },
        "&$disabled": {
          color: alpha(theme.palette.action.disabled, 0.12),
        },
        "&:hover": {
          textDecoration: "none",
          // Reset on mouse devices
          backgroundColor: alpha(theme.palette.text.primary, 0.05),
          "@media (hover: none)": {
            backgroundColor: "transparent",
          },
          "&$disabled": {
            backgroundColor: "transparent",
          },
        },
      },
      /* Pseudo-class applied to the root element if `disabled={true}`. */
      disabled: {},
      /* Pseudo-class applied to the root element if `selected={true}`. */
      selected: {},
      /* Styles applied to the `label` wrapper element. */
      label: {
        width: "100%", // Ensure the correct width for iOS Safari
        display: "inherit",
        alignItems: "inherit",
        justifyContent: "inherit",
      },
      /* Styles applied to the root element if `size="small"`. */
      sizeSmall: {
        padding: 7,
        fontSize: theme.typography.pxToRem(13),
      },
      /* placeholder for proper typing */
      sizeMedium: {},
      /* Styles applied to the root element if `size="large"`. */
      sizeLarge: {
        padding: 15,
        fontSize: theme.typography.pxToRem(15),
      },
    }),
  { name: "ToggleButton" }
);

export interface ToggleButtonProps extends ButtonProps {
  selected?: boolean;
}

export const ToggleButton = function ToggleButton(
  props: ToggleButtonProps
): JSX.Element {
  const {
    children,
    className,
    disabled = false,
    disableFocusRipple = false,
    selected,
    size = "medium",
    // <-- extract props -->
    // needed to pull these out so they dont get passed to dom
    disableElevation,
    fullWidth,
    // <-- end extract -->
    ...other
  } = props;

  const classes = useStyles();

  const sizeClassName = getSizeClass(size);

  return (
    <ButtonBase
      className={clsx(
        classes.root,
        {
          [classes.disabled]: disabled,
          [classes.selected]: selected,
          [classes[sizeClassName]]: size !== "medium",
        },
        className
      )}
      disabled={disabled}
      focusRipple={!disableFocusRipple}
      aria-pressed={Boolean(selected)}
      {...other}
    >
      <span className={classes.label}>{children}</span>
    </ButtonBase>
  );
};

export default ToggleButton;
