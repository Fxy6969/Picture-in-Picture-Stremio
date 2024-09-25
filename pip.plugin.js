/**
 * @name Picture-in-Picture
 * @description Brings Picture-in-Picture (Media Popout) support to Stremio.
 * @version 1.0.0
 * @author Fxy
 * @updateUrl https://raw.githubusercontent.com/fxy6969/Stremio-PIP/main/pip.plugin.js
 */

function addButton() {
  let videoPlayer = document.querySelector("#videoPlayer");
  let topSection = document.querySelector(
    "#player > div.hidable.player-handle.hidden",
  );
  let buttonElement = document.querySelector("#pipButton");

  if (buttonElement) {
    console.log("Button already added, skipping...");
    return;
  }

  if (!videoPlayer || !topSection) {
    console.log("Required elements not found, waiting...");
    return;
  }

  videoPlayer.setAttribute("style", "z-index: -1");
  let pipButton = document.createElement("div");
  pipButton.innerHTML = `<svg style="height: 2rem;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
     <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
   </svg>`;
  pipButton.setAttribute("id", "pipButton");
  pipButton.setAttribute(
    "style",
    `
      backdrop-filter: blur(60px) saturate(210%);
      -webkit-backdrop-filter: blur(60px) saturate(210%);
      background-color: var(--bg-color);
      border-radius: 6px;
      border: 0.5px solid rgba(0, 0, 0, 0.2);
      box-shadow: var(--box-shadow);
      display: inline-flex;
      padding: 0.5rem 0.5rem;
      justify-content: center;
      position: fixed;
      bottom: 12.5vh;
      align-content: flex-start;
      flex-wrap: nowrap;
      flex-direction: row;
      right: 3vw;
      cursor: pointer;
      `,
  );
  pipButton.addEventListener("click", () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else if (videoPlayer) {
      videoPlayer.requestPictureInPicture();
    }
  });
  topSection.appendChild(pipButton);
}

function checkAndAddButton() {
  if (
    document.querySelector("#videoPlayer") &&
    document.querySelector("#player")
  ) {
    addButton();
  }
}

checkAndAddButton();
setInterval(checkAndAddButton, 500);

document.addEventListener("turbolinks:load", checkAndAddButton);
window.addEventListener("popstate", checkAndAddButton);
window.addEventListener("pushstate", checkAndAddButton);
