create table user_details (
    user_name varchar(20) primary key,
    password_encrypt varchar(255) not null,
    role_id varchar(10) not null references roles(role_id) on delete cascade,
    allowed boolean default false,
    created_at timestamp default now(),
    created_by varchar not null,
    modified_by varchar not null,
    modified_at timestamp default now()
);