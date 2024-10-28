const form = document.getElementById('login-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the page from refreshing
  await getData();
});

// Collect data and store in local storage

async function getData() {
    // Collect all inputs
    const firstname = document.getElementById('firstname').value
    const lastname = document.getElementById('lastname').value
    const email = document.getElementById('email').value
    const image = document.getElementById('image').files[0];
    const address = document.getElementById('address').value

    // Read image from html
    const reader = new FileReader();
    await new Promise(resolve => {
        reader.onload = resolve;
        reader.readAsDataURL(image);
    })
    const imageData = reader.result;
    const userData = {
        firstname,
        lastname,
        email,
        image: imageData,
        address
    }

    // console.log(userData)

    const storedData = localStorage.getItem('userData');
    localStorage.setItem('userData', JSON.stringify(userData))

    window.location.href = 'dashboard.html';

};

// Fetch and display data from the local storage.

function showData() {
    const displayData = document.getElementById('userDisplay')
    const userData = JSON.parse(localStorage.getItem('userData'))
    // console.log(userData);

    // userData.forEach(Data => {
    //     const displayfname = document.getElementById('firstname')
    //     displayfname.innerHTML += `${Data.firstname}`
    // });

    const displayimage = document.getElementById('image');
    displayimage.src = userData.image;
    displayimage.style.width = '100px';
    displayimage.style.height = '100px';
    displayimage.style.borderRadius = '50%';


    const displayfname = document.getElementById('firstname')
    displayfname.innerHTML += `${userData.firstname}`
    const displaylname = document.getElementById('lastname');
    displaylname.innerHTML += userData.lastname;
    const displayemail = document.getElementById('email')
    displayemail.innerHTML += userData.email;
    const displayaddress = document.getElementById('address')
    displayaddress.innerHTML += userData.address;
}

// Collect data from API

async function fetchEcomData(){

    const displayData = document.getElementById('displayData')

    try {
        const fetchedData = await fetch('https://fakestoreapi.com/products');
        const parsedData = await fetchedData.json()
        localStorage.setItem('productData', JSON.stringify(parsedData))
        // console.log(parsedData)

        parsedData.forEach(productData => {
            displayData.innerHTML +=
            
            `
            <div class="card d-flex m-5" style="width: 18rem;">
                <img src="${productData.image}" class="card-img-top" alt="ProductPic" id="img" style="height: 18rem; width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${productData.title}</h5>
                    <h6>Price: ${productData.price}</h6>
                    <h6>Rating: ${productData.rating.rate}</h6>
                    <p class="card-text">${productData.description}</p>
                </div>
            </div>
            `


        });
        // const displayimage = document.getElementById('img')
        // displayimage.src = `${productData.image}`
        
    } catch (err) {
        console.log("Emergency! Check this -->", err)
    }
}