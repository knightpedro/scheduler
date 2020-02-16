import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { OUTOFSERVICE_URL, RESOURCES_URL } from "../../../api";
import { Loading, LoadingFailure } from "../../common/loading";
import OutOfServiceWidget from "./OutOfServiceWidget";
import { entitiesSelect } from "../../../utils/transforms";
import Datetime from "react-datetime";
import moment from "moment";

const SHOW_ALL = "all";
const DATE_FORMAT = "D MMMM YYYY";

const OutOfServiceWidgetContainer = props => {
    const [start, setStart] = useState(
        moment()
            .subtract(1, "month")
            .startOf("month")
    );
    const [end, setEnd] = useState(
        moment()
            .subtract(1, "month")
            .endOf("month")
    );
    const [loading, setLoading] = useState(true);
    const [selectedResourceId, setSelectedResourceId] = useState(SHOW_ALL);
    const [resources, setResources] = useState();
    const [outOfServices, setOutOfServices] = useState();
    const [error, setError] = useState();

    const selectOutOfServicesForResource = () => {
        if (selectedResourceId === SHOW_ALL) {
            let combinedOutOfServices = [];
            Object.keys(outOfServices).forEach(key =>
                combinedOutOfServices.push(...outOfServices[key])
            );
            return selectOutOfServices(combinedOutOfServices);
        }
        if (!outOfServices[selectedResourceId]) return [];
        return selectOutOfServices(outOfServices[selectedResourceId]);
    };

    const selectOutOfServices = outOfServicesArray => {
        const outOfServicesObj = outOfServicesArray
            .filter(oos => oos.start.isBefore(end) && start.isBefore(oos.end))
            .reduce((obj, item) => {
                const overlapStart = item.start.isSameOrAfter(start)
                    ? item.start
                    : start;
                const overlapEnd = item.end.isSameOrBefore(end)
                    ? item.end
                    : end;
                obj[item.reason] =
                    (obj[item.reason] || 0) +
                    overlapEnd.diff(overlapStart, "hours", true);
                return obj;
            }, {});
        return Object.keys(outOfServicesObj).map(key => ({
            label: key,
            value: outOfServicesObj[key],
        }));
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                let resourcesRes = await axios.get(RESOURCES_URL);
                let oosRes = await axios.get(OUTOFSERVICE_URL);
                setResources(entitiesSelect(resourcesRes.data.resources));
                const shapedOutOfServices = oosRes.data.outOfServices.reduce(
                    (acc, current) => {
                        acc[current.resourceId] = [
                            ...(acc[current.resourceId] || []),
                            {
                                ...current,
                                start: moment(current.start),
                                end: moment(current.end),
                            },
                        ];
                        return acc;
                    },
                    {}
                );
                setOutOfServices(shapedOutOfServices);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    const renderComponent = component => (
        <>
            <h4 className="text-center mt-5">Plant Downtime</h4>
            {component}
        </>
    );

    if (loading) return renderComponent(<Loading />);
    if (error)
        return renderComponent(<LoadingFailure message={error.message} />);

    return renderComponent(
        <>
            <Row className="align-items-center">
                <Col lg>
                    <OutOfServiceWidget
                        data={selectOutOfServicesForResource()}
                        unit="hour"
                    />
                </Col>
                <Col lg>
                    <div className="form-group align-items-center">
                        <label htmlFor="start">From</label>
                        <Datetime
                            inputProps={{
                                className: "datetime-input form-control",
                                name: "start",
                                autoComplete: "off",
                                readOnly: true,
                            }}
                            value={start}
                            onChange={v => setStart(v)}
                            dateFormat={DATE_FORMAT}
                            timeFormat={false}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="end">To</label>
                        <Datetime
                            inputProps={{
                                className: "datetime-input form-control",
                                name: "end",
                                autoComplete: "off",
                                readOnly: true,
                            }}
                            value={end}
                            onChange={v => setEnd(v)}
                            dateFormat={DATE_FORMAT}
                            timeFormat={false}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="resourceSelect">Plant</label>
                        <select
                            className="form-control"
                            name="resourceSelect"
                            onChange={e =>
                                setSelectedResourceId(e.target.value)
                            }
                        >
                            <option value={SHOW_ALL}>All</option>
                            {resources.map(resource => (
                                <option
                                    key={resource.value}
                                    value={resource.value}
                                >
                                    {resource.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default OutOfServiceWidgetContainer;
