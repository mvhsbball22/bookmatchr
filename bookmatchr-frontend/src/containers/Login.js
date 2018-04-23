import React, { Component } from 'react';

import { Authenticator } from 'aws-amplify-react';

const federated = {
	facebook_app_id: '261969917316231',
	google_client_id: '44402713425-nu3rlo6j55vrqb0hvdbl0m243c38kbc9.apps.googleusercontent.com'
}

export default class Login extends Component {
    render() {
        return <Authenticator federated={federated} />
    }
}