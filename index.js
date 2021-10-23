//const data = require('./mockData');
/**
 * uncoment this line for fast local development
 */

const sentimentAnalyzer = require('./src/sentiment');
let sentimentReport = [];

const getReport = data => {
  for (const tweetRecorded of data) {
    sentimentReport = [...sentimentReport, sentimentAnalyzer(tweetRecorded['tweet']['text'])]
  };
  
  const report = sentimentReport.reduce((acc, curr)=>{
    return {
      score: acc.score + curr.score,
      texts: [...acc.texts, ...curr.tokens],
      goodTexts: curr.score > 0 ? [...acc.goodTexts, ...curr.tokens] : acc.goodTexts,
      badTexts: curr.score > 0 ? [...acc.texts, ...curr.tokens] : acc.texts,
      goodScore: curr.score > 0 ? acc.goodScore + curr.score : acc.goodScore,
      badScore: curr.score < 0 ? acc.badScore + curr.score : acc.badScore,
    };
  }, {
    score: 0,
    texts : [],
    locations: [],
    goodTexts: [],
    badTexts: [],
    goodScore: 0,
    badScore: 0
  })
  
  report.mean = report.score/sentimentReport.length;

  return report;
};

module.exports = getReport;
