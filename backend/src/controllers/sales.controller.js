import db from "../db/db.js";
import { libraryConfig } from "../config/config.js";

// export const getData = async (req, res) => {
//     try {
//         console.log('**************query************',req.body);
//         let {library, start, end, filter, sort} = req.body;
//         start = parseInt(start) || 0;
//         end = parseInt(end) || 100;
//         const limit = end - start;
//         const allowedLib = ["sales"];

//         if (!allowedLib.includes(library)) return res.status(400).json({error: "Invalid library name"});

//         const [row, totalRowsResult] = await Promise.all([
//              db(library).orderBy("modified_at","desc").limit(limit).offset(start),
//              db.raw(`select count(*) as count from ??`, [library])
//         ]);

//         const totalRows = parseInt(totalRowsResult?.rows[0].count);

//         return res.status(200).json({status: "success", data: row, totalRows: totalRows});
//     } catch (error) {
//         console.error("Error fetching sales data:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// export const saveData = async (req, res) => {
//     try {
//         console.log('**************query************',req.body);
//         const {library, newRows = [], updatedRows = [], deleteRows = []} = req.body;

//         const allowedLib = ["sales"];

//         if (!allowedLib.includes(library)) return res.status(400).json({error: "Invalid library name"});

//         await db.transaction(async (trx) => {
//             if (newRows?.length > 0) {
//                 const cleanedRows = newRows.map((row) => ({
//                 order_id: row.order_id,
//                 product_id: row.product_id,
//                 quantity: Number(row.quantity),
//                 unit_price: Number(row.unit_price),
//                 cost_price: Number(row.cost_price),
//                 discount_amount: row.discount_amount
//                     ? Number(row.discount_amount)
//                     : null,
//                 country_code: row.country_code,
//                 market_code: row.market_code,
//                 order_date: row.order_date,
//                 created_by: "user",
//                 modified_by: "user",
//                 modified_at: trx.fn.now()
//                 }));

//                 await trx(library).insert(cleanedRows);
//             }

//             if (updatedRows?.length > 0) {
//                 for (const row of updatedRows) {
//                 await trx(library)
//                     .where({ sales_id: row.sales_id })
//                     .update({
//                     order_id: row.order_id,
//                     product_id: row.product_id,
//                     quantity: Number(row.quantity),
//                     unit_price: Number(row.unit_price),
//                     cost_price: Number(row.cost_price),
//                     discount_amount: row.discount_amount
//                         ? Number(row.discount_amount)
//                         : null,
//                     country_code: row.country_code,
//                     market_code: row.market_code,
//                     order_date: row.order_date,
//                     modified_by: "user",
//                     modified_at: trx.fn.now()
//                     });
//                 }
//             }

//             if (deleteRows?.length > 0) {
//                 await trx(library)
//                 .whereIn("sales_id", deleteRows)
//                 .del();
//             }

//         });

//         res.status(201).json({status: "success"});
        
//     } catch (error) {
//         console.error("Error saving data:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

