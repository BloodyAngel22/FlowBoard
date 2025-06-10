# 🧩 FlowBoard — твоя минималистичная Kanban-доска

**FlowBoard** — это простой и удобный инструмент для отслеживания задач, вдохновлённый Jira, но разработанный для одного пользователя.
Создавай проекты, настраивай колонки и управляй задачами на своей персональной доске.

📹 [Смотреть демо-видео](#demo)
⚙️ ASP.NET Core + Next.js + MongoDB
🎨 С тёмной темой, drag-and-drop и кастомизацией колонок

---

## ✨ Возможности

- Создание проектов и переход внутрь каждого из них
- Внутри проекта — настраиваемые **колонки** с возможностью пометки "завершена"
- **Выбор цвета** колонки из палитры (оптимизирован под тёмную тему)
- **Карточки задач** с полями: название, описание, даты начала и окончания, категория
- **Категории задач**: можно создавать и выбирать свою
- Быстрый, отзывчивый UI на базе Tailwind, Shadcn UI, Zustand и React Query

---

## 🛠️ Стек технологий

### Backend (ASP.NET Core)
- Clean Architecture
- MongoDB
- FluentValidation
- Scalar

### Frontend (Next.js + React)
- Tailwind CSS
- Shadcn UI
- Zustand
- React Hook Form + Yup
- TanStack React Query
- React-Kanban
- React-Colorful
- Lucide

---

## 🚀 Запуск проекта

1. Установи зависимости:
   - [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download)
   - bun (https://bun.sh/)
   - MongoDB (https://hub.docker.com/_/mongo)

2. Запусти MongoDB в Docker:
   ```bash
   docker run -p 27017:27017 mongo:latest
   ```

3. Установи зависимости:
    ```bash
    cd frontend
    bun install
    cd ..
    ```
   
4. Запусти Backend:
    ```bash
    dotnet run --project aspire_host
    ```
    
5. Зайди на сайт (создавался под Chromium):
    ```
    http://localhost:3000
    ```

# 📹 Demo
<video controls autoplay muted loop width="600">
  <source src="https://github.com/user-attachments/assets/76732bd5-6e11-4738-bcce-b55ce772491b" type="video/webm">
</video>

# 📍 Почему этот проект
**FlowBoard** — результат учебной практики. Хотелось создать простой, понятный аналог Jira, который не требует регистрации, учётных записей и серверов — просто открыть и использовать.
