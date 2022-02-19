const editJsonFile = require("edit-json-file");

for (let i = 0; i < 1; i++) {
  let file = editJsonFile(`${__dirname}/meta/${i}.json`);

  // fix attributes
  const attributes = file.get('attributes')
  const fixedAttributes = []
  for (let key in attributes) {
    fixedAttributes.push(attributes[key])
  }
  file.set("attributes", fixedAttributes);

  // set proper image link
  const ipfsBase = 'ipfs://badbadbadbadbadbadbad'
  const image = file.get('image')
  const fixedImage = image.replace('https://example.com', ipfsBase)
  file.set("image", fixedImage);

  // fix desc
  const description = `Rich Ape #${i} from unique collection, find out more at https://www.richapes.club`
  file.set("description", description);

  // file.save();

  console.log(fixedImage)
}

