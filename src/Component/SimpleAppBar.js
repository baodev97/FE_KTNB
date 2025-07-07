import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Box,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

const SimpleAppBar = () => {
  const { signout,  informationUser } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // TODO: thêm logic đăng xuất ở đây
    console.log("Đăng xuất");
    signout(() => {
      console.log("Đã đăng xuất thành công");
      // Có thể điều hướng về trang đăng nhập hoặc trang khác sau khi đăng xuất
    });
    handleCloseMenu();
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#154734" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo và Tên hệ thống */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h3" component="div">
            VCBNeo
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h4" component="div">
            KTNB - HỆ THỐNG BÁO CÁO 
          </Typography>
        </Box>

        {/* Avatar người dùng */}
        <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
          <Avatar alt="User" src="/static/images/avatar/1.jpg" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <MenuItem disabled>Xin chào, {informationUser.name}</MenuItem>
          <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default SimpleAppBar;
