# Vật Chất & Vận Động — Triết học Mác – Lênin

Một bộ tài liệu web tương tác bằng tiếng Việt về **vật chất, vận động, đứng im, không gian, thời gian** và tính thống nhất vật chất của thế giới theo quan điểm Triết học Mác – Lênin — kèm một **game mô phỏng kinh tế về độc quyền**.

## 🚪 Cổng chọn (`index.html`)

Trang chủ là một cổng chọn với ba định dạng trải nghiệm:

| Thẻ | Tệp | Nội dung |
|---|---|---|
| 3D Slide Deck | `deck.html` | Sân khấu thuyết trình 20 slide thẻ 3D, phím Space/mũi tên, autoplay |
| Editorial Magazine | `editorial.html` | Tạp chí chuyên khảo toàn văn + 3 sơ đồ SVG động |
| Độc quyền | `docquyen.html` | Game nhập vai kinh tế 12 chương, 6 kết thúc, 1–4 người chơi |

Phím tắt: `1`/`s` Slide Deck · `2`/`e` Editorial · `3`/`g` Độc quyền. Mỗi thẻ có hiệu ứng chuyển cảnh (curtain) theo màu riêng.

> `index.html` và `hub.html` là bản sao byte-for-byte. Sau khi sửa một bên, đồng bộ lại.

## 🎮 Game Độc quyền (`docquyen.html`)

> Bản phát hành riêng của game: **https://bangmcpe3321.github.io/docquyen/**
> (repo: https://github.com/bangmcpe3321/docquyen)

Mô phỏng 12 chương từ một quán trà nhỏ (Đà Nẵng 2019) đến quyết định cuối cùng năm 2026. Mỗi chương là một tình huống kịch tính — nhà cung cấp giữ giá, đề nghị sáp nhập, phá giá, điều tra báo chí, vốn nhà nước, đình công, thuật toán nền tảng, bữa tối cấu kết, điều tra chống độc quyền, dự thảo hiến chương thị trường.

- **6 chỉ số sống**: Vốn, Thị phần, Uy tín thương hiệu, Niềm tin người tiêu dùng, Quan hệ chính quyền, Áp lực pháp lý.
- **6 kết thúc**: đế chế độc quyền, bị chia tách, phá sản, dẫn đầu nhờ đổi mới, bị tẩy chay, và kết thúc bí mật (cùng thị trường ký hiến chương).
- **Sổ tay kiến thức**: 18 thẻ giải thích cạnh tranh, độc quyền tư nhân/nhà nước, lợi nhuận độc quyền, thôn tính – sáp nhập, thao túng giá, luật chống độc quyền, cartel, đổi mới, chia tách…
- **1–4 người chơi**: hot-seat chuyền máy (có màn hình giữ kín lựa chọn) hoặc 2 người qua WebRTC với mã kết nối copy/paste, không cần máy chủ. Tùy chọn thêm vai Cơ quan quản lý.
- **Multiplayer**: thị phần là tổng không đổi (zero-sum), Niềm tin và Áp lực pháp lý dùng chung; hành động gồm chiến tranh giá, đổi mới, thôn tính, đề nghị sáp nhập, vận động chính sách, cấu kết giữ giá, mở hạ tầng hợp tác.
- Lưu tiến trình bằng `localStorage`; `?fresh=1` để xoá, `?resume=1` để vào thẳng ván đang chơi.

## ✨ Tính năng bài giảng

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
├── index.html                 # Cổng chọn = bản sao của hub.html
├── hub.html                   # Cổng chọn (nguồn chính)
├── deck.html                  # 3D Slide Deck
├── editorial.html             # Tạp chí chuyên khảo Modern Editorial
├── docquyen.html              # Game mô phỏng kinh tế “Độc quyền”
├── styles.css                 # Kiểu giao diện bài giảng
├── script.js                  # Tương tác bài giảng phía trình duyệt
├── assets/                    # Hình ảnh và tài nguyên minh họa
├── vat_chat_nhom1_slide.txt   # Nội dung slide Vật chất & Vận động
├── slide_luong_chat.txt       # Nội dung slide Quy luật lượng – chất
├── memory.md                  # Bộ nhớ kỹ thuật của dự án
├── LICENSE                    # Giấy phép MIT
└── .gitignore
```

## 🚀 Chạy locally

### Cách 1: Mở trực tiếp

Mở file `index.html` bằng trình duyệt hiện đại, rồi chọn một trong ba thẻ. Game `docquyen.html` cũng có thể mở trực tiếp.

### Cách 2: Chạy máy chủ tĩnh

Nếu muốn tài nguyên được tải ổn định hơn (và để WebRTC hoạt động đúng trên một số trình duyệt), có thể dùng một máy chủ HTTP đơn giản:

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

Mã nguồn của dự án được phát hành theo **MIT License**. Xem đầy đủ điều khoản trong file [`LICENSE`](LICENSE).

MIT cho phép sử dụng, sao chép, chỉnh sửa, phân phối và sử dụng thương mại, với điều kiện giữ lại thông báo bản quyền và nội dung giấy phép.

### Nội dung và tài nguyên bên thứ ba

MIT License chỉ áp dụng cho mã nguồn và tài liệu do dự án sở hữu. Hình ảnh, phông chữ, trích dẫn, sơ đồ hoặc nội dung do bên thứ ba cung cấp có thể có điều khoản riêng. Hãy kiểm tra và tuân thủ giấy phép hoặc yêu cầu ghi công tương ứng trước khi tái phân phối các tài nguyên đó.
