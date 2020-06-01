import React, { useState, useEffect } from "react";
import { Progress } from "semantic-ui-react";

const LoadingIndicator = (props) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => (prev + 20 > 100 ? 0 : prev + 20));
    }, 500);
    return () => clearInterval(interval);
  });

  return <Progress percent={percent} active color="teal" {...props} />;
};

export default LoadingIndicator;
