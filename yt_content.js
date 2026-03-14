
const YT_DL_MENU_SELECTOR = 'tp-yt-paper-dialog[role="dialog"][tabindex="-1"][prevent-autonav="true"][modern]'; // yt-selectorrr

const observer = new MutationObserver(() => {
    const yt_menu = document.querySelector(YT_DL_MENU_SELECTOR);
    if (yt_menu && yt_menu.style.display !== 'none') {
        yt_menu.style.display = 'none';
        create_popup();
    }
});

observer.observe(document.body, { childList: true, subtree: true, attributes: true });





function create_popup() {
  const dialog = document.createElement('div');
  dialog.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.3); z-index: 9999; display: flex; justify-content: center; align-items: center;">
        <div style="background: #212121; padding: 20px; border-radius: 12px; width: 300px;">
          <h5 style="margin-top: 0; color: #f1f1f1; text-align:center; font-size: 20px;">Download video</h5>
          <p style="color: #aaa; text-align:center; font-size: 15px;">Specify the details below</p>
          <div id="dtype-select" style="width:100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <div id="divdl1" style="width:100%; display: flex; margin-top: 20px; margin-bottom: 10px;">
              <p style="color: #aaa; line-height: 30px; font-size: 15px; margin-right: 10px">File type:</p>
              <select id="typeChoice" style="background: #f1f1f1; padding: 5px; border-radius: 12px; width: 100px;">
                <optgroup label="Video">
                <option value="mp4">mp4</option>
                <option value="mkv">mkv</option>
                </optgroup>
                <optgroup label="Audio">
                <option value="mp3">mp3</option>
                <option value="wav">wav</option>
                <option value="ogg">ogg</option>
                <option value="aac">aac</option>
                </optgroup>
              </select>
            </div>
            <div style="width:100%; display: flex; margin-top: 10px; margin-bottom: 20px;">
              <p style="color: #aaa; line-height: 30px; font-size: 15px; margin-right: 10px">Remove sponsored segments
                <input type="checkbox" id="sponsorCheck" style="background: #f1f1f1;>
                <span class="checkmark"></span>
              </p>
            </div>
          </div>
          <div style="width:100%; display: flex; justify-content: space-between;">
            <button id="confirmNo" style="padding: 8px 16px; background: #f1f1f1; color: #0f0f0f; border: none; border-radius: 16px; cursor: pointer; width: 100px">Cancel</button>
            <button id="confirmYes" style="padding: 8px 16px; background: #3ea6ff; color: #0f0f0f; border: none; border-radius: 16px; cursor: pointer; width: 100px">Download</button>
          </div>
        </div>
      </div>
    `;
  
  const YT_OG_BACKGROP_SELECTOR = 'tp-yt-iron-overlay-backdrop.opened'; // yt-selectorrr

  const popup_container = document.querySelector("ytd-popup-container.style-scope.ytd-app") // yt-selectorrr
  
  if (popup_container) {
    popup_container.appendChild(dialog);
  } else {
    alert("popup error");
  }

  // Handle button clicks
  dialog.querySelector('#confirmYes').addEventListener('click', () => {
    const select = dialog.querySelector('#typeChoice');
    const sponsor = dialog.querySelector('#sponsorCheck');
    const choice = select.value;
    
    var custom_args = ""

    if (choice === 'mp4') {
      custom_args = '-t mp4'; // yt-dlp -f "bv*+ba/b" --merge-output-format mkv URL
    };

    if (choice === 'mkv') {
      custom_args = '-t mkv';
    };

    if (choice === 'mp3') {
      custom_args = "-t mp3";
    };

    if (choice === 'wav') {
      custom_args = "-f wav"; // -f ba --extract-audio --audio-format wav
    };

    if (choice === 'ogg') {
      custom_args = "-f ogg";
    };

    if (choice === 'aac') {
      custom_args = "-t aac";
    };

    if (sponsor.checked) {
      custom_args += " --sponsorblock-remove sponsor"
    }


    create_download(`yt-dlp ${custom_args} "${window.location.href}"`);
    const backdrop = document.querySelector(YT_OG_BACKGROP_SELECTOR);
    if (backdrop) backdrop.style.display = 'none'; // remove yt backdrop
    dialog.remove();
  });

  dialog.querySelector('#confirmNo').addEventListener('click', () => {
    const backdrop = document.querySelector(YT_OG_BACKGROP_SELECTOR);
    if (backdrop) backdrop.style.display = 'none'; // remove yt backdrop
    dialog.remove();
  });

  // button hover anim CSS shit
  dialog.querySelector('#confirmNo').addEventListener('mouseover', function () {
    dialog.querySelector('#confirmNo').style.backgroundColor = "#d9d9d9";
  });

  dialog.querySelector('#confirmNo').addEventListener('mouseout', function () {
    dialog.querySelector('#confirmNo').style.backgroundColor = "#f1f1f1";
  });

  dialog.querySelector('#confirmYes').addEventListener('mouseover', function () {
    dialog.querySelector('#confirmYes').style.backgroundColor = "#65b8ff";
  });

  dialog.querySelector('#confirmYes').addEventListener('mouseout', function () {
    dialog.querySelector('#confirmYes').style.backgroundColor = "#3ea6ff";
  });

};




function create_download(command_preset) {
  const textCheckInstallation = `
@echo off

where yt-dlp >nul 2>nul
if %errorlevel% neq 0 (
    echo [93mYou need 'yt-dlp' to download videos.[0m
    echo [91mFuture downloads will go faster, because you will have this installed already![0m
    echo.
    echo Installing yt-dlp...
    winget install yt-dlp
)

`

  const textContent = `${textCheckInstallation}
${command_preset}
explorer .`;

  const blob = new Blob([textContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const filename = `yt-download-${new Date().toISOString().slice(0, 10)}.bat`;

  // Create an anchor element to trigger download
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);

}