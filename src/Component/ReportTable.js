// ReportTable.tsx
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const ReportTable = ({ data }) => {
  console.log("ReportTable data:", data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // số dòng/trang

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Báo cáo Số Dư Hệ Thống Bán Lẻ
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 800 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              {[
                "Ngày báo cáo",
                "Mã CN",
                "Tên CN",
                "Mã PGD",
                "Tên PGD",
                "Tổng dư nợ bán lẻ",
                "Dư nợ KH cá nhân",
                "Dư nợ KH bán lẻ khác",
                "Tỷ lệ nợ bán lẻ nhóm 2",
                "Tỷ lệ nợ xấu bán lẻ",
                "Kế hoạch dư nợ bán lẻ",
                "Kế hoạch nợ bán lẻ nhóm 2",
                "Kế hoạch nợ xấu bán lẻ",
                "Dư nợ bán lẻ đã XLRR",
                "Dư nợ bán lẻ cơ cấu",
                "Dư nợ bán lẻ ngắn hạn",
                "Dư nợ bán lẻ trung - dài hạn",
                "Số lượng KH bán lẻ",
                "Số lượng KH cá nhân",
                "Số lượng KH bán lẻ khác",
              ].map((header, idx) => (
                <TableCell
                  key={idx}
                  align="center"
                  sx={{
                    whiteSpace: "nowrap", // tránh xuống dòng
                    padding: 1,
                    fontWeight: "bold",
                    fontSize: 13,
                    borderRight: "1px solid #e0e0e0",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{row.ngay_Bao_Cao}</TableCell>
                  <TableCell align="center">{row.ma_CN}</TableCell>
                  <TableCell align="center">{row.ten_CN}</TableCell>
                  <TableCell align="center">{row.ma_PGD}</TableCell>
                  <TableCell align="center">{row.ten_PGD}</TableCell>
                  <TableCell align="center">{row.tong_Du_No_Ban_le}</TableCell>
                  <TableCell align="center">
                    {row.du_No_Ban_Le_KH_Ca_Nhan}
                  </TableCell>
                  <TableCell align="center">
                    {row.du_No_KH_Ban_Le_Khac}
                  </TableCell>
                  <TableCell align="center">
                    {row.ty_Le_No_Ban_Le_Nhom_2}
                  </TableCell>
                  <TableCell align="center">
                    {row.ty_Le_No_Xau_Ban_Le}
                  </TableCell>
                  <TableCell align="center">
                    {row.ke_Hoach_Du_No_Ban_Le}
                  </TableCell>
                  <TableCell align="center">
                    {row.ke_Hoach_No_Ban_Le_Nhom_2}
                  </TableCell>
                  <TableCell align="center">
                    {row.ke_Hoach_No_Xau_Ban_Le}
                  </TableCell>
                  <TableCell align="center">
                    {row.du_No_Ban_Le_Da_XLRR}
                  </TableCell>
                  <TableCell align="center">
                    {row.du_No_Ban_Le_Co_Cau}
                  </TableCell>
                  <TableCell align="center">
                    {row.du_No_Ban_Le_Ngan_Han}
                  </TableCell>
                  <TableCell align="center">
                    {row.du_No_Ban_le_Trung_Dai_Han}
                  </TableCell>
                  <TableCell align="center">{row.so_Luong_KH_Ban_Le}</TableCell>
                  <TableCell align="center">
                    {row.so_Luong_KH_Ca_Nhan}
                  </TableCell>
                  <TableCell align="center">
                    {row.so_Luong_KH_Ban_Le_Khac}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0); // reset về trang đầu khi đổi số dòng
        }}
        rowsPerPageOptions={[5, 10, 20, 50]}
      />
    </Paper>
  );
};

export default ReportTable;
