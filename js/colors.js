const colors = document.querySelector('#colors');
const clrBtn = document.querySelector('#clrBtn');
const chClr = document.querySelector('#chClr');
const clrDrop = document.querySelector("#clrDrop");
const clrOpts = document.querySelector('#clrOpts');
const rgb = document.querySelector('#rgb');
const hex = document.querySelector('#hex');
const hsv = document.querySelector('#hsv');
const hsl = document.querySelector('#hsl');
//const cmyk = document.querySelector('#cmyk');
const inv = document.querySelector('#inv');

const clrV = document.querySelector('#clrV');
const clrReset = document.querySelector('#clrReset');
const clrCpyA = document.querySelector('#clrCpyA');
const clrInv = document.querySelector('#clrInv');
const clrFive = document.querySelector('#clrFive');

const clrCpOne = document.querySelector('#clrCpOne');
const clrCpTwo = document.querySelector('#clrCpTwo');
const clrCpThree = document.querySelector('#clrCpThree');
const clrCpFour = document.querySelector('#clrCpFour');
//const clrCpFive = document.querySelector('#clrCpFive');

const chngTxt = document.querySelectorAll('.chngTxt');
const chngBtn = document.querySelectorAll('.chngBtn');
const clrBtns = document.querySelectorAll('.clrBtns');

const colorSwitch = document.querySelector('#colorSwitch');

const colorArray = [{ rgb: 'rgb(26, 32, 44)', hex: '#1A202C', hsv: 'hsv(220, 41%, 17%)', hsl: 'hsl(220, 41%, 9%)', cmyk: '', inrgb: 'rgb(203, 213, 224)', inhex: '#CBD5E0', inhsv: 'hsv(211, 10%, 88%)', inhsl: 'hsl(211, 10%, 44%)', incmyk: '' }];

colorSwitch.addEventListener('click', () => {
    if(colorSwitch.textContent === "js") {
        colorSwitch.textContent = "wasm";
    } else {
        colorSwitch.textContent = "js";
    }
});

clrBtn.addEventListener('click', () => {
    const rgbcolor = randomColor();
    const hexcolor = convertFromRGB('hex', rgbcolor, false);
    const hsvcolor = convertFromRGB('hsv', rgbcolor, false);
    const hslcolor = convertFromRGB('hsl', rgbcolor, false);
    //const cmykcolor = convertFromRGB('cmyk', rgbcolor, false);
    const inverted = invertRGB(rgbcolor);

    colors.style.backgroundColor = rgbcolor;

    let invertedArr = invertAll(false);

    let obj = {
        rgb: rgbcolor,
        hex: hexcolor,
        hsv: hsvcolor,
        hsl: hslcolor,
        cmyk: '',
        inrgb: invertedArr[0],
        inhex: invertedArr[1],
        inhsv: invertedArr[2],
        inhsl: invertedArr[3],
        incmyk: ''
    }
    manageArray(obj);

    rgb.textContent = rgbcolor;
    hex.textContent = hexcolor;
    hsv.textContent = hsvcolor;
    hsl.textContent = hslcolor;
    //cmyk.textContent = cmykcolor;
    inv.textContent = inverted;

    for(let elem of chngTxt) {
        elem.style.color = inverted;
    }
    for(let elem of chngBtn) {
        elem.style.color = rgbcolor;
        elem.style.backgroundColor = inverted;
    }/*
    for(let elem of clrOpts.children) {
        elem.style.color = rgbcolor;
        elem.style.backgroundColor = inverted;
    }*/
});

clrReset.addEventListener('click', () => {
    colors.style.backgroundColor = '#1A202C';

    rgb.textContent = 'rgb(26, 32, 44)';
    hex.textContent = '#1A202C';
    hsv.textContent = 'hsv(220, 41%, 17%)';
    hsl.textContent = 'hsl(220, 41%, 9%)';

    for(let elem of chngTxt) {
        elem.style.color = '#CBD5E0'; // Change text color;
    }
    for(let elem of clrBtns) {
        elem.style.color = '#1A202C';
        elem.style.backgroundColor = "#CBD5E0";
    }
    chClr.style.backgroundColor = '#CBD5E0';
    /*
    for(let elem of clrOpts.children) {
        elem.style.color = '#1A202C';
        elem.style.backgroundColor = '#CBD5E0';
    }*/
});

clrCpyA.addEventListener('click', () => {
    copyContent(`${rgb.textContent}\n${hex.textContent}\n${hsv.textContent}\n${hsl.textContent}`);
});

clrInv.addEventListener('click', () => {
    copyContent(invertAll(true));
});

clrFive.addEventListener('click', () => {
    //
});

