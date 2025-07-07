import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
} from '@mui/material';
import logo from '../Util/logoVcbNeo.jpg';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';



export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const { signin } = useAuth();
  
  const navigate = useNavigate();

  const onSubmit = (data) => {
    signin(
      data,
      () => navigate("/report"),
      (err) => alert("Đăng nhập thất bại!")
    );
    // Thực hiện xử lý đăng nhập ở đây (gọi API, xác thực, ...)
    console.log('Đăng nhập với dữ liệu:', data);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 24 }}>
        <Box display={'flex'} flexDirection="row" alignItems="center" mb={4}>
            <div>
                <img src={logo} alt="Logo" width="240" height="auto"/>
            </div>
            <Divider orientation="vertical" flexItem  sx={{ bgcolor: '#006600', mx:2, width: '4px' }}/>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
                <Typography variant="subtitle1" color="#006600" sx={{ fontSize: '9px' }}>
                   NGÂN HÀNG THƯƠNG MẠI TNHH MTV NGOẠI THƯƠNG CÔNG NGHỆ SỐ
                </Typography>
                <Typography variant="h3" color="#000000">
                    KTNB
                </Typography>
                <Typography variant="subtitle1" color="#666666">
                    HỆ THỐNG BÁO CÁO 
                </Typography>

            </Box>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Nhập tài khoản người dùng"
              fullWidth
              {...register('username', { required: 'Vui lòng nhập tài khoản người dùng' })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />

            <TextField
              label="Nhập mật khẩu"
              type="password"
              fullWidth
              {...register('password', { required: 'Vui lòng nhập mật khẩu' })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button variant="contained" color="success" type="submit">
              Đăng nhập
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
