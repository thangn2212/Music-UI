import axios from "axios";

// Tạo một instance của axios với baseURL là địa chỉ của server backend
const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  // baseURL: "https://a6d00b1e-3e50-446a-94b1-a84b8cfa69c0.mock.pstmn.io",
  // baseURL: "https://127.0.0.1:3000",
});

// Gửi dữ liệu lên server bằng cách thêm interceptor cho request
instance.interceptors.request.use(
  function (config) {
    // Thực hiện một số thao tác trước khi request được gửi đi
    // console.log(config);
    return config;
  },
  function (error) {
    // Xử lý khi có lỗi trong quá trình gửi request
    return Promise.reject(error);
  }
);

// Nhận dữ liệu từ server bằng cách thêm interceptor cho response
instance.interceptors.response.use(
  function (response) {
    // Xử lý khi nhận được response có mã trạng thái nằm trong khoảng 2xx
    return response;
  },
  function (error) {
    // Xử lý khi có lỗi trong quá trình nhận response
    return Promise.reject(error);
  }
);

// Xuất instance của axios để sử dụng trong toàn bộ ứng dụng frontend
export default instance;
