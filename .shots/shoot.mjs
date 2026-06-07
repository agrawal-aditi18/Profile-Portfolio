// Drives headless Edge over the DevTools Protocol to screenshot each section
// after scrolling it into view (so whileInView animations fire). Node built-ins only.
import fs from 'node:fs'

const CDP = 'http://127.0.0.1:9222'
const URL = 'http://localhost:4173/'
const OUT = 'R:/Git/Profile-Portfolio/.shots'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const targets = await (await fetch(CDP + '/json')).json()
const page = targets.find((t) => t.type === 'page')
if (!page) throw new Error('no page target')
const ws = new WebSocket(page.webSocketDebuggerUrl)
await new Promise((r) => (ws.onopen = r))

let id = 0
const pending = new Map()
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data)
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg.result)
    pending.delete(msg.id)
  }
}
const send = (method, params = {}) =>
  new Promise((res) => {
    const myid = ++id
    pending.set(myid, res)
    ws.send(JSON.stringify({ id: myid, method, params }))
  })

await send('Page.enable')
await send('Runtime.enable')
await send('Emulation.setDeviceMetricsOverride', {
  width: 1440,
  height: 900,
  deviceScaleFactor: 1,
  mobile: false,
})
await send('Page.navigate', { url: URL })
await sleep(3000)
// disable smooth scrolling so jumps are instant
await send('Runtime.evaluate', {
  expression: "document.documentElement.style.scrollBehavior='auto'",
})

const sections = ['services', 'experience', 'work', 'work-mid', 'skills', 'contact']
for (const sec of sections) {
  if (sec === 'work-mid') {
    // scroll partway through the pinned horizontal projects section
    await send('Runtime.evaluate', {
      expression:
        "(()=>{const w=document.getElementById('work'); if(w){window.scrollTo(0, w.offsetTop + w.offsetHeight*0.55);}})()",
    })
  } else {
    await send('Runtime.evaluate', {
      expression: `document.getElementById('${sec}')?.scrollIntoView({block:'start'})`,
    })
  }
  await sleep(1600)
  const result = await send('Page.captureScreenshot', { format: 'png' })
  fs.writeFileSync(`${OUT}/${sec}.png`, Buffer.from(result.data, 'base64'))
  console.log('shot', sec)
}

ws.close()
process.exit(0)
