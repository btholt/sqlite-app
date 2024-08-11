import sqlite3 from "sqlite3";

// connect to the database here
// data.db is the name of the database file

export default function registerInvoice(fastify, opts, done) {
  fastify.all("/", (request, reply) => {
    const id = request.query.id;

    // code goes here

    reply.send({ invoice: {}, lines: [] });
  });

  done();
}

/*
this is how the response should look (to work in the UI)
{
  "invoice":
    {
      "id":10,
      "date":"2021-02-03 00:00:00",
      "address":"3 Chatham Street",
      "city":"Dublin","state":
      "Dublin",
      "country":"Ireland",
      "postalCode":null,
      "total":5.94
    },
  "lines":
    [
      {
        "unitPrice":0.99,
        "quantity":1,
        "trackName":"Etnia",
        "albumTitle":"Afrociberdelia",
        "artistName":"Chico Science & Nação Zumbi"
      },
      […]
    ]
}


*/
