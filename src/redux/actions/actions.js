import {UPDATE_Schedule} from './constant';

export function updateSchedule(games) {
return {
type:UPDATE_Schedule,
games
};
}
