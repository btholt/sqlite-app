import sqlite3 from "sqlite3";

const db = new sqlite3.Database("data.db");

export default function registerInvoiceComplete(fastify, opts, done) {
  fastify.all("/", (request, reply) => {
    const id = request.query.id;
    db.all(
      `SELECT 
        InvoiceId as id,
        InvoiceDate as date, 
        BillingAddress as address, 
        BillingCity as city, 
        BillingState as state, 
        BillingCountry as country, 
        BillingPostalCode AS postalCode, 
        Total as total 
      FROM 
        Invoice
      WHERE 
        InvoiceId = ?`,
      [id],
      (err, invoiceRows) => {
        if (err) {
          reply.code(500);
          reply.send({ error: err, errorLocation: "Invoice" });
          return;
        }

        if (invoiceRows.length === 0) {
          reply.code(404);
          reply.send({ error: "Not found" });
          return;
        }

        db.all(
          `SELECT 
            i.UnitPrice AS unitPrice, 
            i.Quantity AS quantity, 
            t.Name AS trackName, 
            a.Title AS albumTitle,
            ar.Name AS artistName
          FROM 
            InvoiceLine i
          JOIN
            Track t ON t.TrackId = i.TrackId
          JOIN
            Album a ON a.AlbumId = t.AlbumId
          JOIN
            Artist ar ON ar.ArtistId = a.ArtistId
          WHERE 
            InvoiceId = ?`,
          [id],
          (err, trackRows) => {
            if (err) {
              reply.code(500);
              reply.send({ error: err, errorLocation: "Track" });
              return;
            }

            reply.send({ invoice: invoiceRows[0], lines: trackRows });
          }
        );
      }
    );
  });

  done();
}
