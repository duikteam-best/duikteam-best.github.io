# Sanity Clean Content Studio

This generates the structure for the Sanity admin pages. Sanity is used to store the website's content. A Github actions workflow fetches content from Sanity at build-time and generates the static site. 

Sanity triggers the github actions workflow after a user edited content.

Make sure to install node JS >= 22.12
- `nvm use 22.12` to use NodeJS 22.12
- `npm install` to install dependencies
- `npx sanity deploy` to publish to Sanity
