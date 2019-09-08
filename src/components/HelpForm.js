import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";

// const HelpForm = function({ url, toggleHelp, showErrorMessage }) (
function HelpForm({ url, toggleHelp, showErrorMessage }) {
  return (
  <div>
    <h1>Help Form</h1>
    <Formik
      initialValues={{ name: "", email: "", message: "" }}
      validateOnChange={false}
      validate={values => {
        let errors = {};
        if (!values.name) {
          errors.name = "Required";
          // eslint-disable-next-line
        } else if (/^[\p{L} \.'\-]+$$/i.test(values.name)) {
          errors.name = "Invalid name";
        }
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.message) {
          errors.message = "Required";
        }
        return errors;
      }}
      onSubmit={(values, actions) => {
        console.log(url);
        console.log(values);
        if (url) {
          fetch(url, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(values)
          })
            .then(res => {
              actions.resetForm();
              actions.setSubmitting(false);
              // return res.json();
              return res.status;
            })
            // .then(response => console.log("Success:", JSON.stringify(response)))
            .then(response => showErrorMessage(response))
            .catch(error => console.error("Error:", error));
        } else {
          alert("Please specify a support request URL.");
        }
      }}
      render={props => (
        <form onSubmit={props.handleSubmit}>
          <label>
            Name
            <input
              type="text"
              onChange={props.handleChange}
              value={props.values.name}
              name="name"
            />
            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
          </label>
          <br />
          <label>
            Email
            <input
              type="email"
              onChange={props.handleChange}
              value={props.values.email}
              name="email"
            />
            {props.errors.email && (
              <div id="feedback">{props.errors.email}</div>
            )}
          </label>
          <br />
          <label>
            Message
            <textarea
              onChange={props.handleChange}
              value={props.values.message}
              name="message"
            />
            {props.errors.message && (
              <div id="feedback">{props.errors.message}</div>
            )}
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      )}
    />
    <button onClick={toggleHelp}>Return</button>
  </div>
  )};

HelpForm.propTypes = {
  url: PropTypes.string,
  toggleHelp: PropTypes.func.isRequired
};

export default HelpForm;
