function onTextEnabledChange() {
  const textEnabled = document.getElementById("textEnabled").checked;
  // hide the other text options if text is disabled
  const elements = document.getElementsByClassName("text-option");
  for (const elm of elements) {
    elm.style.display = textEnabled ? "block" : "none";
  }
}

function saveOptions() {
  const memeMode = document.getElementById("memeMode").checked;
  const textEnabled = document.getElementById("textEnabled").checked;
  const textVerifiedLabel = document.getElementById("textVerifiedLabel").value;
  const twitterBlueVerifiedLabel = document.getElementById(
    "textTwitterBlueLabel"
  ).value;
  const textEnableBorder = document.getElementById("textEnableBorder").checked;
  const removeBlueVerification = document.getElementById(
    "removeBlueVerification"
  ).checked;
  const advancedSearch = document.getElementById("advancedSearch").checked;
  const removeTweets = document.getElementById("removeTweets").checked;
  chrome.storage.local.set(
    {
      advancedSearch,
      memeMode,
      textEnabled,
      removeBlueVerification,
      textOptions: {
        verifiedLabel: textEnabled ? textVerifiedLabel : "",
        twitterBlueLabel: textEnabled ? twitterBlueVerifiedLabel : "",
        enableBorder: textEnabled ? textEnableBorder : true,
      },
      removeTweets,
    },
    function () {
      const status = document.getElementById("status");
      status.style.display = "block";
      setTimeout(function () {
        status.style.display = "none";
      }, 1500);
    }
  );
}
function closeOptions() {
  window.close();
}
function restoreOptions() {
  chrome.storage.local.get(
    {
      advancedSearch: false,
      advancedSearchMigratedToFalseOnce: false,
      memeMode: false,
      textEnabled: true,
      removeBlueVerification: false,
      textOptions: {
        verifiedLabel: "Verified",
        twitterBlueLabel: "Paid",
        enableBorder: true,
      },
      removeTweets: false,
    },
    function (items) {
      document.getElementById("memeMode").checked = items.memeMode;
      document.getElementById("textEnabled").checked = items.textEnabled;
      document.getElementById("textVerifiedLabel").value =
        items.textOptions.verifiedLabel;
      document.getElementById("textTwitterBlueLabel").value =
        items.textOptions.twitterBlueLabel;
      document.getElementById("textEnableBorder").checked =
        items.textOptions.enableBorder;
      document.getElementById("removeBlueVerification").checked =
        items.removeBlueVerification;
      document.getElementById("advancedSearch").checked = items.advancedSearch;
      document.getElementById("removeTweets").checked = items.removeTweets;
      onTextEnabledChange();
    }
  );
}

document.addEventListener("DOMContentLoaded", function () {
  restoreOptions();
  document
    .getElementById("textEnabled")
    .addEventListener("change", onTextEnabledChange);
  document.getElementById("save").addEventListener("click", saveOptions);
  document.getElementById("close").addEventListener("click", closeOptions);
});
