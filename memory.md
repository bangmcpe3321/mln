# memory.md — Bộ nhớ dự án

Cập nhật: 2026-11-08 · Nhánh `main` · Mục tiêu: bài báo cáo Triết học Mác – Lênin (Nhóm 1) có nhiều định dạng trình bày, trong đó có **game mô phỏng kinh tế về độc quyền**.

---

## 1. Bối cảnh & yêu cầu

`spec.txt` (chưa track) mô tả game **“Độc quyền”**:

- Chủ đề: độc quyền trong kinh tế thị trường — hình thành, lợi ích/tác hại, vai trò cạnh tranh, người tiêu dùng, Nhà nước.
- Phải lồng ghép: độc quyền tư nhân, độc quyền nhà nước, lợi nhuận độc quyền, thôn tính & sáp nhập, thao túng giá, luật chống độc quyền.
- Cốt truyện: khởi nghiệp nhỏ → 12 chương → tổng công ty; mỗi chương một tình huống kịch tính; 2–4 lựa chọn/chương.
- 6 chỉ số 0–100: **Vốn, Thị phần, Uy tín thương hiệu, Niềm tin người tiêu dùng, Quan hệ chính quyền, Áp lực pháp lý**.
- Thẻ kiến thức hiện sau quyết định quan trọng, lưu vào **Sổ tay**.
- ≥6 kết thúc: đế chế độc quyền, bị chia tách, phá sản, dẫn đầu nhờ đổi mới, bị tẩy chay, kết thúc bí mật. Mỗi kết thúc có màn riêng: lời bình, tóm tắt hành trình, bài học kinh tế.
- Multiplayer 2–4 (cùng máy hot-seat + online WebRTC mã copy/paste), tùy chọn vai **Cơ quan quản lý**; lựa chọn kín → công bố đồng thời; thị phần zero-sum; Niềm tin & Áp lực pháp lý dùng chung.
- Kỹ thuật: **một file HTML duy nhất**, HTML/CSS/JS thuần, không thư viện ngoài, chạy mobile + desktop, dữ liệu truyện tách thành object ở đầu file, nút “Chơi lại”, đếm kết thúc đã mở (x/6), tiếng Việt có dấu.

---

## 2. Cấu trúc repository

```text
.
├── index.html                  # Cổng chọn (byte-identical với hub.html) — 3 thẻ
├── hub.html                    # Bản gốc của cổng chọn
├── deck.html                   # 3D Slide Deck (bản trình chiếu)
├── editorial.html              # Tạp chí chuyên khảo Modern Editorial
├── docquyen.html               # GAME Độc quyền (1 file, ~2.4k dòng)
├── spec.txt                    # Đề bài game (chưa track)
├── styles.css, script.js       # Bài giảng Vật chất & Vận động (cũ)
├── assets/                     # Ảnh, trong đó có poster Lênin làm nền hub
├── vat_chat_nhom1_slide.txt
├── slide_luong_chat.txt
├── README.md                   # Mô tả dự án (đã cập nhật)
├── LICENSE                     # MIT
└── memory.md                   # File này
```

`index.html` **phải luôn là bản sao byte-for-byte của `hub.html`** (deploy GitHub Pages dùng index). Sau khi sửa hub, chạy:

```powershell
cmd /c "copy /y hub.html index.html && fc /b hub.html index.html"
```

---

## 3. Cổng chọn (`hub.html` / `index.html`)

- 3 thẻ `a.portal-card`: `.card-deck` (amber, phím `1`/`s`), `.card-editorial` (red, phím `2`/`e`), `.card-game` (jade, phím `3`/`g`).
- Chuyển cảnh bằng “curtain” theo theme: `.theme-amber`, `.theme-red`, `.theme-jade`; `startTransition(url, theme, card)` chờ 380 ms rồi `location.href`.
- JS giữ `isNavigating` chống double-click; `pageshow` (bfcache) reset trạng thái.
- Nền: poster Lênin `assets/images/Gemini_Generated_Image_t4rte8t4rte8t4rt.png`, vignette, grid, đèn pin theo chuột (`#mouse-torch`).
- Thẻ game dùng mockup 5 cột bar (`mini-game-canvas` + `mini-bar-col` + `mini-game-axis`) và tag “12 ch.”.

## 4. Game (`docquyen.html`)

### 4.1 Cấu trúc file (script chia “module” bằng comment)

