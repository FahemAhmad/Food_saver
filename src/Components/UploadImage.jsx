import React, { useEffect, useState } from "react";

function UploadImage({ setFieldValue, values, name }) {
  const [selectedImage, setSelectedImage] = useState();

  const imageChange = (e) => {
    setFieldValue(name, e.currentTarget.files[0]);
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (values.ImgSrc) setSelectedImage(values.ImgSrc);
  }, [values.ImgSrc]);

  return (
    <div className="form-group">
      <label htmlFor="file" style={{ margin: "0 20%" }}>
        File upload
      </label>
      <input
        id="file"
        name={name}
        type="file"
        style={{ margin: "0 20%" }}
        onChange={(event) => {
          imageChange(event);
        }}
        className="form-control"
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
