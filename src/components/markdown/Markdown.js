import React from "react";
import MdViewer from "./md-viewer";
import MdEditor from "./md-editor";

const example = `# H1
## H2
[link](https://www.google.com)
\`code\`
\`\`\`
const uwu = "uwu"
\`\`\`
1. Ordered Item
2. Ordered Item
> A blockquote
**Bold**
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")
<pre><code>algo</code></pre>
`
export default class Markdown extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { value: example };
    }
    handleChange(e) {
        this.setState(
            { value: e.target.value }
        )
    }
    render() {
        return (
            <div className="container-fluid row">
                < MdEditor
                    value={this.state.value}
                    handleChange={this.handleChange}
                />
                < MdViewer>
                    {this.state.value}
                </MdViewer>
            </div>
        );
    }
}