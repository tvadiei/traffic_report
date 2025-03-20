(() => {
    const bundeslandMap = {
        "1": "Burgenland",
        "2": "Kärnten",
        "3": "Niederösterreich",
        "4": "Oberösterreich",
        "5": "Salzburg",
        "6": "Steiermark",
        "7": "Tirol",
        "8": "Vorarlberg",
        "9": "Wien"
    };
    const stateColors = {
        "1": {
            bg: "rgba(0, 51, 153, 0.5)",
            border: "#003399"
        },
        "2": {
            bg: "rgba(153, 51, 153, 0.5)",
            border: "#993399"
        },
        "3": {
            bg: "rgba(255, 255, 153, 0.5)",
            border: "#FFFF99"
        },
        "4": {
            bg: "rgba(102, 204, 255, 0.5)",
            border: "#66CCFF"
        },
        "5": {
            bg: "rgba(0, 102, 153, 0.5)",
            border: "#006699"
        },
        "6": {
            bg: "rgba(102, 204, 102, 0.5)",
            border: "#66CC66"
        },
        "7": {
            bg: "rgba(255, 204, 51, 0.5)",
            border: "#FFCC33"
        },
        "8": {
            bg: "rgba(204, 51, 51, 0.5)",
            border: "#CC3333"
        },
        "9": {
            bg: "rgba(204, 204, 204, 0.5)",
            border: "#CCCCCC"
        }
    };
    let chartInstance = null;
    let rawData = [];

    async function fetchData() {
        try {
            const response = await fetch("https://dashboards.kfv.at/api/udm_verkehrstote/json");
            const data = await response.json();
            rawData = data.verkehrstote || [];
            createChart(rawData);
            return data.verkehrstote || [];
        } catch (error) {
            console.error("Error in fetching data", error);
            return [];
        }
    }
    function applyFilters() {
        let filteredData = rawData.filter(entry => {
            const selectedWochentagIDs = Array.from(document.getElementById("Wochentag_ID") ? .selectedOptions || []).map(opt => opt.value);
            const wochentagMatch = selectedWochentagIDs.length === 0 || selectedWochentagIDs.includes("") || selectedWochentagIDs.includes(entry.Wochentag_ID);

            const selectedVerkehrsartIDs = Array.from(document.getElementById("Verkehrsart_ID") ? .selectedOptions || []).map(opt => opt.value);
            const verkehrsartMatch = selectedVerkehrsartIDs.length === 0 || selectedVerkehrsartIDs.includes("") || selectedVerkehrsartIDs.includes(entry.Verkehrsart_ID);

            const selectedGeschlechtID = document.querySelector("input[name='Geschlecht_ID']:checked") ? .value || "";
            const geschlechtMatch = selectedGeschlechtID === "" || entry.Geschlecht_ID == selectedGeschlechtID;

            const selectedMonthIDs = Array.from(document.querySelectorAll("#Monat_ID input[type='checkbox']:checked"))
                .map(checkbox => checkbox.value);
            const monthMatch = selectedMonthIDs.length === 0 || selectedMonthIDs.includes(entry.Monat_ID);

            return wochentagMatch && verkehrsartMatch && geschlechtMatch && monthMatch;
        });
        createChart(filteredData);
    }
    async function toggleAllMonths(selectAllCheckbox) {

        const checkboxes = document.querySelectorAll("#Monat_ID input[type='checkbox']");

        checkboxes.forEach(checkbox => checkbox.checked = selectAllCheckbox.checked);

    }
    async function createChart(data) {
        const aggregatedData = {};
        const years = new Set();

        data.forEach(entry => {
            const year = entry.Berichtsjahr;
            const stateID = entry.Bundesland_ID;
            const fatalities = parseInt(entry.Getötete, 10);

            if (!stateID || !year) return;

            if (!aggregatedData[stateID]) {
                aggregatedData[stateID] = {};
            }
            if (!aggregatedData[stateID][year]) {
                aggregatedData[stateID][year] = 0;
            }

            aggregatedData[stateID][year] += fatalities;
            years.add(year);
        });

        const targetYears = Array.from(years).sort((a, b) => a - b);

        const datasets = Object.keys(aggregatedData).map(stateID => ({
            label: bundeslandMap[stateID] || `Bundesland ${stateID}`,
            data: targetYears.map(year => aggregatedData[stateID][year] || 0),
            backgroundColor: stateColors[stateID] ? .bg || "rgba(255, 215, 0, 0.5)",
            borderColor: stateColors[stateID] ? .border || "#FFD700",
            borderWidth: 1,
            fill: true
        }));

        if (chartInstance !== null) {
            chartInstance.destroy();
        }

        const ctx = document.getElementById("trafficChart").getContext("2d");

        chartInstance = new Chart(ctx, {
            type: "line",
            data: {
                labels: targetYears,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "top",
                        labels: {
                            font: {
                                size: 12
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: "Getötete im Straßenverkehr in Österreich nach Bundesland und Berichtsjahr",
                        font: {
                            size: 18
                        }
                    },
                    datalabels: {
                        display: true,
                        anchor: "end",
                        align: "top",
                        formatter: (value) => {
                            return value > 20 ? value : "";
                        },
                        font: {
                            weight: "bold",
                            size: 10,
                        },
                        color: "black",
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Berichtsjahr",
                            font: {
                                size: 14
                            }
                        },
                        ticks: {
                            font: {
                                size: 12
                            }
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Getötete ",
                            font: {
                                size: 14
                            }
                        },
                        ticks: {
                            font: {
                                size: 12
                            }
                        },
                        stacked: true
                    }
                }
            },
            plugins: [ChartDataLabels]
        });
    }

    document.addEventListener("DOMContentLoaded", () => {
        fetchData();

        document.getElementById("applyFiltersButton").addEventListener("click", () => {
            applyFilters();
        });

        document.getElementById("selectAllMonths").addEventListener("click", () => {
            toggleAllMonths(document.getElementById("selectAllMonths"));
        });
    });
})();