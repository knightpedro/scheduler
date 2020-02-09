import React, { useMemo } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import Routes from "../../../routes";
import { generatePath } from "react-router-dom";
import {
  BasicTable,
  SearchColumnFilter,
  SelectColumnFilter
} from "../../common/tables";

const DATE_FORMAT = "DD/MM/YYYY";

const status = {
  COMPLETE: "Complete",
  IN_PROGRESS: "In Progress"
};

const JobsList = ({ jobs }) => {
  const createPath = id => generatePath(Routes.jobs.DETAIL, { id });

  const columns = useMemo(
    () => [
      {
        Header: "Job Number",
        accessor: "jobNumber",
        Cell: ({ row }) => (
          <Link to={createPath(row.original.id)}>{row.values.jobNumber}</Link>
        ),
        Filter: SearchColumnFilter
      },
      {
        Header: "Description",
        accessor: "description",
        Filter: SearchColumnFilter
      },
      {
        Header: "Location",
        accessor: "location",
        Filter: SearchColumnFilter
      },
      {
        Header: "Complete",
        accessor: "status",
        className: "text-center",
        Cell: ({ cell: { value } }) => (
          <FontAwesomeIcon
            color={value === status.COMPLETE ? "green" : "blue"}
            icon={value === status.COMPLETE ? faCheck : faSyncAlt}
          />
        ),
        Filter: SelectColumnFilter,
        filter: "exactText"
      },
      {
        Header: "Date Received",
        accessor: "dateReceived",
        className: "text-center",
        Cell: ({ cell: { value } }) => value.format(DATE_FORMAT),
        disableFilters: true,
        sortType: "momentSort"
      }
    ],
    []
  );

  const data = useMemo(
    () =>
      jobs.map(job => ({
        id: job.id,
        jobNumber: job.jobNumber,
        description: job.description,
        location: job.location,
        status: job.isComplete ? status.COMPLETE : status.IN_PROGRESS,
        dateReceived: moment(job.dateReceived)
      })),
    [jobs]
  );

  const initialTableState = useMemo(
    () => ({
      sortBy: [
        {
          id: "dateReceived",
          desc: true
        }
      ]
    }),
    []
  );

  return (
    <BasicTable
      columns={columns}
      data={data}
      initialState={initialTableState}
    />
  );
};

export default JobsList;
