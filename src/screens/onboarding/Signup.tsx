import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useApp } from '@/store/AppContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { BackHeader } from '@/components/layout/BackHeader';
import { notify } from '@/utils/notify';

const signupSchema = z.object({
  nickname: z
    .string()
    .min(2, '닉네임은 2자 이상이어야 합니다')
    .max(10, '닉네임은 10자 이하여야 합니다'),
  email: z.string().email('이메일 형식이 올바르지 않습니다'),
  password: z
    .string()
    .min(8, '8자 이상, 영문 + 숫자 + 특수문자')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/,
      '8자 이상, 영문 + 숫자 + 특수문자',
    ),
});

type SignupForm = z.infer<typeof signupSchema>;

export default function Signup() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: SignupForm) => {
    dispatch({
      type: 'SIGNUP',
      payload: { nickname: data.nickname, email: data.email },
    });
    navigate('/check/quiz', { replace: true });
  };

  const handleGoogle = () => {
    dispatch({
      type: 'SIGNUP',
      payload: { nickname: '데모유저', email: 'demo@shallwe.app' },
    });
    notify.demoMode();
    navigate('/check/quiz', { replace: true });
  };

  return (
    <div className="min-h-screen pb-10 bg-white">
      <BackHeader sticky />

      <div className="px-5">
        <h1 className="text-title-24 text-ink mt-2 mb-8">
          회원가입
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="닉네임"
            placeholder="닉네임을 입력해주세요"
            error={errors.nickname?.message}
            {...register('nickname')}
          />
          <Input
            label="이메일"
            type="email"
            placeholder="example@email.com"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            helper="8자 이상, 영문 + 숫자 + 특수문자"
            error={errors.password?.message}
            {...register('password')}
          />

          <div className="pt-4">
            <Button type="submit" disabled={!isValid}>가입하기</Button>
          </div>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray/25" />
          <span className="text-body-12 text-gray">또는</span>
          <div className="flex-1 h-px bg-gray/25" />
        </div>

        <Button
          variant="social"
          leftIcon={<span className="font-bold text-lg">G</span>}
          onClick={handleGoogle}
        >
          구글로 계속
        </Button>
      </div>
    </div>
  );
}
