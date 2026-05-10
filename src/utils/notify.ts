/**
 * Toast notifications via sonner (S4: replaces v0.0.2 console stub).
 * Imported by all dispatching code paths so signature stays stable.
 */

import { toast } from 'sonner';

export const notify = {
  storageQuota: () =>
    toast.warning('저장 공간이 부족해요. 일부 데이터가 유지되지 않을 수 있어요.'),
  pickerCanceled: () =>
    toast.info('사진을 선택해주세요.'),
  challengeAdded: (title: string) =>
    toast.success(`'${title}' 챌린지가 추가되었어요!`),
  certified: () =>
    toast.success('인증 완료! 다이어리에서 확인해보세요.'),
  demoMode: () =>
    toast.info('데모 모드입니다. 자동으로 가입되었어요.'),
  error: (msg: string) =>
    toast.error(msg),
};
