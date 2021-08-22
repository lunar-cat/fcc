import React from "react";
import marked from "marked";

export default function MdViewer(props) {
    return (
        <div className="col-md-6 col-12">
            <h2 className="display-3">Viewer</h2>
            <div id="preview"
                className="form-control"
                style={{ minWidth: "calc(1.5em + (.75rem + 2px))" }}
                dangerouslySetInnerHTML={(
                    { __html: marked(props.children, { gfm: true, breaks: true }) }
                )} />
        </div>

    );
}