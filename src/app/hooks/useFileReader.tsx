import React from "react";

const useFileReader = () => {
  const [raw_file_data, setRawFileData] = React.useState();

  return { raw_file_data, setRawFileData };
};

export default useFileReader;
