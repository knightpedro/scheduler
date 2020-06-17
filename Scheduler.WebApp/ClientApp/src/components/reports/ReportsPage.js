import React, { useState, useCallback } from "react";
import PeriodPicker from "./PeriodPicker";
import { Grid } from "semantic-ui-react";

const ReportsPage = () => {
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const handlePeriodChange = useCallback((period) => {
    setDateRange(period);
  }, []);

  return (
    <Grid stackable padded relaxed="very">
      <Grid.Row columns="equal">
        <Grid.Column>
          <PeriodPicker onPeriodChange={handlePeriodChange} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
export default ReportsPage;
