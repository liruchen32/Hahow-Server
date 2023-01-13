# Hahow Server

| Statements                                                                                 | Branches                                                                             | Functions                                                                              | Lines                                                                            |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| ![Statements](https://img.shields.io/badge/statements-97.22%25-brightgreen.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-100%25-brightgreen.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-97.05%25-brightgreen.svg?style=flat) |

### First Use Steps

1. `npm install`
2. `npm run build`
3. `npm run start`
4. 前往 <http://localhost:3000/docs>

## Feature

- Express
- TypeScript
- ESLint

```
檢查程式碼是否有符合相關規範
```

- Prettier

```
統一程式碼的風格
```

- [Morgan](https://github.com/expressjs/morgan#readme 'link')

```
記錄 http 的請求和錯誤
```

- [TSOA](https://github.com/lukeautry/tsoa#readme 'link')

```
自動產生 routes 和符合 OpenAPI 規範的文件，這裡使用 Swagger
```

- [Husky](https://typicode.github.io/husky 'link')

```
註冊各式 hooks 事件
```

- Jest

```
測試套件
```

- Nodemon

```
監視程式碼的變動並自動重啟程式
```

- Cors

```
允許跨域請求
```
- Istanbul-badges-readme
```
自動將測試產生的覆蓋率相關資料更新至 README
```

## Project

```
.
├── .husky
│   ├── pre-commit        // 每次 git commit 前執行的指令，目前為執行 npm run foramt && git add -A
│   └── pre-push          // 每次 git push 前，執行 npm run test，測試過後才能 push
├── public
│   └── swagger.json      // swagger document，透過 tsoa 自動產生
├── src
│   ├── controller        // 解析 API 傳進的參數，並呼叫 Service
│   ├── interface         //
│   ├── service           // API 主要邏輯
│   ├── test              // 測試檔案位置
│   │    └── service
│   ├── index.ts          // Node Server 主程式
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
| `eslint`           | 檢查程式碼是否符合 eslint 規範                                     |
| `prepare`          | To automatically have Git hooks enabled after install              |
| `make-badges`          | 產生測試相關結果至 README             |

## 心得
趁著這次練習的機會，使用了之前發現的一個方便的套件 - [TSOA](https://github.com/lukeautry/tsoa#readme 'link') ，可以透過 Typescript 的特性自動幫忙產生 routes 和符合 OpenAPI 規範的文件。也因為這個套件使用了許多 Typescript 的 Decorator，讓我更加了解 Decorator 所帶來的便利性。另外藉由使用 [Husky](https://typicode.github.io/husky 'link') 來幫我針對在 git commit 前可以檢查是否有符合 eslint 的規定和 prettier 來統一專案程式碼風格，並且在 git push 前跑一遍測試來確保程式沒有異常。

這份專案我只有在 controller 和 getAuthHeroes 有寫註解。會在 controller 寫註解是為了可以更清楚了解這個 api 的行為，同時也可以呈現在 swagger 文件上，讓其他人在使用時可以更加清楚的了解 api 的 paypload。而 getAuthHeros 則是因為會需要透過 Typescirpt 的 `as` (`const { id } = A as B`) 來轉型，所以特別註明。

這次的測試選擇越來越流行的 [Jest](https://jestjs.io/ 'link') ，是我第一次接觸，也讓我在 mock api 的時候花了不少腦經。原本一開始用 [spyOn](https://jestjs.io/docs/jest-object#jestspyonobject-methodname 'link') 的方式去 mock ，但如果沒有特別指定的話， spyOn 還是會實際去呼叫程式。最後我還是採用 [mock](https://jestjs.io/docs/jest-object#jestmockmodulename-factory-options 'link') 整個 module 的方式，假裝我有向 hahow 請求資料，再手動指定回傳的內容，讓測試的範圍只侷限在邏輯的正確性。

不過在呼叫 hahow 的 api 時，發現有時候 `response.status` 會是 200，但是內容卻是 `{ code: 1000,  message: 'backend error' }`，所以需要自行判斷回傳的內容並適時的拋出錯誤。為此我也寫了關於錯誤的測試，確保我在接收到錯的 `response.data` 時程式會成功報錯。
