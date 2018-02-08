
import { UPDATE_Schedule, UPDATE_game } from '../actions/constant';

export default (state, action) => {
  switch (action.type) {
    case UPDATE_Schedule:
      return {
        gameSchedule: action.newSchedule
      };
      break;
    case UPDATE_game:
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