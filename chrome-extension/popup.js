const preview = document.getElementById("preview")
const saveBtn = document.getElementById("saveBtn")
const status = document.getElementById("status")

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, { action: "getJob" }, (job) => {
    if (job?.title) {
      preview.innerHTML = `<strong>${job.title}</strong>${job.company || ""}<br><small>${job.source || ""}</small>`
    } else {
      preview.textContent = "No job detected on this page"
      saveBtn.disabled = true
    }
  })
})

saveBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getJob" }, (job) => {
      if (!job?.title) return
      chrome.storage.local.get(["careerpilot-saved-jobs"], (result) => {
        const saved = result["careerpilot-saved-jobs"] || []
        saved.unshift({
          ...job,
          savedAt: new Date().toISOString(),
          status: "saved",
        })
        chrome.storage.local.set({ "careerpilot-saved-jobs": saved.slice(0, 100) }, () => {
          status.style.display = "block"
          saveBtn.textContent = "Saved!"
          saveBtn.disabled = true
        })
      })
    })
  })
})
