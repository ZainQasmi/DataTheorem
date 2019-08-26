import React, { Component } from "react";

const HELP_SCREEN_DATA = {
  name: "",
  email: "",
  message: ""
};

class Pager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPageIndex: 0,
      currentPageLabel: props.currentPageLabel,
      page: props.pages[0],
      pageLabels: props.pages.map((page, i) => {
        return this.props.getLabel(i);
      }),
      helpScreenData: Object.assign({}, HELP_SCREEN_DATA)
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    const { helpScreenData } = this.state;
    helpScreenData[name] = value;
    this.setState({ helpScreenData });
  };

  showHelpScreen = () => {
    const { helpScreenData } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            name="name"
            type="text"
            value={helpScreenData.name}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Email:
          <input
            name="email"
            type="email"
            value={helpScreenData.email.value}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Message:
          <textarea
            name="message"
            value={helpScreenData.message.value}
            onChange={this.handleChange}
          />
        </label>
      </form>
    );
  };

  goPrevious = () => {
    const { currentPageIndex } = this.state;
    const { pages, pageLabels } = this.props;
    const newIndex = (currentPageIndex - 1 + pages.length) % pages.length;
    this.setState({
      currentPageIndex: newIndex,
      currentPageLabel: pageLabels[newIndex],
      page: pages[newIndex]
    });
  };

  goNext = () => {
    const { currentPageIndex } = this.state;
    const { pages, pageLabels } = this.props;
    const newIndex = (currentPageIndex + 1 + pages.length) % pages.length;
    this.setState({
      currentPageIndex: newIndex,
      currentPageLabel: pageLabels[newIndex],
      page: pages[newIndex]
    });
  };

  goToLabel = label => {
    const { pageLabels } = this.state;
    const { pages } = this.props;
    const newIndex = pageLabels.indexOf(label);
    this.setState({
      currentPageIndex: newIndex,
      currentPageLabel: pageLabels[newIndex],
      page: pages[newIndex]
    });
  };

  render() {
    console.log(
      this.props.children({
        page: this.state.page,
        goPrevious: this.goPrevious,
        goNext: this.goNext,
        goToLabel: this.goToLabel,
        currentPageLabel: this.state.currentPageIndex,
        pageLabels: this.state.pageLabels
      })
    );

    return <React.Fragment>{this.props.pages}</React.Fragment>;
  }
}

export default Pager;
