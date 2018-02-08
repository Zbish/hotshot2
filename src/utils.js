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
    value == 2 ? 'silver' : '#CD7F32'
  let size = value == 1 ? 120 :
    value == 2 ? 110 : 105
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

export const getRanking = (bets, games, players) => {
  const leagueGames = _.cloneDeep(games)
  const leaguebets = _.cloneDeep(bets)
  const users = _.cloneDeep(players)
  const rankList = []
  _.forEach(leagueGames, (game) => {
    if (game.status !== "await") {
      const id = game.id
      const gameBets = _.pick(leaguebets, [id + ""]);
      _.forIn(gameBets[id].bets, (playerBets, uid) => {
        const points = compareScore(game.score, playerBets)
        const name = users[uid].name
        const player = { uid, points, name }
        const index = _.findIndex(rankList, (p) => { return p.uid === uid; })
        index == -1 ? rankList.push(player) :
          rankList[index].points += player.points;
      })
    }
  })

  return rankList
}

export const getLeagueGames = (leagues, schedule) => {
  _.forEach(leagues, (league) => {
    let leagueGames = []
    _.forEach(league.games, (value, key) => {
      const game = _.findIndex(schedule, function (l) { return l.id == key; })
      leagueGames.push(schedule[game])
    })
    league.allGames = leagueGames
  })
  const leaguesFull = getRankList(leagues)
  
  return leaguesFull
}

export const getGames = (league, schedule) =>{
  let leagueGames = []
  _.forEach(league.games, (value, key) => {
    const index = _.findIndex(schedule, function (l) { return l.id == key; })
    leagueGames.push(schedule[index])
  })
  league.allGames = leagueGames
  return league
}

const getRankList = (leagues) => {
 
  _.forEach(leagues, (league) => {
    const rankList = []
    _.forEach(league.allGames, (game) => {
      if (game.status !== "await") {
        const id = game.id
        const gameBets = _.pick(league.games, [id + ""]);
        _.forIn(gameBets[id].bets, (playerBets, uid) => {
          const points = compareScore(game.score, playerBets)
          const name = league.players[uid].name
          const player = { uid, points, name }
          const index = _.findIndex(rankList, (p) => { return p.uid === uid; })
          index == -1 ? rankList.push(player) :
            rankList[index].points += player.points;
        })
      
      }
    })
    league.rankList = rankList
  })
return leagues
}