const { v4: uuidv4 } = require('uuid');

const { Driver, TokenAuthService, getLogger } = require('ydb-sdk');
const logger = getLogger({ level: 'debug' });
const endpoint = process.env.ENDPOINT;
const database = process.env.DATABASE;

const BOOKS_TABLE = 'books';

class Book {
  constructor(id, title, author, annotation, published) {
    if (id) {
      this.id = id;
    } else {
      this.id = uuidv4();
    }
    this.title = title;
    this.author = author;
    this.annotation = annotation;
    this.published = published;
  }

  static async loadDriver() {
    const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

    const body = { 'yandexPassportOauthToken': process.env.OAUTH_TOKEN };
    const response = await fetch('https://iam.api.cloud.yandex.net/iam/v1/tokens', {
    	method: 'post',
    	body: JSON.stringify(body),
    	headers: {'Content-Type': 'application/json'}
    });
    const data = await response.json();

    const authService = new TokenAuthService(data.iamToken);
    return new Driver({ endpoint, database, authService });    
  }  

//   async delete() {
//     const driver = await this.loadDriver();
//     return await driver.tableClient.withSession(async (session) => {
//       const query = `
// DELETE FROM ${BOOKS_TABLE}
// WHERE id = "${this.id}"`;
//       console.log('Executing DELETE...');
//       await session.executeQuery(query);
//     });
//   }

  // replace permanent deleting with marking as deleted
  async delete() {
    const driver = await Book.loadDriver();
    return await driver.tableClient.withSession(async (session) => {
      const query = `
UPSERT INTO ${BOOKS_TABLE}
(id, deleted)
VALUES
("${this.id}", true);`;
      console.log('Executing DELETE...');
      await session.executeQuery(query);
    });
  }  

  async save() {
    const driver = await Book.loadDriver();
    return await driver.tableClient.withSession(async (session) => {
      const query = `
UPSERT INTO ${BOOKS_TABLE}
(id, title, author, annotation, published, deleted)
VALUES
("${this.id}", "${this.title}", "${this.author}", "${this.annotation}", CAST(@@${JSON.stringify(this.published)}@@ as Json), false)`;
      console.log('Executing UPSERT...');
      await session.executeQuery(query);
    });    
  }

  static async getAllBooks() {
    const driver = await Book.loadDriver();
    return await driver.tableClient.withSession(async (session) => {
      const query = `
SELECT id, title, author, annotation, published
FROM ${BOOKS_TABLE}
WHERE deleted == false`;
      console.log('Executing SELECT...');
      const { resultSets } = await session.executeQuery(query);
      return resultSets[0].rows.map(row => new Book(row.items[0].textValue, row.items[1].textValue, row.items[2].textValue, row.items[3].textValue, JSON.parse(row.items[4].textValue)));
    });    
  }

  static async getBookById(id) {
    const driver = await Book.loadDriver();
    return await driver.tableClient.withSession(async (session) => {
      const query = `
SELECT id, title, author, annotation, published
FROM ${BOOKS_TABLE}
WHERE id = "${id}"`;
      console.log('Executing SELECT...');
      const { resultSets } = await session.executeQuery(query);
      return new Book(id, resultSets[0].rows[0].items[1].textValue, resultSets[0].rows[0].items[2].textValue, resultSets[0].rows[0].items[3].textValue, JSON.parse(resultSets[0].rows[0].items[4].textValue));
    });
  }
}

module.exports = Book;