| Dòng (xấp xỉ) | Khối | Nội dung |
|---|---|---|
| 423 | `01-data-a.js` | `STORY`: meta, 6 stats, 18 thẻ kiến thức, 6 endings, chương 1–6 |
| 821 | `02-data-b.js` | chương 7–12 (push vào `STORY.chapters`) |
| 1020 | `10-engine.js` | localStorage keys, `MP_ACTIONS`, `REG_ACTIONS`, utils, `makePlayer`, `baseState`, `startSolo`, `startHotseat`, effects, `determineEnding`, `marketOutcome` |
| 1304 | `05-mpdata.js` | `MP_EVENTS` (12 biến cố), `mpChoices()` |
| 1330 | `20-ui-a.js` | `state`, `pending`, `NET`, `saveGame/loadSaved`, `renderTitle`, `openSetup`, `renderSetup`, `renderOnlinePanel` |
| 1530 | `21-flow.js` | `chapterChoices`, HUD, `renderChapter`, `renderHandoff`, `choose`, `resolveSolo`, `resolveRound`, `openResult`, `openReveal`, `continueGame`, notebook/menu |
| 1981 | `22-ui-c.js` | `finishGame`, `renderEnding` |
| 2068 | `30-boot.js` | WebRTC, `render()` dispatcher, `goHome`, `restartGame`, delegated events, boot |

### 4.2 Bản đồ 12 chương (solo)

1. Quán nhỏ bên dốc — Đà Nẵng 2019
2. Lá trà và cái giá — Thái Nguyên 2020 (nhà cung cấp Phương Nam 80%)
3. Lời đề nghị từ Trà Vương — HCM 2021 (đề nghị mua 70% cổ phần)
4. Cuộc chiến một nghìn đồng — Hà Nội 2022 (Trà 24h phá giá)
5. Bài báo lúc sáu giờ sáng — Đà Nẵng 2022 (điều tra báo chí)
6. Cánh cửa mở từ Nhà nước — Hà Nội 2023 (51% vốn nhà nước)
7. Tiếng trống trước cổng nhà máy — Bình Dương 2023 (đình công)
8. Ứng dụng của ai? — HCM 2024 (thuật toán nền tảng, kiện Hạt Mầm)
9. Bữa tối ở phòng kín — Đà Lạt 2024 (cấu kết giữ giá)
10. Cuộc gọi từ Ủy ban — Hà Nội 2025 (điều tra chống độc quyền)
11. Lời mời từ phía bên kia — Hà Nội 2025 (dự thảo hiến chương, tự giới hạn 45%)
12. Mười hai năm, một cái tên — 2026 (ba kế hoạch cuối)

Mỗi lựa chọn: `{id, label, hint, req?, reqText?, effects{6 chỉ số}, card?, flags{}, result}`.

### 4.3 Chỉ số & công thức

- Khởi đầu solo: `capital 20, share 8, brand 12, gov 35, market {trust 55, legal 8}`.
- Hotseat: `capital 24`, share chia đều (người đầu lấy phần dư), `brand 14`, `gov 35`.
- **Doanh thu vận hành** mỗi chương: `+round(share × 0.18)` vốn (áp dụng ở cả solo và multi).
- `normalizeShares`: mỗi công ty ≥2, tổng = 100, phần lệch dồn cho công ty dẫn đầu.
- Chỉ số chung trong multi: **chỉ áp dụng một lần mỗi vòng** qua `applyAverageMarket` (trung bình delta của các công ty). `applyEffectsToPlayer(..., {deferMarket:true})` chỉ ghi delta thô, không đụng `state.market`.
- `determineEnding` (thứ tự ưu tiên): capital ≤8 → bankrupt; **charter + trust ≥55 + gov ≥50** → secret (multi yêu cầu *tất cả* đều có `flags.charter`; solo cần `coalition` hoặc `finalOpen`); capital ≤14 & share ≤12 & trust ≤45 → bankrupt; legal ≥72 → breakup; cartel & legal ≥58 & trust ≤42 → breakup; trust ≤24 → boycott; share ≥62 → empire; còn lại chấm điểm có trọng số giữa empire/innovation/boycott/breakup.
- `marketOutcome`: `cartel-fine` (cartelEver & legal ≥65) → `charter` (mọi công ty có charter) → `dominant` (leader ≥62) → `healthy` (legal ≤32 & trust ≥60) → `fragile`.

### 4.4 Multiplayer

`MP_ACTIONS` (7): `price`, `innovate`, `acquire`, `merge`, `lobby`, `cartel`, `open`.
`REG_ACTIONS` (4): `investigate`, `protect`, `support`, `wait`.

Cơ chế đặc biệt trong `resolveRound`:

- **Cấu kết**: ≥2 người chọn `cartel` → mỗi công ty +5 vốn, trust −10, legal +14, mở thẻ `cartel` + `thao-tung-gia`, cờ `extra.cartelDetected`.
- **Chiến tranh giá**: ≥2 người chọn `price` → mỗi công ty −4 vốn, trust +3.
- **Sáp nhập**: chỉ thành công khi **hai bên cùng nhắm vào nhau** (mỗi bên nhắm đối thủ lớn nhất của mình). Bên lớn giữ thương hiệu (brand +2, capital +2), bên nhỏ thành thương hiệu con giữ 8% thị phần (brand +1, capital +4); phần thị phần còn lại chuyển cho bên lớn. Cờ `merged` / `mergedInto`. Đề nghị không được đáp lại: −2 vốn, legal +2, `extra.mergeFailed = <số người>`.
- **Thôn tính** (`acquire`): lấy 1–4% từ đối thủ lớn nhất.
- **Cơ quan quản lý**: `investigate` legal +8; `protect` trust +7 / legal −3; `support` leader −3, người khác +3, trust +3; `wait` leader +2.

