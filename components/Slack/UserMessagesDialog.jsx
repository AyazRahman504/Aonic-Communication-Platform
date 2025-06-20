import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Paper, Stack } from "@mui/material";
import { format, fromUnixTime } from "date-fns";

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ mr: 5, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function UserMessagesDialog({ username, userId, messages }) {
  const [open, setOpen] = React.useState(false);
  const [userMessages, setUserMessages] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    const m = [];
    messages.forEach((weekMessages) => {
      m.push(...weekMessages.filter((message) => message.user === userId));
    });
    setUserMessages(m);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Button variant="text" onClick={handleClickOpen}>
        {username}
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="sm"
        fullWidth={true}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Typography color={"GrayText"}>Messages by</Typography>
          <Typography variant="h5">{username}</Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            {userMessages.map((m) => (
              <Paper variant="outlined" sx={{ p: 1 }}>
                <Typography>{m.text}</Typography>
                <Typography
                  align="right"
                  variant="caption"
                  display="block"
                  color={"InactiveCaptionText"}
                >
                  {format(fromUnixTime(m.ts), "d MMM yyyy h:m a")}
                </Typography>
              </Paper>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
