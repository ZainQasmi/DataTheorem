import React, { Component } from 'react';

class Pager extends Component {
    state = {  }

    render() {
        // returns the label for given page
        console.log(this.props.getLabel(0)) 

        // when provided a page label, returns a URL to call to fetch the page info for that label.
        console.log(this.props.pageInfoUrl('Zain'))

        /* url to send a POST support request to - of the form
        {
            "name": "User's Name",
            "email": "User's Email Address",
            "message": "The message entered by the user",
        } */
        console.log(this.props.supportRequestUrl)

        console.log(this.props.children)

        return (
        <React.Fragment>
            {this.props.pages}
        </React.Fragment>
        );
    }
}
 
export default Pager;