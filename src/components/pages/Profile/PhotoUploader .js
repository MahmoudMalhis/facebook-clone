import { Input, Box } from "@mui/material";
import FilterIcon from "@mui/icons-material/Filter";
import { CustomIconButtonImgUpload } from "../Home/posts/PostStyle";

const PhotoUploader = ({ onChange, selectedImage }) => (
  <Box width="300px">
    <Input
      type="file"
      accept="image/*"
      onChange={onChange}
      style={{ display: "none" }}
      id="upload-button"
    />
    <label htmlFor="upload-button">
      <CustomIconButtonImgUpload component="span">
        {selectedImage ? (
          <img
            style={{ width: "auto", height: "auto", overflow: "scroll" }}
            src={selectedImage}
            alt="Uploaded"
          />
        ) : (
          <FilterIcon />
        )}
      </CustomIconButtonImgUpload>
    </label>
  </Box>
);

export default PhotoUploader;
