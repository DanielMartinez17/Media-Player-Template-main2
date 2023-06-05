import "./assets/styles/sakura.scss";
import "../src/Components/index.js";
import "../src/Components/index.css";
import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./Components/Views/App";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