clrCpOne.addEventListener('click', () => {
    copyContent(`${rgb.textContent}`);
});

clrCpTwo.addEventListener('click', () => {
    copyContent(`${hex.textContent}`);
});

clrCpThree.addEventListener('click', () => {
    copyContent(`${hsv.textContent}`);
});

clrCpFour.addEventListener('click', () => {
    copyContent(`${hsl.textContent}`);
});
/*
clrCpFive.addEventListener('click', () => {
    copyContent(`${hsl.textContent}`);
});*/

copyContent = (toCopy) => {
    // Solution source: https://inspiredwebdev.com/copy-to-clipboard-with-javascript
    const temp = document.createElement('textarea');
    temp.value = toCopy;
    temp.setAttribute('readonly', '');
    temp.style.position = 'absolute';
    temp.style.left = '-9999px';
    document.body.appendChild(temp);
    temp.select();
    temp.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(temp);
}

manageArray = (obj) => {
    if(colorArray.length >= 5) {
        colorArray.shift();
        colorArray.push(obj);
    } else {
        colorArray.push(obj);
    }
}

invertAll = (returnString) => {
    let invert = inv.textContent;
    let invertHex = convertFromRGB('hex', invert, true);
    let invertHSL = convertFromRGB('hsl', invert, true);
    let invertHSV = convertFromRGB('hsv', invert, true);
    //let invertCMYK = convertFromRGB('cmyk', invert, true);
    if(returnString) {
        return `${invert}\n${invertHex}\n${invertHSL}\n${invertHSV}`;
    }
    return [invert, invertHex, invertHSL, invertHSV];
}

randomColor = () => {
    const r = Math.ceil(Math.random() * 255);
    const g = Math.ceil(Math.random() * 255);
    const b = Math.ceil(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}

invertRGB = (rgb) => {
    const arr = getHSLFromString(convertToHS(getRGBFromString(rgb), 'L'));
    const retArr = HSLtoRGB([Math.abs(180 - arr[0]), arr[1], arr[2]], false);
    return `rgb(${Math.abs(retArr[0])}, ${Math.abs(retArr[1])}, ${Math.abs(retArr[2])})`;
}

getRGBFromString = (rgb) => {
    const a = rgb.split('('); // ['rgb(', 'x, y, z)']
    const b = a[1].split(','); // ['x','y','z)']
    const c = b[2].split(')'); // ['x', 'y', 'z']
    return [Number(b[0]), Number(b[1]), Number(c[0])]; // [x, y, z]
}

getHSLFromString = (hsl) => {
    const a = hsl.split('(');
    const b = a[1].split(',');
    const c = b[1].split('%');
    const d = b[2].split('%');
    return [Number(b[0]), Number(c[0]), Number(d[0])];
  }

convertFromRGB = (toConvert, rgb, stringIn) => {
    let res;
    if(stringIn === true) {
        res = rgb;
    }
    res = getRGBFromString(rgb);
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
        return `hsv(${H}, ${S}%, ${V}%)`;
    } else if(last === "L") {
        let L = Math.ceil(((Cmax*100) / 2));
        return `hsl(${H}, ${S}%, ${L}%)`;
    }
}

HSLtoRGB = (arr, returnString) => {
    const H = arr[0];
    const S = arr[1]/100;
    const L = arr[2]/100;

    const C = (1 - Math.abs(2*L - 1)) * S;
    console.log(C)
    const X = C * (1 - Math.abs((H / 60) % 2 - 1));
    console.log(X)
    const m = L - C/2;
    console.log(m)
    let Rnought, Gnought, Bnought;
    if(H >= 0 && H < 60) {
        Rnought = C;
        Gnought = X;
        Bnought = 0;
    } else if(H >= 60 && H < 120) {
        Rnought = X;
        Gnought = C;
        Bnought = 0;
    } else if(H >= 120 && H < 180) {
        Rnought = 0;
        Gnought = C;
        Bnought = X;
    } else if(H >= 180 && H < 240) {
        Rnought = 0;
        Gnought = X;
        Bnought = C;
    } else if(H >= 240 && H < 300) {
        Rnought = X;
        Gnought = 0;
        Bnought = C;
    } else if(H >= 300 && H < 360) {
        Rnought = C;
        Gnought = 0;
        Bnought = X;
    } else {
        console.log('Dumb');
    }
    const r = Math.round((Rnought + m) * 255);
    const g = Math.round((Gnought + m) * 255);
    const b = Math.round((Bnought + m) * 255);
    if(returnString) {
        return `rgb(${r}, ${g}, ${b})`;
    }
    return [r, g, b];
}