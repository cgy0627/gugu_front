import "../css/Home.css";
import { Link, useNavigate } from "react-router-dom";
import Map from "./Map";
import { useEffect, useState } from "react";
import {
  AccountCircleOutlined,
  HomeOutlined,
  Image,
  StickyNote2Outlined,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  FormGroup,
  Grid,
  IconButton,
  Modal,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  Switch,
  Snackbar,
  Alert,
} from "@mui/material";
import { KAKAO_AUTH_URL } from "./KakaoLoginData";
import kakao_login_medium_wide from "../img/kakao_login_medium_wide.png";
import { KAKAO_LOGOUT_URL } from "./KakaoLogoutData";
import gugu from "../img/bidulgi.png";
import gugu_tilt from "../img/dulgi_headtilt.png";
import gugu_login from "../img/dulgi_login.jpg";
import { Container } from "@mui/system";
import styled from "@emotion/styled";
import { axiosUser } from "../api/User";
import ChatList from "./ChatList";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  alignItems: "center",
};

const MyThemeComponent = styled("div")(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

function Home() {
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const logout = () => {
    window.location.href = KAKAO_LOGOUT_URL;
  };

  const [open, setOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [toggled, setToggled] = useState(false);

  const token = window.localStorage.getItem("token");
  // 하단 바 로그인 상태별 paging 옵션
  const [alertStatus, setAlertStatus] = useState(false);
  const navigate = useNavigate();

  const alertClick = () => {
    setAlertStatus(!alertStatus);
  };

  const loginCheck = () => {
    if (token === null) {
      alertClick();
    } else {
      navigate("/myPage");
    }
  };

  const [profileImg, setProfileImg] = useState(
    "https://cdn-icons-png.flaticon.com/128/1077/1077063.png"
  );

  useEffect(() => {
    if (token !== null) {
      const data = axiosUser();
      data.then((res) => setProfileImg(res.kakaoProfileImg));
    }
  }, []);

  return (
    <div className="wrap1">
      <div className="header">
        <AppBar position="static" sx={{ background: "#B6E2A1" }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                  paddingRight: 2,
                }}
              >
                999.com
              </Typography>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Home">
                  <IconButton
                    onClick={() => {
                      document.location.href = "/";
                    }}
                    sx={{ p: 0 }}
                  >
                    <Avatar alt="gugu" src={gugu} />
                  </IconButton>
                </Tooltip>
              </Box>
              <Grid
                container
                justifyContent="flex-end"
                direction="row"
                alignItems="center"
              >
                {token ? (
                  <Grid sx={{ flexGrow: 0 }}>
                    <Tooltip title="My Profile">
                      <IconButton
                        onClick={() => {
                          document.location.href = "/myPage";
                        }}
                        sx={{ p: 0 }}
                      >
                        <Avatar alt="myProfile" src={profileImg} />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                ) : (
                  <></>
                )}
                <Grid>&nbsp;&nbsp;&nbsp;</Grid>
                <Grid>
                  {token === null ? (
                    <Button
                      sx={{ right: 0 }}
                      onClick={() => setOpen(true)}
                      justifycontent="flex-end"
                      variant="contained"
                      color="success"
                    >
                      Login
                    </Button>
                  ) : (
                    <Button
                      sx={{ right: 0 }}
                      onClick={() => setLogoutOpen(true)}
                      justifycontent="flex-end"
                      variant="contained"
                      color="success"
                    >
                      Logout
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Toolbar>
          </Container>
        </AppBar>
        <div className="headerLeft"></div>
      </div>
      <br />
      <div>
        <FormGroup sx={{ alignContent: "center" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Map</Typography>
            <Switch
              checked={toggled}
              size="large"
              inputProps={{ "aria-label": "ant design" }}
              onChange={(e) => setToggled(e.target.checked)}
            />
            <Typography>List</Typography>
          </Stack>
        </FormGroup>
      </div>
      <div>{toggled === false ? <Map /> : <ChatList />}</div>
      {/* <Map /> */}
      <br />
      <BottomNavigation
        sx={{
          background: "#B6E2A1",
          bottom: 0,
          position: "fixed",
          width: "100%",
        }}
        showLabels
        value={1}
      >
        <BottomNavigationAction
          label="Posting"
          icon={<StickyNote2Outlined />}
          component={Link}
          to="/posting"
        />
        <BottomNavigationAction
          label="Home"
          icon={<HomeOutlined />}
          component={Link}
          to="/"
        />
        <BottomNavigationAction
          label="My Page"
          icon={<AccountCircleOutlined />}
          // component={Button}
          // to="/myPage"
          onClick={loginCheck}
        />
      </BottomNavigation>
      <Snackbar
        className="mapAlert"
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={alertStatus}
        autoHideDuration={1000}
        onClose={alertClick}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          로그인이 필요한 기능입니다.
        </Alert>
      </Snackbar>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            999에 로그인하기
          </Typography>
          <img
            alt="gugu_login"
            src={gugu_login}
            style={{
              height: 150,
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {/* <input placeholder="아이디"></input> <br />
                <input type={"password"} placeholder="비밀번호"></input> <br />
                <button type="submit">Login</button> */}
            <img
              src={kakao_login_medium_wide}
              alt="kakao_login"
              onClick={handleLogin}
            />
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            로그아웃 하시겠습니까?
          </Typography>
          <img
            alt="gugu_tilt"
            src={gugu_tilt}
            style={{
              height: 150,
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Grid container direction="row" alignItems="center">
              <Grid>
                <button onClick={logout}>네</button>
              </Grid>
              &nbsp;&nbsp;&nbsp;
              <Grid>
                <button onClick={() => setLogoutOpen(false)}>아니요!</button>
              </Grid>
            </Grid>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Home;
