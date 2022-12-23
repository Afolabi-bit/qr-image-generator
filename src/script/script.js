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

const generateCode = (url, size, theme) => {
    const qrcode = new QRCode("qrcode", {
        text: url,
        width: size,
        height: size
    })
}

const clear = () => {
    qr.innerHTML = '';

    const btn = document.getElementById('save-link');
    if (btn) btn.remove();
}

const createDownloadBtn = (downloadUrl, name) => {
    const downloadBtn = document.createElement('a');
    downloadBtn.id = 'save-link';
    downloadBtn.classList = 'p-3 px-10 text-offWhite mx-auto mt-8 rounded-lg text-lg bg-red';
    downloadBtn.href = downloadUrl;
    downloadBtn.download = `${name}QRCode`;
    downloadBtn.innerHTML = 'Download Image';
    document.getElementById('generate').appendChild(downloadBtn);
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
                const downloadUrl = qr.querySelector('img').src;
                createDownloadBtn(downloadUrl, name);
            }, 50);
        }, 1500);
    }
})
