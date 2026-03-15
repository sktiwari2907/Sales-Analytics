create table market (
    market_code varchar(10) primary key,
    market_name varchar(50) not null,
    country_code varchar(50) references geography(country_code) on delete cascade
);