


<div align="center"><strong> Department of Software Engineering </br>Information Security</br>(ITCS4301)</br>Encryption and Decryption Algorithms Project</br><a href="https://information-security-university.netlify.app/">Project Demo</a>
 </br></strong></div>

#### Algorithms used:

<strong> -   Hill cipher: </strong>

In a polygraphic substitution, A number modulo 26 represents each letter.</br> It is common to employ the straightforward formula `` A = 0, B = 1,..., Z = 25,``  Each block of n letters, which is thought of as an n-component vector, is multiplied by an invertible `` n*n `` matrix against modulus `` 26 `` to encrypt a message. Each block is multiplied by the inverse of the encryption matrix to decrypt the message.

The set of invertible `` n*n ``  matrices should contain the cipher key, which is the matrix used for encryption `` (modulo 26) `` .

<strong> -   DES cipher: </strong>

As a block cipher, DES encrypts data in blocks of 64 bits each, therefore ``64 bits`` of plain text are used as the input, and DES outputs ``64 bits`` of ciphertext. With a few minor exceptions, encryption and decryption use the same algorithm and key.
<hr>

#### Mode of operation:

<strong> -   Cipher Block Chaining (CPC): </strong>

Since ECB violates some security criteria, cipher block chaining, or CBC, is an improvement on ECB. Following XOR with the initial plaintext block, the preceding cipher block is passed as input to the subsequent encryption process in CBC. Simply explained, a cipher block is created by encrypting the XOR output of the current plaintext block and the preceding cipher block.

<hr>

-DES Encryption/Decryption Algorithm:

Brief description of each method used

-   ``stringToHex`` Function: Convert the message entered by the user into hexadecimal characters.

-   ``divideMessage`` Function: Convert the message entered by the user into ``n`` messages each one ``8`` characters and we encrypt each 8-characters message apart 

-   ``divideMessage16`` Function: Convert encrypted message (cipher) into n parts each part having ``16`` hexadecimal characters to decrypt them later

-   ``hex2String``: Convert decrypted hexadecimal message into plain text(string) again. 

-   ``Hex2bin`` Function: Convert hexadecimal to binary

-   ``Permute`` Function: to rearrange the bits, This function performs a permutation operation on a given input k using a permutation array ``arr`` of size`` n ``. The permutation operation rearranges the elements of the input according to the permutation array.

-   ``Shift_left`` Function: shifting the bits towards left by nth shifts, This function performs a left shift operation on a given input string k by a specified number of shifts. The left shift operation rotates the elements of the input string to the left by the specified number of positions.

-   ``XOR`` Function: calculating xor of two strings of binary numbers ``a`` and`` b``, it allows for the combination of two values in a way that is difficult to reverse

-   Encrypt Function:\
    The function takes three arguments:

-   ``pt``: This is the plaintext message that is to be encrypted. It is expected to be a hexadecimal string.

-   ``rkb``: This is the round key schedule. It is an array of round keys that will be used during the encryption process.

-   ``rk``: This is the number of rounds that the encryption should be performed for.

The function first converts the hexadecimal pt string to a binary string using the hex2bin function. It then applies an initial permutation on the binary string using the ``permute`` function and the ``initial_perm`` table. The resulting string is then split into two ``32-bit`` blocks, ``l``, and`` r``, which represent the left and right halves of the plaintext message.

-   The function then enters a loop that will be repeated for the number of rounds specified in the ``rk`` argument. During each round, the function performs the following operations:

-   The right half of the message,`` r``, is expanded using the expand function and the ``exp_d`` table.

-   The expanded right half is XORed with the round key using the ``xor_`` function.

-   The result of the XOR operation is passed through the ``S-boxes``.

-   The output of the S-boxes is permuted using the ``permute`` function and the ``p table``.

-   The permuted output is XORed with the left half of the message,`` l``, using the ``xor_`` function.

-   The left and right halves of the message are then swapped.

The permute function performs a permutation on a given string using a specified permutation table. It does this by looping through the permutation table and replacing each character in the original string with the character at the corresponding index in the permutation table.

-   The expand function: expands a given 32-bit string to a ``48-bit`` string using ``the exp_d`` table. It does this by replacing each character in the original string with the character at the corresponding index in the ``exp_d`` table.

-   The s_box function: applies the S-boxes to a given 48-bit string. It does this by dividing the string into 8 6-bit blocks and passing each block through the corresponding S-box. The output of the S-boxes is then concatenated to form the final output.

-   The ``final_perm`` table is used in the final permutation step of the encryption process. It specifies the order in which the characters in the concatenated left and right halves of the message should be rearranged to form the final ciphertext.

