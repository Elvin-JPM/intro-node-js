# intro-node-js

Website and API 

## Install

Install dependecies:
```sh
$ npm install
```
Review database connection on /lib/connectMongoose.js (see "Start a MongoDB Server in MacOS or Linux")

Load initial data:

```sh
# this command deletes all the data in the database and create default data
$ npm run init-db
```

To start the server:

```sh
$ npx nodemon start
```

To start the web page: 
```sh
In vscode, right click the index.html file and select 'copy relative path' and paste it in your browser
```

Filtering data on the web page:
```sh
There you can play adding filters to the endpoint through the form
In the Tags input you need to separate with a comma the tags by which you want to filter the results.
```
### API Endpoints

### GET /api/v1/anuncios
```sh
Returns an array containing the result of the page 1, then you can select the page adding ?page=pageNumber in the endpoint
Add ?limit=limitNumber to select the number of results you want to see
Add ?tags=tag1,tag2,tag3... to filter by tag
Add ?price[option]=priceAmount to filter by price (option can be: gte, gt, lte, lt)
Add ?name=Name to filter by product name (it does not need to be the whole name
```

### GET api/v1/tags
```sh
This you will not be able to see on the webpage.
You need to run the server using 'npx nodemon start', then open your web browser on the following URL: http://127.0.0.1:3000/api/v1/anuncios/tags
```
### POST api/v1/anuncios
```sh
To try this endpoint you will need postman.
Create a new post request with the URL: http://127.0.0.1:3000/api/v1/anuncios
In the body insert a new document like this:
{
  "name": "product_name",
  "for_sale": 1, 
  "price": product_price,
  "photo": "photo_name",
  "tags": [tag1, tag2]
}

The "for_sale" field needs to be either 1 for a product being sold or 0 for a product being bought
```
