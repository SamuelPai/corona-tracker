document.addEventListener("DOMContentLoaded", function () {

    var docHeight = $(window).height();
    var footerHeight = $('#footer').height();
    var footerTop = $('#footer').position().top + footerHeight;

    if (footerTop < docHeight)
        $('#footer').css('margin-top', 10+ (docHeight - footerTop) + 'px');


    // cases page
    let casesForm = document.getElementById("cases-form")
    casesForm.addEventListener("submit", function (event) {
        let country = document.getElementById("zipCode").value
        event.preventDefault()
        fetch(`https://covid-19-tracking.p.rapidapi.com/v1/${country}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "cf6a8d9d1bmsh5a7dbe6ad642be9p150856jsn6d13152bceef",
                "x-rapidapi-host": "covid-19-tracking.p.rapidapi.com",
                "content-type": "application/json"
            }
        }).then(response =>
            response.json()
        ).then(data => {
            casesForm.reset()
            console.log(data)
            let country = data.Country_text
            let activeCases = data["Active Cases_text"]
            let totalCases = data["Total Cases_text"]
            document.getElementById("country").textContent = country
            document.getElementById("active").textContent = activeCases
            document.getElementById("totalCases").textContent = totalCases
            document.getElementById("results").removeAttribute("id")
            

        })
            .catch(err => {
                console.error(err);
            });

    });

})