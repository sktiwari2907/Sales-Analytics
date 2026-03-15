export const AdminTiles = [{
    title: 'Admin Dashboard',
    children: [
       {
            name: 'Sales Data',
            description: 'Manage Sales data assignment to specific business scopes',
            visible: true,
            path: 'admin/sales',
            libraryName: 'sales'
        },
        {
            name: 'User Management',
            description: 'Manage User Permissions',
            visible: true,
            path: 'admin/user_details',
            libraryName: 'user_details'
        }  
    ]
}];

export const AdminColumnConfig = {
    sales: [
        {
          headerName: "Order ID",
          field: "order_id",
          filter: "agTextColumnFilter",
          flex: 1,
          minWidth: 100
        },
        {
          headerName: "Order Date",
          field: "order_date",
          filter: "agDateColumnFilter",
          flex: 1,
          minWidth: 100
        },
        {
          headerName: "Product ID",
          field: "product_id",
          filter: "agTextColumnFilter",
          flex: 1,
          minWidth: 100
        },
        {
          headerName: "Country Code",
          field: "country_code",
          filter: "agSetColumnFilter",
          flex: 1,
          minWidth: 100
        },
        {
          headerName: "Market Code",
          field: "market_code",
          filter: "agSetColumnFilter",
          flex: 1,
          minWidth: 100
        },
        {
          headerName: "Quantity",
          field: "quantity",
          filter: "agNumberColumnFilter",
          flex: 1,
          editable: true,
          minWidth: 100
        },
        {
          headerName: "Unit Price",
          field: "unit_price",
          filter: "agNumberColumnFilter",
          flex: 1,
          editable: true,
          minWidth: 100
        },
        {
          headerName: "Cost Price",
          field: "cost_price",
          filter: "agNumberColumnFilter",
          flex: 1,
          editable: true,
          minWidth: 100
        },
        {
          headerName: "Discount Amount",
          field: "discount_amount",
          filter: "agNumberColumnFilter",
          flex: 1,
          editable: true,
          minWidth: 100
        }
      ],
    user_details: [
        {
          headerName: "User Name",
          field: "user_name",
          filter: "agTextColumnFilter",
          flex: 1,
          minWidth: 100
        },
        {
          headerName: "Role ID",
          field: "role_id",
          filter: "agSetColumnFilter",
          flex: 1,
          minWidth: 100
        },
        {
          headerName: "Allow Access",
          field: "allowed",
          editable: true,
          cellRenderer: "agCheckboxCellRenderer",
          cellEditor: "agCheckboxCellEditor"
        }
      ]
}
  