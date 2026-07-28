import { API_URL } from './config.js'
// Kept outside the public listing data on purpose: contact is a verified request,
// not a way to reveal an owner's email or phone number.
async function request(path, options = {}) {
  const token = localStorage.getItem('clf-token')
  const response = await fetch(`${API_URL}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) } })
  const body = await response.json()
  if (!response.ok) throw new Error(body.error?.message || 'Unable to send contact request.')
  return body.data
}

function addSafeContactButton() {
  const reportId = location.pathname.match(/^\/reports\/([^/]+)$/)?.[1]
  const existing = document.querySelector('[data-safe-contact]')
  const flagButton = document.querySelector('.detail .link-button')
  if (!reportId || existing || !flagButton) return
  const button = document.createElement('button')
  button.type = 'button'; button.dataset.safeContact = 'true'; button.className = 'safe-contact-button'
  button.textContent = 'I found something similar — contact owner safely'
  button.addEventListener('click', async () => {
    if (!localStorage.getItem('clf-token')) { location.assign('/login'); return }
    try {
      const reports = await request('/my-reports')
      const found = reports.filter((report) => report.type === 'found' && report.status === 'active')
      if (!found.length) { alert('First create a found-item report. This protects owners from unverified contact requests.'); location.assign('/report'); return }
      let chosen = found[0]
      if (found.length > 1) {
        const options = found.map((report, index) => `${index + 1}. ${report.color || ''} ${report.brand || ''} ${report.category || 'item'} — ${report.location || 'Campus'}`).join('\n')
        const selected = Number(prompt(`Which found report are you linking?\n${options}`)) - 1
        if (!Number.isInteger(selected) || !found[selected]) return
        chosen = found[selected]
      }
      const message = prompt('Write a short message for the owner. Do not include phone numbers or private details.', 'I found an item that may match your report. Please review it and submit a private claim if it is yours.')
      if (!message) return
      await request(`/reports/${reportId}/contact`, { method: 'POST', body: JSON.stringify({ foundReportId: chosen.id, message }) })
      alert('Safe contact request sent. The owner was notified, but your contact details stay private until ownership is verified.')
    } catch (error) { alert(error.message) }
  })
  flagButton.before(button)
}
new MutationObserver(addSafeContactButton).observe(document.documentElement, { childList: true, subtree: true })
addSafeContactButton()
