import { useState } from "react";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/Sidebar";
import "./Predective.css";

const Predective = () => {
  const [files, setFiles] = useState([]);
  const [folder, setFolder] = useState("");

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files).map((file) => file.name));
  };

  const handleFolderChange = (event) => {
    setFolder(event.target.files[0]?.webkitRelativePath.split("/")[0] || "");
  };
  return (
    <>
      <Header />
      <Sidebar />
      <main className="data-container">
        <h4>
          <i className="fa-solid fa-upload"></i> Upload JSON File
        </h4>
        <div className="upload-form">
          <form method="post" encType="multipart/form-data">
            <div className="arrow">
              <i className="fa-solid fa-arrow-up"></i>
            </div>
            <h2>Drag and drop to upload, or :</h2>
            <div className="file-upload">
              <input
                type="file"
                id="upload-file"
                name="upload-file"
                className="upload-file"
                accept=".json"
                multiple
                onChange={handleFileChange}
              />
              <label htmlFor="upload-file" className="custom-button">
                <span role="img" aria-label="files">
                  <i className="fa-regular fa-file"></i>{" "}
                </span>{" "}
                Select Files
              </label>
              <input
                type="file"
                id="upload-folder"
                name="upload-folder"
                accept=".json"
                className="upload-file"
                webkitdirectory=""
                onChange={handleFolderChange}
              />
              <label htmlFor="upload-folder" className="custom-button">
                <span role="img" aria-label="files">
                  <i className="fa-regular fa-folder"></i>{" "}
                </span>{" "}
                Select Folder
              </label>
              <div className="file-list">
                {files.length > 0 && (
                  <div>Selected Files: {files.join(", ")}</div>
                )}
                {folder && <div>Selected Folder: {folder}</div>}
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Predective;
