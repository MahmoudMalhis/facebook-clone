import { Dialog, DialogActions, DialogContent } from "@mui/material";
import PhotoUploader from "./PhotoUploader ";
import { CustomDialogActionsButton } from "../Home/posts/PostStyle";

const PhotoDialog = ({
  open,
  onClose,
  onUploadAndClose,
  onChange,
  selectedImage,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <PhotoUploader onChange={onChange} selectedImage={selectedImage} />
      </DialogContent>
      <DialogActions>
        <CustomDialogActionsButton width="100%" onClick={onUploadAndClose}>
          Add photo
        </CustomDialogActionsButton>
      </DialogActions>
    </Dialog>
  );
};

export default PhotoDialog;
