class SelectQuestSplits extends React.Component {
  //the nextUp method returns the user who chooses the next quest

  nextUp() {
    var users = this.props.users,
    quest = this.props.currentQuest;
    if (users.length > 0 && [quest].length > 0) {
        var arr = [];
        var min = users[0].quest_chosen;
        for (i=0; i < users.length; i++) {
          if (users[i].quest_chosen < min) {
            min = users[i].quest_chosen
          }
        }
        for (i=0; i < users.length; i++) {
          if (users[i].quest_chosen === min) {
            arr.push(users[i]);
          }
        }
        var minRank = arr[0];
        for (i=0; i < arr.length; i++) {
          if (arr[i].order < minRank.order) {
            minRank = arr[i];
          }
        }
      currentUserID = this.props.currentUser.id;
      if (currentUserID === minRank.id) {
        return (<SelectQuestForm currentQuest={this.props.currentQuest} numberOnQuest={1} currentRound={this.props.currentRound} currentUser= {this.props.currentUser} users={this.props.users}/>)
      } else {
        return (<QuestWait currentQuest={this.props.currentQuest} numberOnQuest={1}/>)
      }
    }
  }

  render () {
    return (
      <div>
        {this.nextUp()}
      </div>
      )
  }
}

