/**
 * S2 stub for the notification system.
 * S4 will swap this for sonner; for now, console.warn keeps things visible
 * during dev without polluting the prototype with extra deps.
 */

export const notify = {
  storageQuota: () =>
    console.warn('[storage] sessionStorage quota exceeded — some data may not persist'),
  pickerCanceled: () =>
    console.warn('[picker] 사진을 선택해주세요'),
  challengeAdded: (title: string) =>
    console.info(`[challenge] '${title}' 추가됨`),
  certified: () =>
    console.info('[cert] 인증 완료'),
  demoMode: () =>
    console.info('[auth] 데모 모드 — 자동 가입'),
  error: (msg: string) =>
    console.error(`[error] ${msg}`),
};
