# Product Requirements Document (PRD)

# Synchrotech Race

## Dashboard Admin & License Management System (MVP)

**Version:** 1.0
**Status:** Draft
**Author:** Kemas
**Last Update:** July 2026

---

## 1. Executive Summary

Synchrotech Race merupakan software desktop berbasis PySide6 yang digunakan untuk menampilkan telemetry kendaraan balap.

Saat ini distribusi software dilakukan secara manual melalui file `Setup.exe`. Agar distribusi menjadi lebih aman dan profesional, diperlukan sistem License Management sehingga hanya pelanggan yang telah membeli software yang dapat menggunakannya.

PRD ini menjelaskan kebutuhan Dashboard Admin beserta License Server yang akan digunakan untuk mengelola lisensi software.

---

## 2. Product Goals

Tujuan utama:

- Mengelola seluruh license software.
- Mengelola data customer.
- Membatasi jumlah komputer yang dapat menggunakan license.
- Melakukan aktivasi software.
- Memungkinkan software tetap berjalan secara offline setelah aktivasi.
- Mempermudah proses reset license ketika customer mengganti komputer.

---

## 3. Scope MVP

**Fitur yang termasuk pada MVP:**

- Login Admin
- Dashboard
- Generate License
- List License
- Search License
- Detail License
- Reset Device
- Suspend / Revoke License
- Customer Management
- License Activation API
- License Validation API

**Tidak termasuk:**

- Multi Admin
- Payment Gateway
- Billing
- Invoice
- Subscription Reminder
- Analytics
- Auto Update Software
- Customer Portal

---

## 4. Tech Stack

**Frontend**

- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui

**Backend**

- Next.js API Route
- Prisma ORM

**Database**

- PostgreSQL

Rekomendasi:

- Neon, atau
- Supabase

**Deployment**

- Vercel

---

## 5. User Roles

### Admin

Hanya terdapat satu akun Admin.

Admin memiliki akses penuh terhadap:

- Dashboard
- Customer
- License
- Device Reset
- Suspend License

---

## 6. License Rules

### Format License

Contoh:

```
SYNC-8AF-HRO-91KQ
```

Format:

```
SYNC-XXX-HRO-XXXX
```

### Masa Berlaku

Saat membuat license, Admin dapat memilih:

- Permanent
- 1 Bulan
- 3 Bulan
- 6 Bulan
- 1 Tahun
- Custom

### Maksimum Device

Saat membuat license, Admin dapat menentukan:

**Default:** 1 Device

Namun dapat diubah menjadi:

- 2 Device
- 3 Device
- 5 Device
- Unlimited (opsional untuk masa depan)

### Validasi Berkala

Software akan melakukan validasi ke server setiap **30 hari**.

Jika license masih aktif, maka software tetap dapat digunakan.

Jika:

- License expired
- License revoked

maka software akan meminta aktivasi ulang.

---

## 7. Customer Management

### Data Customer

**Field wajib**

- Team Name

**Field opsional**

- Email
- WhatsApp
- Notes

---

## 8. Dashboard

Dashboard menampilkan card berikut:

- Total License
- Active License
- Inactive License
- Revoked License
- Total Customer

---

## 9. License Module

### Generate License

Admin dapat membuat license baru.

**Input:**

- Customer
- Expired Date
- Max Device
- Notes

**Output:**

License baru, contoh: `SYNC-K8A-HRO-91XT`

### List License

**Kolom:**

- License Key
- Team
- Status
- Expired
- Max Device
- Active Device
- Created At

**Action:**

- Detail
- Reset Device
- Suspend
- Delete

### Detail License

Menampilkan:

- License Key
- Status
- Customer
- Tanggal dibuat
- Tanggal expired
- Jumlah Device
- Daftar Device
- Catatan

### Reset Device

Admin dapat menghapus seluruh device yang terhubung.

Setelah reset, customer dapat melakukan aktivasi ulang.

### Suspend License

Status berubah menjadi **Revoked**. Software tidak akan lolos validasi.

---

## 10. Customer Module

**Menu:** Customer

**Fitur:**

- Create Customer
- Edit Customer
- Delete Customer
- Search Customer
- Detail Customer

---

## 11. License Activation Flow

**Pertama Kali:**

```
Customer
   ↓
Install Setup.exe
   ↓
Membuka Software
   ↓
Input License
   ↓
Software membaca Device ID
   ↓
POST ke API
   ↓
API Validasi
   ↓
License Valid
   ↓
Device disimpan
   ↓
Software aktif
```

---

## 12. License Validation Flow

```
Saat software dijalankan
   ↓
Membaca license lokal
   ↓
Jika sudah 30 hari sejak validasi terakhir
   ↓
Menghubungi API
   ↓
Jika valid
   ↓
Update Last Validation
   ↓
Lanjut membuka software
```

