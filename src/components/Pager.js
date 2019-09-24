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
      response: "",
      isPageInfoIsLoading: true,
      isPageInfoError: false,
      PageInfo: {
        likes: []
      }
    };
  }

  componentDidMount() {
    this.getThisEmployee(
      this.props.pageInfoUrl(this.state.currentPageIndex + 1)
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.getLabel(prevState.currentPageIndex) !==
      prevProps.getLabel(this.state.currentPageIndex)
    ) {
      this.getThisEmployee(
        this.props.pageInfoUrl(this.state.currentPageIndex + 1)
      );
    }
  }

  getThisEmployee = url => {
    let data = this.state.PageInfo;
    let responseCode;
    fetch(url)
      .then(function(response) {
        responseCode = response.status;
        return response.json();
      })
      .then(myJson => (data = myJson))
      .then(() =>
        responseCode > 400
          ? this.setState({
              isPageInfoError: responseCode,
              isPageInfoIsLoading: false
            })
          : this.setState({
              PageInfo: data,
              isPageInfoIsLoading: false
            })
      );
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

  goPrevious = () => {
    const { currentPageIndex, pageLabels } = this.state;
    const { pages } = this.props;
    const newIndex = (currentPageIndex - 1 + pages.length) % pages.length;
    this.setState({
      currentPageIndex: newIndex,
      currentPageLabel: pageLabels[newIndex],
      page: pages[newIndex]
    });
  };

  goNext = () => {
    const { currentPageIndex, pageLabels } = this.state;
    const { pages } = this.props;
    const newIndex = (currentPageIndex + 1 + pages.length) % pages.length;
    this.setState({
      currentPageIndex: newIndex,
      currentPageLabel: pageLabels[newIndex],
      page: pages[newIndex]
    });
  };

  showHelpScreen = () => {
    this.setState(prevState => ({
      showHelp: !prevState.showHelp
    }));
  };

  showErrorMessage = response => {
    if (response > 200 && response < 205) {
      this.setState({ response: "Success: " + response + " - Form Submitted" });
    }
    if (response > 400) {
      this.setState({ response: "Error: " + response });
    }
  };

  render() {
    return this.state.showHelp && this.props.supportRequestUrl ? (
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
        showHelpScreen: this.showHelpScreen,
        pageInfoIsLoading: this.state.isPageInfoIsLoading,
        pageInfoError: this.state.isPageInfoError,
        pageInfo: this.state.PageInfo
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