import React from "react";
import { Button } from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";
import PropTypes from "prop-types";
import { exportToExcel } from "../utils/exportToExcel";

const ExportButton = React.memo(function ExportButton({ data, label }) {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<DownloadIcon />}
      onClick={() => exportToExcel(data)}
      disabled={!data || data.length === 0}
    >
      {label || "Export CSV"}
    </Button>
  );
});

// Define types of props for better verification and documentation
ExportButton.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,

  label: PropTypes.string,
};

export default ExportButton;
