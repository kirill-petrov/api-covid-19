const router = require('express').Router();
const axios = require('axios').default;

router.get('/', (req, res) => {
  res.render('index');
});

async function getCovidData(after, before) {
  try {
    const response = await axios.get(`https://api.covid19tracker.ca/reports?after=${after}&before=${before}`);
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    throw error;
  }
}

function dateToHighchatrs(dateStr) { // 2021-08-05
  const [year, month, day] = dateStr.split('-');
  const yearN = Number(year);
  const monthN = Number(month) - 1;
  const dayN = Number(day);

  return `Date.UTC(${yearN}, ${monthN}, ${dayN})`;
}

router.get('/covid', async (req, res) => {
  const { after, before } = req.query;
  const raw = await getCovidData(after, before);
  req.session.covidData = raw.data;

  // TODO refactor later
  const { covidData } = req.session;

  const cases = [];
  const recoveries = [];
  const fatalities = [];
  const interval = `с ${covidData[0].date} по ${covidData[covidData.length - 1].date}`;

  covidData.forEach((el) => {
    const date = dateToHighchatrs(el.date);
    const changeCases = el.change_cases;
    const changeRecoveries = el.change_recoveries;
    const changeFatalities = el.change_fatalities;

    const strCases = `[${date}, ${changeCases}]`;
    const strRecoveries = `[${date}, ${changeRecoveries}]`;
    const strFatalities = `[${date}, ${changeFatalities}]`;

    cases.push(strCases);
    recoveries.push(strRecoveries);
    fatalities.push(strFatalities);
  });

  res.render('index', {
    data: covidData,
    cases,
    recoveries,
    fatalities,
    interval,
  });
});

module.exports = router;
