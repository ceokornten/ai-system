# คู่มือการใช้งานระบบ LINE AI Agent (Thai Manual)

1. **โคลนโปรเจกต์**
   ```bash
   git clone <repo-url>
   cd ai-system
   ```
   ![ภาพที่ 1](images/step1.png)

2. **สร้างไฟล์ `.env`**
   ```bash
   cp config/.env.example .env
   ```
   เติมค่า MongoDB, OpenAI และ LINE OA ในไฟล์ `.env`
   ![ภาพที่ 2](images/step2.png)

3. **เข้ารหัสค่าลับ (ถ้าต้องการ)**
   ตั้งค่าตัวแปร `CONFIG_SECRET` แล้วรันคำสั่ง
   ```bash
   node scripts/encrypt.js "VALUE"
   ```
   นำผลลัพธ์ไปใส่ในตัวแปร `*_ENC`
   ![ภาพที่ 3](images/step3.png)

4. **ติดตั้งแพ็กเกจ**
   ```bash
   npm install
   ```
   ![ภาพที่ 4](images/step4.png)

5. **เริ่มเซิร์ฟเวอร์**
   ```bash
   node index.js
   ```
   เซิร์ฟเวอร์ทำงานที่พอร์ต `3000`
   ![ภาพที่ 5](images/step5.png)

6. **ตั้งค่า Webhook ใน LINE OA**
   ใช้ URL `/webhook` ในหน้า LINE Developer Console
   ![ภาพที่ 6](images/step6.png)

7. **ทดสอบส่งข้อความ**
   ส่งข้อความจากแอป LINE แล้วตรวจสอบการตอบกลับอัตโนมัติ
   ![ภาพที่ 7](images/step7.png)

8. **เรียกใช้งานสคริปต์เรียนรู้**
   ```bash
   npm run learn
   ```
   ไฟล์ prompt ในโฟลเดอร์ `prompts/` จะถูกอัปเดต
   ![ภาพที่ 8](images/step8.png)

9. **รันผ่าน Docker (ทางเลือก)**
   ```bash
   docker-compose up
   ```
   ![ภาพที่ 9](images/step9.png)

10. **ตรวจสอบ Log และฐานข้อมูล**
    ตรวจสอบข้อความ "MongoDB connected" ใน log หรือตรวจสอบข้อมูลใน MongoDB
    ![ภาพที่ 10](images/step10.png)

> หมายเหตุ: สร้างหรือแคปหน้าจอรูปภาพเองแล้วบันทึกไว้ใน `docs/images/`
