import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from 'mobx-react';
import RootStore from './stores';

ReactDOM.render(

	
		<Provider { ...RootStore }>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>,

	document.getElementById("root")
);

registerServiceWorker();
