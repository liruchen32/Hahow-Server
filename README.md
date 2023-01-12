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
- Prettier
- [Morgan](https://github.com/expressjs/morgan#readme 'link')
- [TSOA](https://github.com/lukeautry/tsoa#readme 'link')
- [husky](https://typicode.github.io/husky 'link')
- Jest
- Nodemon

## Project

```
.
├── .husky
│   ├── pre-commit        // 每次 git commit 前執行的指令，目前為執行 npm run foramt && git add -A
│   └── pre-push          // 每次 git push 前，執行 npm run test，測試過後才能 push
├── public
│   └── swagger.json      // swagger document，透過 tsoa 自動產生
├── src
│   ├── controller        // 解析API傳進的參數，並呼叫Service
│   ├── interface         //
│   ├── service           // API主要邏輯
│   ├── test              // 測試檔案位置
│   │    └── service
│   ├── index.ts          // Node Server主程式
│   └── routes.ts         // API Routes，透過 tsoa 自動產生
├── .eslintignore         // 設定 eslint 不需檢查的檔案
├── .eslintrc.json        // eslint 規則設定
├── .gitignore            // 設定 git 不需上傳的檔案
├── .prettierignore       // 設定 prettier 不需檢查的檔案
├── .prettierrc           // prettier 規則設定
├── .jest.config.ts       // jest 測試相關設定
├── nodemon.json          // nodemon 啟動時的設定
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.json         // typescript 編譯相關設定
└── tsoa.json             // tsoa 相關設定，可以調整產生 doc 和 route 的目錄位置

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
| `test`             | 執行 test 資料夾底下的測試                                         |
| `format`           | 透過 prettier 統一修改程式碼樣式                                   |
| `prepare`          | To automatically have Git hooks enabled after install              |