-   After the final round, the function performs a final permutation on the message's concatenated left and right halves using the permute function and the final_perm table. The resulting permuted message is then returned as the encrypted ciphertext.

-   ``Decrypt Function``:\
    The function begins by dividing the ciphertext message into blocks of ``16`` characters using the ``divideMessage16`` function. It then enters a loop that will be repeated for each block.

-   During each iteration of the loop, the function applies the DES encryption algorithm to the current block using the encrypt function, but with the round key schedule and the number of rounds specified by the rkbRev and rkRev variables, respectively. These variables likely contain the inverse of the round key schedule and the number of rounds used during the encryption process.

-   After all of the blocks have been processed, the function concatenates them and converts the resulting hexadecimal string to a plaintext string using the ``hexToString`` function. The plaintext message is then returned as the decrypted message.

-   It is worth noting that the encrypt function used in this decryption process is the same encrypt function that was described in my previous description. The only difference is that it is being applied with different round key and round count values, which are intended to reverse the encryption process.

### ``+(BONUS)`` Encrypt and Decrypt Image:\

We encrypted the image by converting it to ``base64String`` then we encrypt this ``base64String`` Using the ``DES`` Encryption algorithm, we decrypt it later in the same way and convert base64String to image again.

-   The ``uploadImage`` function is called when the user selects an image to upload. It sets the img state variable to the URL of the selected image, and it also reads the image file and stores its ``base64-encoded`` version in the base64String state variable.

-   The ``encryptImage`` function encrypts the ``base64-encoded`` image using the DES cipher, and stores the encrypted version in the ecryptedImg state variable. It also sets the loading state variable to true while the encryption is being performed.

-   The ``decryptImage`` function decrypts the encrypted image and stores the decrypted version in the decryptedImg state variable. It also sets the loading state variable to true while the decryption is being performed.

-   The component's JSX code defines the layout and behavior of the component, including the input field for uploading an image, the encrypt and decrypt buttons, and the display of the original, encrypted, and decrypted images.

<hr>

- Hill Encryption/Decryption Algorithm:

We used the Alphabetics ``[a-z]`` where ``n=26`` and a ``3*3`` matrix key `K`

Brief description of each method used

-   ``multiplyMatrix``: takes two matrices as an argument and multiplies them together.

-   ``getRidOfNeg``: takes a number and ``n(mod)``, it is used before getting the mod, it adds n to the given number until its positive.

-   ``getDeterminent``: get the determinent of a matrix.

-   ``inverseMatrix``: take a matrix as an argument and return the inverse matrix

-   ``gcd``: take two numbers as arguments and return the greatest common divisor of the two numbers.

-   ``checkRelativelyPrime``: check if the determinant and `n` are relatively prime by checking if gcd(det,n) == 1

-   ``encrypt``: takes a ``plaintext`` as an argument,</br>
    - then replace each letter of the plaintext with its corresponding number </br>
    - then multiply the key matrix K by the matrix of ``3`` numbers using ``multiplyMatrix``</br>
    - then if the number is negative, we turn it to positive using ``getRidOfNeg``</br>
    - then compute the ``mod(n)`` at each stage of the for-loop until the full plaintext is read.

-   decrypt: takes a cipher as an argument,

- then replace each letter of the ciphertext with its corresponding number </br>
- gets the determinant of the key matrix </br>
- then proves that the key matrix is invertible using ``checkRelativelyPrime`` </br>
- then get the inverse of the key matrix using ``inverseMatrix`` </br>
- then multiply the key matrix K inverse by the matrix of 3 numbers using ``multiplyMatrix`` </br>
- then if the number is negative, we turn it to positive using ``getRidOfNeg`` </br>
- then compute the `` mod(n) `` at each stage of the for-loop until the full ciphertext is read

* * * * *

Tests

First of all, the user enters a username to use and chooses a room to join, if the room doesn't exist, it will be created automatically

