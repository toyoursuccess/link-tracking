import createHandler from './lib/handler.js';
import withMysql from './lib/mysql-wrapper.js';

const { DB_MYSQL_TABLE } = process.env;

export const handler = createHandler(
  // withMysql() binds serverless-mysql client to `this.mysql`
  // and automatically calls end() after the wrapped function ends
  withMysql(
    async function (event, context) {
      const url = new URL('https://' + event.pathParameters.redir);

      console.log(event.requestContext.http.sourceIp, event.pathParameters.messageId, url.toString());

      const query = {
        sql: 'INSERT INTO ' + DB_MYSQL_TABLE + ' (messageId, url, domain, path, query, hash, ipv4, userAgent, referer) VALUES(?,?,?,?,?,?,?,?,?)',
        values: [
          event.pathParameters.messageId,
          url.toString(),
          url.hostname,
          url.pathname,
          url.search,
          url.hash,
          event.requestContext.http.sourceIp,
          event.requestContext.http.userAgent,
          event.headers.Referer
        ]
      };

      const result = await this.mysql.query(query);

      console.log('Click record:', result.insertId);

      return {
        statusCode: 301,
        headers: {
          Location: url
        }
      };
    }
  )
);