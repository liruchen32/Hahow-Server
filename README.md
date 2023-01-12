# Hahow Server

### First Use Steps

1. npm install
2. npm run build
3. npm run start
4. 前往 `http://localhost:3000/docs`

## Feature

- Express
- TypeScript
- ESLint

## Project

```
.
├── public                // swagger document，透過 tsoa 自動產生
├── src
│   ├── controller        // 解析API傳進的參數，並呼叫Service
│   ├── interface         //
│   ├── service           // API主要邏輯
│   ├── utils
│   ├── index.ts          // Node Server主程式
│   └── routes.ts         // API Routes，透過 tsoa 自動產生
├── .eslintignore
├── .eslintrc.json
├── .gitignore
├── .prettierignore
├── .prettierrc
├── nodemon.json
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json
└── tsoa.json

```

## Script

| `npm run <script>` | 說明                                                               |
| ------------------ | ------------------------------------------------------------------ |
| `swagger`          | 透過 tsoa 產生 swagger.json 和 routes.ts                           |
| `predev`           | 執行 dev 指令前先執行 swagger 來產生對應的 swagger doc 和 routes   |
| `dev`              | 開發用，透過 nodemon 啟動 Node Server 在 3000 port                 |
| `prebuild`         | 執行 build 指令前先執行 swagger 來產生對應的 swagger doc 和 routes |
| `build`            | 編譯 Typescript 並輸出到 build 資料夾下                            |
| `start`            | 執行編譯後 build 底下的程式                                        |
