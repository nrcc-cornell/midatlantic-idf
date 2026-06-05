import React, { useContext, useState } from "react";
import PropTypes from "prop-types";

import { Button, Typography, Modal } from "@material-ui/core";

import CloseBtn from "./close-btn/close-btn.component";

import "./recent-updates.styles.scss";

import { DataContext } from "../../contexts/DataContext";


// New feature list format:
// {
//   title: "",
//   description: "",
//   imgSrc: "",
//   imgAlt: ""
// }
const newFeatures = [{
  title: "Guidance Widget",
  description: "There is new step-by-step guidance available to help with selection of a change factor. To try it out, click the tab labelled 'Step-By-Step Interactive Guide' at the top of the page.",
  imgSrc: "",
  imgAlt: ""
},{
  title: "This feature!",
  description: "When new features are added, this feature will pop up the next time you visit to let you know. Once you close this box it will not appear again automatically, but you can open it by clicking the 'See Recent Changes' button at the bottom of the 'Resources and Documentation' tab.",
  imgSrc: "seeRecentUpdates.png",
  imgAlt: "Image of the Recent Updates widget"
}];

export default function RecentUpdates({ hideButton=false }) {
  const { version, versionHasChanged } = useContext(DataContext);
  const [open, setOpen] = useState(versionHasChanged());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    localStorage.setItem("show-midatlantic-idf-updates", version);
    setOpen(false);
  };

  return (
    <div className="recent-updates-container">
      {hideButton ? ("") : (
        <div className="recent-updates-button-container">
          <Button
            onClick={handleOpen}
            className="recent-updates-button"
            variant="contained"
            color="primary"
          >See Recent Changes</Button>
        </div>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="custom-modal-title"
        aria-describedby="custom-modal-description"
      >
        <div className="recent-updates-content">
          <div className="recent-updates-title-container">
            <Typography variant="h5" style={{ lineHeight: 1.1 }}>What&apos;s new?</Typography>
            <Typography variant="subtitle2" style={{ lineHeight: 1.1, fontStyle: "italic", color: "rgb(150,150,150)" }}>Version {version}</Typography>
          </div>
  
          <CloseBtn handleClose={handleClose} />
  
          <div className="recent-updates-feature-list-container">
            <ul className="recent-updates-feature-list">
              {newFeatures.map((feat, i) => (
                <li key={i} className="recent-updates-feature-list-item">
                  <div className="recent-updates-feature-list-item-title">{feat.title}</div>
                  <div className="recent-updates-feature-list-item-description">{feat.description}</div>
                  {feat.imgSrc && <div className="recent-updates-feature-list-item-picture"><img src={`${process.env.PUBLIC_URL}/updates-images/${feat.imgSrc}`} alt={feat.imgAlt} /></div>}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="list-inlay" />
        </div>
      </Modal>
      
    </div>
  );
}

RecentUpdates.propTypes = {
  hideButton: PropTypes.Boolean
};