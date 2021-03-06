# __Contact Form React.JS Component by _#HexiPi___

## __<u>Installation:</u>__

_Note: This module requires bootstrap for optimal CSS styling._ 

````
npm install contact-form-hexipi bootstrap reactstrap --save

OR

yarn add contact-form-hexipi bootstrap reactstrap
````

## __<u>Example of Usage:</u>__

````javascript
//As a Class Component
import React from 'react';
import ContactForm, { FormRes } from 'contact-form-hexipi';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends React.Component {
    state = {
        formSubmitResult: FormRes.NONE,
    };

    onSubmit = formData => {
        //Use to call your backend/API functions (or anything else you need)
        //to send your form data.

        alert(`Form Data: ${JSON.stringify(formData)}`);
        this.setState({
            formSubmitResult: FormRes.OK,
        })
    };

    //Set the state of the "formSubmitResult" to the default so that
    //the form could be displayed again
    formSubmitResultReset = () => this.setState({ formSubmitResult: FormRes.NONE });

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <ContactForm
                        submitMethod="post"
                        email="info@example.com"

                    //(EITHER OR, BUT NOT BOTH!)
                        tel="+18005555555"
                    //OR
                        telWithCountryCode={["8005555555", "US"]}

                        socialMediaLinks={[
                            //Facebook link
                            "https://www.facebook.com/HexiPi.Web.Dev",

                            //Instagram Link
                            "https://instagram.com/hexipi",

                            //YouTube link
                            "https://www.youtube.com/channel/UCxJUbbqJ_3hpaL53vn2EFVA",

                            //Website Link
                            "https://hexipi.com/"

                            //...Or anything you can think of!
                        ]}
                        onSubmitCallback={this.onSubmit}
                        formSubmitResult={this.state.formSubmitResult}
                        formSubmitResultReset={this.formSubmitResultReset}
                        backgroundColor="#270941ec"
                        autoFormatPhoneNumber={
                            { shouldFormat: true, countryCode: 'US' }
                        }
                    />
                </header>
            </div>
        );
    }
}

export default App;
````
<br>

````javascript
//As a Functional Component Using Hooks
import React, { useState } from 'react';
import ContactForm, { FormRes } from 'contact-form-hexipi';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

const App = () => {
    const [formSubmitResult, setFormSubmitResult] = useState(FormRes.NONE);

    const onSubmit = formData => {
        //Use to call your backend/API functions (or anything else you need)
        //to send your form data.

        alert(`Form Data: ${JSON.stringify(formData)}`);
        setFormSubmitResult(FormRes.OK);
    };

    //Sets the state of the "formSubmitResult" to the default so that
    //the form could be displayed again
    const formSubmitResultReset = () => setFormSubmitResult(FormRes.NONE);

    return (
            <div className="App">
                <header className="App-header">
                    <ContactForm
                        submitMethod="post"

                        formData={{
                            name: 'John Smith', 
                            email: 'test@gmail.com', 
                            phone_number: '4095555555', 
                            message: 'Testing 1,2,3...'
                        }}

                        email="info@example.com"

                    //(EITHER OR, BUT NOT BOTH!)
                        tel="+18005555555"
                    //OR
                        telWithCountryCode={["8005555555", "US"]}

                        socialMediaLinks={[
                            //Facebook link
                            "https://www.facebook.com/HexiPi.Web.Dev",

                            //Instagram Link
                            "https://instagram.com/hexipi",

                            //YouTube link
                            "https://www.youtube.com/channel/UCxJUbbqJ_3hpaL53vn2EFVA",

                            //Website Link
                            "https://hexipi.com/"

                            //...Or anything you can think of!
                        ]}
                        onSubmitCallback={onSubmit}
                        formSubmitResult={formSubmitResult}
                        formSubmitResultReset={formSubmitResultReset}
                        backgroundColor="#270941ec"
                        autoFormatPhoneNumber={
                            { shouldFormat: true, countryCode: 'US' }
                        }
                    />
                </header>
            </div>
        );
}

export default App;
````

### Below is an example of how you can customize your form using CSS:
<br>

````css
/* App.css */

...

/* Use the following CSS selector to customize the form container */
#contact-section {
  background-image: linear-gradient(#270941ec, rgba(0, 0, 0, 0.555)), 
    url(~./images/custom-img.jpg);

/* Use the following CSS selectors to customize the form buttons */
#contact-section .contact-btn {
    background-color: white;
    color: black;
    border-radius: 0;
}

#contact-section .contact-btn:hover {
    background-color: yellow;
    color: blue;
}

  /* Other customizations you want */
  ...
}
````

