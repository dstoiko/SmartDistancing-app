import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Prefix from '../Redux/PrefixRedux'

const { Types, Creators } = createActions({
  register: ['email', 'password'],
  registerSuccess: null,
  setConsent: ['consent'],
  setConsentSuccess: null,
  loginEmailRequest: ['email', 'password'],
  loginSuccess: ['email'],
  loginTcNotYetAgreed: null,
  logout: null,
  setAroundCount: ['around'],
  connect: null,
  disconnect: null,
  setApiError: ['apiError']
},
{ prefix: Prefix.user } // namespace for types cf. https://github.com/infinitered/reduxsauce#createactions
)

export const UserTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  email: null,
  id: null,
  settings: null,
  registerSuccess: false,
  setConsentSuccess: false,
  consented: false,
  loginSuccess: false,
  loginTcNotYetAgreed: true,
  around: 0,
  connected: false,
  apiError: null
})

export const register = (state, { email }) =>
  ({ ...state, email, registerSuccess: false, apiError: null })

export const registerSuccess = state =>
  ({ ...state, registerSuccess: true })

export const setConsent = state =>
  ({ ...state, setConsentSuccess: false, apiError: null })

export const setConsentSuccess = state =>
  ({ ...state, setConsentSuccess: true, consented: true })

export const loginEmailRequest = (state, { email, password }) =>
  ({ ...state, email, loginSuccess: false })

export const loginSuccess = (state, { email }) =>
  ({ ...state, loginSuccess: true, email })

export const loginTcNotYetAgreed = state =>
  ({ ...state, loginTcNotYetAgreed: true })

export const loginReset = state =>
  ({ ...state, loginSuccess: false, loginTcNotYetAgreed: false })

export const setAroundCount = (state, { around }) =>
  ({ ...state, around })

export const connect = state =>
  ({ ...state, connected: true })

export const disconnect = state =>
  ({ ...state, connected: false })

export const setApiError = (state, { apiError }) =>
  ({ ...state, apiError })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER]: register,
  [Types.REGISTER_SUCCESS]: registerSuccess,
  [Types.SET_CONSENT]: setConsent,
  [Types.SET_CONSENT_SUCCESS]: setConsentSuccess,
  [Types.LOGIN_EMAIL_REQUEST]: loginEmailRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_TC_NOT_YET_AGREED]: loginTcNotYetAgreed,
  [Types.LOGOUT]: loginReset,
  [Types.SET_AROUND_COUNT]: setAroundCount,
  [Types.CONNECT]: connect,
  [Types.DISCONNECT]: disconnect,
  [Types.SET_API_ERROR]: setApiError
})
