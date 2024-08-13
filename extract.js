// turndown.js
import TurndownService from 'turndown';
import OpenAi from "openai";
import dotenv from 'dotenv';
dotenv.config();

const client = new OpenAi()

function stripArticle(article){
	const articleStart = article.indexOf("<article")
	const articleEnd = article.indexOf("</article")
	return article.substring(articleStart, articleEnd)
}

async function requestOpenAi(article){
	const prompt = 'return a version of this markup file that starts at the title of the article and includes only prose related to the article'
	try {
    const request = await client.chat.completions.create({
		  messages: [{role: 'user', content: prompt + article  }],
		  model: 'gpt-4o-mini', 
	  })
    return request.choices[0].message.content
	} catch (e) {
    console.log(e)
  }
}

export default async function extractMarkdown(url) {
	/**
	 * Returns a string of the main text of the article formatted as markdown
	 * @param {string} url the article url
	 */
		const response = await fetch( url );
		const doc = await response.text();
		const article = doc.includes("<article") ? stripArticle(doc) : doc

		const turndownService = TurndownService();
		const markdown = turndownService.turndown(article);
    const clean_markdown = requestOpenAi(markdown);
		return clean_markdown;
}
