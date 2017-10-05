import React from 'react';
import defaultDecorator from 'react-treebeard/lib/components/decorators';
import {Checkbox} from "material-ui";

const decorators = Object.assign({}, defaultDecorator);

decorators.Container = (props) => {
    let assignedProps = Object.assign(props);
    assignedProps.style.toggle.base.marginLeft = "";

    let toggleStyle = {
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        textAlign: "center",
        width: "24px",
        height: "24px",
        overflow: "hidden",
        cursor : "pointer",
        transform : assignedProps.node.toggled ? "rotate(90deg)" : ""
    };

    return (
        <div onClick={props.onClick} style={{
            display : "flex",
            alignItems : "center",
            justifyContent : "flex-start"
        }}>
            {assignedProps.node.type === "GROUP" ? (
                <div style={{
                    display : "flex"
                }}>
                    <div style={toggleStyle}>
                        <assignedProps.decorators.Toggle {...assignedProps}
                                                         style={assignedProps.style.toggle}
                                                         {...assignedProps.animations.toggle} />
                    </div>
                    <assignedProps.decorators.Header {...assignedProps}
                                                     style={assignedProps.style.header} />
                </div>
            ) : (
                <Checkbox checked={assignedProps.node.toggled} label={assignedProps.node.name} />
            )}
        </div>
    );
};

export default decorators;



