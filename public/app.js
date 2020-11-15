function registrarUrl() {
    const urlIngresada = document.getElementById("urlOriginal").value;
    // console.log("Recibida", urlIngresada);
    let payload = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ original_url: urlIngresada }),
    };
  
    fetch('/', payload)
    .then(response => {
      if (response.ok) {
        // console.log("la respnse", response.json())
        return response.json();
      } else {
        throw "Error en la llamada Ajax";
      }
    })
    .then(response => {
      document.getElementById('url').value = '';
      let html =
        `
          <p>URL Generada: <a href=${response}>${response}</a></p>
        `;
      let node = document.createRange().createContextualFragment(html);
      document.getElementById('generated_url').prepend(node);
      // console.log("la url ", response)
    })
    .catch(error => {
      console.log('Error: ', error); 
    })
}