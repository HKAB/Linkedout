import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import React from 'react';

class MyEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState: BraftEditor.createEditorState(this.props.defaultHtml),
    }
  }

  getHtml() {
    return this.state.editorState.toHTML();
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }

  componentDidMount() {
    this.isLivinig = true
    setTimeout(this.setEditorContentAsync, 500)
  }

  componentWillUnmount() {
    this.isLivinig = false
  }

  setEditorContentAsync = () => {
    this.isLivinig && this.setState({
      editorState: BraftEditor.createEditorState(this.props.descriptionData)
    })
  }

  render() {

    const { editorState } = this.state

    return (
      <div className="my-editor">
        <BraftEditor
          //value={this.props.defaultHtml}
          language="en"
          value={editorState}
          onChange={this.handleEditorChange}
        />
      </div>
    )

  }

}

export { MyEditor };
