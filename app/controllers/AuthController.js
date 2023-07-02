import { AppState } from '../AppState.js'
import { audience, clientId, domain } from '../env.js'
import { AuthService } from '../services/AuthService.js'
import { logger } from '../utils/Logger.js'
import { setHTML } from '../utils/Writer.js'

function drawUser() {
  setHTML('avatar', avatarTemplate(AppState.account))
  setHTML('auth', authButton(AppState.user))
}

function _drawAuthSettings() {
  const elem = document.getElementById('auth-settings')
  if (!elem) { return }
  elem.innerHTML = /* html */`
  <div class="card p-2 elevation-4">
    <div class="card-title p-2">
      <div class="d-flex align-items-center">
        <div class="avatar">
          <img src="https://avatars.githubusercontent.com/u/2824157?s=280&v=4" alt="user" height="45" class="rounded-circle">
        </div>
        <div class="text mx-2">
          <b>Auth0 Settings</b>
        </div>
      </div>
    </div>
    <div class="card-body border-top">
      <div class="text block"><b>Domain:</b> ${domain}</div>
      <div class="text block"><b>Audience:</b> ${audience}</div>
      <div class="text block"><b>Client Id:</b> ${clientId}</div>
    </div>
  </div>
`
}

export class AuthController {
  constructor() {
    AppState.on('account', drawUser)
    AuthService.on(AuthService.AUTH_EVENTS.LOADED, drawUser)
    // AuthService.on(AuthService.AUTH_EVENTS.LOADED, _drawAuthSettings)
    drawUser()
  }

  async login() {
    try {
      await AuthService.loginWithRedirect()
    } catch (e) {
      logger.error(e)
    }
  }

  logout() {
    try {
      AuthService.logout()
    } catch (e) {
      logger.error(e)
    }
  }
}

function authButton(user) {
  if (AuthService.loading) { return '' }
  return user && user.isAuthenticated
    ? /* html */ `
    <div class="d-flex align-items-center justify-content-center btn-custom" onclick="app.AuthController.logout()">
      <div class="me-3 font-rh-display fw-bold">LOGOUT</div>
      <i class="mdi mdi-logout fs-2"></i>
    </div>
    `
    : /* html */ `
    <div class="d-flex align-items-center justify-content-center btn-custom" onclick="app.AuthController.login()">
      <div class="me-3 font-rh-display fw-bold">LOGIN</div>
      <i class="mdi mdi-login fs-2"></i>
    </div>
  `
}

function avatarTemplate(account) {
  return account
    ? /* html */ `
    <div class="mr-2">
      <img class="rounded-circle zoom" src="${account.picture}" alt="${account.name}" height="60"/>
      </div>`
    : AuthService.loading
      ? /* html */ `
      <div class="skeleton-loader dark avatar"></div>
      <div class="skeleton-loader dark text sm mx-2"></div>`
      : /* html */`
      <div></div>
      `
}
