const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
    const weatherURL = "http://api.weatherstack.com/current?access_key=c78c1b47962ef1cab22e8c29830b347f&query="
                         + latitude + "," + longitude;

    request({url: weatherURL, json: true}, (error, response) => {
        if(error){
            callback("There is an error connecting to the weather service!", undefined);
        }else if(response.body.error){
            callback("Invalid location. Please try another search!", undefined);
        }else{
            const weather = response.body
            
            const report = "It is currently " + weather.current.temperature +
                            " degrees, but it feels like " + weather.current.feelslike + " degrees.";
            
            callback(undefined, report);
        }
    });
}

module.exports = forecast;