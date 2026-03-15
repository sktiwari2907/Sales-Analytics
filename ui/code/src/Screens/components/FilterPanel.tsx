import { useState } from "react";

type FilterPanelProps = {
  config: {
    title: string;
    items: {
      code: string;
      title: string;
      multiSelect: boolean;
    }[];
  };
  filterPanelData: Record<string, { [key: string]: string }[]>;
  isFilterPanelLoading: boolean;
  filters: Record<string, number>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  collapsible: boolean;
  setCollapsible: React.Dispatch<React.SetStateAction<boolean>>;
};

function FilterPanel({ config, filterPanelData, isFilterPanelLoading, filters, setFilters, collapsible, setCollapsible }: FilterPanelProps) {
  // const [collapsible, setCollapsible] = useState(true);

  const handleChange = (key: string, value: number, multiSelect: boolean) => {
    setFilters(prev => {
        return { ...prev, [key]: value };
    });
  };

//   if (isFilterPanelLoading) return <div>Loading...</div>;

  return (
    <div style={{ width: !collapsible ? "15%" : "2%", position: "fixed", bottom: 12, top: 90 }}>
      {collapsible ? (
        <button
          className="filter"
          title="Filter Panel"
          onClick={() => setCollapsible(prev => !prev)}
        ></button>
      ) : (
        <div style={{ backgroundColor: "white", marginLeft: "8px", padding: "5px", height: "100%", borderRadius: 8, fontFamily: "Times New Roman" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              className="filter"
              title="Filter Panel"
              onClick={() => setCollapsible(prev => !prev)}
            ></button>
            <label htmlFor={config?.title} style={{fontSize: "x-large"}}>
              <b>{config?.title}</b>
            </label>
            <button
            style={{
                background: "none",
                border: "none",
                padding: 0,
                marginLeft: 'auto',
                marginRight: 6,
                marginTop: 2,
                cursor: "pointer",
                color: "inherit",
                font: "inherit",
            }}
            title="Clear All"
            onClick={() => setFilters({ order_year: new Date().getFullYear() })}
            >
            Clear All
            </button>
          </div>
          <hr />
          <div style={{display: "flex", flexDirection: "column"}}>
            {config?.items.map((item) => {
                const values = filterPanelData?.[item.code] || [];
                return (
                <div key={item.code} style={{ margin: "0px 0px 25px 15px" }}>
                    <label style={{fontSize: "larger"}}><b>{item.title}</b></label>
                    <div style={{ paddingLeft: "0px",fontSize: "large" }}>
                    {values.map((valObj) => {
                        const valueKey = Object.keys(valObj)[0];
                        const value = parseInt(valObj[valueKey]);
                        return item.multiSelect ? (
                        <div key={value}>
                            <input
                            type="checkbox"
                            checked={filters[item.code]?.includes(value) || false}
                            onChange={() => handleChange(item.code, value, true)}
                            />
                            <label style={{ marginLeft: "4px" }}>{value}</label>
                        </div>
                        ) : (
                        <div key={value}>
                            <input
                            type="radio"
                            name={item.code}
                            checked={filters[item.code] === value}
                            onChange={() => handleChange(item.code, value, false)}
                            />
                            <label style={{ marginLeft: "4px" }}>{value}</label>
                        </div>
                        );
                    })}
                    </div>
                </div>
                );
            })}
          </div>
          
        </div>
      )}
    </div>
  );
}

export default FilterPanel;