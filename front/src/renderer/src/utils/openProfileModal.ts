import EventManager from '@renderer/lib/EventManager';

export const profileEventManager = new EventManager();

export default function openProfileModal() {
  profileEventManager.emit('openprofilemodal', { id: 'profileModal'});
}
