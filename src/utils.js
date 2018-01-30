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

export const getLeagueGames = (games, schedule) => {
  let leagueGames = []
  _.forEach(games, (value,key) => {
    console.log('value' , value,key)
    let game = _.findIndex(schedule, function (l) { return l.id == key; })
    leagueGames.push(schedule[game])
  });
  return leagueGames
}

export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const vaild = re.test(email.toLowerCase());
  if (!vaild)
    alert("Not a Valid Email Address")
  return vaild
}

export const checkPassword = (pass) => {
  let valid = false;
  const numbers = pass.match(/\d+/g);
  const lowers = pass.match(/[a-z]/);
  const uppers = pass.match(/[A-Z]/);
  const length = pass.length;

  (numbers === null) ? alert("Password Must Contain Numbers And Characters") :
    (lowers === null && uppers === null) ? alert("Password Must Contain Characters And Numbers") :
      (length < 6) ? alert("Password Must Be At Least 6 Characters") :
        valid = true;

  return valid;

}

export const imageBorder = function (value) {
  let color = value == 1 ? 'gold' :
    value == 2 ? 'silver' : '#665D1E'
  let size = value == 1 ? 110 :
    value == 2 ? 100 : 95
  return {
    borderColor: color,
    width: size,
    height: size,
  }
}

export const compareScore = function (score, guess) {
  const hit = score.team1 == guess.team1 &&
    guess.team2 == score.team2
  const hit2 = score.team1 == score.team2 &&
    guess.team1 == guess.team2
  const hit3 = score.team1 > score.team2 &&
    guess.team1 > guess.team2
  const hit4 = score.team1 < score.team2 &&
    guess.team1 < guess.team2
  var points = hit ? 3 :
    hit2 ? 1 :
      hit3 ? 1 :
        hit4 ? 1 : 0
  return points
}

export const getRanking = (bets,games,users) => {
  let players = []
  const leagueGames = _.cloneDeep(games)
  const leaguebets = _.cloneDeep(bets)
  const us = _.cloneDeep(users)

  _.forEach(leagueGames, (game) => {
    const id = game.id
    const gameBets = _.pick(leaguebets, [id + ""]);
    _.forIn(gameBets, (playerBets) => {
      _.forIn(playerBets, (bets, uid) => {
        const name = us[uid].name  
        const points = compareScore(game.score, bets)
        const player = { uid, points, name }
        const index = _.findIndex(players, (p) => { return p.uid === player.uid; })
        index == -1 ? players.push(player) :
          players[index].points += player.points;
      });
    });
  })
  return players
}

export const sortArray = function (array) {
  array.sort((a, b) => a.points < b.points)
  return (array)
}