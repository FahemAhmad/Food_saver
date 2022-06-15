import React, { useEffect, useState } from "react";
import "./Upload.css";

function UploadImage({ setFieldValue, values, name }) {
  const [selectedImage, setSelectedImage] = useState();

  const imageChange = (e) => {
    setFieldValue(name, e.currentTarget.files[0]);
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (values.ImageSrc) setSelectedImage(values.ImageSrc);
  }, [values.ImageSrc]);

  return (
    <div className="form-group">
      <input
        id="file"
        name={name}
        type="file"
        style={{ padding: "10px 0", height: "100%" }}
        onChange={(event) => {
          imageChange(event);
        }}
        className="stylo form-control"
      />
      {selectedImage && (
        <div style={styles.preview}>
          <img
            src={URL.createObjectURL(selectedImage)}
            style={styles.image}
            alt="Thumb"
          />
        </div>
      )}
    </div>
  );
}

// Just some styles
const styles = {
  preview: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    margin: "2% 20%",
  },
  image: { maxWidth: 150, maxHeight: 120 },
  delete: {
    cursor: "pointer",
    padding: 15,
    background: "red",
    color: "white",
    border: "none",
  },
};
export default UploadImage;
