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
<div class=""filter-group">
                <label>Wochentag:</label>
                <select id="Wochentag_ID" >
                    <option value="">All</option>
                    <option value="1">Monday</option>
                    <option value="2">Tuesday</option>
                    <option value="3">Wednesday</option>
                    <option value="4">Thursday</option>
                    <option value="5">Friday</option>
                    <option value="6">Saturday</option>
                    <option value="7">Sunday</option>
                </select>
                </div>
                <div class=""filter-group">

                <label>Geschlecht :</label>
                <input type="radio" name="Geschlecht_ID" value="" checked> All
                <input type="radio" name="Geschlecht_ID" value="1"> männlich
                <input type="radio" name="Geschlecht_ID" value="2"> weiblich
</div><div class=""filter-group">

                <label>Verkehrsart :</label>
                <select id="Verkehrsart_ID" multiple>
                    <option value="">All</option>
                    <option value="1">Fußgänger </option>
                    <option value="2">Fahrrad </option>
                    <option value="3">Einspurige Kfz </option>
                    <option value="4">Pkw </option>
                    <option value="5">Lkw > 3,5t </option>
                    <option value="99">Sonstige </option>
                </select>
</div>

                <button id="applyFiltersButton">Filter</button>
            </div>
            <div class="card">
                <canvas class="chart-box" id="trafficChart"></canvas>
            </div>
        </div>
    </div>


</body>

<script  src="assets/index.js"></script>

</html>