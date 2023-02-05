import * as Mnemonic from 'bitcore-mnemonic'; //libreria que genera semillas
import * as bip39 from 'bip39';//libreria que encripta la semilla
import { hdkey } from 'ethereumjs-wallet'; //genera el wallet
import * as util from 'ethereumjs-util'; //diferentes utilidades de verificación (logs 6,7,8, y 9)
import * as CryptoJS from 'crypto-js';
import * as Web3 from 'web3';
//import { web } from 'webpack';
import {Transaction} from 'ethereumjs-tx';


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

var path = "m/44'/60'/0'/0/0"; //código que genera la semilla en la red de ethereum, esto cambiaría dependiendo de la red

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

});

//EL SIGUENTE CÓDIGO ES PARA VERIFICAR METAMASK Y EL SALDO, LINEAS 78 A 94

window.addEventListener('load', () => {

    if(window.ethereum == undefined)  {
        return alert('Instala Metamask'); //Verifica que esta instalado el wallet
    }

    var web3 = new Web3(window.ethereum);

    console.log(14, web3);

    web3.eth.getBalance('0xD1AA1f9df3F069e77644c26D7a3457A5F04376A3', (err, result) => {

        var balance = web3.utils.fromWei(result, 'ether'); //convierte de Wei a Ether

        console.log(15, balance)
    });
});





window.addEventListener('load', async () => {

    if(window.ethereum == undefined)  {
        return alert('Instala Metamask'); //Verifica que esta instalado el wallet
    }

    var web3 = new Web3();

    web3.setProvider( 
        new web3.providers.HttpProvider('https://goerli.infura.io/v3/87388b2cafcd4bcdbb26947767a1869f')
    );

    console.log(16, web3);

    web3.eth.getBalance('0xD1AA1f9df3F069e77644c26D7a3457A5F04376A3', (err, result) => {

        var balance = web3.utils.fromWei(result, 'ether'); //convierte de Wei a Ether

        console.log(17, balance)
    });

    //Llamadas a nodos remotos (INDIVIDUALES)

         console.log("Gas Price:"); //coste de gas de la transacción
    await web3.eth.getGasPrice().then(console.log);

        console.log("Accounts:");  //Llamada que indica que cuentas hay en ese nodo
    await web3.eth.getAccounts().then(console.log);

        console.log("Transaction:"); //Llamada a una transacción (ej.- https://goerli.infura.io/v3/87388b2cafcd4bcdbb26947767a1869f)
    var tx = "0x1ada54589fd406b7920f9d3e9629f99ee6a30b0e8a52bbc2def13e9fd91a398f";
    await web3.eth.getTransaction(tx).then(console.log);

        console.log("Receipt:");
    await web3.eth.getTransactionReceipt(tx).then(console.log);

        console.log("Nonce:"); //Indice de la transacción y posición - se ve también en la firma de transacciones)
    await web3.eth.getTransactionCount('0xf36F155486299eCAff2D4F5160ed5114C1f66000').then(console.log)

    //Consultas de llamadas en batch

var request1 = web3.eth.getBalance.request('0xf36F155486299eCAff2D4F5160ed5114C1f66000', 'latest', function (error, balance) {
        console.log('Request 1', balance);
    });
    
var request2 = web3.eth.getTransaction.request('0x8805fb87c9ffa3402d368de8edcf0ef883aa08d38f876ac9eae6ee26dd37b27e', function (error, receipt) {
        console.log('Request 2', receipt)
    });

    var batch = new web3.BatchRequest();
    batch.add(request1);
    batch.add(request2);
    batch.execute();



//////////////////////////////////////Hasta aquí todo correcto


/*ESCRITURA 


console.log(address);

var rawData = {  //piezas que componen la transacción
    from: address,
    to: "",
    value: 100,
    gasPrice: web3js.utils.toHex(10000000000),
    gasLimit: web3js.utils.tpHex(1000000),
    nonce: await web3js.eth.getTransactionCount(address)
};

//console.log(rawData);

/*web3js.eth.sendTransaccion(rawData).then(
    receipt => {
        console.log(receipt);
    },
    error => {
        console.log(error);
    }

);*/

/*console.log(privateKey);
console.log(privateKey.toString('hex'));

// opcion 1 - para firmar
var signed = await web3js.eth.accounts.signTransacion(rawData, privatekey.toString("hex"));

console.log(signed);

//opción 2 - para firmar

var tx = new Transaction(rawData, { chain: 'goerli'});
tx.sign(privateKey);

var serializedTx = tx.serialize().toString('hex');*/

});