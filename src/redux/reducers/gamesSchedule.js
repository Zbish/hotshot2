
import { initial_Schedule, UPDATE_Schedule } from '../actions/constant';

export default (state, action) => {
  switch (action.type) {
    case initial_Schedule:
      return {
        gameSchedule: action.newSchedule
      };
      break;
    case UPDATE_Schedule:
      const game = action.game.value
      const index = action.game.index
      state.gameSchedule.splice(index, 1, game)
      return {
        gameSchedule: [...state.gameSchedule]
      };
      break;
    default:
      return state || {
        gameSchedule: [],
      }
  }
}