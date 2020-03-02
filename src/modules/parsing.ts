const cheerio = require('cheerio')
const needle = require('needle')

const url = 'https://yandex.ru/'


module.exports.parsing = async (req: any, res: any) => {

  await needle( 'get', url)
  .then((_res: any) => {
    const $ = cheerio.load(_res.body)

    const YandexDolar: string = $('.inline-stocks__value_inner').contents().eq(0).text()
    const YandexEuro: string = $('.inline-stocks__value_inner').contents().eq(1).text()

    const Data = {
      YandexDolar, YandexEuro
    }

    res.status(200).json(Data)
  })
  .catch(() => {
    res.status(400).json()
  })

}
