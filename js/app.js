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
  document.querySelector('#filter').style.display = 'block'

  const request = new XMLHttpRequest()
  request.open('GET', 'https://api.covid19api.com/summary', true)
  request.onload = async function () {
    let res = JSON.parse(this.responseText)

    res.Countries.map((country) => {
      const { TotalConfirmed, TotalRecovered, TotalDeaths, Country } = country
      const div = document.createElement('div')
      div.className = 'info red darken-1 white-text'
      div.innerHTML += `<h5 class="country-name">${Country.toLocaleString()}</h5>`
      div.innerHTML += `<p>Cases: ${TotalConfirmed.toLocaleString()}</p>`
      div.innerHTML += `<p>Recovered: ${TotalRecovered.toLocaleString()}</p>`
      div.innerHTML += `<p>Total Deaths: ${TotalDeaths.toLocaleString()}</p>`
      div.innerHTML += `<br>`

      document.querySelector('.grid').appendChild(div)
    })
  }

  e.preventDefault()
  request.send()
})

document.querySelector('#filter').addEventListener('keyup', (e) => {
  const text = e.target.value.toLowerCase()

  for (i of document.querySelectorAll('.info')) {
    const countryName = i.firstChild.textContent

    countryName.toLowerCase().indexOf(text) != -1
      ? (i.style.display = 'block')
      : (i.style.display = 'none')
  }
})
