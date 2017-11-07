import { ADD_FLASH_MESSAGE, REMOVE_FLASH_MESSAGE } from 'actions/types';

export function addFlashMessage(message){
  return {
    type: ADD_FLASH_MESSAGE,
    message
  };
}

export function removeFlashMessage(message){
  return {
    type: REMOVE_FLASH_MESSAGE,
    id: message.id
  };
}
