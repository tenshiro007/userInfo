# User Info

![login](https://user-images.githubusercontent.com/85775989/167429496-d8bb6144-8208-483d-8001-03d459016b09.jpg)
![register](https://user-images.githubusercontent.com/85775989/167429512-6d5dc4e4-7742-4cbb-8944-d1d2ad208f69.jpg)
![profile](https://user-images.githubusercontent.com/85775989/167429506-8fe0af5a-6f03-4738-bdae-40fd64457056.jpg)
![profile-edit](https://user-images.githubusercontent.com/85775989/167429510-8717bba9-3aef-403c-9cd8-5dc3ba25e863.jpg)
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


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE` : Mongodb Connection String URI Format

`SECRET_KEY` : Add your private string

`REACT_APP_API` : Url nodejs api 

`PORT` : Port


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

### Option 3: Start project from docker compose up
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
  add value to .env
```
Run cmd 
```bash
  docker-compose up -d --build
```

Open Browser
```bash
  http://localhost:3000
```

## API Reference

#### Login user
The request body should to be in JSON format 
```bash
  POST /login
  {
  "username": "helloworld",
  "password": "helloworld13"
  }

  return token 

```

#### Register user
The request body should to be form-data
```bash
  POST /Register
  
  (key,type,value)
  username,Text,helloworld
  password,Text,helloworld13
  fname,Text,hello
  lname,Text,world
  image,File,(choose file)

  return token 

```

#### Get user
Add token to Headers
```bash
  GET /
  x-access-token=token

  return user 
```

#### Update user
Add token to Headers.
The request body should to be form-data
```bash
  PUT /update

  x-access-token=token

  (key,type,value)
  username,Text,helloworld
  password,Text,helloworld13
  fname,Text,hello
  lname,Text,world
  image,File,(choose file)

```


