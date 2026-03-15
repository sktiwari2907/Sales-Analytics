import { useState } from "react";
import React from 'react';
import { useQuery } from "@tanstack/react-query";
import api from "../api/api.js";

type Filters = {
  order_year: number;
};

const filterPanelConfig = {
    title: "Filter Panel",
    items: [
        {
            title: "Year",
            code: "order_year",
            library: "vw_sales",
            multiSelect: false
        }
    ]
};

const getDashboardData = async (filters: Filters): Promise<any> => {
  const response = await api.post("/api/sales/getDashboardData",{ filters });

  const result = response.data;

  if (result?.status !== "success") {
    throw new Error(result?.error || "Unknown server error");
  }

  return result.data;
};

const getFilterPanelData = async () => {
    const filters = filterPanelConfig.items.map(item => ({
                            code: item.code,
                            library: item.library
                        }));
    
    const response = await api.post("/api/sales/getFilterPanelData", { filters });

    const result = response.data;

    if (result?.status !== "success") {
        throw new Error(result?.error || "Unknown server error");
    }

    return result.data;
}

function useDashboard() {
    const [filters, setFilters] = useState<Filters>({order_year: new Date().getFullYear()});
    const {data, isLoading} = useQuery({
        queryKey: ["dashboard", filters],
        queryFn: async({ queryKey }) => {
            const [_key, filters] = queryKey as [string, Filters];
            return await getDashboardData(filters);
        }
    });

    const {data: filterPanelData, isLoading: isFilterPanelLoading} = useQuery({
        queryKey: ["filterpanel"],
        queryFn: async() => {
            return await getFilterPanelData();
        }
    });

    console.log(filterPanelData, isFilterPanelLoading);

  return {
    filters,
    setFilters,
    data,
    isLoading,
    filterPanelConfig,
    filterPanelData,
    isFilterPanelLoading
  }
}

export default useDashboard