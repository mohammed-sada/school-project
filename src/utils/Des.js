const des = {};
function encrypt(message) {
    //1- key generation steps:
    let keyword = "password";
    var Extendedkey = new Array(keyword.length);
    for (var i = 0; i < keyword.length; i++) {
        // appending zero to the start make key length=64 as ascii =7bits only!
        Extendedkey[i] = 0 + "" + keyword.charCodeAt(i).toString(2);
    }
    
    var Permutechoice1 = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27,
        19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29,
        21, 13, 5, 28, 20, 12, 4];
    var Shortenkey = new Array(56);
    for (var i = 0; i < 56; i++) {
        Shortenkey[i] = Extendedkey.join("").charAt(Permutechoice1[i] - 1);
    }
    
    //to divide key into 2 parts:
    var Rightpart = new Array(28);
    var Leftpart = new Array(28);
    for (let i = 0; i < 28; i++) {
        Leftpart[i] = Shortenkey.join("").charAt(i);
    }
    var index = 0;
    for (let i = 28; i < 56; i++) {
        Rightpart[index] = Shortenkey.join("").charAt(i);
        index++;
    }
    
    //================================================================
    //2- to split plaintxt into 2 parts:
    let DESplain = message;
    let Extendedplain = new Array(DESplain.length);
    for (let i = 0; i < DESplain.length; i++) {
        // appending zero to the start make plaintxt length=64 as ascii =7bits only!
        Extendedplain[i] = 0 + "" + DESplain.charCodeAt(i).toString(2);
    }
    
    var initialpermute = [58, 50, 42, 34, 26, 18, 10,
        2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38, 30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8, 57
        , 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23,
        15, 7];
    var initialplain = new Array(64);
    for (var i = 0; i < 64; i++) {
        initialplain[i] = Extendedplain.join("").charAt(initialpermute[i] - 1);
    }
    var Rightplain = new Array(32);
    var Leftplain = new Array(32);
    for (var i = 0; i < 32; i++) {
        Leftplain[i] = initialplain.join("").charAt(i);
    }
    let index2 = 0;
    for (let i = 32; i < 64; i++) {
        Rightplain[index2] = initialplain.join("").charAt(i);
        index2++;
    }
    
    //=====================================================
    let Round = 0;
    let Allkeys = new Array(16);
    // loop for 16 rounds:
    do {
        let Numleftshifts = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];
        let num = 0;
        while (num < Numleftshifts[Round]) {
            for (var i = 0; i < 28; i++) {
                var t1 = Leftpart[0];
                var t2 = Rightpart[0];
                Leftpart[i] = Leftpart[i + 1];
                Rightpart[i] = Rightpart[i + 1];
            }
            Leftpart[27] = t1;
            Rightpart[27] = t2;
            num++;
        }
        
        let collect = Leftpart.join("") + Rightpart.join("");
        
        let permutedchoice2 = [
            14, 17, 11, 24, 1, 5,
            3, 28, 15, 6, 21, 10,
            23, 19, 12, 4, 26, 8,
            16, 7, 27, 20, 13, 2,
            41, 52, 31, 37, 47, 55,
            30, 40, 51, 45, 33, 48,
            44, 49, 39, 56, 34, 53,
            46, 42, 50, 36, 29, 32
        ];
        
        let Shortenkey2 = new Array(48);
        for (let i = 0; i < 48; i++) {
            Shortenkey2[i] = collect.charAt(permutedchoice2[i] - 1);
        }
        Allkeys[Round] = Shortenkey2.join("");
        
        //=======================================================================
        //plain formating:
        var NewRightplain = new Array(32);
        var NewLeftplain = new Array(32);
        for (let i = 0; i < 32; i++) {
            NewLeftplain[i] = Rightplain[i];
        }
        
        //========================================================================
        //mixer:
        //1-Dbox Permutation:
        let Dbox = [
            32, 1, 2, 3, 4, 5,
            4, 5, 6, 7, 8, 9,
            8, 9, 10, 11, 12, 13,
            12, 13, 14, 15, 16, 17,
            16, 17, 18, 19, 20, 21,
            20, 21, 22, 23, 24, 25,
            24, 25, 26, 27, 28, 29,
            28, 29, 31, 31, 32, 1];
        var helpright = new Array(48);
        for (let i = 0; i < 48; i++) {
            helpright[i] = Rightplain.join("").charAt(Dbox[i] - 1);
        }
        //console.log(helpright.join(""));
        //===============================
        //2-Whitener XOR:
        var keyrightxor = new Array(48);
        for (let i = 0; i < 48; i++) {
            //xor=(p.!q)+(!p.q)
            keyrightxor[i] = (parseInt(helpright.join("").charAt(i)) && (Number(!(parseInt(Allkeys[Round].charAt(i))))) || (Number(!(parseInt(helpright.join("").charAt(i)))) && (parseInt(Allkeys[Round].charAt(i)))));
        }
        //console.log(keyrightxor.join(""));
        //================================
        //3-Sbox :
        var Sbox = new Array(8);
        for (let i = 0; i < 8; i++) {
            Sbox[i] = new Array(4);
            for (let j = 0; j < 4; j++) {
                Sbox[i][j] = new Array(16);
            }
        }
        //console.log(Sbox);
        let sbox1 = [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7,
            0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8,
            4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0,
            15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13
        ];
        let sbox2 = [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10,
            3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5,
            0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15,
            13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9
        ];
        let sbox3 = [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8,
            13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1,
            13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7,
            1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12
        ];
        let sbox4 = [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15,
            13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9,
            10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4,
            3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14
        ];
        let sbox5 = [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9,
            14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6,
            4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14,
            11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3
        ];
        let sbox6 = [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11,
            10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8,
            9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6,
            4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13
        ];
        let sbox7 = [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1,
            13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6,
            1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2,
            6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12
        ];
        let sbox8 = [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7,
            1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2,
            7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8,
            2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11
        ];
        // fill the 3d array with sboxes values:
        for (let i = 0; i < 8; i++) {
            var b = 0;
            for (let j = 0; j < 4; j++) {
                for (let k = 0; k < 16; k++) {
                    if (i == 0) {
                        Sbox[i][j][k] = sbox1[b];
                        b++;
                    } else if (i == 1) {
                        Sbox[i][j][k] = sbox2[b];
                        b++;
                    } else if (i == 2) {
                        Sbox[i][j][k] = sbox3[b];
                        b++;
                    } else if (i == 3) {
                        Sbox[i][j][k] = sbox4[b];
                        b++;
                    } else if (i == 4) {
                        Sbox[i][j][k] = sbox5[b];
                        b++;
                    } else if (i == 5) {
                        Sbox[i][j][k] = sbox6[b];
                        b++;
                    } else if (i == 6) {
                        Sbox[i][j][k] = sbox7[b];
                        b++;
                    } else if (i == 7) {
                        Sbox[i][j][k] = sbox8[b];
                        b++;
                    } else {
                        break;
                    }
                }
            }
        }
        
        //3- To reduce the 48bit right to 32 again:
        //divide the array into 8 places each one with 6 bits:
        let sub = new Array(8);
        let indexofsubarray = 0;
        for (let i = 0; i < 48; i += 6) {
            sub[indexofsubarray] = keyrightxor.join("").slice(i, i + 6);
            indexofsubarray++;
        }
       
        var out = new Array(8);
        for (let i = 0; i < 8; i++) {
            //for converting binary to decimal for sbox:
            let help1 = parseInt((sub[i].charAt(0) + sub[i].charAt(5)), 2);
            let help2 = parseInt((sub[i].slice(1, 5)), 2);
            for (let j = 0; j < 4;) {
                for (let k = 0; k < 16; k++) {
                    if (help1 == j) {
                        if (help2 == k) {
                            out[i] = Sbox[i][j][k];
                        } else {
                            continue;
                        }
                    }
                }
                j++;
            }
            
        }
        
        //for convertion the decimal out of sbox to binary :
        var outbinary = new Array(8);
        for (let i = 0; i < 8; i++) {
            outbinary[i] = out[i].toString(2);
            //for representing each number in 4 bits:
            while (outbinary[i].length < 4) {
                outbinary[i] = 0 + "" + outbinary[i];
            }
        }
        //===================================
        //4-final function permutation:
        var finalfuncpermute = [16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10, 2, 8, 24, 14, 32,
            27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25];
        var finalfuncpermutearr = new Array(32);
        for (let i = 0; i < 32; i++) {
            finalfuncpermutearr[i] = outbinary.join("").charAt(finalfuncpermute[i] - 1);
        }
        
        //====================================================================
        //xor with leftpart:
        for (let i = 0; i < 32; i++) {
            //xor=(p.!q)+(!p.q)
            NewRightplain[i] = (parseInt(finalfuncpermutearr.join("").charAt(i)) && (Number(!(parseInt(Leftplain.join("").charAt(i))))) || (Number(!(parseInt(finalfuncpermutearr.join("").charAt(i)))) && (parseInt(Leftplain.join("").charAt(i)))));
        }
        //console.log(NewRightplain.join(""));
        Round++;
        Rightplain = NewRightplain;
        Leftplain = NewLeftplain;
    } while (Round < 16);
    
    var temp = NewRightplain.join("");
    NewRightplain = NewLeftplain.join("");
    NewLeftplain = temp;
   
    var finalrightleft = NewLeftplain + NewRightplain;
    var finalarray = new Array(64);
    var finalDESpermute = [40, 8, 48, 16, 56, 24, 64, 32,
        39, 7, 47, 15, 55, 23, 63, 31,
        38, 6, 46, 14, 54, 22, 62, 30,
        37, 5, 45, 13, 53, 21, 61, 29,
        36, 4, 44, 12, 52, 20, 60, 28,
        35, 3, 43, 11, 51, 19, 59, 27,
        34, 2, 42, 10, 50, 18, 58, 26,
        33, 1, 41, 9, 49, 17, 57, 25];
    for (let i = 0; i < 64; i++) {
        finalarray[i] = finalrightleft.charAt(finalDESpermute[i] - 1);
    }

    //===================================
    //to convert binary to string:
    var splitfinalarray = new Array(8);
    var h=0;
    for (let i = 0; i < 64; i+=8) {
        splitfinalarray[h] = finalarray.join("").slice(i, i + 8);
        h++;
    }
    console.log(splitfinalarray);
    var charsarray = new Array(8);
    for (let i = 0; i < 8; i++) {
        charsarray[i]=String.fromCharCode(parseInt(splitfinalarray[i],2));
    }
   cipher.value= charsarray.join("");
}
module.exports = des;