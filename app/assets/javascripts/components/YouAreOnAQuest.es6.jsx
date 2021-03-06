class YouAreOnAQuest extends React.Component {

  constructor(){
    super()
    this.state = {
      show_button: true,
      member: ""
    }
    // this.handleOnQuestVote = this.handleOnQuestVote.bind(this)
  }

  handleOnQuestVote(event){
    // event.preventDefault
    const questID = this.props.currentQuest.id
    const memberID = this.props.memberID
    $.ajax({
      url: `/quests/${questID}/quest_members/${memberID}`,
      method: 'PUT',
      data: { vote: event.action }
    }).done((response) => {
    // debugger
      // this.props.updateGameStage("questVoteDone")
      this.setState({
        show_button: false,
        member: response
      })
    })
  }

  render () {
    // debugger
    // in order to hide button, check for this in whatever is returned:
    // if (this.state.show_button === true


    let showFailButtonToEvil
    if (this.props.currentUser.good === false) {
      showFailButtonToEvil =
      <div className="btn-group">
        <button ref="Failed" className="btn btn-danger btn-robot" type="submit" name="vote" onClick={this.handleOnQuestVote.bind(this, {action: "Fail"})}>Fail</button>
      </div>
    } else {
      showFailButtonToEvil =
      <div className="btn-group">
        <button disabled="true" className="btn btn-danger btn-robot">Fail</button>
      </div>
    }

    let questComplete
    if (this.state.show_button === true) {
      questComplete =
        <div>
          <h3 className="welcome">The proposed mission was approved!</h3>
          <h3 className="welcome">You are on the mission.</h3>
          <p className="pink_letters"> Choose to succeed or fail!</p>
          <section>
              <div className="btn-group">
                <button ref="Succeed" className="btn btn-success btn-blue" type="submit" name="vote" onClick={this.handleOnQuestVote.bind(this, {action: "Succeed"})}>Succeed</button>
              </div>
              {showFailButtonToEvil}
          </section>
        </div>
    } else {
      questComplete =
       <WaitingForQuestResult memberID={this.state.member.id} currentGame={this.props.currentGame} currentQuest={this.props.currentQuest} members={this.props.members} currentUser={this.props.currentUser} users={this.props.users} countRounds={this.props.countRounds}/>
    }

    return(
      <div>
        {questComplete}
      </div>
    )
  }
}
