import React, { useState, useEffect } from "react";
import { Progress } from "semantic-ui-react";

const LoadingIndicator = ({ active, ...props }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => (prev + 20 > 100 ? 0 : prev + 20));
    }, 200);
    return () => clearInterval(interval);
  });

  if (!active) return null;

  return <Progress percent={percent} active color="teal" {...props} />;
};

export default LoadingIndicator;
