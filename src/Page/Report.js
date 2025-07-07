import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Grid,
  Box,
  MenuItem,
  Stack,
  AppBar,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ReportTable from "../Component/ReportTable";
import apiService from "../api/apiService";
import SimpleAppBar from "../Component/SimpleAppBar";
import { useWatch } from "react-hook-form";

export default function Report() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      FromDate: null,
      ToDate: null,
    },
  });
  // const [fromDate, setFromDate] = React.useState(dayjs());
  // const [toDate, setToDate] = React.useState(dayjs());
  const fromDate = useWatch({ control, name: "FromDate" });
  const toDate = useWatch({ control, name: "ToDate" });
  const [loadingTrending, setLoadingTrending] = useState();
  const [reportData, setReportData] = useState(null);

  const fetchData = async () => {
    try {
      setLoadingTrending(true);
      const res = await apiService.post("/api/DataReport", {
        loai_baoCao: "BC01.1",
        fromDate: fromDate.format("YYYY-MM-DD"),
        toDate: toDate.format("YYYY-MM-DD"),
        ma_CN: "CNSG",
        ma_PGD: "PGDSG",
        is_BaoGomDuNoDaXLRR: false,
      });
      const result = res.data;
      console.log("Data fetched successfully:", result);
      console.log("check success", result.success);
      if (result.success) {
        setReportData(result);
        console.log("Report data:", result);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const exportData = async () => {
    try {
      const response = await apiService.post(
        "/api/ExportData", // thay bằng endpoint export của bạn
        {
          // payload nếu cần
          loai_baoCao: "BC01.1",
          fromDate: fromDate.format("YYYY-MM-DD"),
          toDate: toDate.format("YYYY-MM-DD"),
          ma_CN: "CNSG",
          ma_PGD: "PGDSG",
          is_BaoGomDuNoDaXLRR: false,
        },
        {
          responseType: "blob", // ⚠️ Quan trọng
        }
      );

      // Tạo URL và tải file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      // Đặt tên file (hoặc lấy từ response.headers nếu có)
      link.setAttribute("download", "baocao.xlsx");
      document.body.appendChild(link);
      link.click();

      // Xoá sau khi xong
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Lỗi khi export Excel:", error);
    }
  };

  const onSubmit = (data, event) => {
    const action = event?.nativeEvent?.submitter?.value;
    if (action === "search") {
      console.log("Searching with data:", data);
      fetchData();
    } else if (action === "export") {
      exportData();
    }
    // Thực hiện xử lý đăng nhập ở đây (gọi API, xác thực, ...)
  };

  return (
    <>
      <SimpleAppBar />
      <Box sx={{ mt: 12, mb: 2 }}></Box>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
          <Grid
            container
            spacing={2}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Grid item xs={12}>
              <TextField
                label="Loại Báo Cáo"
                select
                fullWidth
                sx={{ width: 330 }}
                defaultValue="BC01.1"
                {...register("LoaiBaoCao")}
              >
                <MenuItem value="BC01.1">
                  Báo Cáo Số Dư Hệ Thống Bán Lẻ
                </MenuItem>
                <MenuItem value="BC01.2">
                  Báo Cáo Số Dư Hệ Thống Bán Buôn
                </MenuItem>
                <MenuItem value="BC02">Báo Cáo Tăng Trưởng Hệ Thống</MenuItem>
                <MenuItem value="BC03">Báo Cáo Số Dư CN/PGD</MenuItem>
                <MenuItem value="BC04">KH Phát Sinh Mới Trong 1 Năm</MenuItem>
                <MenuItem value="BC05">KH Phát Sinh Mới Trong Quý</MenuItem>
                <MenuItem value="BC06">
                  KH Chuyển Nhóm Nợ Từ Nhóm 1 Sang 2 Trong Vòng 1 Năm
                </MenuItem>
                <MenuItem value="BC07">
                  KH Chuyển Nhóm Nợ Từ Nhóm 1 Sang 2 Trong Quý
                </MenuItem>
                <MenuItem value="BC08">
                  KH Chuyển Nợ Xấu Trong Vòng 1 Năm
                </MenuItem>
                <MenuItem value="BC09">KH Chuyển Nợ Xấu Trong Quý</MenuItem>
                <MenuItem value="BC10">
                  Top 20 KH Dư Nợ Lớn Nhất Của CN/PGD
                </MenuItem>
                <MenuItem value="BC11">Dự Nợ Theo Nghành</MenuItem>
                <MenuItem value="BC12">
                  Top 20 KH Dư Nợ Lớn Nhất Theo Nghành
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Gồm Dư Nợ Đã Xử Lý Rủi Ro"
                select
                fullWidth
                sx={{ width: 330 }}
                defaultValue="False"
                {...register("GomDuNoDaXLRR")}
              >
                <MenuItem value="True">Có</MenuItem>
                <MenuItem value="False">Không</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Box sx={{ m: 2 }}></Box>
          <Grid
            container
            spacing={2}
            display={"flex"}
            justifyContent={"space-between"}
          >
            <Grid item xs={12}>
              <TextField
                label="CHI NHÁNH"
                select
                fullWidth
                sx={{ width: 330 }}
                defaultValue="CNSG"
                {...register("MaCN")}
              >
                <MenuItem value="CNSG">CN Sài Gòn</MenuItem>
                <MenuItem value="CNHN">CN Hà Nội</MenuItem>
                {/* Vòng lặp hiển thị  */}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="PHÒNG GIAO DỊCH"
                select
                fullWidth
                sx={{ width: 330 }}
                defaultValue="PGDSG"
                {...register("MaPGD")}
              >
                {/* Vòng lặp hiển thị  */}
                <MenuItem value="PGDSG">PGD Sài Gòn</MenuItem>
                <MenuItem value="PGDHN">PGD Hà Nội</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Box sx={{ m: 2 }}></Box>
          <Grid
            container
            spacing={2}
            display="flex"
            justifyContent="space-between"
          >
            {/* TỪ NGÀY */}
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="FromDate"
                  control={control}
                  render={({ field, fieldState }) => (
                    <DatePicker
                      label="Từ Ngày"
                      value={field.value}
                      onChange={(newValue) => field.onChange(newValue)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!fieldState.error,
                          helperText: fieldState.error?.message,
                        },
                      }}
                      sx={{ width: 330 }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            {/* ĐẾN NGÀY */}
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="ToDate"
                  control={control}
                  rules={{
                    validate: (toDate) => {
                      if (!fromDate) {
                        return 'Vui lòng chọn "Từ Ngày" trước';
                      }
                      if (
                        toDate &&
                        dayjs(toDate).isBefore(dayjs(fromDate), "day")
                      ) {
                        return '"Đến Ngày" không được trước "Từ Ngày"';
                      }
                      return true;
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <DatePicker
                      label="Đến Ngày"
                      value={field.value}
                      onChange={(newValue) => field.onChange(newValue)}
                      disabled={!fromDate}
                      minDate={fromDate ? dayjs(fromDate) : undefined}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!fieldState.error,
                          helperText: fieldState.error?.message,
                        },
                      }}
                      sx={{ width: 330 }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Box sx={{ m: 2 }}></Box>
          <Grid container spacing={2} display={"flex"} justifyContent={"end"}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                type="submit"
                name="action"
                value="search"
              >
                Tra Cứu
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                type="submit"
                name="action"
                value="export"
              >
                EXPORT EXCEL
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
      {reportData ? (
        <Box>
          <ReportTable data={reportData.data} />
        </Box>
      ) : null}
    </>
  );
}
