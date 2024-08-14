import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import toLoginLogo from '@/assets/toLogin.png'
import { Button } from '@/components/ui/button'
import { ControlledInput } from '@/components/ui/controlled-input'
import { Typography } from '@/components/ui/typography'
import { useLoginUserMutation } from '@/services/auth'
import { SignInFormSchema, signInSchema } from '@/validations'
import { zodResolver } from '@hookform/resolvers/zod'
import { LiaHandPointer } from 'react-icons/lia'

import s from './signIn-page.module.scss'

export const SignInPage = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation()
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<SignInFormSchema>({ resolver: zodResolver(signInSchema) })
  const navigate = useNavigate()

  const onSubmit = async (data: SignInFormSchema) => {
    try {
      const response = await loginUser(data).unwrap()

      // Сохранение токена
      localStorage.setItem('token', response.token)

      // Перенаправление пользователя
      navigate(`/user/${response._id}`)
    } catch (err: any) {
      if (err.status === 401) {
        setError('password', {
          message: 'Неверный e-mail или пароль',
        })
      } else {
        console.error('Ошибка при логине:', err)
      }
    }
  }

  return (
    <div className={s.container}>
      <div className={s.card}>
        <img alt={'logo'} className={s.logo} src={toLoginLogo} />

        <Typography className={s.text} variant={'large'}>
          вход в аккаунт
        </Typography>
        <form className={s.formWrapper} onSubmit={handleSubmit(onSubmit)}>
          <ControlledInput
            className={s.inputStyle}
            control={control}
            defaultValue={''}
            errorMessage={errors.email?.message}
            label={'e-mail'}
            name={'email'}
            placeholder={'e-mail, который вводили при регистрации'}
          ></ControlledInput>
          <ControlledInput
            className={s.inputStyle}
            control={control}
            defaultValue={''}
            errorMessage={errors.password?.message}
            label={'пароль'}
            name={'password'}
            placeholder={'надеемся, вы не забыли пароль'}
            type={'password'}
          ></ControlledInput>
          <Button className={s.btnStyle} type={'submit'}>
            войти
          </Button>
        </form>
        <Typography className={s.text} variant={'large'}>
          у вас все еще нет аккаунта?
        </Typography>
        <Button as={Link} className={s.btnStyle} to={'/auth/register'} variant={'link'}>
          создать
        </Button>
        <LiaHandPointer className={s.pointer} size={25} />
      </div>
    </div>
  )
}
