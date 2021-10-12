import { Divider, Paper, ButtonGroup, Theme } from "@mui/material";
import { makeStyles, withStyles, createStyles } from "@mui/styles";
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
} from "@mui/icons-material";
import {
  BlockButton,
  ImageButton,
  LinkButton,
  MarkButton,
  UploadImage,
} from "./buttons";
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
  const { uploadImage } = props;
  const classes = useStyles();

  return (
    <div>
      <Paper elevation={0} className={classes.paper}>
        <StyledButtonGroup>
          <MarkButton format={"bold"}>
            <FormatBoldIcon />
          </MarkButton>
          <MarkButton format={"italic"}>
            <FormatItalicIcon />
          </MarkButton>
          <MarkButton format={"underline"}>
            <FormatUnderlinedIcon />
          </MarkButton>
          <MarkButton format={"code"}>
            <CodeIcon />
          </MarkButton>
        </StyledButtonGroup>
        <VerticalDivider />
        <StyledButtonGroup>
          <LinkButton>
            <LinkIcon />
          </LinkButton>
          <MarkButton format={"fill"}>
            <FormatColorFillIcon />
            {/* <ArrowDropDownIcon /> */}
          </MarkButton>
        </StyledButtonGroup>
        <VerticalDivider />
        <StyledButtonGroup>
          <BlockButton format={"heading-one"}>
            <LooksOneIcon />
          </BlockButton>
          <BlockButton format={"heading-two"}>
            <LooksTwoIcon />
          </BlockButton>
          <BlockButton format={"block-quote"}>
            <FormatQuoteIcon />
          </BlockButton>
          <BlockButton format={"numbered-list"}>
            <FormatListNumberedIcon />
          </BlockButton>
          <BlockButton format={"bulleted-list"}>
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
