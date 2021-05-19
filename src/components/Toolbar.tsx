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
import { BlockButton, ImageButton, LinkButton, MarkButton } from "./buttons";
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
  ArrowDropDown as ArrowDropDownIcon,
} from "@material-ui/icons";
import { UploadImage } from "./buttons/ImageButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: "flex",
      border: `1px solid ${theme.palette.divider}`,
      flexWrap: "wrap",
    },
    divider: {
      margin: theme.spacing(1, 0.5),
    },
    container: {
      display: (props: { hidden: boolean }) => (props.hidden ? "none" : ""),
    },
  })
);

const StyledButtonGroup = withStyles((theme) => ({
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
}))(ButtonGroup);

export interface ToolbarProps {
  hiddenButtons?: number[];
  buttonSize?: "small" | "medium" | "large";
  hiddenOnBlur?: boolean;
  hidden?: boolean;
  uploadImage?: UploadImage;
}

export function Toolbar(props: ToolbarProps): JSX.Element {
  const { buttonSize = "small", hidden = false, uploadImage } = props;
  const classes = useStyles({ hidden });

  const VerticalDivider = () => (
    <Divider flexItem orientation="vertical" className={classes.divider} />
  );

  return (
    <div className={classes.container}>
      <Paper elevation={0} className={classes.paper}>
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
            <ArrowDropDownIcon />
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
        <VerticalDivider />
        <StyledButtonGroup>
          <ImageButton uploadImage={uploadImage} />
        </StyledButtonGroup>
      </Paper>
    </div>
  );
}

export default Toolbar;
