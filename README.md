# GaryTu AI

AI 藝術生成平台，支援圖像生成、影片生成、Prompt 商城、媒體探索等功能。

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **State**: Jotai (global atoms) + React Query (server state)
- **Auth**: NextAuth v5 (Google OAuth)
- **UI Components**: shadcn/ui

## Getting Started

```bash
npm install
cp .env.test .env.local   # 填入必要環境變數
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000)

## Environment Variables

| 變數 | 說明 |
|------|------|
| `NEXTAUTH_SECRET` | NextAuth 簽名密鑰 |
| `NEXTAUTH_URL` | 應用程式 URL |
| `AUTH_GOOGLE_ID` | Google OAuth Client ID |
| `AUTH_GOOGLE_SECRET` | Google OAuth Client Secret |
| `NEXT_PUBLIC_API_URL` | 後端 API base URL |

## Project Structure

```
src/
├── @core/                        # 核心模組（非業務邏輯）
│   ├── hooks/
│   │   ├── useBreakpoint.ts      # RWD breakpoint hook
│   │   └── useMediaQuery.ts      # CSS media query hook
│   ├── provider/
│   │   ├── JotaiProvider.tsx     # Jotai store provider
│   │   ├── NextAuthSessionProvider.tsx
│   │   ├── ReactQueryProvider.tsx
│   │   ├── authContext.tsx       # 同步 NextAuth session → userAtom
│   │   └── cartContext.tsx       # useCart hook（基於 Jotai atoms）
│   └── types/
│       ├── index.ts              # 共用型別（MediaType, AspectRatioType…）
│       └── config.ts
│
├── @layout/                      # 全域版面元件
│   ├── MainLayout.tsx            # 頂層 layout（含 Header）
│   ├── ToolkitLayout.tsx         # Toolkit 區塊 layout（含 Sidebar）
│   ├── components/
│   │   ├── header.tsx            # 頂部導覽列（scroll blur 效果）
│   │   ├── sidebar.tsx           # 左側導覽列
│   │   ├── sidebar-nav-link.tsx
│   │   ├── headerMenu.tsx
│   │   └── userMenu.tsx
│   ├── constants/index.ts        # 路由清單、sidebar 項目
│   └── types/index.ts
│
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # 首頁
│   ├── globals.css               # 全域樣式 + CSS 變數 + Aurora 動畫
│   ├── api/
│   │   ├── auth/[...nextauth]/   # NextAuth handler
│   │   └── prompts/route.ts      # Mock Prompt 列表 API（含分頁）
│   ├── toolkit/                  # 需登入區塊（ToolkitLayout）
│   │   ├── layout.tsx
│   │   ├── image-generate/
│   │   ├── video-generate/
│   │   ├── explore/
│   │   │   └── [id]/             # 媒體探索 detail
│   │   ├── store/
│   │   │   └── [id]/             # Prompt 商城 detail
│   │   ├── cart/
│   │   └── assets/
│   └── user/                     # 登入保護路由（proxy.ts）
│       ├── layout.tsx
│       ├── manage-account/
│       ├── my-prompt/
│       ├── order-history/
│       └── subscription/
│
├── components/                   # 共用 UI 元件
│   ├── ui/                       # shadcn/ui 基礎元件
│   ├── AuthDialog.tsx            # 登入 / 註冊 Dialog
│   ├── CartDrawer.tsx            # 購物車 Drawer
│   ├── ThumbnailSlider.tsx       # 圖片 / 影片輪播
│   ├── AspectRatioBox/
│   ├── VideoGenerate/
│   ├── GenerateComponents/       # 生成頁面共用元件（PromptInput, FrameUploader…）
│   └── icons/
│
├── views/                        # 頁面級 View 元件（由 app/ 的 page.tsx 引用）
│   ├── cart/
│   ├── explore/
│   │   ├── index.tsx             # 媒體探索列表
│   │   └── detail.tsx            # 媒體探索 detail
│   ├── prompt-store/
│   │   ├── index.tsx             # Prompt 商城列表（無限滾動）
│   │   └── detail.tsx            # Prompt 商城 detail
│   └── video-generate/
│
├── store/                        # Jotai atoms
│   ├── authAtoms.ts              # userAtom, authDialogAtom
│   └── cartAtoms.ts              # cartItemsAtom, cartIsOpenAtom, CartItem type
│
├── lib/
│   └── utils.ts                  # cn() 等工具函式
│
├── auth.ts                       # NextAuth 設定（Google provider, JWT/session callbacks）
├── proxy.ts                      # Route protection（/user/* 需登入）
├── global.d.ts                   # 全域型別宣告（*.css module）
└── next-auth.d.ts                # NextAuth 型別擴充（accessToken）
```

## Architecture Notes

### State Management
- **Jotai atoms** (`store/`) 負責全域 UI 狀態（auth、cart）
- **React Query** 負責 server state（API 資料快取）
- Cart 狀態透過 `useCart()` hook 統一存取，底層為 Jotai atoms（無需 Provider）

### Authentication
- NextAuth v5，Google OAuth
- JWT callback 將 `access_token` 存入 token，session callback 轉發給前端
- `proxy.ts` 保護 `/user/*` 路由，未登入自動導回首頁
- `authContext.tsx` 監聽 session 變化，同步寫入 `userAtom`

### Route Protection
```
/toolkit/*  → 需要 ToolkitLayout（sidebar 導覽）
/user/*     → 需要登入（proxy.ts 攔截）
```
