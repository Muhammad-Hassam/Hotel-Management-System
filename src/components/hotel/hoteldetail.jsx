import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import User from "../../assets/images/user.png";
import { useParams } from "react-router-dom";
import Header from "../header";
import Footer from "../footer";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Swal from "sweetalert2";
import { auth, database } from "../config/firebase";
import moment from "moment";

const Hotelprofile = (props) => {
	console.log(moment().format("MMMM Do YYYY"));
	const userData = useSelector((state) => state.status);
	const [user] = useState(userData.loginStatus);
	const { id } = useParams();
	const data = props.location.state;
	const history = useHistory();
	const [roomno, setRoomno] = useState(0);
	const [room, setroom] = useState("");
	const [sday, setsroom] = useState("");
	const [eday, seteroom] = useState("");
	const [slots, setslot] = useState(false);
	const [count, setCount] = useState("");
	const [card, setcard] = useState(false);
	const handleroom = (e) => {
		setroom(e.target.value);
	};
	const handleStatrtday = (e) => {
		setsroom(e.target.value);
	};

	const handleEndday = (e) => {
		seteroom(e.target.value);
	};
	const showrooms = () => {
		if (room !== "" && sday !== "" && eday !== "") {
			setslot(true);
			if (room === "Single Bed Room") {
				setCount(
					Array(parseInt(data.signlebed))
						.fill(1)
						.map((x, y) => x + y),
				);
			} else if (room === "Double Bed Room") {
				// Array(parseInt(30)).fill(1).map((x, y) => x + y)
				setCount(
					Array(parseInt(data.doublebed))
						.fill(1)
						.map((x, y) => x + y),
				);
			} else {
				setCount(
					Array(parseInt(data.kingsizebed))
						.fill(1)
						.map((x, y) => x + y),
				);
			}
		} else {
			Swal.fire("SomeThing is incomplete");
		}
	};
	const handleRoomno = (e) => {
		setRoomno(e.target.value);
		setcard(true);
	};

	const Done = () => {
		database
			.ref("/HMS")
			.child("booking/")
			.push({
				userid: auth.currentUser.uid,
				hotelid: data.id,
				hotelname: data.uname,
				username: userData.user.uname,
				startdate: sday,
				enddate: eday,
				bookingdate: new Date().toString(),
				roomtype: room,
				roomno: roomno,
				totalcost: "",
			})
			.then(() => console.log("User added successfully"))
			.catch((err) => console.log(err));
	};
	return (
		<>
			{user === false ? <Header /> : null}
			<Grid container style={{ marginTop: "70px", marginBottom: "100px" }}>
				<Grid xs={2} md={2} sm={2}></Grid>
				<Grid
					xs={8}
					md={8}
					sm={8}
					item
					style={{ boxShadow: "0 0 15px  #545001" }}
				>
					<Card>
						<Grid
							xs={12}
							md={12}
							sm={12}
							item
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								marginTop: "20px",
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
							<h1 style={{ textAlign: "center", paddingTop: "10px" }}>
								{data.uname}
							</h1>
						</Grid>
						<Grid
							xs={12}
							md={12}
							sm={12}
							item
							style={{
								textAlign: "left",
								paddingLeft: "40px",
								marginRight: "20px",
							}}
						>
							<p>
								<span>
									<b>Address: </b>
								</span>
								<span>{data.address}</span>
							</p>
							<p>
								<span>
									<b>Email: </b>
								</span>
								<span>{data.email}</span>
							</p>
							<p>
								<span>
									<b>Description: </b>
								</span>
								<span style={{ textAlign: "center" }}>{data.description}</span>
							</p>
							<p>
								<span>
									<b>Facility: </b>
								</span>
								<span style={{ justifyContent: "center" }}>
									{data.facility}
								</span>
							</p>
							<p>
								<span>
									<b>Total Rooms: </b>
								</span>
								<span>{data.rooms}</span>
							</p>
							<p>
								<span>
									<b>Per Day of Single Bed Room: </b>
								</span>
								<span>{data.singleroomprice} PKR</span>
							</p>
							<p>
								<span>
									<b>Per Day of Double Bed Room: </b>
								</span>
								<span>{data.doubleroomprice} PKR</span>
							</p>
							<p>
								<span>
									<b>Per Day of King Size Bed Room: </b>
								</span>
								<span>{data.kingroomprice} PKR</span>
							</p>
							<p>
								<span>
									<b>Contact No: </b>
								</span>
								<span>{data.contact}</span>
							</p>
							{user === true ? (
								<h2
									style={{
										textAlign: "center",
										textDecoration: "underline",
										padding: "20px",
									}}
								>
									Book Your Room
								</h2>
							) : null}
							<Grid container>
								{user === false ? (
									<>
										<Grid xs={12} md={12} sm={12}>
											<p>
												<span>
													<b>No of Single Bed Rooms: </b>
												</span>
												<span>{data.signlebed}</span>
											</p>
										</Grid>
										<br />
										<Grid xs={12} md={12} sm={12}>
											<p>
												<span>
													<b>No of doublebed Rooms: </b>
												</span>
												<span>{data.signlebed}</span>
											</p>
										</Grid>
									</>
								) : (
									<Grid xs={12} md={12} sm={12} style={{ marginTop: "10px" }}>
										<InputLabel id="demo-simple-select-label">
											Select Room Type
										</InputLabel>
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											fullWidth
											value={room}
											onChange={handleroom}
										>
											<MenuItem value={"Single Bed Room"}>
												Single Bed Room
											</MenuItem>
											<MenuItem value={"Double Bed Room"}>
												Double Bed Room
											</MenuItem>
											<MenuItem value={"King Size Bed Room"}>
												King Size Bed Room
											</MenuItem>
										</Select>
									</Grid>
								)}
								{user === true ? (
									<>
										<Grid xs={5} md={5} sm={5} style={{ marginTop: "30px" }}>
											<TextField
												label="Start Day"
												style={{ margin: 6, marginBottom: "20px" }}
												placeholder="Enter Hotel Name"
												inputProps={{ min: moment().format("YYYY-MM-DD") }}
												// min={moment().format("YYYY-MM-DD")}
												helperText=""
												type="date"
												fullWidth
												value={sday}
												onChange={handleStatrtday}
												margin="normal"
												InputLabelProps={{
													shrink: true,
												}}
												variant="filled"
											/>
										</Grid>
										<Grid xs={1} md={1} sm={1}></Grid>
										<Grid xs={5} md={5} sm={5} style={{ marginTop: "30px" }}>
											<TextField
												label="End Day"
												type="date"
												style={{ margin: 6, marginBottom: "20px" }}
												placeholder="Enter Hotel Name"
												inputProps={{
													min: moment().format("YYYY-MM-DD") && sday,
												}}
												helperText=""
												fullWidth
												value={eday}
												onChange={handleEndday}
												margin="normal"
												InputLabelProps={{
													shrink: true,
												}}
												variant="filled"
											/>
										</Grid>
										<Grid xs={1} md={1} sm={1}></Grid>
									</>
								) : null}
							</Grid>
							<p style={{ textAlign: "center" }}>
								{user === false ? (
									<Button
										style={{
											backgroundColor: "#545001",
											color: "#fff",
											marginBottom: "20px",
										}}
										variant="contained"
										onClick={() => history.push("/login")}
									>
										Book Your Room
									</Button>
								) : slots === false ? (
									<Button
										style={{
											backgroundColor: "#545001",
											color: "#fff",
											marginBottom: "20px",
										}}
										variant="contained"
										onClick={() => showrooms()}
									>
										Show rooms
									</Button>
								) : (
									<Grid xs={12} md={12} sm={12} style={{ marginTop: "10px" }}>
										<InputLabel id="demo-simple-select-label">
											Select Room
										</InputLabel>
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											fullWidth
											value={roomno}
											onChange={handleRoomno}
										>
											{count.map((val, ind) => {
												return (
													<MenuItem value={val} key={ind}>
														Room No {val}
													</MenuItem>
												);
											})}
										</Select>
										{card === true ? (
											<>
												<TextField
													label="Card No"
													type="number"
													min="1"
													max="10"
													style={{ margin: 6, marginBottom: "20px" }}
													placeholder="Enter Valid Card No"
													helperText=""
													fullWidth
													margin="normal"
													InputLabelProps={{
														shrink: true,
													}}
													style={{
														marginTop: "5px",
													}}
													variant="filled"
												/>
												<Button
													style={{
														backgroundColor: "#545001",
														color: "#fff",
														marginBottom: "20px",
													}}
													variant="contained"
													onClick={() => Done()}
												>
													Done
												</Button>
											</>
										) : null}
									</Grid>
								)}
							</p>
						</Grid>
					</Card>
				</Grid>
			</Grid>
			<Grid xs={2} md={2} sm={2}></Grid>

			{user === false ? <Footer /> : null}
		</>
	);
};
export default Hotelprofile;
