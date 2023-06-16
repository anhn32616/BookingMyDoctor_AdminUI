import { UploadOutlined } from "@ant-design/icons";
import { Button, Image, Upload } from "antd";
import { useEffect, useState } from "react";

// START REGION
// ANTD UPLOAD IMAGE COMPONENT


const ImageUpload = (props) => {
  const [myFile, setMyFile] = useState("");

  useEffect(() => {
    if(!props.image) setMyFile(null);
  }, [props.image])


  const handleChange = ({ file}) => {
    file.status = "done";
    setMyFile(file.originFileObj);
  };

  //START REGION
  //GET IMAGE LINK
  const getImageLink = async () => {
    const formData = new FormData();
    formData.append("file", myFile);
    formData.append("upload_preset", "ml_default");
    props.setImage(formData);
  };

  // END REGION

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Image src={!myFile ? props?.currentImage : URL.createObjectURL(myFile)} style={{ border: "2px solid rgb(0 0 0 / 16%)", borderRadius: "3px", width: "100%", maxHeight: "250px" }} />
      <>
        <Upload
          customRequest={getImageLink}
          myFile={myFile}
          onChange={handleChange}
          maxCount={1}
          showUploadList={false}
        >
          <Button style={{marginTop: 10}} icon={<UploadOutlined />}>Upload</Button>
        </Upload>

      </>

    </div>
  );
};
export default ImageUpload;
