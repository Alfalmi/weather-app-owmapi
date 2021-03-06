window.addEventListener('load', () => {
    let lon;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let locationIcon = document.querySelector('.weather-icon');
    const temperatureScale = document.querySelector('.temperature-value p');
    

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude.toFixed(2);
            lat = position.coords.latitude.toFixed(2);
           // const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=eb04835dda9d8a175d43f9cc3c5890b5`;
            
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temp} = data.main;
                const [{description, icon}] = data.weather;
                const zoneName = data.name;

                const celsius = (temp-273.15).toFixed(1);

                temperatureDegree.textContent = celsius;
                const f = (celsius * 1.8+32).toFixed(1);
                
                //Set DOM Element from the API
               

                
                locationTimezone.textContent = zoneName;
                temperatureDescription.textContent = description;
                
                
                locationIcon.innerHTML = `<img src="icons/${icon}.png"></img>`;

                console.log(f);

                temperatureScale.addEventListener('click', () => {
                    if (temperatureScale.textContent === 'F') {
                        temperatureScale.textContent = 'C';
                        temperatureDegree.textContent = celsius;
                        
                    }else {
                        temperatureScale.textContent = 'F';
                        temperatureDegree.textContent = f;
                    }
                })
            });
        });
        
    } 
});