Jika gagal (Expired / Revoked), software meminta aktivasi ulang.

---

## 13. Device Management

Setiap aktivasi menghasilkan Device.

Contoh data:

- Device ID
- PC Name
- Windows Username
- Activation Date
- Last Validation

Jika jumlah device melebihi Max Device, aktivasi ditolak.

---

## 14. Database Design

### users

| Field | Keterangan |
|---|---|
| id | Primary key |
| username | Username admin |
| password_hash | Password ter-hash |
| created_at | Tanggal dibuat |

### customers

| Field | Keterangan |
|---|---|
| id | Primary key |
| team_name | Nama tim (wajib) |
| email | Email (opsional) |
| phone | WhatsApp (opsional) |
| notes | Catatan |
| created_at | Tanggal dibuat |

### licenses

| Field | Keterangan |
|---|---|
| id | Primary key |
| customer_id | Relasi ke customers |
| license_key | Kode license unik |
| status | ACTIVE / INACTIVE / REVOKED |
| expiry_date | Tanggal expired |
| max_devices | Jumlah maksimum device |
| created_at | Tanggal dibuat |
| updated_at | Tanggal update |

### devices

| Field | Keterangan |
|---|---|
| id | Primary key |
| license_id | Relasi ke licenses |
| device_id | ID unik perangkat |
| device_name | Nama PC |
| windows_username | Username Windows |
| activated_at | Tanggal aktivasi |
| last_validation | Validasi terakhir |

---

## 15. API (Ringkasan)

| Method | Endpoint | Akses |
|---|---|---|
| POST | `/api/license/activate` | Public (API Key) |
| POST | `/api/license/validate` | Public (API Key) |
| POST | `/api/license/reset` | Admin only |
| POST | `/api/license/revoke` | Admin only |

Detail lengkap kontrak API untuk integrasi desktop tersedia pada **Section 15A**.

---

## 15A. API Documentation (Desktop Integration)

### Base URL

**Development**

```
http://localhost:3000/api/v1
```

**Production**

```
https://your-domain.vercel.app/api/v1
```

### Authentication

Endpoint aktivasi dan validasi license tidak memerlukan login Admin, namun wajib menggunakan **API Secret** yang disimpan di dalam software desktop.

**Header:**

```
X-API-Key: YOUR_API_SECRET
Content-Type: application/json
```

Semua endpoint Admin menggunakan **JWT Session (NextAuth/Auth.js)**.

---

### 1. Activate License

**POST** `/api/v1/license/activate`

**Request**

```json
{
    "licenseKey": "SYNC-ABC-HRO-1234",
    "deviceId": "E1D2C3B4",
    "deviceName": "TEAM-A-PC",
    "windowsUsername": "Operator",
    "softwareVersion": "1.0.0"
}
```

**Success Response**

```json
{
    "success": true,
    "message": "License activated",
    "license": {
        "key": "SYNC-ABC-HRO-1234",
        "customer": "Team Alpha",
        "maxDevices": 2,
        "expiredAt": "2027-07-20T00:00:00Z",
        "nextValidation": "2026-08-20T00:00:00Z"
    },
    "token": "encrypted-license-token"
}
```

**Error Response**

```json
{
    "success": false,
    "error": "LICENSE_EXPIRED"
}
```

**Possible Error Code:**

- `LICENSE_NOT_FOUND`
- `LICENSE_EXPIRED`
- `LICENSE_REVOKED`
- `MAX_DEVICE_REACHED`
- `INVALID_DEVICE`
- `INVALID_API_KEY`

---

### 2. Validate License

**POST** `/api/v1/license/validate`

**Request**

```json
{
    "licenseKey": "SYNC-ABC-HRO-1234",
    "deviceId": "E1D2C3B4",
    "token": "encrypted-license-token"
}
```

**Success**

```json
{
    "success": true,
    "nextValidation": "2026-08-20T00:00:00Z"
}
```

**Failure**

```json
{
    "success": false,
    "error": "LICENSE_REVOKED"
}
```

---

### 3. Get License Information

**POST** `/api/v1/license/info`

**Request**

```json
{
    "licenseKey": "SYNC-ABC-HRO-1234"
}
```

**Response**

```json
{
    "customer": "Team Alpha",
    "status": "ACTIVE",
    "expiredAt": "2027-07-20",
    "maxDevices": 2,
    "activeDevices": 1
}
```

---

### 4. Heartbeat (Optional Future)

Endpoint ini digunakan untuk mengetahui apakah software masih aktif digunakan.

**POST** `/api/v1/license/heartbeat`

**Request**

