export class Player {
  constructor(name) {
    this.id = 0;
    this.name = name || "";
    this.points = 0;
    this.hasPlayed = false;
    this.asker = false;
    this.askee = false;
    this.HasAsked = false;
    this.GotAsked = false;
  }
}
