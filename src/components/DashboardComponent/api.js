import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');
export function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
 
  socket.emit('subscribeToTimer', 1000);
  
}

export function getAllInsuranceContracts(cb)
 {
  socket.on('InsuranceContractList',resultat =>cb(null, resultat));
  socket.emit('getAllInsuranceContracts', 1000);
 }

 
export function mostPurchasedInsurances(cb)
{
 socket.on('mostPurchasedInsurancesList',resultat =>cb(null, resultat));
 socket.emit('mostPurchasedInsurances', 1000);
}


 export function getAllCoverages(cb)
 {
  socket.on('CoveragesList', (resultat) =>{cb(null, resultat)});
  socket.emit('getAllCoverages', 1000);
 }


 export function getFilteredClaims(cb)
 {
  socket.on('filteredClaimsList', (resultat) =>{cb(null,resultat)});
  socket.emit('getFilteredClaims', 1000);
 }


 export function getAccidentsByGender(cb)
 {
  socket.on('accidentsByGenderList', (resultat) =>{cb(null,resultat)});
  socket.emit('getAccidentsByGender', 1000);
 }

 export function getAccidentsByAge(cb)
 {
  socket.on('accidentsByAgeList', (resultat) =>{cb(null,resultat)});
  socket.emit('getAccidentsByAge', 1000);
 }


 export function getBotEvolution(cb)
 {
  socket.on('evolutionData', (resultat) =>{cb(null,resultat)});
  socket.emit('getBotEvolution', 1000);
 }

 
 export function getWrongAnswers(cb)
 {
  socket.on('wrongAnswersList', (resultat) =>{cb(null,resultat)});
  socket.emit('getWrongAnswers', 1000);
 }