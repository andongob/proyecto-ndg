import * as Mnemonic from 'bitcore-mnemonic'; //libreria que genera semillas
import * as bip39 from 'bip39';//libreria que encripta la semilla
import { hdkey } from 'ethereumjs-wallet'; //genera el wallet
import * as util from 'ethereumjs-util'; //diferentes utilidades de verificación (logs 6,7,8, y 9)
import * as CryptoJS from 'crypto-js';
import * as Web3 from 'web3';
//import { web } from 'webpack';


//PRIMERA VEZ CUANDO SE CREAN LAS SEMILLAS 
//var phrase = new Mnemonic().phrase; /*Esta línea de código genera semillas cada vez que refrescas*/

//var seeds = 'feature lesson crowd eager guitar exhibit memory degree pride hole shine battle'; //mantiene semilla fija
//var password = 'password';

//var ciphertext = CryptoJS.AES.encrypt(seeds, password).toString();

//console.log(10, ciphertext);

//var seeds = window.localStorage.setItem('cipherseeds', ciphertext);

    //console.log(11, ciphertext);




//SIGUIENTES VECES CON LAS SEMILLAS YA CREADAS ESTAS LAS GUARDA Y SOLO PIDE EL PASSWORD

var ciphertext = window.localStorage.getItem('cipherseeds');
var password = 'password';

var seeds = CryptoJS.AES.decrypt(ciphertext, password).toString(CryptoJS.enc.Utf8);

    console.log(0, seeds);

//window.localStorage.setItem('seed', seeds); /*guarda la semilla en el local storage del navegador (sin encriptar)y no las pedirá constatemente al usuario*/



var mnemonic = new Mnemonic(seeds);

    console.log(1, mnemonic); //salida de log 1



bip39.mnemonicToSeed(mnemonic.toString()).then(seed => {  //encripta el seed (semilla)

    console.log(2, seed); // salida de log 2

var path = "m/44'/60'/0'/0/0" //código que genera la semilla en la red de ethereum, esto cambiaría dependiendo de la red

var wallet = hdkey.fromMasterSeed(seed).derivePath(path).getWallet(); //crea el wallet en ethereum

    console.log(3, wallet); //salida de log 3

var privatekey = wallet.getPrivateKey();  // genera la clave privada

    console.log(4, privatekey);

var publickey = util.privateToPublic(privatekey);  // genera la clave publica

    console.log(5, publickey);

var address = '0x' + util.pubToAddress(publickey).toString('hex'); // convierte la clave pública a un address

    console.log(6, address);

    console.log(7, util.isValidAddress(address)); //valida la dirección

    console.log(8, util.isValidPrivate(privatekey)); //valida el formato correcto de la clave privada

    console.log(9, util.isValidPublic(publickey)); //valida el formato correcto de la clave pública

window.addEventListener('load', () => {

    if (window.ethereum == undefined){
        return alert ('Instala Metamask');
    }

    var web3 = new Web3(window.ethereum);

        console.log(12, web3);


});


web3.eth.getBalance('0xD1AA1f9df3F069e77644c26D7a3457A5F04376A3', (err, result) =>{

    var balance = web3.utils.fromWei(result, 'ether');

    console.log(13, balance);
});

});
