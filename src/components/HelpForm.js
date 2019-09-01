import React from "react";
import { Formik } from "formik";

const HelpForm = ({ url, toggleHelp }) => (
  <div>
    <h1>Help Form</h1>
    <Formik
      initialValues={{ name: "" }}
      validateOnChange={false}
      validate={values => {
        let errors = {};
        if (!values.name) {
          errors.name = "Required";
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
        fetch(url, {
          method: "POST",
          body: JSON.stringify(values)
        })
          .then(res => {
            actions.setSubmitting(false);
            return res.json();
          })
          .then(response => console.log("Success:", JSON.stringify(response)))
          .catch(error => console.error("Error:", error));
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
);

export default HelpForm;
