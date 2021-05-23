const dotenv = require('dotenv').config()
const {Client} = require('@notionhq/client')

const notion = new Client({
	auth: process.env.NOTION_API_KEY
})

const databaseID = process.env.NOTION_DATABASE_ID

module.exports = async function getEvents() {
	const payload = {
		path: `databases/${databaseID}/query`,
		method: 'POST'
	}
	const { results } = await notion.request(payload)

	return results
		.map((page) => {
			return {
				id: page.id,
				title: page.properties.Name.title[0].text.content,
				start_date: page.properties.Date.date.start,
				end_date: page.properties.Date.date.end,
				tags: page.properties.Tags.rich_text[0].text.content
			}
		 })
}
