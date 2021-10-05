import React from "react";
import Grid from "@material-ui/core/Grid";

const Footer = () => {
	return (
		<footer>
			<Grid
				container
				style={{ backgroundColor: "#545001", position: "fixed", bottom: "0" }}
			>
				<Grid item xs={12} md={12} sm={12}>
					<h4 style={{}}>
						&copy; 2021 footwear. All rights reserved. Theme design by Hassam
					</h4>
				</Grid>
			</Grid>
		</footer>
	);
};
export default Footer;
