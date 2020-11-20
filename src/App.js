import React from 'react';
import ContactForm, { FormRes } from './components/ContactForm';
import './App.css';

class App extends React.Component {
    state = {
        formSubmitResult: FormRes.NONE,
    };

    onSubmit = formData => {
        alert(`Form Data: ${JSON.stringify(formData)}`);
        this.setState({
            formSubmitResult: FormRes.OK,
        });
    };

    formSubmitResultReset = () => this.setState({ formSubmitResult: FormRes.NONE });

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <ContactForm
                        // formData={{name: 'John Smith', email: 'megaalpha200@gmail.com', phone_number: '4095555555', message: 'Testing 1,2,3...'}}
                        submitMethod="post"
                        email="info@example.com"
                        tel="+18005555555"
                        socialMediaLinks={["https://www.facebook.com/HexiPi.Web.Dev", "https://instagram.com/hexipi", "https://www.youtube.com/channel/UCxJUbbqJ_3hpaL53vn2EFVA", "https://hexipi.com/"]}
                        onSubmitCallback={this.onSubmit}
                        formSubmitResult={this.state.formSubmitResult}
                        formSubmitResultReset={this.formSubmitResultReset}
                        backgroundColor="#270941ec"
                        autoFormatPhoneNumber={{ shouldFormat: true, countryCode: 'US' }}
                    />
                </header>
            </div>
        );
    }
}

export default App;