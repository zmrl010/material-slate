import React from 'react';
import {
  makeStyles,
  Divider,
  Paper,
  ButtonGroup,
  withStyles,
  createStyles,
  Theme,
  Button,
} from '@material-ui/core';
import {BlockButton, LinkButton, MarkButton} from './Buttons';
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
  FormatAlignLeft as FormatAlignLeftIcon,
  FormatAlignCenter as FormatAlignCenterIcon,
  FormatAlignRight as FormatAlignRightIcon,
  FormatAlignJustify as FormatAlignJustifyIcon,
  AddPhotoAlternate as AddPhotoAlternateIcon,
  FormatColorFill as FormatColorFillIcon,
  Link as LinkIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from '@material-ui/icons';
// import {ToggleButtonGroup} from '@material-ui/lab';
// import {useMaterialSlate} from '../../hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      border: `1px solid ${theme.palette.divider}`,
      flexWrap: 'wrap',
    },
    divider: {
      margin: theme.spacing(1, 0.5),
    },
  })
);

const StyledButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ButtonGroup);

export interface ToolbarProps {
  hiddenButtons?: number[];
}

export function Toolbar(props: ToolbarProps): JSX.Element {
  const classes = useStyles(props);

  return (
    <div>
      <Paper elevation={0} className={classes.paper}>
        <StyledButtonGroup>
          <BlockButton format="left">
            <FormatAlignLeftIcon />
          </BlockButton>
          <BlockButton format={'center'}>
            <FormatAlignCenterIcon />
          </BlockButton>
          <BlockButton format={'right'}>
            <FormatAlignRightIcon />
          </BlockButton>
          <BlockButton format={'justify'}>
            <FormatAlignJustifyIcon />
          </BlockButton>
        </StyledButtonGroup>
        <Divider flexItem orientation="vertical" className={classes.divider} />
        <StyledButtonGroup>
          <MarkButton format={'bold'}>
            <FormatBoldIcon />
          </MarkButton>
          <MarkButton format={'italic'}>
            <FormatItalicIcon />
          </MarkButton>
          <MarkButton format={'underline'}>
            <FormatUnderlinedIcon />
          </MarkButton>
          <MarkButton format={'code'}>
            <CodeIcon />
          </MarkButton>
        </StyledButtonGroup>
        <Divider flexItem orientation="vertical" className={classes.divider} />
        <StyledButtonGroup>
          <LinkButton>
            <LinkIcon />
          </LinkButton>
          <MarkButton format={'fill'}>
            <FormatColorFillIcon />
            <ArrowDropDownIcon />
          </MarkButton>
        </StyledButtonGroup>
        <Divider flexItem orientation="vertical" className={classes.divider} />
        <StyledButtonGroup>
          <BlockButton format={'heading-one'}>
            <LooksOneIcon />
          </BlockButton>
          <BlockButton format={'heading-two'}>
            <LooksTwoIcon />
          </BlockButton>
          <BlockButton format={'block-quote'}>
            <FormatQuoteIcon />
          </BlockButton>
          <BlockButton format={'numbered-list'}>
            <FormatListNumberedIcon />
          </BlockButton>
          <BlockButton format={'bulleted-list'}>
            <FormatListBulletedIcon />
          </BlockButton>
        </StyledButtonGroup>
        <Divider flexItem orientation="vertical" className={classes.divider} />
        <Button onClick={() => alert('Upload photo dialog')}>
          <AddPhotoAlternateIcon />
        </Button>
      </Paper>
    </div>
  );
}

export default Toolbar;
