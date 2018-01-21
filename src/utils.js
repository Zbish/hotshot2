import _ from 'lodash';

export const withoutTime = function (ticks) {
  const d = new Date(ticks);
  d.setHours(0, 0, 0, 0);
  return d;
}
// render If 
export const renderIf = function (condition, content, login) {
  if (condition) {
    return content;
  } else {
    return login;
  }
}

export const getLeagueGames = (games,schedule) =>{
  let leagueGames = []
  _.forEach(games, (value) =>{
    let game =_.findIndex(schedule, function (l) { return l.match == value; })
    leagueGames.push(schedule[game])
  });
  return leagueGames
}