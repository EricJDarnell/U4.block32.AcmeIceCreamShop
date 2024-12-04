const pg = require("pg");
const express = require("express");
const app = express();
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/the_acme_ice_cream_shop_db"
);

const init = async () => {
  await client.connect();
  console.log("connected to database");
  let SQL = `
    drop table if exists flavors;
    create table flavors(
      id serial primary key,
      name varchar(50) not null,
      is_favorite boolean default false not null,
      created_at timestamp default now(),
      updated_at timestamp default now()
    );
  `;
  await client.query(SQL);
  console.log("tables created");
  SQL = `
    insert into flavors(name, is_favorite) values('vanilla', false);
    insert into flavors(name, is_favorite) values('butter pecan', false);
    insert into flavors(name, is_favorite) values('chocolate', false);
    insert into flavors(name, is_favorite) values('damn fine coffee', true);
  `;
  await client.query(SQL);
  console.log('data seeded')
};

init();