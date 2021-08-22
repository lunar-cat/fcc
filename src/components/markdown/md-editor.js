import React from "react";

export default function MdEditor(props) {
    return (
        <div className="col-md-6 col-12">
            <h2 className="display-3">Editor</h2>
            <textarea id="editor" value={props.value}
                className="form-control"
                onChange={props.handleChange}
                style={{ resize: "none", height: "100%" }}
            />
        </div>

    );
}