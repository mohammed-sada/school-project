const des = {};

let local = "";
function stringToHex(str) {
  var hex = "";
  for (var i = 0; i < str.length; i++) {
    hex += str.charCodeAt(i).toString(16);
  }
  return hex;
}
function divideMessage(message) {
  const messageLength = message.length;
  const numChunks = Math.ceil(messageLength / 8);
  const chunks = [];

  for (let i = 0; i < numChunks; i++) {
    chunks.push(message.substr(i * 8, 8));
  }

  return chunks;
}

// hex to string
function hexToString(hex) {
  var str = "";
  for (var i = 0; i < hex.length; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return str;
}

function hex2bin(s) {
  // hexadecimal to binary conversion
  const mp = {
    0: "0000",
    1: "0001",
    2: "0010",
    3: "0011",
    4: "0100",
    5: "0101",
    6: "0110",
    7: "0111",
    8: "1000",
    9: "1001",
    A: "1010",
    B: "1011",
    C: "1100",
    D: "1101",
    E: "1110",
    F: "1111",
  };
  let bin = "";
  for (let i = 0; i < s.length; i++) {
    bin += mp[s[i].toUpperCase()];
  }
  return bin;
}

function bin2hex(s) {
  // binary to hexadecimal conversion
  const mp = {
    "0000": "0",
    "0001": "1",
    "0010": "2",
    "0011": "3",
    "0100": "4",
    "0101": "5",
    "0110": "6",
    "0111": "7",
    1000: "8",
    1001: "9",
    1010: "A",
    1011: "B",
    1100: "C",
    1101: "D",
    1110: "E",
    1111: "F",
  };

  let hex = "";
  for (let i = 0; i < s.length; i += 4) {
    let ch = "";
    ch += s[i];
    ch += s[i + 1];
    ch += s[i + 2];
    ch += s[i + 3];
    hex += mp[ch];
  }
  return hex;
}

function permute(k, arr, n) {
  let per = "";
  for (let i = 0; i < n; i++) {
    per += k[arr[i] - 1];
  }
  return per;
}

function shift_left(k, shifts) {
  let s = "";
  for (let i = 0; i < shifts; i++) {
    for (let j = 1; j < 28; j++) {
      s += k[j];
    }
    s += k[0];
    k = s;
    s = "";
  }
  return k;
}

function xor_(a, b) {
  let ans = "";
  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) {
      ans += "0";
    } else {
      ans += "1";
    }
  }
  return ans;
}

