export const libraryConfig = {
  sales: {
    table: "sales",
    id: "sales_id",
    fields: [
      "order_id",
      "product_id",
      "quantity",
      "unit_price",
      "cost_price",
      "discount_amount",
      "country_code",
      "market_code",
      "order_date"
    ]
  },
  user_details: {
    table: "user_details",
    id: "user_name",
    fields: ["user_name", "role_id", "allowed"]
  }
};