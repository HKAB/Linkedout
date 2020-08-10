import React from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

class MyEditor extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      editorState: BraftEditor.createEditorState(this.props.defaultHtml)
    }
    console.log(this.props.defaultHtml);
  }



  getHtml() {
    return this.state.editorState.toHTML();
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }

  render () {

    const { editorState } = this.state

    return (
      <div className="my-editor">
        <BraftEditor
          value={this.props.defaultHtml}
          language="en"
          value={editorState}
          onChange={this.handleEditorChange}
        />
      </div>
    )

  }

}

export { MyEditor }