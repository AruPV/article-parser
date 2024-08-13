import extractMarkdown from "./extract.js";
//import * as fs from 'fs';
import * as process from 'process';

const url = process.argv[2] // first argument passed
const markdown = await extractMarkdown(url)
console.log(markdown)

/*
const articleTitle = markdown.slice(0, markdown.indexOf("\n"));
const slug = articleTitle.toLowerCase().replace(" ", "-")
const filePath = "./" + slug + ".md"
fs.writeFile(filePath, markdown, (e)=>{
  if (e) {
		return console.log(e)
	}
	console.log("Success. Output saved to " + filePath)
})
*/

