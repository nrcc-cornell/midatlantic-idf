import React, { useState } from "react";
import { Modal, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import ReactGA from "react-ga4";

import "../styles/CustomModal.scss";

function getModalStyle() {
  return {
    top: "50vh",
    left: "50vw",
    transform: "translate(-50%, -50%)",
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "fixed",
    width: "575px",
    height: "fit-content",
    maxHeight: "calc(100vh - 40px)",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "none",
    borderRadius: "20px",
    boxShadow: theme.shadows[5],
    outline: "none",
    padding: "12px 32px"
  },
}));

export default function CustomModal() {
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(<div></div>);
  
  const classes = useStyles();
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (contentType) => {
    ReactGA.event({
      action: "clicked",
      category: "modal",
      label: contentType
    });
    setOpen(true);
    contentType === "tr" ? setContent(trBody) : (contentType === "utt" ? setContent(uttBody) : setContent(utdBody));
  };

  const handleDownload = () => {
    var a = document.createElement("a");
    a.href = process.env.PUBLIC_URL + "/fullData/IDF_Curve_Data.zip";
    a.setAttribute("download", "IDF_Curve_Data.zip");
    a.click();
  };

  const trBody = (
    <div style={modalStyle} className={classes.paper}>
      <div className="close-modal"><CloseIcon onClick={handleClose} /></div>
      
      <h2 id="custom-modal-title">Technical Resources</h2>
      <div id="custom-modal-description">
        <div className="list-title">Technical Report on Data and Methods:</div>
        <ul>
          <li>The following report describes the motivation, data, methods and results from the study that produced this tool. The aim of this report is to make the project’s data and methodology clear and transparent to those using the interactive online IDF curve tool or those interested in replicating these methods in other contexts.</li>
          <li>Find the report <a href="https://www.rand.org/pubs/tools/TLA1365-1.html">here</a>.</li>
        </ul>
        <div className="list-title">Instructional Webinar:</div>
        <ul>
          <li>The following webinar provides an overview of the study and a demo of this tool:</li>
        </ul>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/IjKMFIs7JX0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <div className="list-title">Journal Publications:</div>
        <ul>
          <li><i>Citations and links will be added as journal articles are published.</i></li>
        </ul>
        <div className="list-title">Github Code Repository:</div>
        <ul>
          <li>Link coming soon.</li>
        </ul>
        <div className="list-title">Study Team:</div>
        <ul>
          <li>Michelle E. Miro (Principal Investigator), RAND Corporation</li>
          <li>Arthur T. DeGaetano (Cornell Co-Principal Investigator), Northeast Regional Climate Center</li>
          <li>Constantine Samaras (CMU Co-Principal Investigator), Carnegie Mellon University</li>
          <li>Krista Romita Grocholski, (RAND Co-Principal Investigator), RAND Corporation</li>
          <li>Tania López-Cantú, Carnegie Mellon University</li>
          <li>Marissa Webber, Carnegie Mellon University</li>
        </ul>
        <div className="list-title">Citation:</div>
        <ul>
          <li>Miro, M., DeGaetano, A., Samaras. C., Romita Grocholski, K., López-Cantú, T., Webber, M., Eck, B. (2021). “Projected Intensity-Duration-Frequency (IDF) Curve Tool for the Chesapeake Bay Watershed and Virginia”. Northeast Regional Climate Center. <a href="https://midatlantic-idf.rcc-acis.org/">https://midatlantic-idf.rcc-acis.org/</a></li>
        </ul>
        <div className="modal-footnote"><i>For feedback on the tool or questions on the study please reach out to Michelle Miro at <a href="mailto: michelle_miro@rand.org">michelle_miro@rand.org</a></i></div>
      </div>
    </div>
  );

  const utdBody = (
    <div style={modalStyle} className={classes.paper}>
      <div className="close-modal"><CloseIcon onClick={handleClose} /></div>
     
      <h2 id="custom-modal-title">Using the Data</h2>
      <div id="custom-modal-description">
        <div className="list-title">Correct applications of the data tool:</div>
        <ul>
          <li>Use the station-based projected Atlas 14 IDF curves in the online tool for typical engineering applications.</li>
          <li>Apply county-level change factors to gridded Atlas 14 values within that county and that cover a roughly similar historic period (1950-1999).</li>
          <li>Compare 2020-2070 or 2050-2100 station-based projected Atlas 14 IDF curves values from the tool (not the change factors) to any updated Atlas 14 values that cover a more recent time period than those offered in the tool.</li>
          <li>Examine the range of uncertainty (shown as confidence intervals) in the station-based projected Atlas 14 IDF curves or the county-level change factors. Users can toggle on or off the confidence intervals at the top of the IDF curve chart.</li>
        </ul>
        <div className="list-title">Incorrect application of the data tool:</div>
        <ul>
          <li>Do not apply change factors directly to Atlas 14 values that have a different time period than that in the tool (1950-2000).</li>
          <li>Do not apply change factors to IDF curves not available from Atlas 14.</li>
        </ul>
        <Button
          id="download-all"
          aria-label="download all data"
          backgroundColor="secondary"
          onClick={handleDownload}
        >
          Download All Data
        </Button>
      </div>
    </div>
  );
  
  const uttBody = (
    <div style={modalStyle} className={classes.paper}>
      <div className="close-modal"><CloseIcon onClick={handleClose} /></div>

      <h2 id="custom-modal-title">Using the Tool</h2>
      <div id="custom-modal-description">
        <div className="list-title">Available Data:</div>
        <ul>
          <li>County-level IDF curve change factors that can be accessed by hovering your mouse over a given county.</li>
          <li>Station-based projected IDF curves, which constitute Atlas 14 values with the county-level change factors already applied. These can be accessed by selecting a station in the map, indicated with white location markers.</li>
        </ul>
        <div className="list-title">Individual IDF Curves:</div>
        <ul>
          <li>For each station, IDF curves (see Chart tab) and tabular IDF curve values (see Table tab) can be accessed by clicking the white location marker for the station of interest.</li>
          <li>Stations can be saved clicking the star next to the station name in the &quot;Currently Selected&quot; box.</li>
          <li>Users can view a comparison of Projected and Atlas 14 values in the Comparison tab.</li>
        </ul>
        <div className="list-title">Selection Panel:</div>
        <ul>
          <li>Users can select the return period, future time period of interest and future emissions scenario in the drop-down menu.</li>
          <li>Area of Interest allows users to select the Chesapeake Bay Watershed, Virginia or Both.</li>
          <li>For each time period, users can also select a future greenhouse gas emissions scenario under Emissions Scenario by selecting a low emissions future, Representative Concentration Pathway (RCP) 4.5, or a high emissions future, RCP 8.5.</li>
        </ul>
        <div className="list-title">Downloading Data:</div>
        <ul>
          <li>Images of station-based projected IDF curve charts can be downloaded by selecting the three horizontal lines in the upper right corner of the Charts tab for a given station.</li>
          <li>A .csv file of station-based projected IDF curve values can be downloaded by selecting “Download CSV” from the Table tab for a given station.</li>
          <li>All data can be downloaded from the &quot;Using the Data&quot; tab.</li>
        </ul>
        <div className="list-title">Supported Browsers:</div>
        <ul>
          <li>This tool is available on Firefox, Safari, Google Chrome, and Microsoft Edge. It is not supported on Internet Explorer.</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div id="link-container">
      <div className="link" onClick={() => handleOpen("tr")}>Technical Resources</div>
      <div className="link" onClick={() => handleOpen("utd")}>Using the Data</div>
      <div className="link" onClick={() => handleOpen("utt")}>Using the Tool</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="custom-modal-title"
        aria-describedby="custom-modal-description"
      >
        {content}
          
      </Modal>
    </div>
  );
}