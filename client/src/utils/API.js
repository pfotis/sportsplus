import axios from "axios";
import Api from "./apiKey";

const options = {
  method: 'GET',
  url: 'https://soccer-football-info.p.rapidapi.com/matches/view/basic/',
  params: {i: '1', l: 'en_US'},
  headers: {
    'x-rapidapi-key': Api.key,
    'x-rapidapi-host': 'soccer-football-info.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
