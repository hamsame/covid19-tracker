// vars
const confirmedH4 = document.getElementById('cases'),
  newConfirmedH4 = document.getElementById('newConfirmed'),
  recoveredH4 = document.getElementById('recovered'),
  newRecoveredH4 = document.getElementById('newRecovered'),
  deathsH4 = document.getElementById('deaths'),
  newDeathsH4 = document.getElementById('newDeaths')

const xml = new XMLHttpRequest()
xml.open('GET', 'https://api.covid19api.com/summary', true)
xml.onload = async function () {
  const res = JSON.parse(this.responseText)

  const {
    TotalConfirmed,
    TotalRecovered,
    TotalDeaths,
    NewConfirmed,
    NewRecovered,
    NewDeaths,
  } = res.Global

  confirmedH4.innerText += TotalConfirmed.toLocaleString()
  recoveredH4.innerText += TotalRecovered.toLocaleString()
  deathsH4.innerText += TotalDeaths.toLocaleString()

  newConfirmedH4.innerHTML += NewConfirmed.toLocaleString()
  newRecoveredH4.innerHTML += NewRecovered.toLocaleString()
  newDeathsH4.innerHTML += NewDeaths.toLocaleString()
}

xml.send()

// select list
document.querySelector('.get-data').addEventListener('click', (e) => {
  const request = new XMLHttpRequest()
  request.open('GET', 'https://api.covid19api.com/summary', true)
  request.onload = async function () {
    let res = JSON.parse(this.responseText)

    res.Countries.map((country) => {
      const { TotalConfirmed, TotalRecovered, TotalDeaths, Country } = country
      const div = document.createElement('div')
      div.className = 'info red darken-1 white-text'
      div.innerHTML += `<h5>${Country}</h5>`
      div.innerHTML += `<p>Cases: ${TotalConfirmed}</p>`
      div.innerHTML += `<p>Recovered: ${TotalRecovered}</p>`
      div.innerHTML += `<p>Total Deaths: ${TotalDeaths}</p>`
      div.innerHTML += `<br>`

      document.querySelector('.grid').appendChild(div)
    })
  }

  e.preventDefault()
  request.send()
})
