import React from "react";
import { UpdateLink } from "../UpdateLink";
import { Authorization } from "../Authorization";
import { Logged } from "../Logged";

export const App = () => {
	return (
		<>
			<UpdateLink />
			<Authorization />
			<Logged />
		</>
	);
};

export default App;
