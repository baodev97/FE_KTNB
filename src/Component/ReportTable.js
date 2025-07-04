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
  const rowsPerPage = 5;

  const handleChangePage = () => {
    
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Báo cáo Số Dư Hệ Thống Bán Lẻ
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Ngày báo cáo</TableCell>
              <TableCell>Chi nhánh</TableCell>
              <TableCell>PGD</TableCell>
              <TableCell align="right">Tổng dư nợ</TableCell>
              <TableCell align="right">Dư nợ cá nhân</TableCell>
              <TableCell align="right">Dư nợ khác</TableCell>
              <TableCell align="right">Tỷ lệ nợ nhóm 2</TableCell>
              <TableCell align="right">Tỷ lệ nợ xấu</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.ngay_Bao_Cao}</TableCell>
                  <TableCell>{row.ten_CN}</TableCell>
                  <TableCell>{row.ten_PGD}</TableCell>
                  <TableCell align="right">
                    {row.tong_Du_No_Ban_le.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    {row.du_No_Ban_Le_KH_Ca_Nhan.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    {row.du_No_KH_Ban_Le_Khac.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    {(row.ty_Le_No_Ban_Le_Nhom_2 * 100).toFixed(2)}%
                  </TableCell>
                  <TableCell align="right">
                    {(row.ty_Le_No_Xau_Ban_Le * 100).toFixed(2)}%
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
        rowsPerPageOptions={[5]}
      />
    </Paper>
  );
};

export default ReportTable;
