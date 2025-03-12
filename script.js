const apiKey = "d1fc74b54516f8d5fb6f7b423c5895f0"; // Dapatkan API key dari OpenWeather

function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (city === "") {
        alert("Masukkan nama kota!");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=id`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                document.getElementById("weatherResult").innerHTML = "Kota tidak ditemukan!";
            } else {
                const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                updateBackground(data.weather[0].main.toLowerCase());

                document.getElementById("weatherResult").innerHTML = `
                    <h3>${data.name}, ${data.sys.country}</h3>
                    <img src="${weatherIcon}" alt="Weather Icon">
                    <p>${data.weather[0].description}</p>
                    <p>Suhu: ${data.main.temp}°C</p>
                    <p>Kelembaban: ${data.main.humidity}%</p>
                `;
            }
        })
        .catch(error => console.log("Error:", error));
}

function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=id`)
                    .then(response => response.json())
                    .then(data => {
                        const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                        updateBackground(data.weather[0].main.toLowerCase());

                        document.getElementById("weatherResult").innerHTML = `
                            <h3>${data.name}, ${data.sys.country}</h3>
                            <img src="${weatherIcon}" alt="Weather Icon">
                            <p>${data.weather[0].description}</p>
                            <p>Suhu: ${data.main.temp}°C</p>
                            <p>Kelembaban: ${data.main.humidity}%</p>
                        `;
                    })
                    .catch(error => console.log("Error:", error));
            },
            (error) => {
                alert("Gagal mendapatkan lokasi! Izinkan akses lokasi di browser.");
            }
        );
    } else {
        alert("Browser tidak mendukung Geolocation.");
    }
}

// Ubah background sesuai kondisi cuaca
function updateBackground(weatherCondition) {
    const body = document.body;
    if (weatherCondition.includes("rain")) {
        body.style.backgroundImage = "url('rainy.jpg')";
    } else if (weatherCondition.includes("clear")) {
        body.style.backgroundImage = "url('sunny.jpg')";
    } else if (weatherCondition.includes("cloud")) {
        body.style.backgroundImage = "url('cloudy.jpg')";
    } else {
        body.style.backgroundImage = "url('default.jpg')";
    }
}

// Toggle Dark Mode
function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark");

    // Ubah ikon matahari/bulan
    const themeIcon = document.getElementById("theme-icon");
    themeIcon.textContent = body.classList.contains("dark") ? "☀️" : "🌙";

    // Simpan preferensi di localStorage
    localStorage.setItem("theme", body.classList.contains("dark") ? "dark" : "light");
}

// Set tema awal dari localStorage
window.onload = function() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        document.getElementById("theme-icon").textContent = "☀️";
    }
};