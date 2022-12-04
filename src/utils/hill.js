function getDeterminent(matrix) {
    let x = matrix[0][0] * ((matrix[1][1] * matrix[2][2]) - (matrix[2][1] * matrix[1][2]));
    let y = matrix[0][1] * ((matrix[1][0] * matrix[2][2]) - (matrix[2][0] * matrix[1][2]));
    let z = matrix[0][2] * ((matrix[1][0] * matrix[2][1]) - (matrix[2][0] * matrix[1][1]));
    return (x - y + z);
}

function modularInverse(m, n) {
    let x = m;
    let y = n;

    let divs = [];
    let adds = [];

    let result;

    if (y > x) {
        let i = 1;
        while (x != 0) {
            divs[i] = Math.floor(y / x);
            let temp = x;
            x = y % x;
            y = temp;
            i++;
        }

        let len = divs.length;
        adds[len - 1] = 0;
        adds[len - 2] = 1;
        for (let index = len - 2; index > 0; index--) {
            adds[index - 1] = (divs[index] * adds[index]) + adds[index + 1];
        }

        if ((adds[0] * m) > (adds[1] * n)) {
            result = adds[0];
        } else {
            result = n - adds[0];
        }

    }

    return result;

}

function inverseMatrix(matrix) {
    let minorMatrix = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {

            minorMatrix[i][j] = (matrix[(i + 1) % 3][(j + 1) % 3] * matrix[(i + 2) % 3][(j + 2) % 3]) - (matrix[(i + 1) % 3][(j + 2) % 3] * matrix[(i + 2) % 3][(j + 1) % 3]);

        }
    }

    let adjointMatrix = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];
    for (let i = 0; i < minorMatrix.length; i++) {
        for (let j = 0; j < minorMatrix[i].length; j++) {
            adjointMatrix[j][i] = minorMatrix[i][j];
        }
    }
    return adjointMatrix;
}

function multiplyMatrix(a, b) {
    let result = [];
    for (let i = 0; i < a.length; i++) {
        result[i] = 0;
        for (let j = 0; j < a[i].length; j++) {
            result[i] += b[j] * a[i][j];
        }
    }
    return result;
}

function gcd(x, y) {
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
        var t = y;
        y = x % y;
        x = t;
    }
    return x;
}

function getRidOfNeg(x, n) {
    while (x < 0) {
        x += n;
    }
    return x;
}

let n = 26;
let alphbetics = "abcdefghijklmnopqrstuvwxyz";
let key = [
    [17, 17, 5],
    [21, 18, 21],
    [2, 2, 19]
];

let det;

function checkRelativelyPrime() {

    det = parseInt(getDeterminent(key));
    console.log("det = " + det);

    let g = gcd(det, n);
    console.log("gcd = " + g);

    if (g == 1) {
        return true;
    } else {
        return false;
    }
}

function encrypt(plain) {
    let cipher = "";
    if (alphbetics.indexOf(" ") == -1) {
        plain = plain.split(" ").join("");
    }

    for (let index = 0; index < plain.length; index += 3) {
        let x = alphbetics.indexOf(plain[index]);
        let y, z;

        if (index + 1 == plain.length) {
            y = 0;
            z = 1;
        } else {
            y = alphbetics.indexOf(plain[index + 1]);
            if (index + 2 == plain.length) {
                z = 0;
            } else {
                z = alphbetics.indexOf(plain[index + 2]);
            }
        }

        let res = multiplyMatrix(key, [x, y, z]);
        for (let i = 0; i < res.length; i++) {
            if (res[i] < 0) {
                res[i] = getRidOfNeg(res[i], n);
            }
            let j = res[i] % n;
            cipher += alphbetics[j];
        }
    }
    return cipher;
}

function decrypt(cipher) {
    let plain = "";
    let m = det;
    if (det < 0) {
        m = getRidOfNeg(det, n);
    }
    m = m % n;

    console.log("n: " + n);

    console.log("m:  " + m);


    let modularInv = modularInverse(m, n);

    let matrixInv = inverseMatrix(key);

    console.log(modularInv);


    for (let index = 0; index < cipher.length; index += 3) {
        let x = alphbetics.indexOf(cipher[index]);
        let y = alphbetics.indexOf(cipher[index + 1]);
        let z = alphbetics.indexOf(cipher[index + 2]);

        console.log("dec: " + [x, y, z]);


        let res = multiplyMatrix(matrixInv, [x, y, z]);

        console.log("matinv: " + res);



        for (let i = 0; i < res.length; i++) {
            res[i] *= modularInv;


            console.log("res[" + i + "]:  " + res[i]);

            if (res[i] < 0) {
                res[i] = getRidOfNeg(res[i], n);
            }



            let j = res[i] % n;

            plain += alphbetics[j];
        }

    }
    return plain;
}

module.exports = {
    encrypt,
    decrypt
};