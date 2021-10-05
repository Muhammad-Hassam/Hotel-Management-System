import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import User from "../../assets/images/user.png";
import { database, auth } from "../config/firebase";
import { useDispatch } from "react-redux";
import userStatus from "../redux/action/index";

const Profile = () => {
	const [data, setData] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				database
					.ref("/HMS")
					.child("user/" + auth.currentUser.uid)
					.on("value", (data) => {
						setData(data.val());
						dispatch(
							userStatus({
								loginStatus: true,
								role: data.val().role,
								user: data.val(),
							}),
						);
					});
			}
		});
	}, []);

	return (
		<>
			<Grid
				container
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "calc(100vh - 110px)",
				}}
			>
				<Grid xs={0} md={3} sm={0}></Grid>
				<Grid
					xs={12}
					md={6}
					sm={12}
					item
					style={{ boxShadow: "0 0 15px  #545001" }}
				>
					<Card>
						<Grid xs={12} md={12} sm={12}>
							<h1 style={{ textDecoration: "underline" }}>Profile Info</h1>
						</Grid>
						<Grid
							xs={12}
							md={12}
							sm={12}
							item
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Avatar
								alt="User Profile"
								src={data.imageURL ? data.imageURL : User}
								style={{
									width: "160px",
									height: "160px",
									marginTop: "10px",
									boxShadow: "0 0 15px  #545001",
								}}
							/>
						</Grid>
						<Grid
							xs={12}
							md={12}
							sm={12}
							item
							style={{ marginTop: "5px" }}
						></Grid>
						<Grid xs={12} md={12} sm={12} item>
							<h2 style={{ textAlign: "center", paddingTop: "10px" }}>
								{data.uname}
							</h2>
						</Grid>
						<Grid
							xs={12}
							md={12}
							sm={12}
							item
							style={{ textAlign: "left", paddingLeft: "40px" }}
						>
							<p>
								<span>
									<b>Email: </b>
								</span>
								<span>{data.email}</span>
							</p>
							<p>
								<span>
									<b>Age: </b>
								</span>
								<span>{data.age}</span>
							</p>
							<p>
								<span>
									<b>Gender: </b>
								</span>
								<span>{data.gender}</span>
							</p>
							<p>
								<span>
									<b>Contact No: </b>
								</span>
								<span>{data.contact}</span>
							</p>
							<p>
								<span>
									<b>Address: </b>
								</span>
								<span>{data.address}</span>
							</p>
						</Grid>
					</Card>
				</Grid>
				<Grid xs={0} md={3} sm={0}></Grid>
			</Grid>
		</>
	);
};
export default Profile;