Hot-seat: mỗi người chọn kín → màn `handoff` “Chuyển cho …” → công bố chung ở `openReveal`.
Online: host tạo offer → guest trả answer (SDP base64 `{t,s}`) → data channel. Guest gửi `hello`/`pick`; host gửi `state`. Host là nguồn sự thật duy nhất cho nhịp chương. Lỗi mất kênh khi guest chọn → toast cảnh báo (`toastNetError`), không treo im lặng.

### 4.5 Lưu trữ

- `dq_save_v1` — state (null khi kết thúc ván hoặc khi đang online).
- `dq_cards_v1` — mảng id thẻ đã mở.
- `dq_endings_v1` — mảng id kết thúc đã mở.
- Query: `?fresh=1` xoá save; `?resume=1` vào thẳng ván đang chơi.
- Save tự hạ phase `result`/`reveal`/`waiting` về `choose` (solo) hoặc `handoff` (hotseat) để tránh mở lại modal.

---

## 5. Kiểm chứng đã chạy

Harness tạm (không nằm trong repo): `%TEMP%\opencode\dq_test.js`, `dq_enum.js`, `dq_mp_test.js`.

- `node --check` trên toàn bộ script: **pass**.
- **Duyệt toàn bộ** cây lựa chọn solo (có `meetsReq`): **96.511 đường chơi**; cả 6 kết thúc đều tới được:
  - empire 38.378 · innovation 40.126 · secret 14.242 · breakup 1.117 · boycott 154 · bankrupt 2.494.
- Multiplayer: 4 người + cơ quan quản lý, 12 vòng ngẫu nhiên liên tiếp không lỗi; tổng thị phần luôn = 100.
- Đã xác nhận bằng test: chỉ số chung chỉ đổi 1 lần/vòng (trước đây đổi 2 lần), sáp nhập đối xứng hoạt động, đề nghị một phía bị tính là thất bại, secret chỉ mở khi cả nhóm ký hiến chương.

---

## 6. Việc đã làm trong phiên này

1. **Sửa lỗi cộng dồn chỉ số chung** trong multiplayer (`deferMarket` + `applyAverageMarket`).
2. **Thêm hành động “Đề nghị sáp nhập”** (`merge`) đúng như spec, kèm logic hai chiều và hiển thị kết quả trong `openReveal`.
3. **Siết điều kiện kết thúc bí mật** ở chế độ nhiều người: cần toàn bộ công ty ký hiến chương.
4. **Thêm nút về cổng chọn** trong game: brand mark, top bar, menu, màn kết thúc (dùng `index.html`).
5. **Đưa game lên cổng chọn**: thẻ thứ 3 `.card-game` (jade), hotkey `3`/`g`, curtain `theme-jade`, mockup bar chart.
6. **Đồng bộ `index.html` = `hub.html`**.
7. Sửa lỗi nhỏ: guest online không tự chuyển chương; host broadcast state khi kết thúc ván; bỏ broadcast trùng trong `resolveOnlineRound`; không gửi `_hostPick` sang máy khách; sửa chính tả “Chuyền” → “Chuyển”.

---

## 7. Phát hành (repo riêng cho game)

Game được tách ra một repository công khai riêng:

- **Repo:** https://github.com/bangmcpe3321/docquyen
- **GitHub Pages:** https://bangmcpe3321.github.io/docquyen/
- **Nội dung:** `index.html` (trang giới thiệu riêng, nút vào game), `docquyen.html` (bản sao của file trong repo chính), `README.md` (mô tả game), `LICENSE`.
- **Quy trình cập nhật:** copy `docquyen.html` mới sang `%TEMP%\opencode\dqpub`, commit, `git push`, rồi copy ngược về repo `mln`.

Khác biệt của bản phát hành: link điều hướng trong game trỏ tới `index.html` của **repo game** (trang giới thiệu), không phải cổng chọn 3 thẻ của repo `mln`. Vì vậy nhãn đã đổi thành “Trang chủ / Về trang chủ”, không còn “Cổng chọn”.

## 8. Việc nên làm tiếp

- [ ] Kiểm thử online thật giữa hai máy/trình duyệt (STUN Google có thể fail sau NAT đối xứng — chấp nhận được với LAN/demo).
- [ ] Rà lại `deck.html` (đang có thay đổi chưa commit từ trước — chỉ là sửa số thứ tự "1./2./3." trong `modalHeading` và `<strong>` trong `modalContent`, nội dung không đổi).
- [x] Track `spec.txt` (đã commit cùng game).
- [ ] Cân nhắc thêm nút “Sổ tay” hiển thị tiến độ thẻ trên màn kết thúc (hiện chỉ có nút mở).
- [x] `prefers-reduced-motion` cho mockup bar ở hub (đã có global rule `*{animation:none!important}`).
