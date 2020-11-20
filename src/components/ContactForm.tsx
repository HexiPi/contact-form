// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import * as React from 'react';
import * as queryString from 'query-string';
import { Input, Form, Button } from 'reactstrap';
import { SocialIcon } from 'react-social-icons';
import { parsePhoneNumberFromString, AsYouType } from 'libphonenumber-js';
import { getContrastYIQ, convertRGBToHexColor } from 'color-functions-hexipi';
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

interface PhoneNumberFormat {
    shouldFormat: boolean,
    countryCode?: string
}

interface ContactFormProps {
    submitMethod: 'get' | 'post',
    formData: ContactFormSubmissionData,
    email: string,
    tel: string,
    telWithCountryCode: string[],
    fax: string,
    faxWithCountryCode: string[],
    socialMediaLinks: string[],
    onSubmitCallback: (formData: ContactFormSubmissionData) => void,
    mainHeading: string,
    subHeading: string,
    formSubmitOKMsg: string,
    formSubmitErrorMsg: string,
    formSubmitResult: FormRes,
    backgroundColor: string,
    autoFormatPhoneNumber: PhoneNumberFormat,
    formSubmitResultReset: () => void
};

class ContactForm extends React.Component<ContactFormProps, {}> {
    static defaultProps = {
        submitMethod: "get",
        formData: {},
        email: undefined,
        tel: undefined,
        telWithCountryCode: undefined,
        fax: undefined,
        faxWithCountryCode: undefined,
        socialMediaLinks: undefined,
        onSubmitCallback: (formData: ContactFormSubmissionData) => alert(JSON.stringify(formData)),
        mainHeading: "Need More Information?",
        subHeading: "Send Us a Message!",
        formSubmitOKMsg: "Form Submitted!",
        formSubmitErrorMsg: <span>An error has occurred (why???)! <span role="img" aria-label="sad face">😥</span> Please try again later.</span>,
        formSubmitResult: FormRes.NONE,
        backgroundColor: 'black',
        autoFormatPhoneNumber: { shouldFormat: true, countryCode: 'US' }
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

    componentDidMount = () => {
        if (this.props.submitMethod.toLowerCase() === 'get') {
            const query = queryString.parse(window.location.search);

            if (Object.keys(query).length > 0 && query.client_name && query.client_email && query.client_phone && query.client_message) {

                const formData: ContactFormSubmissionData = {
                    name: query.client_name.toString(),
                    email: query.client_email.toString(),
                    phone_number: query.client_phone.toString(),
                    message: query.client_message.toString()
                }
                
                this.props.onSubmitCallback(formData);
            }
        }
        else if (this.props.submitMethod.toLowerCase() === 'post') {
            if (Object.keys(this.props.formData).length > 0) {
                this.setState({
                    client_name: (this.props.formData.name) ? this.props.formData.name : '',
                    client_email: (this.props.formData.email) ? this.props.formData.email : '',
                    client_phone: (this.props.formData.phone_number) ? this.props.formData.phone_number : '',
                    client_message: (this.props.formData.message) ? this.props.formData.message : '',
                });
            }
        }
    }

    textColor = convertRGBToHexColor(getContrastYIQ(this.props.backgroundColor));

    renderPhoneNumber = (tel: string, isFax: boolean = false, countryCode: string = '') => {
        const phoneNumber = parsePhoneNumberFromString(tel, countryCode);
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
                    <li key={index}><SocialIcon bgColor={this.textColor} style={{ height: 50, width: 50 }} url={link} target="new_tab" /></li>
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
                [name]: target.value,
            });
        }
    }

    displayForm = () => {
        if (this.props.formSubmitResult === FormRes.NONE) {
            return (
                <Form onSubmit={this.onSubmit} method={this.props.submitMethod}>
                    <Input className="input large-input form-control" type="text" placeholder="Name*" name="client_name" value={this.state.client_name} onChange={this.handleInputChange} required />
                    <div className="innerRow">
                        <Input className="input inner-input form-control" type="email" placeholder="Email*" name="client_email" value={this.state.client_email} onChange={this.handleInputChange} required />
                        <Input className="input inner-input form-control" type="tel" placeholder="Phone" name="client_phone" value={(this.props.autoFormatPhoneNumber.shouldFormat) ? new AsYouType(this.props.autoFormatPhoneNumber.countryCode).input(this.state.client_phone) : this.state.client_phone} onChange={this.handleInputChange} />
                    </div>
                    <textarea className="input large-input form-control" cols={40} rows={5} placeholder="Message*" name="client_message" value={this.state.client_message} onChange={this.handleInputChange} required />
                    <br />
                    <div className="innerRow">
                        <Button className="contact-btn send-btn" type="submit">Send</Button>
                        &nbsp;
                        <Button className="contact-btn clear-btn" type="reset" name="RESET_BTN" onClick={this.handleInputChange}>Clear</Button>
                    </div>
                </Form>
            )
        }
        else if (this.props.formSubmitResult === FormRes.OK) {
            return(
                <div className="status-container">
                    {this.props.formSubmitOKMsg}<br />
                    <Button color="link" style={{color: 'deepskyblue'}} onClick={this.resetContactForm}>Click me to submit another one!</Button>
                </div>
            );
        }
        else if (this.props.formSubmitResult === FormRes.ERROR) {
            return(
                <div className="status-container">
                    {this.props.formSubmitErrorMsg}<br />
                </div>
            );
        }
    }

    renderMoreContactOptions = (shouldDisplay: boolean) => {
        if (shouldDisplay) {
            return (
                <div className="column" style={{ textAlign: 'center', flexGrow: 1 }}>
                    <h5>More Contact Options</h5>
                    {(this.props.email !== undefined) ? <a href={`mailto:${this.props.email}`}><p className="infoLinks">EMAIL: {this.props.email}</p></a>: ""}
                    {(this.props.tel !== undefined || this.props.telWithCountryCode !== undefined) ? this.renderPhoneNumber((this.props.tel !== undefined) ? this.props.tel : this.props.telWithCountryCode[0], false, (this.props.telWithCountryCode !== undefined) ? this.props.telWithCountryCode[1]: "") : ""}
                    {(this.props.fax !== undefined || this.props.faxWithCountryCode !== undefined) ? this.renderPhoneNumber((this.props.fax !== undefined) ? this.props.fax : this.props.faxWithCountryCode[0], true, (this.props.faxWithCountryCode !== undefined) ? this.props.faxWithCountryCode[1]: "") : ""}
                    {(this.props.socialMediaLinks !== undefined) ? this.renderSocialIcons(this.props.socialMediaLinks): ""}
                </div>
            );
        }
        else {
            return "";
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
                if (Object.keys(this.props.formData).length === 0) {
                    this.setState(ContactForm.defaultState);
                }
            }
        }, 1000);
    }

    onSubmit = (e: any) => {
        const isPost = this.props.submitMethod.toLowerCase() === 'post';
        
        if (isPost) {
            e.preventDefault();

            const formData: ContactFormSubmissionData = {
                name: this.state.client_name,
                email: this.state.client_email,
                phone_number: this.state.client_phone,
                message: this.state.client_message
            }

            this.props.onSubmitCallback(formData);
        }
    }

     render() {
        return (
            <section id="contact-section" style={{ color: getContrastYIQ(this.props.backgroundColor) }}>
                <style dangerouslySetInnerHTML={{__html: `
                    #contact-section .input { color: ${this.textColor}; border-color: ${this.textColor}; }
                    #contact-section .contact-btn { color: ${this.textColor}; border-color: ${this.textColor}; }
                    #contact-section .infoLinks { color: ${this.textColor}; }
                `
                }} />
                <div>
                    <h2>{this.props.mainHeading}</h2>
                    <h5>{this.props.subHeading}</h5>
                    <div className="row">
                        <div className="column" style={{ flexGrow: 2 }}>
                            {this.displayForm()}
                        </div>
                        {this.renderMoreContactOptions(this.props.email !== undefined || this.props.tel !== undefined || this.props.fax !== undefined || this.props.socialMediaLinks !== undefined || this.props.telWithCountryCode !== undefined || this.props.faxWithCountryCode !== undefined)}
                    </div>
                </div>
            </section>
         );
     }
 };

 export default ContactForm;