```json
{
    "licenseKey": "...",
    "deviceId": "...",
    "softwareVersion": "1.0.0"
}
```

> Saat ini endpoint ini **tidak termasuk MVP**.

---

### Response Format

Semua endpoint menggunakan format yang konsisten.

**Success**

```json
{
    "success": true,
    "data": {}
}
```

**Failure**

```json
{
    "success": false,
    "error": {
        "code": "LICENSE_EXPIRED",
        "message": "License has expired."
    }
}
```

---

### HTTP Status Code

| Status | Description |
|---|---|
| 200 | Success |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | License Not Found |
| 409 | Max Device Reached |
| 500 | Internal Server Error |

---

### Desktop License Storage

Setelah aktivasi berhasil, software desktop menyimpan file license lokal.

Contoh: `license.dat`

Data yang disimpan:

- License Key
- Device ID
- Token dari server
- Last Validation
- Next Validation
- Signature

Seluruh data harus dienkripsi dan memiliki signature untuk mencegah manipulasi.

---

### Validation Logic

Saat software dijalankan:

1. Membaca `license.dat`.
2. Memverifikasi integritas file menggunakan signature.
3. Memastikan tanggal validasi belum melewati `Next Validation`.
4. Jika masih valid, software langsung berjalan secara offline.
5. Jika sudah melewati batas 30 hari, software menghubungi endpoint `/license/validate`.
6. Jika validasi berhasil, `Next Validation` diperbarui 30 hari ke depan.
7. Jika validasi gagal (expired, revoked, atau melebihi batas perangkat), software menampilkan halaman aktivasi ulang dan membatasi akses ke fitur utama.

---

### API Versioning

Seluruh endpoint menggunakan prefix versi:

```
/api/v1/
```

Jika di masa depan ada perubahan besar yang tidak kompatibel, versi baru akan dibuat:

```
/api/v2/
```

Sehingga software desktop versi lama tetap dapat berkomunikasi dengan API versi sebelumnya tanpa gangguan.

---

### OpenAPI / Swagger

Project wajib menyediakan dokumentasi OpenAPI (Swagger) yang dapat diakses selama tahap pengembangan.

Contoh endpoint dokumentasi:

```
/api/docs
```

Tujuannya agar pengembangan Dashboard Admin dan Software Desktop dapat dilakukan secara paralel dengan kontrak API yang jelas.

---

## 16. Security

- HTTPS Only.
- Password di-hash menggunakan Argon2 atau bcrypt.
- License Key tidak disimpan dalam bentuk plain text di file lokal (gunakan token atau data terenkripsi).
- Validasi dilakukan di server.
- Semua API memerlukan autentikasi Admin kecuali endpoint aktivasi dan validasi lisensi (menggunakan API Secret, lihat Section 15A).

---

## 17. UI Navigation

```
Login
   ↓
Dashboard
   ├── Dashboard
   ├── Customer
   ├── License
   └── Settings
```

---

## 18. Success Criteria

Dashboard dianggap selesai apabila:

- Admin dapat login.
- Admin dapat membuat customer.
- Admin dapat membuat license.
- Admin dapat menentukan masa aktif license.
- Admin dapat menentukan jumlah device.
- Admin dapat melihat seluruh license.
- Admin dapat melakukan reset device.
- Admin dapat revoke license.
- Desktop dapat melakukan aktivasi.
- Desktop dapat melakukan validasi setiap 30 hari.
- Desktop dapat digunakan secara offline di antara periode validasi.

---

## 19. Future Roadmap

Versi berikutnya dapat menambahkan:

- Multi Admin
- Role Management
- Auto Update Software
- Customer Portal
- Payment Gateway
- Email License
- Download Setup.exe langsung dari Dashboard
- Online Activation Log
- Activity Audit Log
- Statistik penggunaan software
- Remote Device Deactivation
- Integrasi GitHub Release untuk distribusi installer

---

## 20. Development Milestone

| Phase | Deliverable |
|---|---|
| Phase 1 | Setup Next.js, Prisma, PostgreSQL, Deploy Vercel |
| Phase 2 | Login Admin, Dashboard |
| Phase 3 | Customer CRUD |
| Phase 4 | License CRUD |
| Phase 5 | Activation API |
| Phase 6 | Validation API |
| Phase 7 | Integrasi dengan Software Desktop (PySide6) |
| Phase 8 | Testing, Deployment, Production Release |

---

## MVP Deliverables

- Dashboard Admin
- Customer Management
- License Management
- Device Management
- License Activation API
- License Validation API
- Offline License Support (30 hari)
- Deploy di Vercel
- Database PostgreSQL
- Siap diintegrasikan dengan Synchrotech Race Desktop Application
