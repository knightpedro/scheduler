import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkers, workersSelectors } from "../../ducks/workers";

const WorkersList = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.workers);
  const workers = useSelector(workersSelectors.selectAll);

  console.log(workers);

  useEffect(() => {
    dispatch(fetchWorkers());
  }, [dispatch]);

  return "Hello";
};

export default WorkersList;
