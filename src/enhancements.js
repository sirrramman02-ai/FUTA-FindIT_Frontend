import { API_URL } from './config.js'
function detailId() { return location.pathname.match(/^\/reports\/([^/]+)$/)?.[1] }
async function loadQr(id) {
  const response = await fetch(`${API_URL}/reports/${id}/qr`); const body = await response.json()
  if (!response.ok) throw new Error(body.error?.message || 'Unable to create QR code.')
  return body.data
}
function addEnhancements() {
  const id = detailId(); const detail = document.querySelector('.detail > div'); if (!id || !detail || document.querySelector('[data-report-tools]')) return
  const tools = document.createElement('section'); tools.dataset.reportTools='true'; tools.className='report-tools'
  tools.innerHTML = '<h3>Share safely</h3><p>Print or share this QR code so anyone on campus can open this exact report.</p><button type="button" class="qr-button">Generate report QR code</button><div class="recovery-timeline"><b>Recovery journey</b><ol><li class="done">Reported</li><li class="done">Potential match</li><li>Ownership verified</li><li>Reunited</li></ol></div>'
  tools.querySelector('.qr-button').addEventListener('click', async () => { try { const qr=await loadQr(id); const popup=document.createElement('div'); popup.className='qr-modal'; popup.innerHTML=`<div><button aria-label="Close">×</button><h2>Campus FindIt QR</h2><img src="${qr.image}" alt="QR code linking to this report"/><p>Scan to open this report. It never includes private owner information.</p></div>`; popup.querySelector('button').onclick=()=>popup.remove(); popup.onclick=(event)=>{if(event.target===popup)popup.remove()}; document.body.append(popup) } catch (error) { alert(error.message) } })
  detail.append(tools)
}
new MutationObserver(addEnhancements).observe(document.documentElement,{childList:true,subtree:true}); addEnhancements()
