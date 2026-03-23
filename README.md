# CTU Timetable Exporter

Tiện ích mở rộng (Extension) dành cho trình duyệt, giúp sinh viên Đại học Cần Thơ (CTU) dễ dàng thu thập và xuất dữ liệu danh mục học phần (thời khóa biểu) thành file Excel trực tiếp từ trang web Đăng ký học phần.

## ✨ Tính năng nổi bật
- **Tiện lợi & Tự động**: Tự động lật trang và quét toàn bộ danh sách lớp của một hoặc nhiều mã học phần cùng lúc chỉ với 1 cú click.
- **Xuất file Excel trực quan**: Tự động tự căn chỉnh độ rộng cột vừa vặn, chia sheet riêng biệt cho từng mã học phần và hiển thị một sheet tổng hợp.
- **Quản lý danh sách linh hoạt**: Theo dõi tiến trình phần trăm (%) siêu mượt trực tiếp trên màn hình. Cho phép **thêm mới** môn chưa quét hoặc **xóa bớt** các môn bị nhập nhầm mà không cần phải chạy lại từ đầu.
- **Giao diện hiện đại**: Tone màu Dark Mode đồng bộ và đẹp mắt, không làm phá vỡ giao diện hệ thống tín chỉ cũ.

---

## 🚀 Hướng dẫn cài đặt

### 1. Cài đặt từ Chrome Web Store (Khuyên dùng)
Bạn có thể cài đặt trực tiếp từ cửa hàng Chrome để nhận được các bản cập nhật tự động:
👉 **[Tải CTU Timetable Exporter trên Chrome Web Store](https://chromewebstore.google.com/detail/ctu-timetable-exporter/jbkkdknllghjdfmobfnmeimbgfjmjpag)**

### 2. Cài đặt thủ công (Dành cho nhà phát triển)
Nếu bạn muốn sử dụng bản phát triển hoặc tự build từ mã nguồn:
1. Tải toàn bộ mã nguồn của extension này về máy tính và giải nén (ví dụ thư mục `CTU-Timetable-Extension`).
2. Mở trình duyệt Chrome/Cốc Cốc/Edge.
3. Truy cập vào trang quản lý tiện ích:
   - Chrome/Cốc Cốc: Gõ `chrome://extensions/` vào thanh địa chỉ.
   - Edge: Gõ `edge://extensions/`.
4. Tìm và bật **Chế độ dành cho nhà phát triển (Developer mode)** ở góc trên cùng bên phải màn hình.
5. Bấm vào nút **Tải tiện ích đã giải nén (Load unpacked)** ở góc trên cùng bên trái.
6. Chọn thư mục `CTU-Timetable-Extension` mà bạn vừa giải nén. Extension sẽ được cài đặt và hiện lên khung danh sách.

---

## 📖 Hướng dẫn sử dụng

1. Đăng nhập vào trang web Quản lý đào tạo của CTU và đi đến mục **Đăng ký học phần > Danh mục học phần**.  
   👉 *Extension sẽ tự động nhận diện trang mục tiêu này và hiển thị thanh công cụ **CTU Exporter** màu đen ở trên mép cùng của màn hình.*
   
2. Điền thông tin chuẩn bị:
   - **Năm học**: Điền theo định dạng `YYYY-YYYY` (Ví dụ: `2025-2026`) hoặc `YY-YY` (`25-26`).
   - **Học kỳ**: Chọn học kỳ hiện tại từ danh sách thả xuống.
   - **Mã học phần**: Điền chuỗi các mã học phần bạn muốn quét, phân cách nhau bằng dấu phẩy (Ví dụ: `CT101, ML014, XH025`).

3. Bấm nút **▶ Bắt đầu** để extension làm phần việc còn lại:
   - Thanh tiến trình phần trăm màu xanh sẽ chạy mượt mà theo thời gian thực.
   - Vui lòng **không đóng hoặc F5 tải lại trang** trong khi thanh tiến trình đang chạy. Thời gian thu thập phụ thuộc vào số trang môn học và độ trễ của website.
   
4. Sau khi tiến trình hoàn tất (hiển thị **✓ Hoàn thành...**):
   - Bạn có thể bấm nút **⬇ Tải tệp Excel** để lưu file `.xlsx` về thiết bị ngay lập tức.
   - Hoặc, bấm **＋ Thêm môn** nếu chợt nhớ ra cần bổ sung vài mã môn nữa bổ sung vào bảng tính hiện tại (môn mới sẽ được quét ngầm và nối tự động vào danh sách cũ).
   - Nếu đổi ý không muốn lấy mã nào đó nữa, bấm **－ Xóa môn**, nhấp vào dấu (x) bên cạnh tên môn học và bấm "Xong".

5. Nếu quá trình xuất hiện lỗi (do mạng yếu / rớt kết nối), extension sẽ báo Lỗi (Error), bạn có thể click nút **↺ Thử lại** để quét lại đúng những môn đó.

---

## ⚠️ Lưu ý chung
- Extension yêu cầu bạn phải đang đăng nhập bằng tài khoản sinh viên CTU hợp lệ.
- Tốc độ lấy dữ liệu hoàn toàn phụ thuộc vào hệ thống trả về kết quả của website CTU (nhanh hay ngẽn mạng).

*Extension Developer: Huaniverse*
