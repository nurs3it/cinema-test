import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  Typography,
  Box,
} from "@mui/material";
import React, { ReactNode } from "react";

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  content: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  confirmIcon?: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  warnings?: string[];
}

export const ConfirmationDialog = ({
  open,
  title,
  content,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "error",
  confirmIcon,
  onConfirm,
  onCancel,
  warnings = [],
}: ConfirmationDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirmation-dialog-description">
          {content}
          {warnings.length > 0 && (
            <Box className="mt-4 space-y-2">
              {warnings.map((warning, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  className="text-red-600 flex items-center gap-2"
                >
                  {`- ${warning}`}
                </Typography>
              ))}
            </Box>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="inherit">
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          color={confirmColor}
          variant="contained"
          startIcon={confirmIcon}
          autoFocus
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
