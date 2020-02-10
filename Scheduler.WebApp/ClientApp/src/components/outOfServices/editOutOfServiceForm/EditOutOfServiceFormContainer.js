import React, { useState, useEffect } from "react";
import EditOutOfServiceForm from "./EditOutOfServiceForm";
import { Loading, LoadingFailure } from "../../common/loading";
import { OUTOFSERVICE_URL, RESOURCES_URL } from "../../../api";
import axios from "axios";
import moment from "moment";
import Alert from "react-bootstrap/Alert";
import Container from "../../common/containers";
import Breadcrumb from "../../common/breadcrumb";
import { generatePath } from "react-router-dom";
import Routes from "../../../routes";
import { isEqual } from "lodash";
import { Delete } from "../../common/actions";

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
        let oosRes = await axios.get(`${OUTOFSERVICE_URL}/${id}`);
        const o = oosRes.data;
        let reasonsRes = await axios.get(`${OUTOFSERVICE_URL}/reasons`);
        const resourceId = o.resourceId;
        const reason = { label: o.reason, value: o.reason };
        const start = moment(o.start);
        const end = moment(o.end);
        let resourceRes = await axios.get(`${RESOURCES_URL}/${resourceId}`);
        setOutOfService({
          ...o,
          reason,
          start,
          end,
          resource: resourceRes.data
        });
        setReasons(reasonsRes.data.sort().map(r => ({ label: r, value: r })));
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
    axios
      .delete(`${OUTOFSERVICE_URL}/${id}`)
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
      end: values.end.format()
    };
    axios
      .put(`${OUTOFSERVICE_URL}/${id}`, putBody)
      .then(() => props.history.goBack())
      .catch(error => {
        setFormError(error);
        setSubmitting(false);
      });
  };

  const renderBreadcrumb = () => {
    const resourcePath = generatePath(Routes.resources.DETAIL, {
      id: outOfService.resourceId
    });
    return (
      <Breadcrumb>
        <Breadcrumb.Item href={Routes.resources.LIST}>Plant</Breadcrumb.Item>
        <Breadcrumb.Item href={resourcePath}>
          {outOfService.resource.name}
        </Breadcrumb.Item>
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
    return renderComponent(<LoadingFailure message={loadingError.message} />);
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
