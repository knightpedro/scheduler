import React, { useState, useEffect } from "react";
import EditOutOfServiceForm from "./EditOutOfServiceForm";
import { Loading, LoadingFailure } from "../../common/loading";
import moment from "moment";
import Alert from "../../common/alert";
import Container from "../../common/containers";
import Breadcrumb from "../../common/breadcrumb";
import { Link, generatePath } from "react-router-dom";
import Routes from "../../../routes";
import { isEqual } from "lodash";
import { Delete } from "../../common/actions";
import { oosService, resourcesService } from "../../../services";

const EditOutOfServiceFormContainer = props => {
    const id = props.match.params.id;
    const [loading, setLoading] = useState(true);
    const [loadingError, setLoadingError] = useState();
    const [formError, setFormError] = useState();
    const [outOfService, setOutOfService] = useState();
    const [reasons, setReasons] = useState();

    useEffect(() => {
        const fetchOutOfService = async () => {
            try {
                const oos = await oosService.getById(id);
                const reasons = await oosService.getReasons();
                const reason = { label: oos.reason, value: oos.reason };
                const resource = resourcesService.getById(oos.resourceId);
                setOutOfService({
                    ...oos,
                    reason,
                    start: moment(oos.start),
                    end: moment(oos.end),
                    resource,
                });
                setReasons(reasons.sort().map(r => ({ label: r, value: r })));
            } catch (error) {
                setLoadingError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchOutOfService(id);
    }, [id]);

    const handleCancel = () => props.history.goBack();

    const handleDelete = () => {
        oosService
            .destroy(id)
            .then(() => props.history.goBack())
            .catch(error => setFormError(error));
    };

    const handleSubmit = (values, { setSubmitting }) => {
        setFormError(null);
        if (isEqual(values, outOfService)) {
            setFormError({ message: "No changes made" });
            setSubmitting(false);
            return;
        }
        const putBody = {
            id: values.id,
            resourceId: values.resourceId,
            description: values.description,
            reason: values.reason.value,
            start: values.start.format(),
            end: values.end.format(),
        };

        oosService
            .edit(putBody)
            .then(() => props.history.goBack())
            .catch(error => {
                setFormError(error);
                setSubmitting(false);
            });
    };

    const renderBreadcrumb = () => {
        const resourcePath = generatePath(Routes.resources.DETAIL, {
            id: outOfService.resourceId,
        });
        return (
            <Breadcrumb>
                <Link className="breadcrumb-item" to={Routes.resources.LIST}>
                    Plant
                </Link>
                <Link className="breadcrumb-item" to={resourcePath}>
                    {outOfService.resource.name}
                </Link>
                <Breadcrumb.Item active>Edit Out Of Service</Breadcrumb.Item>
            </Breadcrumb>
        );
    };

    const renderComponent = component => (
        <Container>
            {outOfService && renderBreadcrumb()}
            <div className="row align-items-center">
                <div className="col ml-auto">
                    <h2>Edit Out Of Service</h2>
                </div>
                <div className="col-auto">
                    {outOfService && <Delete handleClick={handleDelete} />}
                </div>
            </div>
            {formError && <Alert variant="danger">{formError.message}</Alert>}
            {component}
        </Container>
    );

    if (loading) return renderComponent(<Loading />);
    if (loadingError)
        return renderComponent(
            <LoadingFailure message={loadingError.message} />
        );
    return renderComponent(
        <EditOutOfServiceForm
            outOfService={outOfService}
            reasons={reasons}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
        />
    );
};

export default EditOutOfServiceFormContainer;
