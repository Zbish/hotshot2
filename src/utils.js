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

const getRanks = (playerBets, leaguegame, list, players) => {
  _.forIn(playerBets, (bet, playerUid) => {
    const playerScore = compareScore(leaguegame.score, bet)
    const name = players[playerUid].name
    const player = { uid: playerUid, points: playerScore, name: name }
    const index = _.findIndex(list, function (pl) { return pl.uid == playerUid; })
    if (index == -1) {
      list.push(player)
    } else {
      list[index].points += playerScore
    }
  })
  console.log('list' , list)
  return list
}
export const getLeagueRankList = (bets, schedule, players) => {
  const cloneBets = _.cloneDeep(bets)
  const cloneSchedule = _.cloneDeep(schedule)
  const clonePlayers = _.cloneDeep(players)

  let rankActive = initialList(clonePlayers)
  console.log('rankj' , rankActive)
  let rankEnded = initialList(clonePlayers)
  
  _.forEach(cloneBets, (playerBets, gameid) => {
    var leaguegame = cloneSchedule.find(function (game) { return game.id === gameid; });
    if (leaguegame.status === "ended") {
      rankEnded = getRanks(playerBets, leaguegame, rankEnded, clonePlayers)
    }
    else if (leaguegame.status === "active") {
      rankActive = getRanks(playerBets, leaguegame, rankActive, clonePlayers)
    }

  })
  const rank = { rankActive: rankActive, rankEnded: rankEnded }
  return rank
}

const initialList = (players) => {
  let list = []
  _.forIn(players, (value, uid) => {
    const player = { ...value, points: 0,uid:uid }
    list.push(player)
  })
  return list
}

export const margeArrayRank = (ranks, players) => {
  console.log('combine ranks' , ranks)
  console.log('combine ranks' , players)
  const cloneRank = _.cloneDeep(ranks)
  const combineRanks = cloneRank.rankEnded
  _.forEach(ranks.rankActive, (player) => {
    const index = _.findIndex(combineRanks, (p) => { return p.uid === player.uid; })
    if (index == -1) {
      combineRanks.push(player)
    }
    else {
      combineRanks[index].points += player.points
    }
  })
  console.log('combine ranks' , combineRanks)
  return combineRanks
  
}

export const ranksAndNames = (ranks, names) => {
  _.forEach(ranks, (player) => {
    player.name = names[player.uid].name
  })
  return ranks
}

export const countGamesLeft = (games) => {
  let counter = 0
  _.forEach(games, (game) => {
    if (game.status === 'active' || game.status === 'panding') {
      counter++
    }
  })
  return counter
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
  return leagues
}

export const getGames = (league, schedule) => {
  let leagueGames = []
  _.forEach(league.games, (value, key) => {
    const index = _.findIndex(schedule, function (l) { return l.id == key; })
    leagueGames.push(schedule[index])
  })
  league.allGames = leagueGames
  return league
}

export const updateLeaguesGames = (leagues, changeGame) => {
  _.forEach(leagues.myLeagues, (league) => {
    const index = _.findIndex(league.allGames, (g) => { return g.id === changeGame.id; })
    if (index != -1) {
      league.allGames[index] = changeGame
    }
  })
  if (leagues.currentLeague) {
    const id = leagues.currentLeague.id
    currentLeague = _.find(leagues.myLeagues, { id: id })
  }
  return leagues
}

export const changeLeaderBoard = (scores, changeGame, oldGame, ranks) => {
  _.forIn(scores, (games, leagueid) => {
    const rankEnded = ranks[leagueid].rankEnded
    const rankActive = ranks[leagueid].rankActive
    _.forIn(games, (playerBets, gameid) => {
      if (changeGame.id === gameid) {
        _.forIn(playerBets, (bet, playerUid) => {
          const pointsUp = compareScore(changeGame.score, bet)
          const pointsDawn = compareScore(oldGame.score, bet)
          if (changeGame.status === 'ended') {
            const index = _.findIndex(rankEnded, function (pl) { return pl.uid == playerUid; })
            if (index != -1) {
              rankEnded[index].points += pointsUp
              if (oldGame.status === 'active') {
                rankActive[index].points -= pointsDawn
              }
            }
          }
          else if (changeGame.status === 'active') {
            const index = _.findIndex(rankActive, function (pl) { return pl.uid == playerUid; })
            if (index != -1) {
              rankActive[index].points += pointsUp
              if (oldGame.status === 'active') {
                rankActive[index].points -= pointsDawn
              }
            }
          }
        })
      }
    })
  })
  return ranks
}
export const validateLeague = (league) => {
  if (!league.name) {
    alert("Not a Valid League Name")
  }
  else if (!league.status) {
    alert("Not a Valid League status")
  }
  else if (_.isEmpty(league.players)) {
    alert("League Have No players")
  }
  else {
    return league
  }
}

export const getMyBets = (games, bets, uid) => {
  const cloneGames = _.cloneDeep(games)
  _.forEach(cloneGames, (game) => {
    if(bets[game.id][uid]){
      game.myBets = bets[game.id][uid]
    }else{
      game.myBets = {}
    }
  })
  return cloneGames
}