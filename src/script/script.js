const form = document.getElementById('form');
const spinner = document.getElementById('spinner');
const qr = document.getElementById('qrcode');


// REGEX to validate URL
const reg =  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
const regex = new RegExp(reg);

// Control Spinner
const hideSpinner = () => {
    spinner.style.display = 'none';
}

const runSpinner = () => {
    spinner.style.display = 'block';
}

const spinnerRegulator = () => {
    runSpinner();
    setTimeout(() => {
        hideSpinner();
    }, 1500);
}

const generateCode = (url, size) => {
    const qrcode = new QRCode("qrcode", {
        text: url,
        width: size,
        height: size,
        correctLevel : QRCode.CorrectLevel.H
    })
}

const clear = () => {
    qr.innerHTML = '';

    const btn = document.getElementById('save-link');
    if (btn) btn.remove();
}


async function toDataURL(url) {
    const blob = await fetch(url).then(res => res.blob());
    return URL.createObjectURL(blob);
}

async function createDownloadBtn(downloadUrl, name){
    /* axios({
        url: downloadUrl,
        method: 'GET',
        responseType: 'blob'
    })
    .then((response) => {
        const url = window.URL
        .createObjectURL(new Blob([response.data]));
        const btn = document.createElement('a');
        btn.id = 'save-link';
        btn.classList = 'p-3 px-10 text-offWhite mx-auto mt-8 rounded-lg text-lg bg-red';
        btn.innerHTML = 'Download Image';   
        btn.href = url;
        btn.setAttribute('download', `${name}.jpeg`);
        document.getElementById('generate').appendChild(btn);
    }) */

    /* const btn = document.createElement('a');
    btn.setAttribute('href', downloadUrl);
    btn.innerHTML = 'Download Image';   
    btn.setAttribute('download', `${name}.png`);
    btn.classList = 'p-3 px-10 text-offWhite mx-auto mt-8 rounded-lg text-lg bg-red';
    document.getElementById('generate').appendChild(btn); */

    const btn = document.createElement('a');
    btn.href = await toDataURL(url);
    btn.innerHTML = 'Download Image';   
    btn.download = name;
    btn.classList = 'p-3 px-10 text-offWhite mx-auto mt-8 rounded-lg text-lg bg-red';
    document.getElementById('generate').appendChild(btn);
}

hideSpinner();
form.addEventListener('submit', (e) => {
    e.preventDefault();

    let url = document.getElementById('url').value;
    const name = url.split(".")[0];
    const size = document.getElementById('size').value;
    const alert = document.getElementById('alert');

    if (url === '') {
        alert.style.display = 'inline';

        setTimeout(() => {
        alert.style.display = 'none'
        }, 1000);
    } else if(!url.match(regex)){ // REGEX validation
        alert.innerHTML = 'Invalid URL';
        alert.style.display = 'inline';
        
        setTimeout(() => {
        alert.style.display = 'none'
        }, 1000);
    }
     else {
        spinnerRegulator();

        setTimeout(() => {
            clear();
            generateCode(url, size);

            setTimeout(() => {
                const downloadUrl = document.querySelector('#qrcode img')
                console.log(downloadUrl.src)
                createDownloadBtn(downloadUrl.src, name);
            }, 50);
        }, 1500);
    }
})
