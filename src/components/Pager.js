import React, { Component } from "react";
import PropTypes from "prop-types";

import HelpForm from "./HelpForm";

class Pager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPageIndex: 0,
      currentPageLabel: this.props.currentPageLabel,
      page: this.props.pages[0],
      pageLabels: this.props.pages.map((page, i) => {
        return this.props.getLabel(i);
      }),
      showHelp: false,
      response: ""
    };

    this.goPrevious = this.goPrevious.bind(this);
    this.goNext = this.goNext.bind(this);
    this.goToLabel = this.goToLabel.bind(this);
    this.showHelpScreen = this.showHelpScreen.bind(this);
    this.showErrorMessage = this.showErrorMessage.bind(this);
    this.pageInfoUrl = this.pageInfoUrl.bind(this);
  }



  goPrevious() {
    const { currentPageIndex, pageLabels } = this.state;
    const { pages } = this.props;
    const newIndex = (currentPageIndex - 1 + pages.length) % pages.length;
    this.setState({
      currentPageIndex: newIndex,
      currentPageLabel: pageLabels[newIndex],
      page: pages[newIndex]
    });
  };

  goNext() {
    const { currentPageIndex, pageLabels } = this.state;
    const { pages } = this.props;
    const newIndex = (currentPageIndex + 1 + pages.length) % pages.length;
    this.setState({
      currentPageIndex: newIndex,
      currentPageLabel: pageLabels[newIndex],
      page: pages[newIndex]
    });
  };

  goToLabel(label) {
    const { pageLabels } = this.state;
    const { pages } = this.props;
    const newIndex = pageLabels.indexOf(label);
    this.setState({
      currentPageIndex: newIndex,
      currentPageLabel: pageLabels[newIndex],
      page: pages[newIndex]
    });
  };

  showHelpScreen() {
    this.setState(prevState => ({
      showHelp: !prevState.showHelp
    }));
  };

  showErrorMessage(response) {
    if (response > 200 && response < 205) {
        this.setState({response: "Success: " + response + " - Form Submitted"})
    }
    if (response > 400) {
        this.setState({response: "Error: " + response})
    }
  }

  pageInfoUrl(label) {
      
  }

  render() {
    return this.state.showHelp ? (
      <>
        <HelpForm
          url={this.props.supportRequestUrl}
          toggleHelp={this.showHelpScreen}
          showErrorMessage={this.showErrorMessage}
        />
        <p>{this.state.response}</p>
      </>
    ) : (
      this.props.children({
        page: this.state.page,
        goPrevious: this.goPrevious,
        goNext: this.goNext,
        goToLabel: this.goToLabel,
        currentPageLabel: this.state.currentPageIndex,
        pageLabels: this.state.pageLabels,
        showHelpScreen: this.showHelpScreen
      })
    );
  }
}

Pager.defaultProps = {
  supportRequestUrl: null,
  pageInfoUrl: null
};

Pager.propTypes = {
  pages: PropTypes.node.isRequired,
  getLabel: PropTypes.func.isRequired,
  pageInfoUrl: PropTypes.func,
  supportRequestUrl: PropTypes.string,
  children: PropTypes.func.isRequired
};

export default Pager;
