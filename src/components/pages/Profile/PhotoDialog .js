import { Dialog, DialogActions, DialogContent } from "@mui/material";
import PhotoUploader from "./PhotoUploader ";
import { CustomDialogActionsButton } from "../Home/posts/PostStyle";

const PhotoDialog = ({
  open,
  onClose,
  onUploadAndClose,
  onChange,
  selectedImage,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogContent>
      <PhotoUploader onChange={onChange} selectedImage={selectedImage} />
    </DialogContent>
    <DialogActions justifyContent="center">
      <CustomDialogActionsButton width="100%" onClick={onUploadAndClose}>
        Add photo
      </CustomDialogActionsButton>
    </DialogActions>
  </Dialog>
);

export default PhotoDialog;