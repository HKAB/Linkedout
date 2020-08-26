# Bài tập Phát Triển Ứng Dụng Web (INT3306 30)

## Cài đặt và chạy

### 1. Cài đặt

Cài đặt `docker` và `docker-compose`.

Linux (Debian based):
```bash
apt install docker.io docker-compose
```
Windows:

Cài đặt `Docker Desktop` dựa trên `wsl` hoặc `wsl2` theo [hướng dẫn](https://docs.docker.com/docker-for-windows/install/).

### 2. Chạy

Clone project từ github

```
git clone https://github.com/HKAB/summer-weeb-1920H_PTUDW
```

Chạy project bằng `docker-compose`

```
cd summer-weeb-1920H_PTUDW
sudo docker-compose up -d
```

## Sử dụng

Truy cập http://localhost/ để sử dụng trang web.


[![homede30fa302c51c609.gif](https://s7.gifyu.com/images/homede30fa302c51c609.gif)](https://gifyu.com/image/cOFY)

Ngoài ra người dùng có thể truy cập một số dịch vụ khác.
- MySQL Server: `localhost:3307`
- Consul Dashboard: http://localhost:8500/
- Prometheus + Grafana Dashboard: http://localhost:8002/ (tài khoản và mật khẩu mặc định: `admin:admin`)
- Admin UI: http://localhost/admin

## Dữ liệu mẫu

Có thể sử dụng dữ liệu mẫu tại đây: [Data-sample.sql](https://drive.google.com/file/d/1I3WYE6YC5bnQ2MvwNN2rMTv5WU2_apxo/view?usp=sharing)

Import dữ liệu trên vào MySQL Server thông qua `localhost:3307`, database schema là `backend`.

Trong bộ dữ liệu mẫu có:
- 6 tài khoản sinh viên: `student1` - `student6`, mật khẩu giống tên tài khoản.
- 3 tài khoản doanh nghiệp: `company7` - `company9`, mật khẩu giống tên tài khoản.
- Các tags về `Kỹ năng`, `Địa điểm`, `Trường Đại học`.
- Tài khoản quản trị: `admin:admin` (Đăng nhập tại http://localhost/admin)
