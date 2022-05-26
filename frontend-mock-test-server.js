var path = require('path')
var express = require('express')
var app = express()
var data = {
  "status": true,
  "data": [
    {
      "_index": "software",
      "_type": "ComputerScience",
      "_id": "OaMikHYBDSiYng6L5BWx",
      "_score": 5.056336,
      "_source": {
        "Url": "https://arxiv.org/abs/1507.02798",
        "Title": "A horizontally-scalable multiprocessing platform based on Node.js",
        "Rank": "1.5",
        "NumberOfReference": "9",
        "DateOfSubmitted": "2015",
        "Info": "",
        "Tags": [
          "Node.js",
          "AllFields"
        ],
        "status": ""
      }
    },
    {
      "_index": "software",
      "_type": "ComputerScience",
      "_id": "MqMikHYBDSiYng6L5BWn",
      "_score": 4.1605797,
      "_source": {
        "Url": "https://arxiv.org/abs/1802.01790",
        "Title": "Towards Runtime Monitoring of Node.js and Its Application to the Internet of Things",
        "Rank": "2.6666666666666665",
        "NumberOfReference": "8",
        "DateOfSubmitted": "2018",
        "Info": "",
        "Tags": [
          "Node.js",
          "AllFields"
        ],
        "status": ""
      }
    },
    {
      "_index": "software",
      "_type": "ComputerScience",
      "_id": "NKMikHYBDSiYng6L5BWp",
      "_score": 5.532813,
      "_source": {
        "Url": "https://arxiv.org/abs/1704.07887",
        "Title": "RootJS: Node.js Bindings for ROOT 6",
        "Rank": "0.5",
        "NumberOfReference": "2",
        "DateOfSubmitted": "2017",
        "Info": "",
        "Tags": [
          "Node.js",
          "AllFields"
        ],
        "status": ""
      }
    },
    {
      "_index": "software",
      "_type": "ComputerScience",
      "_id": "KKMikHYBDSiYng6L5BWZ",
      "_score": 4.4778924,
      "_source": {
        "Url": "https://arxiv.org/abs/2008.04568",
        "Title": "Code-based Vulnerability Detection in Node.js Applications: How far are we?",
        "Rank": "1",
        "NumberOfReference": "1",
        "DateOfSubmitted": "2020",
        "Info": "",
        "Tags": [
          "Node.js",
          "AllFields"
        ],
        "status": ""
      }
    },
    {
      "_index": "software",
      "_type": "ComputerScience",
      "_id": "J6MikHYBDSiYng6L5BWU",
      "_score": 4.6554184,
      "_source": {
        "Url": "https://arxiv.org/abs/2009.09019",
        "Title": "On the Threat of npm Vulnerable Dependencies in Node.js Applications",
        "Rank": "0",
        "NumberOfReference": "0",
        "DateOfSubmitted": "2020",
        "Info": "",
        "Tags": [
          "Node.js",
          "AllFields"
        ],
        "status": ""
      }
    },
    {
      "_index": "software",
      "_type": "ComputerScience",
      "_id": "KqMikHYBDSiYng6L5BWb",
      "_score": 5.2838545,
      "_source": {
        "Url": "https://arxiv.org/abs/2004.05880",
        "Title": "SecureIT using Firebase, Google map and Node.Js",
        "Rank": "0",
        "NumberOfReference": "0",
        "DateOfSubmitted": "2020",
        "Info": "",
        "Tags": [
          "Node.js",
          "AllFields"
        ],
        "status": ""
      }
    }
  ]
}

app.use(express.static('public'))

app.get('/', (req, res) => { res.sendFile('public/index.html') });

app.post('/api/search/title', (req, res) => {
  res.json(data)
})
app.post('/api/search/all', (req, res) => {
  res.json(data)
})
app.listen(3000, () => {
  console.log('running')
})