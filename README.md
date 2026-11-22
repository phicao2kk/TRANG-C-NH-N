# Portfolio Muhammad Al-Fari Yusuf (Recreated with Pure Vanilla Code)

Bản tái tạo 1:1 trang web portfolio [https://www.alfari.my.id/](https://www.alfari.my.id/) của Muhammad Al-Fari Yusuf hoàn toàn bằng **code gốc (Pure Vanilla HTML5, CSS3, Modern JavaScript)** mà không cần cài đặt các framework nặng nề (No React/Next.js/Tailwind build step).

---

## 🌟 Tính Năng Nổi Bật

1. **Hiệu ứng Starfield & Shooting Stars (Canvas 2D)**:
   - Nền không gian vũ trụ với các vì sao lấp lánh (twinkling) chuyển động nhẹ và thỉnh thoảng có sao băng bay qua.
2. **Interactive Physics Lanyard & 3D ID Card**:
   - Thẻ ID lập trình viên treo dây có vật lý quán tính (Spring physics & Verlet simulation).
   - Có thể kéo thả (drag & drop) bằng chuột hoặc cảm ứng trên điện thoại.
3. **Spider-Man Suit Reveal Effect (About Me)**:
   - Khi di chuột (hover) vào chân dung, hiệu ứng quét laser/scanline kích hoạt và lộ diện bộ đồ Spider-Man của nhân vật.
4. **Hệ thống Âm Thanh Ambient Synthwave (Web Audio API)**:
   - Bộ tổng hợp âm thanh ambient lofi synthesizer tích hợp sẵn, không phụ thuộc file MP3 bên ngoài.
   - Nút bật/tắt âm thanh ở góc thanh điều hướng với hoạt ảnh sóng âm (equalizer bars).
5. **Thanh Điều Hướng Nổi (Floating Pill Navbar & ScrollSpy)**:
   - Hiệu ứng kính mờ (glassmorphism), viên thuốc highlight trượt mượt mà theo vị trí cuộn trang.
6. **Portfolio Showcase 4 Tabs**:
   - Tab **Projects**: Các dự án nổi bật (*CYBER GYZN*, *Bot Generate Artikel*, *Database Siswa*) kèm modal xem chi tiết.
   - Tab **Certificates**: 3 chứng chỉ (PKL STEKOM, Udemy CSS/JS, Udemy Web Dev) có modal Lightbox phóng to.
   - Tab **Achievements**: Piagam Juara III Bidang Studi IPS Terpadu.
   - Tab **Tech Stack**: 15 thẻ công nghệ với hiệu ứng phát sáng neon (React, JS, Python, PHP, MySQL, Supabase, Firebase, v.v.).
7. **Interactive Guestbook / Bình luận thời gian thực**:
   - Cho phép người dùng nhập tên, chọn avatar và gửi bình luận.
   - Lưu trữ qua `localStorage` để dữ liệu bình luận được lưu lại ngay cả khi tải lại trang.
8. **Responsive Design**:
   - Tối ưu hóa mượt mà trên cả PC, Tablet và Mobile.

---

## 📂 Cấu Trúc Thư Mục

```
alfari-portfolio/
├── index.html       # Mã nguồn HTML5 ngữ nghĩa chuẩn, đầy đủ nội dung
├── style.css        # Toàn bộ CSS tạo giao diện không gian, hiệu ứng kính mờ và hoạt ảnh
├── script.js        # Logic JavaScript gốc: Vật lý Lanyard, Starfield, Audio Synthesizer, Modal, Tabs
└── README.md        # Hướng dẫn sử dụng
```

---

## 🚀 Hướng Dẫn Sử Dụng

Bạn chỉ cần mở trực tiếp file `index.html` bằng bất kỳ trình duyệt web nào (Chrome, Edge, Firefox, Brave,...), hoặc dùng Live Server trong VS Code:

1. **Cách 1: Mở trực tiếp**:
   - Nhấp đúp vào file `index.html`.
2. **Cách 2: Sử dụng Live Server hoặc máy chủ cục bộ**:
   ```bash
   # Nếu có npx / Python:
   python -m http.server 8080
   # hoặc
   npx serve .
   ```
   Sau đó truy cập `http://localhost:8080`.
