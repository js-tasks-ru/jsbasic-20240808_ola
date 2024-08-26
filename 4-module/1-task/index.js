function makeFriendsList(friends) {
  const friendsList = document.createElement('ul');
  let friendsItems = '';
  friends.forEach(function(friend) {
    friendsItems += `<li>${friend.firstName} ${friend.lastName}</li>`;
  });
  friendsList.innerHTML = friendsItems;
  return friendsList;
}
