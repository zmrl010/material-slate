import { Divider, Paper, ButtonGroup } from "@mui/material";
import { styled } from "@mui/material/styles";
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

const PREFIX = "Toolbar";

const classes = {
  paper: `${PREFIX}-paper`,
  divider: `${PREFIX}-divider`,
};

const Root = styled("div")(({ theme }) => ({
  [`& .${classes.paper}`]: {
    display: "flex",
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: "wrap",
  },

  [`& .${classes.divider}`]: {
    margin: theme.spacing(1, 0.5),
  },
}));

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  "& .MuiButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: "none",
    "&:not(:first-child)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-child": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

export interface ToolbarProps {
  buttonSize?: "small" | "medium" | "large";
  uploadImage?: UploadImage;
  className?: string;
}

function VerticalDivider() {
  return (
    <Divider flexItem orientation="vertical" className={classes.divider} />
  );
}

export function Toolbar(props: ToolbarProps): JSX.Element {
  const { uploadImage } = props;

  return (
    <Root>
      <Paper elevation={0} className={classes.paper}>
        <StyledButtonGroup>
          <MarkButton value={"bold"}>
            <FormatBoldIcon />
          </MarkButton>
          <MarkButton value={"italic"}>
            <FormatItalicIcon />
          </MarkButton>
          <MarkButton value={"underline"}>
            <FormatUnderlinedIcon />
          </MarkButton>
          <MarkButton value={"code"}>
            <CodeIcon />
          </MarkButton>
        </StyledButtonGroup>
        <VerticalDivider />
        <StyledButtonGroup>
          <LinkButton>
            <LinkIcon />
          </LinkButton>
          <MarkButton value={"fill"}>
            <FormatColorFillIcon />
            {/* <ArrowDropDownIcon /> */}
          </MarkButton>
        </StyledButtonGroup>
        <VerticalDivider />
        <StyledButtonGroup>
          <BlockButton value={"heading-one"}>
            <LooksOneIcon />
          </BlockButton>
          <BlockButton value={"heading-two"}>
            <LooksTwoIcon />
          </BlockButton>
          <BlockButton value={"block-quote"}>
            <FormatQuoteIcon />
          </BlockButton>
          <BlockButton value={"numbered-list"}>
            <FormatListNumberedIcon />
          </BlockButton>
          <BlockButton value={"bulleted-list"}>
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
    </Root>
  );
}

export default Toolbar;
