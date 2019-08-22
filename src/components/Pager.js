import React, { Component } from "react";

class Pager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPageIndex: 0,
      currentPageLabel: props.currentPageLabel,
      page: props.pages[0]
    };
  }

  goPrevious() {
    const { currentPageIndex } = this.state;
    const { pages, pageLabels } = this.props;
    const newIndex = (currentPageIndex - 1 + pages.length) % pages.length;
    this.setState({
      currentPageIndex: newIndex,
      currentPageLabel: pageLabels[newIndex],
      page: pages[newIndex]
    });
  }

  goNext() {
    const { currentPageIndex } = this.state;
    const { pages, pageLabels } = this.props;
    const newIndex = (currentPageIndex + 1 + pages.length) % pages.length;
    this.setState({
      currentPageIndex: newIndex,
      currentPageLabel: pageLabels[newIndex],
      page: pages[newIndex]
    });
  }

  render() {
    // returns the label for given page
    console.log(this.props.getLabel(0));

    // when provided a page label, returns a URL to call to fetch the page info for that label.
    console.log(this.props.pageInfoUrl("Zain"));

    /* url to send a POST support request to - of the form
        {
            "name": "User's Name",
            "email": "User's Email Address",
            "message": "The message entered by the user",
        } */
    console.log(this.props.supportRequestUrl);
    // WHY IS THIS EMPTY IN THE CONSOLE???
    console.log(
      this.props.children({
        page: this.state.page,
        goPrevious: this.goPrevious,
        goNext: this.goNext
      })
    );

    return <React.Fragment>{this.props.pages}</React.Fragment>;
  }
}

export default Pager;
