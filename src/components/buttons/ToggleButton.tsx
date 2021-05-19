import React, { forwardRef, MouseEvent } from "react";
import {
  ButtonBase,
  capitalize,
  ExtendButtonBase,
  ExtendButtonBaseTypeMap,
} from "@material-ui/core";
import { OverrideProps } from "@material-ui/core/OverridableComponent";
import {
  makeStyles,
  fade,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
import clsx from "clsx";

// fade is being deprecated in an upcoming release
// this alias will assist as a drop in replacement
const alpha = fade;

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
      /* Styles applied to the root element if `size="large"`. */
      sizeLarge: {
        padding: 15,
        fontSize: theme.typography.pxToRem(15),
      },
    }),
  { name: "ToggleButton" }
);

export type ToggleButtonClassKey =
  | "root"
  | "disabled"
  | "selected"
  | "label"
  | "sizeSmall"
  | "sizeLarge";

export type ToggleButtonTypeMap<
  P = unknown,
  D extends React.ElementType = "button"
> = ExtendButtonBaseTypeMap<{
  props: P & {
    disableFocusRipple?: boolean;
    selected?: boolean;
    size?: "small" | "medium" | "large";
    value?: unknown;
  };
  defaultComponent: D;
  classKey: ToggleButtonClassKey;
}>;

export type ToggleButtonProps<
  D extends React.ElementType = ToggleButtonTypeMap["defaultComponent"],
  P = Record<string, unknown>
> = OverrideProps<ToggleButtonTypeMap<P, D>, D>;

export const ToggleButton: ExtendButtonBase<ToggleButtonTypeMap> = forwardRef(
  function ToggleButton(props: ToggleButtonProps, ref): JSX.Element {
    const {
      classes: propsClasses = {},
      children,
      className,
      disabled = false,
      disableFocusRipple = false,
      onChange,
      onClick,
      selected,
      size = "medium",
      value,
      disableElevation,
      fullWidth,
      ...other
    } = props;

    const toggleClasses = useStyles();
    const classes: typeof toggleClasses &
      typeof propsClasses &
      Record<string, string | undefined> = {
      ...toggleClasses,
      ...propsClasses,
    };

    const sizeClass = classes[`size${capitalize(size)}`] as string;

    return (
      <ButtonBase
        className={clsx(
          classes.root,
          {
            [classes.disabled]: disabled,
            [classes.selected]: selected,
            [sizeClass]: size !== "medium",
          },
          className
        )}
        disabled={disabled}
        focusRipple={!disableFocusRipple}
        onChange={(event) => {
          if (onClick) {
            onClick(event as MouseEvent<HTMLButtonElement>);
            if (event.isDefaultPrevented()) {
              return;
            }
          }

          if (onChange) {
            onChange(event);
          }
        }}
        onClick={onClick}
        ref={ref}
        value={value}
        aria-pressed={selected}
        {...other}
      >
        <span className={classes.label}>{children}</span>
      </ButtonBase>
    );
  }
) as ExtendButtonBase<ToggleButtonTypeMap>;

export default ToggleButton;