export const getData = async (req, res) => {
  try {
    let { library, start, end } = req.body;

    console.log(libraryConfig);

    const config = libraryConfig[library];
    if (!config) return res.status(400).json({ error: "Invalid library" });

    start = parseInt(start) || 0;
    end = parseInt(end) || 100;
    const limit = end - start;

    const [rows, totalRowsResult] = await Promise.all([
      db(config.table)
        .select(config.fields)
        .orderBy("modified_at", "desc")
        .limit(limit)
        .offset(start),

      db(config.table).count("* as count").first()
    ]);

    return res.status(200).json({
      status: "success",
      data: rows,
      totalRows: parseInt(totalRowsResult.count)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const saveData = async (req, res) => {
  try {
    const { library, newRows = [], updatedRows = [], deleteRows = [] } = req.body;

    const config = libraryConfig[library];
    if (!config) return res.status(400).json({ error: "Invalid library" });

    const table = config.table;
    const idField = config.id;
    const fields = config.fields;

    await db.transaction(async (trx) => {

      if (newRows.length) {
        const cleanedRows = newRows.map(row => {
          const obj = {};

          fields.forEach(f => {
            obj[f] = row[f] ?? null;
          });

          obj.created_by = req.user;
          obj.modified_by = req.user;
          obj.modified_at = trx.fn.now();

          return obj;
        });

        await trx(table).insert(cleanedRows);
      }

      if (updatedRows.length) {
        for (const row of updatedRows) {
          const obj = {};

          fields.forEach(f => {
            obj[f] = row[f] ?? null;
          });

          obj.modified_by = "user";
          obj.modified_at = trx.fn.now();

          await trx(table)
            .where({ [idField]: row[idField] })
            .update(obj);
        }
      }

      if (deleteRows.length) {
        await trx(table)
          .whereIn(idField, deleteRows)
          .del();
      }
    });

    res.status(201).json({ status: "success" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getDashboardData = async (req, res) => {
    try {
        console.log('**************query************',req.body);
        const {filters} = req.body;
        const year = filters.order_year;

        const [summary, salesByCategory, revenueByMarket, marginVolByProduct, revenueVolumeData] = await Promise.all([
            db.raw(`
            WITH agg AS (
                SELECT
                sum(revenue) FILTER (WHERE order_year = ?) AS rev_cur,
                sum(revenue) FILTER (WHERE order_year = ?) AS rev_prev,
                sum(volume) FILTER (WHERE order_year = ?) AS vol_cur,
                sum(volume) FILTER (WHERE order_year = ?) AS vol_prev,
                sum(discount_amount) FILTER (WHERE order_year = ?) AS disc_cur,
                sum(discount_amount) FILTER (WHERE order_year = ?) AS disc_prev,
                sum(gross_profit) FILTER (WHERE order_year = ?) AS gp_cur,
                sum(gross_profit) FILTER (WHERE order_year = ?) AS gp_prev
                FROM vw_sales
                WHERE order_year IN (?, ?)
            )
            SELECT
                rev_cur AS total_revenue,
                vol_cur AS total_volume,
                vol_prev AS total_volume_prev,
                disc_cur AS total_discount,
                gp_cur / NULLIF(rev_cur,0) * 100 AS avg_margin,
                round((rev_cur - rev_prev)/NULLIF(rev_prev,0)*100,2) AS yoy_revenue,
                round((vol_cur - vol_prev) * 100.0 / NULLIF(vol_prev,0), 2) AS yoy_volume,
                round((disc_cur - disc_prev)/NULLIF(disc_prev,0)*100,2) AS yoy_discount_amount,
                round(
                ((gp_cur/NULLIF(rev_cur,0)) - (gp_prev/NULLIF(rev_prev,0))) * 100
                ,2) AS yoy_margin
            FROM agg
            `, [
            year, year - 1,
            year, year - 1,
            year, year - 1,
            year, year - 1,
            year, year - 1
            ]),

            db("vw_sales")
            .whereIn("order_year", [year, year - 1])
            .groupBy("category_name", "order_year")
            .orderBy([
                { column: "category_name", order: "asc" },
                { column: "order_year", order: "asc" }
            ])
            .select(
                db.raw("sum(revenue) as total_revenue"),
                db.raw("sum(volume) as total_volume"),
                db.raw("sum(gross_profit)/NULLIF(sum(revenue),0)*100 as avg_margin"),
                "order_year",
                "category_name"
            ),

            db("vw_sales")
            .where("order_year", year)
            .groupBy("market_code","market_name")
            .select(
                db.raw("sum(revenue) as total_revenue"),
                "market_name"
            ),

            db("vw_sales")
            .where("order_year", year)
            .groupBy("product_id")
            .orderBy("product_id")
            .select(
                "product_id",
                db.raw("sum(volume) as total_volume"),
                db.raw("sum(gross_profit)/NULLIF(sum(revenue),0)*100 as avg_margin")
            ),

            db("vw_sales")
            .where("order_year", year)
            .groupBy("order_month")
            .orderByRaw("TO_DATE(order_month, 'Mon')")
            .select(
                db.raw("sum(revenue) as total_revenue"),
                db.raw("sum(volume) as total_volume"),
                "order_month"
            )
        ]);

        res.status(200).json({
            status: "success",
            data: {
                summary:summary.rows[0],
                salesByCategory,
                revenueByMarket,
                marginVolByProduct,
                revenueVolumeData
            }
        });
    } catch (error) {
        console.error(error);
    }
};

export const getFilterPanelData = async (req, res) => {
    try {
        console.log('**************query************',req.body);
        const {filters} = req.body;
        
        if (!(Array.isArray(filters) && filters.length > 0)) res.status(404).json({status: "failure", error: "Invalid Payload Object"});

        const data = await Promise.all(
            filters.map((filter) => {
                return db(filter.library).distinct(filter.code).orderBy(filter.code, "desc");
            })
        );

        const filterData = {};

        data.forEach((item, index) => {
            filterData[filters[index].code] = item;
        });

        res.status(200).json({
            status: "success",
            data: filterData
        });
    } catch (error) {
        console.error(error);
    }
};