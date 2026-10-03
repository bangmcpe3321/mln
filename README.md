# Vật Chất & Vận Động — Triết học Mác – Lênin

Một bài giảng web tương tác bằng tiếng Việt về **vật chất, vận động, đứng im, không gian, thời gian** và tính thống nhất vật chất của thế giới theo quan điểm Triết học Mác – Lênin.

## ✨ Tính năng

- Giao diện trình chiếu toàn màn hình, responsive trên máy tính và thiết bị di động.
- Điều hướng qua các slide bằng nút mũi tên, menu phân loại và phím tắt.
- Tự động chuyển slide với tùy chọn tạm dừng/phát lại.
- Thanh tiến trình và bộ đếm slide.
- Tìm kiếm nội dung bài giảng theo từ khóa.
- Đánh dấu các slide quan trọng để xem lại.
- Modal hiển thị nội dung chi tiết của từng slide.
- Hỗ trợ hiệu ứng chuyển cảnh và `prefers-reduced-motion`.
- Không yêu cầu framework hoặc bước build — có thể chạy trực tiếp trên trình duyệt.

## 📚 Nội dung bài giảng

Bài giảng gồm các chủ đề chính:

1. Khái niệm vật chất dưới góc độ triết học.
2. Quan niệm về vật chất trong lịch sử triết học.
3. Định nghĩa vật chất của V. I. Lênin.
4. Các phương thức và hình thức tồn tại của vật chất.
5. Vận động và đứng im.
6. Không gian và thời gian.
7. Tính thống nhất vật chất của thế giới.
8. Ý nghĩa phương pháp luận.

Repository cũng chứa tài liệu dạng văn bản về **quy luật lượng – chất** và nội dung slide phục vụ thuyết trình.

## 🗂️ Cấu trúc dự án

```text
.
├── index.html                 # Trang trình chiếu chính
├── styles.css                 # Các kiểu giao diện
├── script.js                  # Tương tác và hiệu ứng phía trình duyệt
├── assets/                    # Hình ảnh và tài nguyên minh họa
├── vat_chat_nhom1_slide.txt   # Nội dung slide Vật chất & Vận động
├── slide_luong_chat.txt       # Nội dung slide Quy luật lượng – chất
└── .gitignore
```

## 🚀 Chạy locally

### Cách 1: Mở trực tiếp

Mở file `index.html` bằng trình duyệt hiện đại.

### Cách 2: Chạy máy chủ tĩnh

Nếu muốn tài nguyên được tải ổn định hơn, có thể dùng một máy chủ HTTP đơn giản:

```bash
# Python 3
python -m http.server 8000
```

Sau đó truy cập `http://localhost:8000`.

## 🌐 Triển khai lên GitHub Pages

1. Vào **Settings → Pages** của repository.
2. Chọn **Deploy from a branch**.
3. Chọn nhánh `main` và thư mục `/ (root)`.
4. Nhấn **Save**.
5. Mở URL GitHub Pages được GitHub cung cấp.

Vì đây là dự án HTML/CSS/JavaScript thuần, không cần cài đặt dependency hoặc chạy quy trình build.

## 🛠️ Công nghệ sử dụng

- HTML5
- CSS3
- JavaScript thuần
- SVG
- Google Fonts: Roboto và Oswald

## ♿ Khả năng truy cập

Dự án sử dụng các thuộc tính ARIA cho nút điều hướng, modal và nội dung động. Các hiệu ứng chuyển động cũng được giảm hoặc tắt khi người dùng bật tùy chọn `prefers-reduced-motion` trong hệ điều hành.

## 👥 Thông tin nhóm

- Chủ đề: Triết học Mác – Lênin
- Ngôn ngữ: Tiếng Việt
- Hình thức: Bài giảng web tương tác
- Nhóm thực hiện: Nhóm 1

## 📄 Giấy phép

Repository hiện chưa khai báo giấy phép cụ thể. Nếu muốn cho phép người khác sử dụng hoặc đóng góp lại mã nguồn, hãy bổ sung một file `LICENSE` phù hợp.
