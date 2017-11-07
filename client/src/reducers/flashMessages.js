import { ADD_FLASH_MESSAGE, REMOVE_FLASH_MESSAGE } from 'actions/types';
import shortid from 'shortid';
import { remove } from 'lodash';

export default (state = [], actions = {}) => {
  console.log("======= actions: ", actions);
  switch (actions.type) {
    case ADD_FLASH_MESSAGE:
      const { message } = actions
      return [...state, 
        {
          id: shortid.generate(),
          ...message
        }
      ];
    
    case REMOVE_FLASH_MESSAGE:
      return remove([...state], o => o.id !== actions.id);

    default:
      return state;
  }
}
