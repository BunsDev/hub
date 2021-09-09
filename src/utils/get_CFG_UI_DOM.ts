import axios from 'axios'
import { ipfsGateway } from '../constants'
import cheerio from 'cheerio'
import axios from "axios";
import cheerio from "cheerio";

export default async function get_CFG_UI_DOM(api: any, path: string) {
  let response = await axios.get(`${ipfsGateway}${api.locationUri}${path}`)
  let siteURLHTMLClean = ''
  cleaner.clean(response.data, (html: string) => (siteURLHTMLClean = html))
  let $ = cheerio.load(siteURLHTMLClean)
  return $
}
