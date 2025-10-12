var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var axios = require('axios');
var cron = require('node-cron');
var cors = require('cors');

var indexRouter = require('./routes/index');

const ecoRouter = require("./routes/eco");

const EcoDataObject = require('./models/EcoDataObject');
var app = express();

const mongoURI = 'mongodb://localhost:27017/EcoMonitoring';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => console.log('Connected MongoDB'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/eco', ecoRouter);

app.use(function (req, res, next) {
    const createError = require('http-errors');
    next(createError(404));
});

// cron part
// 0 * * * * means every hour
cron.schedule('0 * * * *', async () => {
    console.log('Running scheduled EcoData update...');

    try {
        const countries = ['Ukraine', 'Poland']; 
        for (const country of countries) {
            const response = await axios.get(`https://api.saveecobot.com/${country}/stations`);
            const stations = response.data;

            for (const s of stations) {
                await EcoDataObject.findOneAndUpdate(
                    { locationName: s.name },
                    {
                        country,
                        locationName: s.name,
                        airQualityIndex: s.aqi,
                        pm10: s.pm10,
                        pm25: s.pm25,
                        updatedAt: new Date()
                    },
                    { upsert: true, new: true }
                );
            }
        }

        console.log('Eco data object successfully updated.');
    } catch (err) {
        console.error('Error updating Eco data object:', err.message);
    }
});
//

module.exports = app;