![](https://lh3.googleusercontent.com/f9_Llr3oICV_9Fz2YhhgghF_rPeK-lzjiBXjRNQm35lPJcHuWbPWH0qzsDECOItk4T0yUPsxCYbRX8Qn_qfrEsH9cEZscwJfWvoQ1a9rM3T5fr2eNmVLhjXj33OeVm45pwI9Fa6AvvTZIbsDzvpS0OrfRVNdJo3HjtzIy50m7OvMYkI8Ue-Y1ZHwutprww)

Let's test the application, enter for example:\
username: test_user, room: test_room

![](https://lh4.googleusercontent.com/ZYMglObTlWods9PZ61K591XPCFs0nn1STJdqjTjSkASgSPQA2-e0AJXZAw5AIK583kz3YwdexcqykbKMyewrx1uoOJ_yV5vnMOkweyQKTAH2XHuc7YrFEzNHXLjQd6d7ANeeCXn6LDAkMiQUKRbqswbzSBtQt01XzZjjlYc4GzSH17PyCTWdBuLjvhESjA)

The user will be greeted with "no messages yet" as this is the first time we open the app

![](https://lh4.googleusercontent.com/XhmUBXfE3ICw1X7M6VC0heipINIh5loecr54jg0BDvGCog3uWynxRqvJLUac_F5bUwBrusCrWadCfS1dBYKr7kPAw2FvgaviwzYit3qElQAEdLtMEwftLvRvzVIQywv-2N6RSzial5Bph48DCRI_3Mcc7y7HPV9yCbWZoY1V8aBdGaFr1EGkLLaX9Pz3XA)

Let's try send our first message (paymoremoney), so we type the message in the input box, and then we choose the cipher type we want to use, let's choose "hill" cipher by clicking on "hill" button

![](https://lh4.googleusercontent.com/vvdkAhNuo57NZlqcahekXG4SPJZ_O_tWTCIE-QjfrD8D46Bt8X9Ji7LkAYB4Aaj___sbkyC-UNmDQFI-8WV3xrpcDKgnT-5o6N950XDoxoie933VsgnQmFkB-RFwv70nUJHlLK8C9UDpsb6h4Ds84iAZlan0Y7I62au2YOM_M7x7nvix-GQav1856IzTIQ)

When the message is sent, it will appear on the chat box with its cipher below it (the text in red is the cipher)

![](https://lh6.googleusercontent.com/whQ7wm17CSdshbDk3hy1_icHZIIYxrVMoi_y96fnm5koBMBQDXzczVkNMVV_4xmUOp8ba81TjM9Aagh1K0Ep1liUHDuYl7YESZ4LYwb1EDzJwSnC-DYBspo9j8m9Vt-58rNtamJRIgnTqxwFfT3q3I9fuz_KUTxC7Hi5zdekA-jgfqpdheKn7KrOKnJacw)

 let's send the same message but using "DES" cipher this time by clicking on "DES" button

![](https://lh6.googleusercontent.com/Iw7wOeDWQHNSnU0unVFGncWb4H3aKHSznzlvTWUtJcyx8jKEiTyiHWHyLfkl4T5zKgIG9VjQtlbdWogF9igFg_OhfVwKvaJTZYKR9fqpJb3gnOahjzALMVBhAt1L378vn2xI7nW9Ar_HLzBp8Ecux4aAi7M7UBgGbCQDms_8R2EIv5gT_NoF-pIlaOw0og)

the message is sent, and its cipher is below it

![](https://lh3.googleusercontent.com/YxbTwitcNjAGIintqp7GgJJDsdaPMWn92NUKe_s6CBisepdkvpdnRM08FXhFP5vBBDWJPb6q5SgarA5kd-nfsS4zArJjeuBGVNSs2qJWj-wzp7JLgqJZx_ul44O2TF_HT_AIGkJuX85NUisbQaKL-bt6YX8b5Ieoo_is1yRJjTKcR0cnvgSZ29oVm4489Q)

This is a real-time chat app so it supports multi-users at the same time, and then they can exchange messages with each other. so when another user (ex. test_user_2 as you see in the left sidebar) enters the chat room, the server will decrypt previously encrypted messages and then show them on the chat\
![](https://lh5.googleusercontent.com/cI-xu-H831IBebp-K18OZWM3TSksQOZt1qoctq9ekmPDRX-NfXpRAgpd0spwi15FQW9u5uwNXSEZS-qteefYBPXBQEhWLMDJMCGRoOyc8rjVXsCAnr5dJxKHr4d_A4jy7XEYURqXU_kb5uWDqc-XOEQIzAOVSs6rKtMfunt9kmeIuen2wfvQdwxzSp21fg)

Image encryption and decryption (steps and code outlined in the video)

![](https://lh3.googleusercontent.com/SHk0L3UCaN2H-hKdnW5y0CX0zazC6WTuOuzoVGRVNV9X_5DC3ssDSHBP3Ggl69MLnrYiMPOzg3ZieJu1QmZoNEOsjtw4VtgI1jZRZW7Iz6VkzcbFNMk5sat0lNvOPEVNXpa8ZDd_DS-PMBavTPkj2zYb_ESUEU9updHR3qUPy192rOSvPP30qLYqSEFg9w)

Project Demo: [https://information-security-university.netlify.app](https://information-security-university.netlify.app/)

References:

1.  Principles of Information Security 4th Edition(book)

2.  Cryptography and Network Security: Principles and Practice(book)

3.  https://www.geeksforgeeks.org/data-encryption-standard-des-set-1/
