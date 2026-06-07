import fs from 'node:fs'

const CDP = 'http://127.0.0.1:9222'
const URL = 'http://localhost:4173/'
const OUT = 'R:/Git/Profile-Portfolio/.shots'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const targets = await (await fetch(CDP + '/json')).json()
const page = targets.find((t) => t.type === 'page')
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
  width: 390,
  height: 844,
  deviceScaleFactor: 2,
  mobile: true,
})
await send('Emulation.setTouchEmulationEnabled', { enabled: true })
await send('Page.navigate', { url: URL })
await sleep(3000)
await send('Runtime.evaluate', {
  expression: "document.documentElement.style.scrollBehavior='auto'",
})

const sections = ['m-top', 'about', 'work', 'work2', 'contact']
for (const sec of sections) {
  if (sec === 'm-top') {
    await send('Runtime.evaluate', { expression: 'window.scrollTo(0,0)' })
  } else if (sec === 'work2') {
    await send('Runtime.evaluate', {
      expression:
        "(()=>{const w=document.getElementById('work'); if(w) window.scrollTo(0, w.offsetTop + 1100);})()",
    })
  } else {
    await send('Runtime.evaluate', {
      expression: `document.getElementById('${sec}')?.scrollIntoView({block:'start'})`,
    })
  }
  await sleep(1500)
  const result = await send('Page.captureScreenshot', { format: 'png' })
  fs.writeFileSync(`${OUT}/${sec}.png`, Buffer.from(result.data, 'base64'))
  console.log('shot', sec)
}

ws.close()
process.exit(0)
