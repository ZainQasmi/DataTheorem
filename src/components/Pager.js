import React, { Component } from "react";
import HelpForm from "./HelpForm";

class Pager extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentPageIndex: 0,
//       currentPageLabel: props.currentPageLabel,
//       page: props.pages[0],
//       pageLabels: props.pages.map((page, i) => {
//         return this.props.getLabel(i);
//       }),
//       showHelp: false
//     };
//   }

  state = {
    currentPageIndex: 0,
    currentPageLabel: this.props.currentPageLabel,
    page: this.props.pages[0],
    pageLabels: this.props.pages.map((page, i) => {
      return this.props.getLabel(i);
    }),
    showHelp: false
  };

  goPrevious = () => {
    const { currentPageIndex, pageLabels } = this.state;
    const { pages } = this.props;
    const newIndex = (currentPageIndex - 1 + pages.length) % pages.length;
    // console.log(this.props.children.page);
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
    console.log(newIndex);
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

  showHelpScreen = () => {
    this.setState(prevState => ({
      showHelp: !prevState.showHelp
    }));
  };

  toggleHelp = () => {
    console.log("what is wrong here");
    this.setState(prevState => ({
      showHelp: !prevState.showHelp
    }));
  };

  render() {
    return this.state.showHelp ? (
      <HelpForm toggleHelp={this.toggleHelp} />
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

export default Pager;
