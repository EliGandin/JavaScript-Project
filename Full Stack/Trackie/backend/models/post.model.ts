import db from "../util/db";

type location = { lat: number; lng: number };

export class Post {
  id: number;
  location: { lat: number; lng: number };
  userId: number;
  story: string;

  constructor(id: number, location: location, userId: number, story: string) {
    this.id = id;
    this.location = location;
    this.userId = userId;
    this.story = story;
  }
}
