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
  _.forEach(games, (value) => {
    let game = _.findIndex(schedule, function (l) { return l.match == value; })
    leagueGames.push(schedule[game])
  });
  return leagueGames
}

export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const vaild = re.test(email.toLowerCase());
  if(!vaild)
    alert("Not a Valid Email Address")
  return vaild
}

export const checkPassword = (pass) => {
  let valid = false;
  const numbers = pass.match(/\d+/g);
  const lowers = pass.match(/[a-z]/);
  const uppers  = pass.match(/[A-Z]/);
  const length = pass.length;

  (numbers === null) ? alert("Password Must Contain Numbers And Characters") :
    (lowers === null  && uppers === null) ? alert("Password Must Contain Characters And Numbers") :
    (length < 6) ? alert("Password Must Be At Least 6 Characters") :
        valid = true;

  return valid;

}