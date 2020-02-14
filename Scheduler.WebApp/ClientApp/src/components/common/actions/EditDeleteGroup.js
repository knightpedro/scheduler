import React from "react";
import Edit from "./Edit";
import Delete from "./Delete";

const EditDeleteGroup = ({ editPath, handleDeleteClick }) => (
    <>
        <Edit path={editPath} />
        <Delete handleClick={handleDeleteClick} />
    </>
);

export default EditDeleteGroup;
