import React, { useState } from 'react';

const LanSelect = ({lanList, onSelectLan}) => {

  const handleLanChange = (event) => {
    const lan = event.target.value;
    onSelectLan(lan);

  };

  return (
    <div>
      <label htmlFor="Lan-select">Select a Lan:</label>
      <select id="Lan-select"  onChange={handleLanChange}>
        <option value="">-- Select Language --</option>
        {lanList.map((Lan) => (
          <option key={Lan} value={Lan}>
            {Lan}
          </option>
        ))}
      </select>
      {/* <p>Selected language: {selectedLan}</p> */}
    </div>
  );
};

export default LanSelect;
