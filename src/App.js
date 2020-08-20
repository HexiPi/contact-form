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
        })
    };

    formSubmitResultReset = () => this.setState({ formSubmitResult: FormRes.NONE });

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <ContactForm
                        submitMethod="post"
                        email="info@example.com"
                        tel="+18005555555"
                        socialMediaLinks={["https://www.facebook.com/HexiPi.Web.Dev", "https://instagram.com/hexipi", "https://www.youtube.com/channel/UCxJUbbqJ_3hpaL53vn2EFVA", "https://hexipi.com/"]}
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