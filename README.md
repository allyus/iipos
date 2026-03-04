# IIPOS 프로젝트

.NET 8 Web API + Vue 3 + JWT 인증 + EF Core 기반 풀스택 프로젝트입니다.

## 구성

- **백엔드** (`backend/`): ASP.NET Core 8 Web API, JWT 인증, EF Core (SQLite 개발용)
- **프론트엔드** (`frontend/`): Vue 3 + TypeScript + Pinia + Vue Router + Vite

## 사전 요구사항

- .NET 8 SDK
- Node.js 20+ (권장)
- npm 또는 pnpm

## 실행 방법

### 1. 백엔드 실행

```bash
cd backend
dotnet run
```

- API: http://localhost:5202
- Swagger: http://localhost:5202/swagger
- DB: SQLite 파일 `iipos.db` (프로젝트 폴더에 자동 생성)

### 2. 프론트엔드 실행

```bash
cd frontend
npm install
npm run dev
```

- 앱: http://localhost:5173
- API URL: `frontend/.env.development`의 `VITE_API_URL` (기본: http://localhost:5202)

### 3. 동작 확인

1. 브라우저에서 http://localhost:5173 접속
2. **회원가입** 후 **로그인**
3. 로그인 시 JWT 토큰으로 인증되며 Home/About 등 보호된 페이지 접근 가능

## API 엔드포인트

| 메서드 | 경로 | 설명 |
|--------|------|------|
| POST | /api/auth/register | 회원가입 |
| POST | /api/auth/login | 로그인 (JWT 발급) |
| GET | /api/auth/me | 현재 사용자 (Authorization: Bearer 필요) |

## 설정

### JWT (백엔드)

`backend/appsettings.json`의 `Jwt` 섹션:

- `Key`: 서명 키 (32자 이상 권장, 운영 시 반드시 변경)
- `Issuer`, `Audience`: 토큰 검증용
- `ExpireMinutes`: 토큰 유효 시간(분)

### DB (백엔드)

- 개발: SQLite (`Data Source=iipos.db`)
- 운영에서 SQL Server 사용 시: `ConnectionStrings:DefaultConnection`을 SQL Server 연결 문자열로 변경하고, `Program.cs`에서 `UseSqlite` 대신 `UseSqlServer` 사용

## 프로젝트 구조

```
iipos/
├── backend/                 # .NET 8 Web API
│   ├── Controllers/         # AuthController 등
│   ├── Data/                # EF Core DbContext, Entities
│   ├── Models/              # DTO (LoginRequest, AuthResponse 등)
│   ├── Services/            # AuthService (JWT 발급, BCrypt)
│   └── Program.cs
├── frontend/                # Vue 3 SPA
│   ├── src/
│   │   ├── api/             # axios 클라이언트, auth API
│   │   ├── stores/          # Pinia (auth 스토어)
│   │   ├── views/           # Login, Register, Home, About
│   │   └── router/          # 라우트 + 인증 가드
│   └── .env.development
└── README.md
```
