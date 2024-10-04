import React from "react";
import { EnviromentSwitch } from "../EnviromentSwitch/EnviromentSwitch";
import { UpdateLink } from "../UpdateLink";
import { Authorization } from "../Authorization";
import { Logged } from "../Logged";

export const App = () => {
	return (
		<>
			<EnviromentSwitch />
			<UpdateLink />
			<Authorization />
			<Logged />
		</>
	);
};

export default App;
