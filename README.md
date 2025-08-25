# Trình phát nhạc đơn giản cho GitHub Pages

Đây là một trình phát nhạc đơn giản, được thiết kế để chạy trực tiếp trên GitHub Pages với giao diện hiện đại.

## Tính năng mới: Giao diện đẹp

-   **Giao diện tối (Dark Mode):** Giao diện chuyên nghiệp và dễ nhìn.
-   **Ảnh đại diện (Album Art):** Tự động hiển thị ảnh cho từng bài hát.
-   **Biểu tượng điều khiển:** Các nút điều khiển trực quan.
-   **Thanh tiến trình:** Theo dõi và tua bài hát.

## Hướng dẫn sử dụng (Workflow)

### Bước 1: Thêm file âm thanh và ảnh

-   Sao chép các file nhạc của bạn vào thư mục `data/audio`.
-   **(Tùy chọn)** Để hiển thị ảnh đại diện, hãy đặt một file ảnh (`.jpg`, `.png`) có **cùng tên** với file nhạc vào cùng thư mục `data/audio`.
    -   Ví dụ: `bai_hat_1.mp3` và `bai_hat_1.jpg`.
    -   Nếu không có ảnh, một ảnh mặc định sẽ được sử dụng.

### Bước 2: Chạy Script để cập nhật danh sách

Mỗi khi bạn thay đổi file trong `data/audio`, bạn **bắt buộc** phải chạy lệnh sau trong terminal:

```bash
python generate_file_list.py
```

Lệnh này sẽ quét thư mục và tạo ra file `file_list.json` mà trang web cần để hiển thị danh sách nhạc.

---

## Hướng dẫn đưa lên GitHub và tạo trang web

Làm theo các bước sau để đưa dự án lên mạng.

### 1. Đưa code lên GitHub

Nếu bạn chưa đưa dự án lên, hãy chạy các lệnh sau (nhớ thay URL kho chứa của bạn):

```bash
git init
git add .
git commit -m "Tạo trình phát nhạc"
git branch -M main
git remote add origin "URL-KHO-CHUA-CUA-BAN"
git push -u origin main
```

Nếu bạn đã có sẵn và chỉ muốn cập nhật, hãy chạy:

```bash
git add .
git commit -m "Cập nhật danh sách nhạc"
git push
```

**Quan trọng:** Hãy chắc chắn rằng bạn đã chạy `python generate_file_list.py` và file `file_list.json` đã được cập nhật trước khi đẩy code lên.

### 2. Kích hoạt GitHub Pages

1.  Trên trang kho chứa GitHub của bạn, vào **Settings**.
2.  Ở menu bên trái, chọn **Pages**.
3.  Trong phần "Build and deployment", mục "Source", chọn **Deploy from a branch**.
4.  Trong mục "Branch", chọn `main` và thư mục là `/(root)`.
5.  Nhấn **Save**.

Đợi vài phút, trang web của bạn sẽ hoạt động tại địa chỉ có dạng: `https://TEN-CUA-BAN.github.io/TEN-KHO-CHUA/`
