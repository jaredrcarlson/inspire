export const MainView = /*html*/`
  <section class="container-fluid">

    <!-- SECTION PANEL (TOP ROW) -->
    <div class="row mt-4 justify-content-between">
      <!-- SECTION IMAGE AUTHOR -->
      <div id="imageAuthor" class="col-3 ms-4"></div>

      <!-- SECTION TO-DO LIST -->
      <div id="oncanvasTodoHeader" class="col-2 me-5"></div>
    </div>
    <div id="offcanvasTodoList" class="row justify-content-end"></div>

    <!-- SECTION ACCOUNT EDIT MODAL | Also adds spacing between TOP & BOTTOM PANELS -->
    <div class="row spacer">
      <div id="accountEdit" class="col-8"></div>
    </div>

    <!-- SECTION QUOTE -->
    <div class="row justify-content-around">
      <div id="quote" class="col-11 text-center text-light"></div>
    </div>

    <!-- SECTION PANEL (BOTTOM ROW) -->
    <div class="row justify-content-around">
      <div class="col-11 panel text-secondary rounded-pill">
        <div class="row py-2 justify-content-between align-items-center">

          <!-- SECTION WEATHER -->
          <div class="col-2 my-1">
            <div class="d-flex align-items-center">
              <div id="weatherIcon" class="mx-1"></div>
              <div class="ms-1 fs-4 py-1">
                <div id="weatherTemp" class="btn-custom" onclick="app.WeatherController.nextTemperatureDisplay()"></div>
                <div id="weatherKind" class="text-secondary"></div>
              </div>
            </div>
          </div>

          <!-- SECTION DATE -->
          <div class="col-2 text-center text-secondary">
            <div id="date" class="fs-5 btn-custom" onclick="app.DateController.nextDateDisplay()"></div>
          </div>

          <!-- SECTION CLOCK -->
          <div class="col-3 font-rh-mono">
            <div id="clockTime" class="fs-4 text-center text-secondary"></div>
            <div class="d-flex rounded justify-content-center align-items-center">
              <div id="clockFormatLabelStd" class="rounded font-rh-mono btn-custom"
                onclick="app.ClockController.setTimeFormat('std')"></div>
              <div id="clockFormatSwitch" class="btn-custom" onclick="app.ClockController.toggleTimeFormat()"></div>
              <div id="clockFormatLabelMil" class="rounded font-rh-mono btn-custom"
                onclick="app.ClockController.setTimeFormat('mil')"></div>
            </div>
          </div>

          <!-- SECTION AUTH (LOGIN / LOGOUT) -->
          <div id="auth" class="col-2"></div>

          <!-- SECTION GREETING | USER ACCOUNT -->
          <div class="col-2 me-3 d-flex justify-content-between align-items-center">
            <div class="d-block text-secondary font-rh-display fw-bold">
              <div id="greeting"></div>
              <div id="userName"></div>
            </div>
            <div id="avatar" class="pointer" data-bs-toggle="modal" data-bs-target="#accountEditModal"></div>
          </div>

        </div>
      </div>
    </div>
  </section>
`