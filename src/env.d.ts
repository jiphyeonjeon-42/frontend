/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 백엔드 API 엔드포인트 */
  readonly REACT_APP_API: string;

  /** 희망 도서 신청 URL */
  readonly REACT_APP_WISH: string;

  /** 42 전자도서관 URL */
  readonly REACT_APP_E_BOOK_LIBRARY: string;

  /** 건의사항 시트 URL */
  readonly REACT_APP_SUGGESTION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
