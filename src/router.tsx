import { Navigate, Outlet, RouteObject, RouterProvider, createHashRouter } from 'react-router-dom'

import { Layout } from '@/components/layout'
import { ErrorPage } from '@/pages/error-page'
import { MainPage } from '@/pages/main-page'
import Cookies from 'js-cookie'

import { AddPostPage } from './pages/addPost-page'
import { EditProfilePage } from './pages/editProfile-page'
import { PostPage } from './pages/post-page'
import { SignInPage } from './pages/signIn-page'
import { SignUpPage } from './pages/signUp-page'
import { UserPage } from './pages/user-page'
import { UsersListPage } from './pages/users-page'
import { useCheckAuthStatusQuery } from './services/auth'

const publicRoutes: RouteObject[] = [
  { element: <div> forgotPasswordPage</div>, path: '/forgot-password' },
  { element: <ErrorPage />, path: '/error' },
  { element: <MainPage />, path: '/' },
  { element: <UsersListPage />, path: '/users' },
  { element: <PostPage />, path: '/post/:postId' },
  { element: <UserPage />, path: '/user/:userId' },
  { element: <SignInPage />, path: '/auth/login' },
  { element: <SignUpPage />, path: '/auth/register' },
]
const privateRoutes: RouteObject[] = [
  { element: <div> ProfilePage</div>, path: '/my-profile' },
  { element: <AddPostPage />, path: '/add-post' },
  { element: <EditProfilePage />, path: '/edit-profile' },
]

const router = createHashRouter([
  {
    children: [
      ...publicRoutes,
      { children: privateRoutes, element: <PrivateRoutes /> },
      {
        element: <ErrorPage />,
        path: '*',
      },
    ],
    element: <Layout />,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}

function PrivateRoutes() {
  const { data, error, isLoading } = useCheckAuthStatusQuery()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return error || !data?.authenticated ? <Navigate to={'/auth/login'} /> : <Outlet />

  // const isAuthenticated = !!Cookies.get('token')
  // console.log('isAuthenticated', isAuthenticated)
  // return isAuthenticated ? <Outlet /> : <Navigate to={'/auth/login'} />
}
