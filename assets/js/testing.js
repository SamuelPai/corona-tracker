document.addEventListener("DOMContentLoaded", function () {

    var docHeight = $(window).height();
    var footerHeight = $('#footer').height();
    var footerTop = $('#footer').position().top + footerHeight;

    if (footerTop < docHeight)
        $('#footer').css('margin-top', 10+ (docHeight - footerTop) + 'px');


    let fiftyStates = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"] 
    let inputState = document.getElementById("inputState")
    let testSites = document.getElementById("test-sites")
    let form = document.getElementById("testingForm")
  
    for (let state of fiftyStates) {
        inputState.add(new Option(state, state))

    }
    document.getElementById("testingForm").addEventListener("submit", function (event) {
        let hashMap = {
            "Alabama": "AL",
            "Alaska": "AK",
            "Arizona": "AZ",
            "Arkansas": "AR",
            "California": "CA",
            "Colorado": "CO",
            "Connecticut": "CT",
            "Delaware": "DE",
            "Florida": "FL",
            "Georgia": "GA",
            "Hawaii": "HI",
            "Idaho": "ID",
            "Illinois": "IL",
            "Indiana": "IN",
            "Iowa":"IA",
            "Kansas": "KS",
            "Kentucky": "KY",
            "Louisiana": "LA",
            "Maine": "ME",
            "Maryland": "MD",
            "Massachusetts": "MA",
            "Michigan": "MI",
            "Minnesota": "MN",
            "Mississippi": "MS",
            "Missouri": "MO",
            "Montana": "MT",
            "Nebraska": "NE",
            "Nevada": "NV",
            "New Hampshire": "NH",
            "New Jersey": "NJ",
            "New Mexico": "NM",
            "New York": "NY",
            "North Carolina": "NC",
            "North Dakota": "ND",
            "Ohio": "OH",
            "Oklahoma": "OK",
            "Oregon": "OR",
            "Pennsylvania": "PA",
            "Rhode Island": "RI",
            "South Carolina": "SC",
            "South Dakota": "SD",
            "Tennessee": "TN",
            "Texas": "TX",
            "Utah": "UT",
            "Vermont": "VT",
            "Virginia": "VA",
            "Washington": "WA",
            "West Virginia": "WV",
            "Wisconsin": "WI",
            "Wyoming": "WY"
        }
        let selectedState = inputState.value
        let city = document.getElementById("inputCity").value
        console.log(city)
        event.preventDefault()
      

        fetch(`https://sheetlabs.com/NCOR/covidtestcentersinUS?state=${hashMap[selectedState]}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                testSites.innerHTML = ""
                let cityCollection = []
                for (let site of result) {
                    if (site.city.toLowerCase() == city.toLowerCase()) {
                        cityCollection.push(site.city)
                        // creating the Center Name element
                        let center = document.createElement("h3")
                        let centerName = document.createElement("span")
                        centerName.setAttribute("class", "span")
                        center.textContent = "Center Name: "
                        centerName.textContent = site.centername
                        center.append(centerName)
                        center.setAttribute("class", "marginTop")

                        // creating the address element
                        let address = document.createElement("h3")
                        let addressName = document.createElement("span")
                        addressName.setAttribute("class", "span")
                        address.textContent = "Address: "
                        addressName.textContent = site.address
                        address.append(addressName)

                        // creating the phone element
                        let url = document.createElement("h3")
                        let urlLink = document.createElement("a")
                        urlLink.setAttribute("href", site.url)
                        urlLink.setAttribute("class", "span")
                        url.textContent = "URL: "
                        urlLink.textContent = site.url
                        url.append(urlLink)
                        url.setAttribute("class", "sites")




                        testSites.append(center, address, url)
                    }
                    //   else {
                    //     let h1 = document.createElement("h1")
                    //     h1.textContent = "Sorry, no available information for " + city + ", " + hashMap[selectedState]
                    //     testSites.append(h1)
                    //     break;
                    // }
                    
                    
                }
                if (cityCollection.length < 1) {
                    let h1 = document.createElement("h1")
                    h1.textContent = "Sorry, no available information for " + city + ", " + hashMap[selectedState]
                    testSites.append(h1)
                }
                form.reset()
            })
            .catch(error => console.log('error', error));
    })


});






