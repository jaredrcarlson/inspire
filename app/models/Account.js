export class Account {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.nickname = data.nickname || data.name
    this.picture = data.picture
  }

  static AccountEditForm(account) {
    return /*html*/`
    <div class="modal fade" id="accountEditModal" tabindex="-1" role="dialog"
    aria-labelledby="accountEditFormLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Account</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form onsubmit="app.AccountController.update(event)">
            <div class="modal-body">
              <div class="form-floating mb-2">
                <input type="email" class="form-control" id="userEmail" name="email" value="${account.email}">
                <label for="userEmail">Email address</label>
              </div>
              <div class="form-floating mb-2">
                <input type="text" class="form-control" id="userName" name="name" value="${account.name}">
                <label for="userName">Name</label>
              </div>
              <div class="form-floating mb-2">
                <input type="text" class="form-control" id="userNickname" name="nickname" value="${account.nickname}">
                <label for="userNickname">Nickname</label>
              </div>
              <div class="input-group mb-2">
                <span class="input-group-text">Photo URL</span>
                <input type="url" class="form-control" name="picture" value="${account.picture}">
              </div>
              </div>
              <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">CANCEL</button>
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">SUBMIT</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    `
  }
}