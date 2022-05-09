# User Info
 มีหน้า screen ดังต่อไปนี้
1. หน้า Login แสดงฟอร์มเข้าสู่ระบบ
2. หน้า Register แสดงหน้าฟอร์มสมัครสมาชิก มีการตรวจสอบดังต่อไปนี้
 * username รับ A-Z, a-z, 0-9, _ ความยาวไม่เกิน 12 ตัวอักษร และจะต้องไม่ซ้ำกับที่มีอยู่แล้ว
* Password เป็นรหัสผ่านความยาวไม่ต่ำกว่า 6 ตัวอักษร ต้องไม่เป็นตัวอักษรหรือตัวเลขเรียงกัน
* Password มีการเข้ารหัสแบบ encrypt ทางเดียว ไม่สามารถ decrypt เพื่อเอา  raw password ได้ ในการบันทึกลงฐานข้อมูล
* field text first name , last name
* profile image เป็นปุ่มใช้สำหรับอัพโหลดรูปภาพโปรไฟล์
3. หน้า Edit Profile แสดงข้อมูลของผู้ใช้และสามารถแก้ไข Profile ได้ 
* การแก้ไข password ห้ามซ้ำใน 5 ครั้งล่าสุดที่เคยแก้ไข password


## Tech Stack

**Client:** React,Boostrap

**Server:** Node, Express


## Run Locally

### Option 1: Start with docker pull

Pull images
```bash
  docker pull tenshiro/react-iig:latest
  docker pull tenshiro/nodejs-iig:latest
```
Run container
```bash
  docker run -d -p 8080:8080 --name nodejs tenshiro/nodejs-iig:latest
  docker run -d -p 3000:3000 --name react tenshiro/react-iig:latest
```
Open Browser
```bash
  http://localhost:3000
```

### Option 2: Start project from root folder 
Clone the project

```bash
  git clone https://github.com/tenshiro007/userInfo
```
Go to the project directory
```bash
  cd userInfo
```

Setup Environment
```bash
  cb backend
  add value to .env

  cb fontend
  add value to .env
```

Start the server

```bash
  cd backend
  npm install
  npm run start
```

Start the client
```bash
  cd fontend
  npm install -g npm@8.3.0
  npm run start
```
Open Browser
```bash
  http://localhost:3000
```

![112](https://user-images.githubusercontent.com/85775989/167401107-7875d82d-1eea-4785-b281-08f1f0760081.jpg)
