import React, { useEffect, useState } from "react";
import { clearUser } from "../../../services/User/apiCalls.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../utils/reducers/userReducer.js";
import { IconButton, Button, Modal, Box, Typography } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";

const Header = ({ choice }) => {
  const userData = useSelector((state) => state?.user?.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.validUser);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!user || !userData) {
      navigate("/login");
    }
  }, [user, userData, navigate]);

  // Handle Logout
  const handleLogout = () => {
    clearUser();
    dispatch(logOut());
    setModalOpen(false); // Close modal after logout
  };

  // Toggle Modal
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <header className="bg-orange-500 p-4 z-30 text-white absolute w-screen">
      <div className="container mx-auto flex justify-between items-center">
        {choice === "profile" ? (
          <div
            className="cursor-pointer"
            onClick={() => navigate(`/profile/${userData?.username}`)}
          >
            Welcome, {userData?.name}
          </div>
        ) : (
          <div className="cursor-pointer" onClick={() => navigate(`/`)}>
            Go Home
          </div>
        )}

        {/* Hamburger Menu Icon */}
        <IconButton edge="end" color="inherit" onClick={handleOpenModal}>
          <MenuIcon />
        </IconButton>

        {/* Modal */}
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            className="relative bg-red-500"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "rgba(0, 0, 0, 0.8)",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              minWidth: 300,
              textAlign: "center",
              color: "white",
            }}
          >
            {/* Close Icon */}
            <IconButton
              onClick={handleCloseModal}
              sx={{ position: "absolute", top: 10, right: 10, color: "white" }}
            >
              <CloseIcon />
            </IconButton>

            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              gutterBottom
            >
              Menu
            </Typography>

            <Button
              onClick={() => {
                navigate(`/profile/${userData?.username}`);
                setModalOpen(false);
              }}
              sx={{ textAlign: "center", color: "orange", marginBottom: 2 }}
              fullWidth
            >
              Profile
            </Button>
            <Button
              onClick={() => {
                navigate(`/editprofile/${userData.username}`);
                setModalOpen(false);
              }}
              sx={{ textAlign: "center", color: "orange", marginBottom: 2 }}
              fullWidth
            >
              Edit Profile
            </Button>
            <Button
              onClick={handleLogout}
              sx={{
                textAlign: "center",
                color: "#fff", 
                backgroundColor: "#ff5722", 
                fontFamily: "'Roboto', sans-serif", 
                fontWeight: "bold", 
                padding: "12px", 
                borderRadius: "8px",
                transition: "0.3s ease", 
                "&:hover": {
                  backgroundColor: "#e64a19",
                  transform: "scale(1.05)",
                },
                "&:active": {
                  backgroundColor: "#d84315",
                  transform: "scale(0.98)",
                },
                marginBottom: 2,
              }}
              fullWidth
            >
              Logout
            </Button>

            {/* Add more buttons as needed */}
          </Box>
        </Modal>
      </div>
    </header>
  );
};

export default Header;
