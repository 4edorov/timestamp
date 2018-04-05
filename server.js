const express = require('express')
const path = require('path')

const monthsStr = 'January,February,March,April,May,June,July,August,September,October,November,December'
const months = monthsStr.split(',')
const PORT = process.env.PORT || 3000

const app = express()

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'))
})

app.get('/:raw', (req, res) => {
  const {raw} = req.params

  let unix, natural
  let parseRaw = Date.parse(raw)

  if (parseRaw === parseRaw) {
    unix = parseRaw
    natural = raw
  } else {
    let isUnix = new Date(parseInt(raw, 10))
    if (isUnix.toString() === 'Invalid Date') {
      res.json({unix: null, natural: null})
      
      return
    }
    unix = parseInt(raw, 10)
    let date = new Date(unix)
    natural = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
  }

  res.json({unix, natural})
})

app.listen(PORT, () => console.log('timestamp-server is on port ' + PORT))
