//Api Formula 1

function consultarAPI(driverNumber) {
    fetch(`https://api.openf1.org/v1/drivers?driver_number=${driverNumber}&session_key=9158`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos del servidor');
            }
            return response.json();
        })
        .then(data => {
            const driver = data[0];
            console.log(driver);

            // Mostrar los datos en la página
            const driverInfo = document.getElementById(`driver-info${driverNumber}`);
            driverInfo.innerHTML = `
                <h5>Nombre:</h5><p>${driver.full_name}</p>
                <h5>Número:</h5> <p>${driver.driver_number}</p>
                <h5>Nacionalidad:</h5><p> ${driver.country_code}</p>
                <img src="${driver.headshot_url}" alt="Foto de ${driver.full_name}" height=120px>
            `;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

consultarAPI(1);
consultarAPI(11); 
consultarAPI(16);
consultarAPI(55);
consultarAPI(4);
consultarAPI(81);
consultarAPI(44);
consultarAPI(63);
consultarAPI(14);
consultarAPI(18);
consultarAPI(3);
consultarAPI(22);
consultarAPI(27);
consultarAPI(20);
consultarAPI(31);
consultarAPI(10);
consultarAPI(77);
consultarAPI(24);
consultarAPI(23);
consultarAPI(2);








