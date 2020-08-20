import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import * as React from 'react';
import { Input, Form, Button } from 'reactstrap';
import { SocialIcon } from 'react-social-icons';
import { parsePhoneNumberFromString, AsYouType } from 'libphonenumber-js';
import '../css/contactFormStyle.css';

export enum FormRes {
    OK,
    ERROR,
    NONE
}

interface ContactFormSubmissionData {
    name: string,
    email: string,
    phone_number?: string,
    message: string
}

interface ContactFormProps {
    submitMethod: 'get' | 'post',
    email: string,
    tel: string,
    fax: string,
    socialMediaLinks: string[],
    onSubmitCallback: (formData: ContactFormSubmissionData) => void,
    mainHeading: string,
    subHeading: string,
    formSubmitResult: FormRes,
    formSubmitResultReset: () => void
};

class ContactForm extends React.Component<ContactFormProps, {}> {
    static defaultProps = {
        submitMethod: "get",
        email: "info@example.com",
        tel: "+15555555555",
        fax: undefined,
        socialMediaLinks: ["https://www.facebook.com/HexiPi.Web.Dev", "https://instagram.com/hexipi", "https://www.youtube.com/channel/UCxJUbbqJ_3hpaL53vn2EFVA", "https://hexipi.com/"],
        onSubmitCallback: (formData: ContactFormSubmissionData) => alert(JSON.stringify(formData)),
        mainHeading: "Need More Information?",
        subHeading: "Send Us a Message!",
        formSubmitResult: FormRes.NONE,
    };

    static defaultState = {
        client_name: '',
        client_email: '',
        client_phone: '',
        client_message: '',
    };

    state = {
        client_name: '',
        client_email: '',
        client_phone: '',
        client_message: '',
    };

    renderPhoneNumber = (tel: string, isFax: boolean = false) => {
        const phoneNumber = parsePhoneNumberFromString(tel);
        const numberURI = (isFax) ? phoneNumber.getURI().replace('tel', 'fax') : phoneNumber.getURI();

        return (
            <a href={numberURI}>
                <p className="infoLinks">{(isFax) ? "FAX" : "TEL"}: {phoneNumber.formatNational()}</p>
            </a>
        );
    };

    renderSocialIcons = (socialMediaLinks: string[]) => (
        <ul>
            {
                socialMediaLinks.map((link: string, index: number) => (
                    <li key={index}><SocialIcon bgColor="#ffffff" style={{ height: 50, width: 50 }} url={link} target="new_tab" /></li>
                ))
            }
        </ul>
    );

    handleInputChange = (e: any) => {
        const target = e.target;
        const name = target.name;

        if (name === "RESET_BTN") {
            this.setState(ContactForm.defaultState);
        }
        else {
            this.setState({
                [name]: (name === 'client_phone') ? new AsYouType('US').input(target.value) : target.value,
            });
        }
    }

    displayForm = () => {
        if (this.props.formSubmitResult === FormRes.NONE) {
            return (
                <div>
                    <h2>{this.props.mainHeading}</h2>
                    <h5>{this.props.subHeading}</h5>
                    <div className="row">
                        <Form className="column" style={{ flexGrow: 2 }} onSubmit={this.onSubmit} method={this.props.submitMethod}>
                            <Input className="input large-input form-control" type="text" placeholder="Name*" name="client_name" value={this.state.client_name} onChange={this.handleInputChange} required />
                            <div className="innerRow">
                                <Input className="input inner-input form-control" type="email" placeholder="Email*" name="client_email" value={this.state.client_email} onChange={this.handleInputChange} required />
                                <Input className="input inner-input form-control" type="tel" placeholder="Phone" name="client_phone" value={this.state.client_phone} onChange={this.handleInputChange} />
                            </div>
                            <textarea className="input large-input form-control" cols={40} rows={5} placeholder="Message*" name="client_message" value={this.state.client_message} onChange={this.handleInputChange} required />
                            <br />
                            <div className="innerRow">
                                <Button className="contact-btn" type="submit">Send</Button>
                                &nbsp;
                                <Button className="contact-btn" type="reset" name="RESET_BTN" onClick={this.handleInputChange}>Clear</Button>
                            </div>
                        </Form>
                        <div className="column" style={{ textAlign: 'center', flexGrow: 1 }}>
                            <h5>More Contact Options</h5>
                            <a href={`mailto:${this.props.email}`}><p className="infoLinks">EMAIL: {this.props.email}</p></a>
                            {this.renderPhoneNumber(this.props.tel)}
                            {(this.props.fax !== undefined) ? this.renderPhoneNumber(this.props.fax, true) : ""}
                            {this.renderSocialIcons(this.props.socialMediaLinks)}
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.props.formSubmitResult === FormRes.OK) {
            return(
                <div className="status-container">
                    Form Submitted!<br />
                    <button className="btn btn-link" style={{color: 'deepskyblue'}} onClick={this.resetContactForm}>Click me to submit another one!</button>
                </div>
            );
        }
        else if (this.props.formSubmitResult === FormRes.ERROR) {
            return(
                <div className="status-container">
                    An error has occurred (why???)! <span role="img" aria-label="sad face">😥</span> Please try again later.<br />
                </div>
            );
        }
    }

    resetContactForm = (e: any) => {
        const target = e.target;
        target.disabled = true;

        let count = 5;
        const formShowInterval = setInterval(() => {
            if (count !== 0) {
                if (count !== 1) {
                    target.innerHTML = `Ready in ${count} secs...`;
                }
                else {
                    target.innerHTML = `Ready in ${count} sec...`;
                }
                count--;
            }
            else {
                clearInterval(formShowInterval);
                this.props.formSubmitResultReset();
            }
        }, 1000);
    }

    onSubmit = (e: any) => {
        const isPost = this.props.submitMethod.toLocaleLowerCase() === 'post';

        const formData: ContactFormSubmissionData = {
            name: this.state.client_name,
            email: this.state.client_email,
            phone_number: this.state.client_phone,
            message: this.state.client_message
        }

        this.props.onSubmitCallback(formData);
        
        if (isPost) {
            e.preventDefault();
            this.setState(ContactForm.defaultState);
        }
    }

     render() {
        return (
            <section id="contact-section">   
                {this.displayForm()}
            </section>
         );
     }
 };

 export default ContactForm;