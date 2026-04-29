<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
## 데이터 연동 규칙
- Supabase 클라이언트는 src/lib/supabase.ts에서만 생성
- API 호출은 src/lib/api/ 에 도메인별 분리
- 환경변수는 절대 하드코딩 금지
- .env.local은 git 커밋 금지 (.gitignore 확인)
- 로딩/에러 상태 반드시 처리