const colors = document.querySelector('#colors');
const clrBtn = document.querySelector('#clrBtn');
const rgb = document.querySelector('#rgb');
const hex = document.querySelector('#hex');
const hsv = document.querySelector('#hsv');
const hsl = document.querySelector('#hsl');
//const cmyk = document.querySelector('#cmyk');

const colorSwitch = document.querySelector('#colorSwitch');

colorSwitch.addEventListener('click', () => {
    if(colorSwitch.textContent === "js") {
        colorSwitch.textContent = "wasm";
    } else {
        colorSwitch.textContent = "js";
    }
});

clrBtn.addEventListener('click', () => {
    const rgbcolor = randomColor();
    const hexcolor = convertFromRGB('hex', rgbcolor);
    const hsvcolor = convertFromRGB('hsv', rgbcolor);
    const hslcolor = convertFromRGB('hsl', rgbcolor);
    //const cmykcolor = convertFromRGB('cmyk', rgbcolor);
    const inverted = invertRGB(rgbcolor);

    colors.style.backgroundColor = rgbcolor;

    rgb.textContent = rgbcolor;
    rgb.style.color = inverted;

    hex.textContent = hexcolor;
    hex.style.color = inverted;

    hsv.textContent = hsvcolor;
    hsv.style.color = inverted;

    hsl.textContent = hslcolor;
    hsl.style.color = inverted;

    /*cmyk.textContent = cmykcolor;
    cmyk.style.color = inverted;*/

    clrBtn.style.color = rgbcolor;
    clrBtn.style.backgroundColor = inverted;
});

randomColor = () => {
    const r = Math.ceil(Math.random() * 255);
    const g = Math.ceil(Math.random() * 255);
    const b = Math.ceil(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}

invertRGB = (rgb) => {
    const arr = getRGBFromString(rgb);
    return `rgb(${Math.abs(192 - arr[0])}, ${Math.abs(192 - arr[1])}, ${Math.abs(192 - arr[2])})`;
}

getRGBFromString = (rgb) => {
    const a = rgb.split('('); // ['rgb(', 'x, y, z)']
    const b = a[1].split(','); // ['x','y','z)']
    const c = b[2].split(')'); // ['x', 'y', 'z']
    return [Number(b[0]), Number(b[1]), Number(c[0])]; // [x, y, z]
}

convertFromRGB = (toConvert, rgb) => {
    const res = getRGBFromString(rgb);
    if(toConvert === 'hex') {
        return convertToHex(res);
    } else if(toConvert === 'hsv') {
        return convertToHS(res, 'V');
    } else if(toConvert === 'hsl') {
        return convertToHS(res, 'L');
    } /*else if(toConvert === 'cmyk') {
        let c = 0;
        let m = 0;
        let y = 0;
        let k = 0;
        return `cmyk(${c}, ${m}, ${y}, ${k})`;
    }*/ else if(toConvert === 'rgb') {
        return toConvert;
    } else {
        return null;
    }
}

convertToHex = (arr) => {
    const hexArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    let result = '';
    let first, second;
    for(let i = 0; i < 3; i++) {
        first = Math.floor(arr[i] / 16);
        result += hexArr[first];
        second = arr[i] - 16 * first;
        result += hexArr[second];
    }
    return `#${result}`;
}

convertToHS = (arr, last) => {
    let Rnought = arr[0] / 255;
    let Gnought = arr[1] / 255;
    let Bnought = arr[2] / 255;
    let Cmax = Math.max(Rnought, Gnought, Bnought);
    let Cmin = Math.min(Rnought, Gnought, Bnought);
    let delta = Cmax - Cmin;
    let H;
    if(Cmax === Rnought) { // FIX URGENTLY
        H = Math.round(60 * (((Gnought - Bnought)/delta) % 6));
        if(H < 0) { H += 360 } else if(H === 0) { H = 0 }
    } else if(Cmax === Gnought) { // FIX URGENTLY
        H = Math.round(60 * (((Bnought - Rnought)/delta) + 2));
        if(H < 0) { H += 360 } else if(H === 0) { H = 0 }
    } else if(Cmax === Bnought) { // FIX URGENTLY
        H = Math.round(60 * (((Rnought - Gnought)/delta) + 4));
        if(H < 0) { H += 360 } else if(H === 0) { H = 0 }
    } else {
        console.log('Error');
    }

    let S = 0;
    if(Cmax !== 0) {
        S = Math.ceil(delta/Cmax*100);
    }

    if(last === 'V') {
        let V = Math.round(Cmax*100);
        return `hsv(${H}, ${S}, ${V})`;
    } else if(last === "L") {
        let L = Math.ceil(((Cmax*100) / 2));
        return `hsl(${H}, ${S}, ${L})`;
    }
}