function detectJob() {
  const host = window.location.hostname
  let job = { title: "", company: "", source: host, url: window.location.href }

  if (host.includes("linkedin")) {
    job.title =
      document.querySelector(".job-details-jobs-unified-top-card__job-title,h1")?.textContent?.trim() || ""
    job.company =
      document.querySelector(".job-details-jobs-unified-top-card__company-name a,.jobs-unified-top-card__company-name")?.textContent?.trim() || ""
    job.source = "linkedin"
  } else if (host.includes("naukri")) {
    job.title = document.querySelector(".jd-header-title,.styles_jd-header-title__rZwM1")?.textContent?.trim() || ""
    job.company = document.querySelector(".jd-header-comp-name,.styles_jd-header-comp-name__MvqAI a")?.textContent?.trim() || ""
    job.source = "naukri"
  } else if (host.includes("indeed")) {
    job.title = document.querySelector("[data-testid='jobsearch-JobInfoHeader-title'],h1")?.textContent?.trim() || ""
    job.company = document.querySelector("[data-testid='inlineHeader-companyName'],[data-company-name]")?.textContent?.trim() || ""
    job.source = "indeed"
  } else if (host.includes("glassdoor")) {
    job.title = document.querySelector("[data-test='job-title'],.JobDetails_jobTitle__")?.textContent?.trim() || ""
    job.company = document.querySelector("[data-test='employer-name']")?.textContent?.trim() || ""
    job.source = "glassdoor"
  } else if (host.includes("instahyre")) {
    job.title = document.querySelector(".job-title,h1")?.textContent?.trim() || ""
    job.company = document.querySelector(".company-name")?.textContent?.trim() || ""
    job.source = "instahyre"
  } else if (host.includes("cutshort")) {
    job.title = document.querySelector("h1,.job-title")?.textContent?.trim() || ""
    job.company = document.querySelector(".company-name,.company")?.textContent?.trim() || ""
    job.source = "cutshort"
  }

  return job
}

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.action === "getJob") {
    sendResponse(detectJob())
  }
  return true
})
