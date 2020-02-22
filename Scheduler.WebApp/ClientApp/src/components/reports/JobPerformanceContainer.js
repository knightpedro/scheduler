import React, { useEffect, useState, useMemo } from "react";
import moment from "moment";
import { Loading, LoadingFailure } from "../common/loading";
import CoordinatorWorkLoadChart from "./CoordinatorWorkLoadChart";
import JobsReceivedChart from "./JobsReceivedChart";
import { JobsInProgressCard, JobsReceivedCard } from "./cards";
import { sortByName } from "../../utils/transforms";
import { Row, Col } from "react-bootstrap";
import { jobsService, coordinatorsService } from "../../services";

const periods = {
    MONTH: "month",
    QUARTER: "quarter",
    YEAR: "year",
};

const MONTH_FORMAT = "MMM";
const QUARTER_FORMAT = "[Q]Q";
const YEAR_FORMAT = "YYYY";

const getYears = startYear => {
    let yearList = [];
    let currentYear = startYear.clone();
    const now = moment();
    while (now.isSameOrAfter(currentYear, periods.YEAR)) {
        yearList.push(currentYear.clone());
        currentYear.add(1, periods.YEAR);
    }
    return yearList;
};

const getQuarters = () =>
    Array(4)
        .fill()
        .map((d, i) => moment().quarter(i + 1));

const getMonths = () =>
    Array(12)
        .fill()
        .map((d, i) => moment().month(i));

const JobsPerformanceContainer = props => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [period, setPeriod] = useState(periods.MONTH);
    const [jobs, setJobs] = useState([]);
    const [coordinators, setCoordinators] = useState([]);

    const jobsInProgress = useMemo(
        () => jobs.filter(j => !j.isComplete).length,
        [jobs]
    );

    const minYear = useMemo(() => {
        const yearLimit = moment().subtract(5, "years");
        const earliestRecord = jobs.reduce((acc, current) => {
            return current.dateReceived.isBefore(acc)
                ? current.dateReceived
                : acc;
        }, moment());
        return moment.max(earliestRecord, yearLimit);
    }, [jobs]);

    const currentMonthJobsReceivedCount = useMemo(() => {
        const startOfMonth = moment().startOf("month");
        return jobs.filter(j => j.dateReceived.isSameOrAfter(startOfMonth))
            .length;
    }, [jobs]);

    const previousMonthJobsReceivedCount = useMemo(() => {
        const startOfMonth = moment()
            .subtract(1, "month")
            .startOf("month");
        const endofMonth = startOfMonth.clone().endOf("month");
        return jobs.filter(
            j =>
                j.dateReceived.isSameOrAfter(startOfMonth) &&
                j.dateReceived.isSameOrBefore(endofMonth)
        ).length;
    }, [jobs]);

    const coordinatorWorkLoadChartData = useMemo(() => {
        const selectedJobs = jobs.filter(j =>
            j.dateReceived.isSame(moment(), period)
        );
        return coordinators.map(coordinator => ({
            label: coordinator.name
                .split(" ")
                .map((n, i) => (i === 0 ? n[0] : n))
                .join(" "),
            value: selectedJobs.filter(j => j.coordinatorId === coordinator.id)
                .length,
        }));
    }, [coordinators, jobs, period]);

    const jobsReceivedChartData = useMemo(() => {
        let intervals, format;
        switch (period) {
            case periods.MONTH:
                format = MONTH_FORMAT;
                intervals = getMonths();
                break;
            case periods.QUARTER:
                format = QUARTER_FORMAT;
                intervals = getQuarters();
                break;
            default:
                format = YEAR_FORMAT;
                intervals = getYears(minYear);
        }
        return intervals.map(interval => ({
            label: interval.format(format),
            value: jobs.filter(j => j.dateReceived.isSame(interval, period))
                .length,
        }));
    }, [jobs, period, minYear]);

    useEffect(() => {
        Promise.all([coordinatorsService.getAll(), jobsService.getAll()])
            .then(([coordinators, jobs]) => {
                setCoordinators(coordinators.sort(sortByName));
                setJobs(
                    jobs.map(j => ({
                        ...j,
                        dateReceived: moment(j.dateReceived),
                    }))
                );
            })
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Loading />;
    if (error) return <LoadingFailure message={error.message} />;

    return (
        <>
            <Row className="justify-content-md-center">
                <Col lg={6} xl={4}>
                    <JobsInProgressCard jobsCount={jobsInProgress} />
                </Col>
                <Col lg={6} xl={5}>
                    <JobsReceivedCard
                        currentCount={currentMonthJobsReceivedCount}
                        previousCount={previousMonthJobsReceivedCount}
                    />
                </Col>
            </Row>

            <Row className="align-items-center">
                <Col lg>
                    <h4 className="text-center mt-5">Coordinator Workload</h4>
                    <CoordinatorWorkLoadChart
                        data={coordinatorWorkLoadChartData}
                    />
                </Col>
                <Col lg>
                    <h4 className="text-center mt-5">Jobs Received</h4>
                    <JobsReceivedChart
                        data={jobsReceivedChartData}
                        xLabel={period}
                    />
                </Col>
            </Row>
            <Row className="align-items-center">
                <Col lg={5}>
                    <label htmlFor="period">Period</label>

                    <select
                        name="period"
                        className="form-control"
                        onChange={e => setPeriod(e.target.value)}
                    >
                        <option value={periods.MONTH}>Month</option>
                        <option value={periods.QUARTER}>Quarter</option>
                        <option value={periods.YEAR}>Year</option>
                    </select>
                </Col>
            </Row>
        </>
    );
};

export default JobsPerformanceContainer;
