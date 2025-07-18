import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchData } from "../API/GetApi";

const UnitOfMeasurement = ({ index, item, handleItemChange, hsCode }) => {
  const [uom, setUom] = useState([]);

  useEffect(() => {
    const getUoM = async () => {
      if (!hsCode) return;
      console.log("Fetching UOM for hsCode:", hsCode); // Debug log
      try {
        const response = await fetchData(
          `pdi/v2/HS_UOM?hs_code=${hsCode}&annexure_id=3`
        );
        console.log("UOM API response:", response); // Debug log
        setUom(response);
        // Auto-select if only one UOM is returned and not already set
        if (response.length === 1 && !item.uoM) {
          handleItemChange(index, "uoM", response[0].description);
        }
      } catch (error) {
        console.error("Error fetching rates:", error);
      }
    };
    getUoM();
  }, [hsCode]);

  const handleUOMChange = (event) => {
    const selectedUOM = event.target.value;
    handleItemChange(index, "uoM", selectedUOM);
  };

  // ✅ Early return AFTER hooks
  if (!hsCode) {
    return null;
  }
  return (
    <Box sx={{ flex: "1 1 23%", minWidth: "200px" }}>
      <FormControl fullWidth>
        <InputLabel id={`sro-item-${index}`}>Unit of Measurment</InputLabel>
        <Select
          labelId={`uom-${index}`}
          value={item.uoM}
          label="Unit of Measure (UoM)"
          onChange={handleUOMChange}
        >
          {uom.map((curElem) => (
            <MenuItem key={curElem.uoM_ID} value={curElem.description}>
              {curElem.description}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default UnitOfMeasurement;
