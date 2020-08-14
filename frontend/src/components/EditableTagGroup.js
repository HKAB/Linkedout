import { PlusOutlined } from '@ant-design/icons';
import { AutoComplete, Tag, Tooltip } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { getSkillName } from "services";

class EditableTagGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      inputVisible: false,
      inputValue: '',
      editInputIndex: -1,
      editInputValue: '',
      //autocomplete
      autoCompleteSkillTags: [],
      autoCompleteEditSkillTags: [],
    };
    this.setTags = this.setTags.bind(this);
  }



  setTags(skilltags) {
    this.setState({ tags: skilltags })
  };

  getTags() {
    return this.state.tags;
  }

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  handleEditInputChange = e => {
    this.setState({ editInputValue: e.target.value });
  };

  handleEditInputConfirm = () => {
    this.setState(({ tags, editInputIndex, editInputValue }) => {
      const newTags = [...tags];
      newTags[editInputIndex] = editInputValue;

      return {
        tags: newTags,
        editInputIndex: -1,
        editInputValue: '',
      };
    });
  };

  saveInputRef = input => {
    this.input = input;
  };

  saveEditInputRef = input => {
    this.editInput = input;
  };

  onChangeAutocompleteSkillTag = (text) => {
    this.setState({ inputValue: text });
    console.log(text);
    if (text) {
      getSkillName(text).then(data => {
        console.log(data);
        if (data) {
          var data_tag = data.tag.map(x => ({ value: x }));
          this.setState({ autoCompleteSkillTags: data_tag });

        }
      })
        .catch(error => {
          alert(error);
        })
    }
    else {
      this.setState({ autoCompleteSkillTags: [] });
    }
  };

  onChangeAutocompleteEditSkillTag = (text) => {
    this.setState({ editInputValue: text });
    console.log(text);
    if (text) {
      getSkillName(text).then(data => {
        console.log(data);
        if (data) {
          var data_tag = data.tag.map(x => ({ value: x }));
          this.setState({ autoCompleteEditSkillTags: data_tag });

        }
      })
        .catch(error => {
          alert(error);
        })
    }
    else {
      this.setState({ autoCompleteEditSkillTags: [] });
    }
  };

  render() {
    const { tags, inputVisible, inputValue, editInputIndex, editInputValue } = this.state;
    return (
      <>
        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              // <Input
              //   ref={this.saveEditInputRef}
              //   key={tag}
              //   size="small"
              //   className="tag-input"
              //   value={editInputValue}
              //   onChange={this.handleEditInputChange}
              //   onBlur={this.handleEditInputConfirm}
              //   onPressEnter={this.handleEditInputConfirm}
              // />
              <AutoComplete
                ref={this.saveEditInputRef}
                key={tag}
                size="small"
                className="tag-input"
                value={editInputValue}
                onChange={this.onChangeAutocompleteEditSkillTag}
                onBlur={this.handleEditInputConfirm}
                options={this.state.autoCompleteEditSkillTags}
              />
            );
          }

          const isLongTag = tag.length > 20;

          const tagElem = (
            <Tag
              className="edit-tag"
              key={tag}
              closable
              onClose={() => this.handleClose(tag)}
            >
              <span
                onDoubleClick={e => {
                  //if (index !== 0) {
                  this.setState({ editInputIndex: index, editInputValue: tag }, () => {
                    this.editInput.focus();
                  });
                  e.preventDefault();
                  //}
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
              tagElem
            );
        })}
        {inputVisible && (
          // <Input
          //   ref={this.saveInputRef}
          //   type="text"
          //   size="small"
          //   className="tag-input"
          //   value={inputValue}
          //   onChange={this.handleInputChange}
          //   onBlur={this.handleInputConfirm}
          //   onPressEnter={this.handleInputConfirm}
          // />
          <AutoComplete
            ref={this.saveInputRef}
            type="text"
            size='small'
            className="tag-input"
            value={inputValue}
            onChange={this.onChangeAutocompleteSkillTag}
            onBlur={this.handleInputConfirm}
            options={this.state.autoCompleteSkillTags}
            style={{ margin: 3 }}
          />
        )}
        {!inputVisible && (
          <Tag className="site-tag-plus" onClick={this.showInput} style={{ marginTop: 10 }}>
            <PlusOutlined /> New Tag
          </Tag>
        )}
      </>
    );
  }
}
//const EditTag = new EditableTagGroup();
export { EditableTagGroup };
// ReactDOM.render(<EditableTagGroup />, document.getElementById('container'));