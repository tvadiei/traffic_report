<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="assets/index.css" rel="stylesheet">
    <script src="assets/chart.min.js"></script>
    <script src="assets/chartjs-plugin-datalabels@2.0.0"></script>
</head>

<body>
    <div class="main-container">


        <div class="content">
            <h1>Traffic Data Visualization</h1>
            <div class="filter-container">

                <label>Wochentag_ID:</label>
                <select id="Wochentag_ID">
                    <option value="">All</option>
                    <option value="1">Monday</option>
                    <option value="2">Tuesday</option>
                    <option value="3">Wednesday</option>
                    <option value="4">Thursday</option>
                    <option value="5">Friday</option>
                    <option value="6">Saturday</option>
                    <option value="7">Sunday</option>
                </select>
                <label>Gender (Geschlecht_ID - Single-select):</label>
                <input type="radio" name="Geschlecht_ID" value="" checked> All
                <input type="radio" name="Geschlecht_ID" value="1"> männlich
                <input type="radio" name="Geschlecht_ID" value="2"> weiblich

                <label>Traffic Type (Verkehrsart_ID):</label>
                <select id="Verkehrsart_ID">
                    <option value="">All</option>
                    <option value="1">Fußgänger (Pedestrian)</option>
                    <option value="2">Fahrrad (Bicycle)</option>
                    <option value="3">Einspurige Kfz (Single-track Vehicle)</option>
                    <option value="4">Pkw (Car)</option>
                    <option value="5">Lkw > 3,5t (Truck > 3.5t)</option>
                    <option value="99">Sonstige (Others)</option>
                </select>


                <button>Filter</button>
            </div>
            <div class="chart-container">
                <canvas class="chart-box" id="trafficChart"></canvas>
            </div>
        </div>
    </div>


</body>

<script async src="assets/index.js"></script>

</html>