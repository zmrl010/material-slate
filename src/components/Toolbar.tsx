import React from "react";
import {
  makeStyles,
  Divider,
  Paper,
  ButtonGroup,
  withStyles,
  createStyles,
  Theme,
} from "@material-ui/core";
import {
  FormatBold as FormatBoldIcon,
  FormatItalic as FormatItalicIcon,
  FormatUnderlined as FormatUnderlinedIcon,
  Code as CodeIcon,
  LooksOne as LooksOneIcon,
  LooksTwo as LooksTwoIcon,
  FormatQuote as FormatQuoteIcon,
  FormatListNumbered as FormatListNumberedIcon,
  FormatListBulleted as FormatListBulletedIcon,
  // FormatAlignLeft as FormatAlignLeftIcon,
  // FormatAlignCenter as FormatAlignCenterIcon,
  // FormatAlignRight as FormatAlignRightIcon,
  // FormatAlignJustify as FormatAlignJustifyIcon,
  FormatColorFill as FormatColorFillIcon,
  Link as LinkIcon,
  // ArrowDropDown as ArrowDropDownIcon,
} from "@material-ui/icons";
import clsx from "clsx";
import { BlockButton, ImageButton, LinkButton, MarkButton } from "./buttons";
import { UploadImage } from "./buttons/ImageButton";
import { theme } from "../theme";

const useStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      paper: {
        display: "flex",
        border: `1px solid ${theme.palette.divider}`,
        flexWrap: "wrap",
      },
      divider: {
        margin: theme.spacing(1, 0.5),
      },
    }),
  { name: "Toolbar", defaultTheme: theme }
);

const StyledButtonGroup = withStyles(
  (theme) => ({
    grouped: {
      margin: theme.spacing(0.5),
      border: "none",
      "&:not(:first-child)": {
        borderRadius: theme.shape.borderRadius,
      },
      "&:first-child": {
        borderRadius: theme.shape.borderRadius,
      },
    },
  }),
  { name: "StyledButtonGroup", defaultTheme: theme }
)(ButtonGroup);

export interface ToolbarProps {
  hiddenButtons?: number[];
  buttonSize?: "small" | "medium" | "large";
  uploadImage?: UploadImage;
  className?: string;
}

function VerticalDivider() {
  const classes = useStyles();

  return (
    <Divider flexItem orientation="vertical" className={classes.divider} />
  );
}

export function Toolbar(props: ToolbarProps): JSX.Element {
  const { buttonSize = "small", uploadImage } = props;
  const classes = useStyles();

  return (
    <div>
      <Paper elevation={0} className={clsx(classes.paper)}>
        <StyledButtonGroup>
          <MarkButton format={"bold"} size={buttonSize}>
            <FormatBoldIcon />
          </MarkButton>
          <MarkButton format={"italic"} size={buttonSize}>
            <FormatItalicIcon />
          </MarkButton>
          <MarkButton format={"underline"} size={buttonSize}>
            <FormatUnderlinedIcon />
          </MarkButton>
          <MarkButton format={"code"} size={buttonSize}>
            <CodeIcon />
          </MarkButton>
        </StyledButtonGroup>
        <VerticalDivider />
        <StyledButtonGroup>
          <LinkButton size={buttonSize}>
            <LinkIcon />
          </LinkButton>
          <MarkButton format={"fill"} size={buttonSize}>
            <FormatColorFillIcon />
            {/* <ArrowDropDownIcon /> */}
          </MarkButton>
        </StyledButtonGroup>
        <VerticalDivider />
        <StyledButtonGroup>
          <BlockButton format={"heading-one"} size={buttonSize}>
            <LooksOneIcon />
          </BlockButton>
          <BlockButton format={"heading-two"} size={buttonSize}>
            <LooksTwoIcon />
          </BlockButton>
          <BlockButton format={"block-quote"} size={buttonSize}>
            <FormatQuoteIcon />
          </BlockButton>
          <BlockButton format={"numbered-list"} size={buttonSize}>
            <FormatListNumberedIcon />
          </BlockButton>
          <BlockButton format={"bulleted-list"} size={buttonSize}>
            <FormatListBulletedIcon />
          </BlockButton>
        </StyledButtonGroup>
        {uploadImage && (
          <>
            <VerticalDivider />
            <StyledButtonGroup>
              <ImageButton uploadImage={uploadImage} />
            </StyledButtonGroup>
          </>
        )}
      </Paper>
    </div>
  );
}

export default Toolbar;
