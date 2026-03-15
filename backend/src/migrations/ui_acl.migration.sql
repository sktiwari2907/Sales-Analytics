create table ui_acl (
    role_id varchar(10) not null references roles(role_id) on delete cascade,
    screen varchar(20) not null,
    config jsonb not null
);