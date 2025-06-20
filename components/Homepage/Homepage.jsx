import React from "react";
import "./homepage.css";
import {
  Typography,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "../../imgs/aonic 1.png";
import { UilMicrosoft, UilSlack, UilGithub } from "@iconscout/react-unicons";

function Homepage({ setMenuItemSelected, setSubMenuItemSelected }) {
  function selectMenu(menu) {
    setMenuItemSelected(menu);
    setSubMenuItemSelected(0);
  }

  const Item = ({ Icon, title, to, menu }) => (
    <Card elevation={0} className="card" onClick={() => selectMenu(menu)}>
      <CardActionArea component={Link} to={to}>
        <CardContent>
          <Icon size="80" color="#FF919D" />
          <Typography variant="h4" className="card-title">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
  return (
    <Container align="center">
      <Typography variant="h1" className="title" gutterBottom mt={0}>
        Welcome To <img src={Logo} alt="Aonic Logo" className="home-logo"/> Communication
      </Typography>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item Icon={UilSlack} title="Slack" to="/slack/monthly-tracker" menu={1} />
          </Grid>
          <Grid item xs={4}>
            <Item Icon={UilGithub} title="Github" to="/github/issues" menu={2} />
          </Grid>
          <Grid item xs={4}>
            <Item Icon={UilMicrosoft} title="Teams" to="/teams" menu={3} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Homepage;