function encrypt(pt, rkb, rk) {
  // Hexadecimal to binary
  pt = hex2bin(pt);
  local = pt;

  // Initial Permutation Table
  const initial_perm = [
    58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46,
    38, 30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8, 57, 49, 41, 33, 25, 17, 9,
    1, 59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47,
    39, 31, 23, 15, 7,
  ];

  // Initial Permutation
  pt = permute(pt, initial_perm, 64);

  // Splitting Permuted Text into L[0] and R[0]
  // Splitting Permuted Text into L[0] and R[0]
  let l = pt.substr(0, 32);
  let r = pt.substr(32, 64);
  const exp_d = [
    32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13, 12, 13, 14, 15,
    16, 17, 16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25, 24, 25, 26, 27, 28,
    29, 28, 29, 30, 31, 32, 1,
  ];
  let s = [
    [
      [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
      [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
      [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
      [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13],
    ],

    [
      [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
      [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
      [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
      [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9],
    ],

    [
      [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
      [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
      [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
      [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12],
    ],

    [
      [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
      [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
      [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
      [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14],
    ],

    [
      [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
      [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
      [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
      [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3],
    ],

    [
      [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
      [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
      [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
      [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13],
    ],

    [
      [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
      [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
      [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
      [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12],
    ],

    [
      [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
      [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
      [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
      [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11],
    ],
  ];

  const perm = [
    16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10, 2, 8, 24, 14,
    32, 27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25,
  ];
  const final_perm = [
    40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14,
    54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60,
    28, 35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41,
    9, 49, 17, 57, 25,
  ];

  // Loop for 16 rounds
  for (let i = 0; i < 16; i++) {
    let temp = r;
    // Expansion D-Box
    let r_expanded = permute(temp, exp_d, 48);

    // XOR RoundKey[i] and expanded R[i-1]
    let x = xor_(rkb[i], r_expanded);

    // S-boxes
    let op = "";
    for (let i = 0; i < 8; i++) {
      let row = 2 * parseInt(x[i * 6], 10) + parseInt(x[i * 6 + 5], 10);
      let col =
        8 * parseInt(x[i * 6 + 1], 10) +
        4 * parseInt(x[i * 6 + 2], 10) +
        2 * parseInt(x[i * 6 + 3], 10) +
        parseInt(x[i * 6 + 4], 10);
      let val = s[i][row][col];
      op += String.fromCharCode(val / 8 + 48);
      val = val % 8;
      op += String.fromCharCode(val / 4 + 48);
      val = val % 4;
      op += String.fromCharCode(val / 2 + 48);
      val = val % 2;
      op += String.fromCharCode(val + 48);
    }
    // Straight D-box
    op = permute(op, perm, 32);

    // XOR l and op
    x = xor_(op, l);

    l = x;

    // Swapper
    if (i !== 15) {
      [l, r] = [r, l];
    }
    // console.log(`Round ${i + 1} ${bin2hex(l)} ${bin2hex(r)} ${rk[i]}`);
  }

  // Combination
  let combine = l + r;

  // Final Permutation
  let cipher = bin2hex(permute(combine, final_perm, 64));
  return cipher;
}

const message = "123456ABCD132536";

let key = "AABB09182736CCDD";
key = hex2bin(key);
const keyp = [
  57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35,
  27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38,
  30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4,
];
key = permute(key, keyp, 56);
const shift_table = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
const key_compare = [
  14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27,
  20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34,
  53, 46, 42, 50, 36, 29, 32,
];
// left and right
let left = key.substr(0, 28);
let right = key.substr(28, 56);
const rkb = []; // rkb for RoundKeys in binary
const rk = []; // rk for RoundKeys in hexadecimal

for (let i = 0; i < 16; i++) {
  // Shifting
  left = shift_left(left, shift_table[i]);
  right = shift_left(right, shift_table[i]);

  // Combining
  const combine = left + right;

  // Key Compression
  const RoundKey = permute(combine, key_compare, 48);

  rkb.push(RoundKey);
  rk.push(bin2hex(RoundKey));
}

//console.log(encrypt("AABB09182736CCDD", rkb, rk));
const rkbRev = rkb.slice().reverse();
const rkRev = rk.slice().reverse();
//console.log(encrypt("84A46D55A515DD48", rkbRev, rkRev));

//console.log(hex2bin("61686d6564"));
des.encrypt = function (message) {
  let encrypted = "";
  // append message to 8 characters if < 8
  if (message.length < 8) {
    message = message.padEnd(8, " ");
    encrypted += encrypt(stringToHex(message), rkb, rk);
  }

  //console.log(encrypt(encrypted, rkbRev, rkRev));

  if (message.length >= 8) {
    let temp = divideMessage(message);
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].length < 8) {
        temp[i] = temp[i].padEnd(8, " ");
        encrypted += encrypt(stringToHex(temp[i]), rkb, rk);
      }
      if (temp[i].length == 8)
        encrypted += encrypt(stringToHex(temp[i]), rkb, rk);
    }
  }

  // if (message.length == 8)
  // encrypted.concat(encrypt(stringToHex(message), rkb, rk));

  return encrypted;
};

des.decrypt = function (cipher) {
  console.log("cipher : " + cipher);
  let decrypted = encrypt(cipher, rkbRev, rkRev);
  console.log("decrypted hex : " + decrypted);
  return hexToString(decrypted);
};
//console.log(des.encrypt("ahmedizzmurtaas"));
console.log(des.decrypt(des.encrypt("ahmed")));
//console.log(des.decrypt(des.encrypt("ahmedizzmurtaas")));
// console.log(divideMessage("ahmedizzmurtja"));
// let t = divideMessage("ahmedizzmurtja");
// console.log(des.encrypt(t[1]));
// console.log(des.decrypt(des.encrypt(t[1])));
// console.log(t[1]);
module.exports = des;
