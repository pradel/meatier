// https://github.com/webpack/webpack/tree/master/examples/code-splitted-require.context
//There's a lot of boilerplate here, but if the require isn't static, then webpack can't chunk properly
//webpack 2 and systemjs may make things nicer
import {requireNoAuth} from './utils';

export default function(store) {
  return {
    onEnter: requireNoAuth,
    path: 'login',
    getIndexRoute: (location, cb) => {
      require.ensure([], (require) => {
        cb(null, {
          component: require('../containers/Auth/AuthContainer').default
        })
      })
    },
    getChildRoutes: (location, cb) => {
      cb(null, [
        {
          path: 'lost-password',
          getComponent: (location, cb) => {
            require.ensure([], require => {
              cb(null, require('../components/LostPassword/LostPassword').default)
            })
          }
        },
        {
          path: 'reset-email-sent',
          getComponent: (location, cb) => {
            require.ensure([], require => {
              cb(null, require('../components/ResetEmailSent/ResetEmailSent').default)
            })
          }
        },
        {
          path: 'reset-password',
          getComponent: (location, cb) => {
            require.ensure([], require => {
              cb(null, require('../components/ResetPassword/ResetPassword').default)
            })
          }
        },
        {
          path: 'reset-password-success',
          getComponent: (location, cb) => {
            require.ensure([], require => {
              cb(null, require('../components/ResetPasswordSuccess/ResetPasswordSuccess').default)
            })
          }
        },
        {
          path: 'verify-email/:verifiedToken',
          getComponent: (location, cb) => {
            require.ensure([], require => {
              cb(null, require('../containers/VerifyEmail/VerifyEmailContainer').default)
            })
          }
        }
      ])
    }
  }
}
