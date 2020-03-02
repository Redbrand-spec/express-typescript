var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const cheerio = require('cheerio');
const needle = require('needle');
const url = 'https://yandex.ru/';
module.exports.parsing = (req, res) => __awaiter(this, void 0, void 0, function* () {
    yield needle('get', url)
        .then((_res) => {
        const $ = cheerio.load(_res.body);
        const YandexDolar = $('.inline-stocks__value_inner').contents().eq(0).text();
        const YandexEuro = $('.inline-stocks__value_inner').contents().eq(1).text();
        const Data = {
            YandexDolar, YandexEuro
        };
        res.status(200).json(Data);
    })
        .catch(() => {
        res.status(400).json();
    });
});
//# sourceMappingURL=parsing.js.map