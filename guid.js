// Руководство по web3

// Взаимодействие с Metamask
// В первую очердь нужно запросить доступ

ethereum.request({ method: 'eth_requestAccounts' })

// Заодно можно вытащить адрес пользователя

const addresses = await ethereum.request({ method: 'eth_requestAccounts' })
const address = addresses[0] // this.address

// Пример запроса в блокчейн

// Хочу дать разрешение лаунчпаду на использование моих токенов

// У нас должен быть импортирован Web3 для работы
import Web3 from 'web3'

// Подключаемся к сети, в данном случае тестовой

const testnet = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
const mainnet = 'https://bsc-dataseed.binance.org/' // все транзакции стоят реальных денег

const web3 = new Web3(testnet)

// инициализируем токен

// Для получения интерфейса смотрим директорию interfaces
// Находим нужный нам файл
// в данном случае у меня token.json
import tokenABI from './token.json'
const abi = tokenABI

// Для получения адреса смотрим в deployed.json
// параметр tokens хранит в себе разичные токены
// в данном случае у меня адрес токена Simple
const tokenAddress = '0x1e17f2F72c5C2188017747F3E3b700c4E58584B7'

const token = new web3.eth.Contract(tokenABI, conAddr)

// Получаем байткод транзакции

const launchpad = '0xc74cF930b40A0Afb8bf5397Fd816329fb8c27C2E' //адрес лаунчпада. Ему нужно дать разрешение
const encode_transaction = token.methods.approve(launchpad, '1000000000000000000').encodeABI // вызов функции approve c аргументами
// 1000000000000000000 - 1 ETH / BNB

const args = [
	{
		from: address, // от кого  // this.address
		to: conAddr, // кому
		data: encode_transaction,
		// value: <Число в шестнадцеричной> - в данном случае оно нам не нужно, так как мы не передаем ETH / BNB
	},
]

ethereum
	.request({
		method: 'eth_sendTransaction',
		params: args,
	})
	.then((result) => {
		// The result varies by RPC method.
		// For example, this method will return a transaction hash hexadecimal string on success.
	})
	.catch((error) => {
		// If the request fails, the Promise will reject with an error.
	})