For other CSS selectors and to see the default styles, go to the GitHub Repo [here](https://github.com/HexiPi/contact-form/blob/master/src/css/contactFormStyle.css).
<br>

## __<u>Attributes & Data Types:</u>__

### Below is a list of all the available __attributes__:
<br>

````typescript
interface ContactFormProps {
    //The form submission method (either "get" or "post")
    submitMethod: 'get' | 'post',

    //The optional form data of the type "ContactFormSubmissionData" that can be
    //passed in to populate the form
    //NOTE: It is the responsibility of the dev to clear the data manually upon
    //when the user submits the form
    formData?: ContactFormSubmissionData,

    //The optional email address that would be displayed
    email?: string,

    //The optional phone number that would be displayed
    tel?: string,

    //The optional phone number that would be displayed
    //0th element should contain the phone number
    //1st element should contain the country code
    telWithCountryCode?: string[],

    //The optional fax number that would be displayed
    fax?: string,

    //The optional fax number that would be displayed
    //0th element should contain the fax number
    //1st element should contain the country code
    faxWithCountryCode?: string[],

    //The optional array of social media links/web links that would be displayed
    socialMediaLinks?: string[],

    //The optional custom main heading that would be displayed
    mainHeading?: string,

    //The optional custom subheading that would be displayed
    subHeading?: string,

    //The optional custom "OK" message that would be displayed
    formSubmitOKMsg?: string,

    //The optional custom "ERROR" message that would be displayed
    formSubmitErrorMsg?: string,

    //The result of the form submission (one of the options of the FormRes enum)
    formSubmitResult: FormRes,

    //The optional value of the background color of the page the ContactForm 
    //component;
    //This helps determine the appropriate font color that the ContactForm 
    //component should use
    //NOTE: This does not specify the ContactForm component's
    //actual background color
    backgroundColor?: string,

    //The optional JSON object that tells the form to auto-format the "Phone"
    //field as the user types in their phone number;
    //The attribute takes a JSON object with the "PhoneNumberFormat" format;
    autoFormatPhoneNumber?: boolean

    //The callback that is executed after the form is submitted
    //The "formData" parameter holds the data that was submitted on the form
    //of the type "ContactFormSubmissionData"
    onSubmitCallback: (formData: ContactFormSubmissionData) => void,

    //The callback that is executed after the form is reset
    formSubmitResultReset: () => void
};
````
#### <u>Note:</u> Most attributes are technically optional since they already have default values assigned to them. However the ones that are actually optional (marked with a "?") will not be shown or used by default (with the exception of the default headings). __All callback functions are required if you actually want the form to work properly.__
<br>

### Below are the __default values__:
<br>

````typescript
static defaultProps = {
    submitMethod: "get",
    formData: {},
    email: undefined,
    tel: undefined,
    telWithCountryCode: undefined,
    fax: undefined,
    faxWithCountryCode: undefined,
    socialMediaLinks: undefined,
    onSubmitCallback: 
        (formData: ContactFormSubmissionData) => alert(JSON.stringify(formData)),
    mainHeading: "Need More Information?",
    subHeading: "Send Us a Message!",
    formSubmitOKMsg: "Form Submitted!",
    formSubmitErrorMsg: "An error has occurred (why???)! 😥 Please try again later."
    formSubmitResult: FormRes.NONE,
    backgroundColor: 'black',
    autoFormatPhoneNumber: { shouldFormat: true, countryCode: 'US' }
};
````
<br>

### Below are all the available values of the __FormRes__ Enumerator:
<br>

````typescript
interface PhoneNumberFormat {
    //Whether or not the "Phone" form field should be formatted;
    //If "true" is specified, a countryCode MUST be provided
    shouldFormat: boolean,

    //The ISO 3166-1 alpha-2 two-letter country code the tells the
    //ContactForm component how to format the phone number
    //If "shouldFormat" is "true", a countryCode MUST be provided,
    //otherwise it's not needed
    countryCode?: string
}
````

````typescript
enum FormRes {
    //The form submitted successfully; a success message is displayed
    OK,

    //An error occurred during form submission; an error message is displayed
    ERROR,

    //The form is displayed and is ready to be filled out
    NONE
}
````

### Below are all the available values of the __ContactFormSubmissionData__ interface:
<br>

````typescript
interface ContactFormSubmissionData {
    name: string,

    email: string,

    //Not a required form field for user;
    //if not specified it will return an empty string for the key
    phone_number?: string,
    
    message: string
}
````