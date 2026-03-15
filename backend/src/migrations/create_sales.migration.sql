create table sales (
    sales_id serial not null primary key,
    order_id varchar not null unique,
    product_id varchar(255) not null references product(product_id) on delete cascade,
    quantity int not null,
    unit_price numeric(10,2) not null,
    cost_price numeric(10,2) not null,
    discount_amount numeric(10,2),
    country_code varchar(50) references geography(country_code) on delete cascade,
    market_code varchar(10) references market(market_code) on delete cascade,
    order_date date not null,
    created_at timestamp default now(),
    created_by varchar not null,
    modified_by varchar not null,
    modified_at timestamp default now()
);