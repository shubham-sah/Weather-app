window.addEventListener('load', ()=> {
	let long;
	let lat;
	let tempCondition = document.querySelector(".temperature-condition");
	let tempDegree = document.querySelector(".temperature-degree");
	let locationTimezone = document.querySelector(".location-timezone");
	let temphumidity = document.querySelector(".temperature-humidity")
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position =>{
			console.log(position);
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const api = `https://api.weatherapi.com/v1/current.json?key=f1fda25952e94e849cb153420201505&q=${lat},${long}`;
		
			fetch(api)
			.then(response =>{
				return response.json();
			})
			.then(data => {
				console.log(data);
				const {temp_c, humidity, condition, icon} = data.current;
				const {tz_id} = data.location;
				tempDegree.textContent = temp_c;
				tempCondition.textContent = condition.text;
				locationTimezone.textContent = tz_id;
				setIcons(icon, document.querySelector(".icon"));
			});
		});
	}

	function setIcons(icon, iconID){
		const skycons = new Skycons({color: "white"});
		const currentIcon = icon;
		skycons.play();
		return skycons.set(iconID, skycons[currentIcon]);		 
	}
});