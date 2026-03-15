create view vw_sales as
SELECT 
    sales_id,
    order_id,
    product_id,
    product_name,
    category_name,
    country_code,
    country_name,
    market_code,
    market_name,
    volume,
    unit_price,
    cost_price,
    discount_amount,
    revenue,
    total_cost,
    (revenue - total_cost) AS gross_profit,
    (revenue - total_cost)/NULLIF(revenue,0)*100 as margin_percent,
    order_date,
    order_year,
    order_month,
    created_at,
    created_by,
    modified_at,
    modified_by
FROM (
    select 
    s.sales_id,
    s.order_id,
    p.product_id,
    p.product_name,
    p.category_name,
    g.country_code,
    g.country_name,
    m.market_code,
    m.market_name,
    s.quantity as volume,
    s.unit_price,
    s.cost_price,
    s.discount_amount,
    (s.quantity * s.unit_price - COALESCE(s.discount_amount,0)) AS revenue,
    (s.quantity * s.cost_price) AS total_cost,
    s.order_date,
    EXTRACT(YEAR FROM order_date)::INT as order_year,
    TO_CHAR(order_date, 'Mon') AS order_month,
    s.created_at,
    s.created_by,
    s.modified_at,
    s.modified_by
from sales s
join product p 
    on s.product_id = p.product_id
join geography g 
    on s.country_code = g.country_code
join market m 
    on s.market_code = m.market_code
) t;
