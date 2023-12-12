import { useState } from "react";
import { FormSplitBill } from "./FormSplitBill";
import { FriendsList } from "./FriendsList";
import { Button } from "./Button";
import { FormAddFriend } from "./FormAddFriend";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [addFriendOption, setAddFriendOption] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleSelectedFriend(friend) {
    setSelectedFriend((curr) => (curr?.id === friend?.id ? null : friend));
    setAddFriendOption(false);
  }

  function handleSetAddFriend() {
    setAddFriendOption((addFriendOption) => !addFriendOption);
    setSelectedFriend(null);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setAddFriendOption(false);
  }

  function handleSplitBill(value) {
    console.log(value);

    selectedFriend.balance += value;

    setFriends((friends) =>
      friends.map((el) =>
        el === selectedFriend.id ? { ...(el.balance += value) } : el
      )
    );

    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelectedFriend}
          selectedFriend={selectedFriend}
        />
        {addFriendOption && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleSetAddFriend}>
          {addFriendOption ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}
