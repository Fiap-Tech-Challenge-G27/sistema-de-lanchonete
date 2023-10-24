drop table if exists "orders";
drop type if exists "order_status";
create type "order_status" as enum ('PendingPayment', 'Received', 'InPreparation', 'Ready', 'Finished');
create table "orders"(
    "order_id" BIGINT primary key,
    "customer_id" BIGINT not null,
    "receivementTime" TIMESTAMP with time zone not null,
    "status" order_status
);


drop table if exists "products";
drop type if exists "product_categories";
create type "product_categories" as enum ('Snack', 'SideDish', 'Drink', 'Desert');
create table "products"(
    "product_id" BIGINT primary key,
    "name" CHAR(255) not null,
    "description" CHAR(255) not null,
    "price" DOUBLE PRECISION not null,
    "category" product_categories not null
);


drop table if exists "customers";
create table "customers"(
    "customer_id" BIGINT primary key,
    "cpf" TEXT not null,
    "name" TEXT not null,
    "email" TEXT not null,
    constraint "orders_client_id_foreign" foreign key("client_id") references "customers"("client_id")
);


drop table if exists "orders_products";
create table "orders_products"(
    "order_id" BIGINT,
    "product_id" BIGINT,
    "amount" INTEGER not null,
    primary key (order_id, product_id),
	constraint "orders_products_order_id_foreign" foreign key("order_id") references "orders"("order_id"),
	constraint "orders_products_product_id_foreign" foreign key("product_id") references "products"("product_id")
);