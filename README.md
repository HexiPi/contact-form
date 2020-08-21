# Contact Form React.JS Component by _#HexiPi_

## __<u>Example of Usage:</u>__

````javascript
//As a Class Component
import React from 'react';
import ContactForm, { FormRes } from 'contact-form-hexipi';
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
                        tel="+18005555555"
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
//As a Funcational Component Using Hooks
import React, { useState } from 'react';
import ContactForm, { FormRes } from 'contact-form-hexipi';
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
                        email="info@example.com"
                        tel="+18005555555"
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
                    />
                </header>
            </div>
        );
}

export default App;
````

## __<u>Attributes & Data Types:</u>__

### Below is a list of all the available __attributes__:
<br>

````typescript
interface ContactFormProps {
    //The form submission method (either "get" or "post")
    submitMethod: 'get' | 'post',

    //The email address that would be displayed
    email: string,

    //The phone number that would be displayed
    tel: string,

    //The optional fax number that would be displayed
    fax?: string,

    //The array of social media links/web links that would be displayed
    socialMediaLinks: string[],

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
    email: "info@example.com",
    tel: "+15555555555",
    fax: undefined,
    socialMediaLinks: [
        "https://www.facebook.com/HexiPi.Web.Dev", 
        "https://instagram.com/hexipi", 
        "https://www.youtube.com/channel/UCxJUbbqJ_3hpaL53vn2EFVA", 
        "https://hexipi.com/"
    ],
    onSubmitCallback: 
        (formData: ContactFormSubmissionData) => alert(JSON.stringify(formData)),
    mainHeading: "Need More Information?",
    subHeading: "Send Us a Message!",
    formSubmitOKMsg: "Form Submitted!",
    formSubmitErrorMsg: "An error has occurred (why???)! 😥 Please try again later."
    formSubmitResult: FormRes.NONE,
};
````
<br>

### Below are all the available values of the __FormRes__ Enumerator:
<br>

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

### Below are all the available values of the __ContactFormSubmissionData__:
<br>

````typescript
interface ContactFormSubmissionData {
    name: string,

    email: string,

    //Not a required form field for user;
    //if not specified it will return an empty string
    phone_number?: string,
    
    message: string
}
````