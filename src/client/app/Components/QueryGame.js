import React, { Component } from "react";
import {
  Header,
  Form,
  Item,
  Icon,
  Input,
  Button,
  Segment,
  Label
} from "semantic-ui-react";
import Timer from "./Timer";
import UserQuestions from "./UserQuestions";

export default class QueryGame extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      questions: [],
      questionAsked: false,
      voteCast: false,
      votesTallied: false
    };
    this.castVote = this.castVote.bind(this);
    this.sendQuery = this.sendQuery.bind(this);
  }

  sendQuery(e) {
    e.preventDefault();
    if (this.props.queries.length <= 7 && this.state.message.length > 4) {
      this.props.sendQuery({
        question: this.state.message,
        user: this.props.user
      });
      this.setState({ message: "" });
    }
  }

  castVote(vote) {
    this.props.castVote(vote);
    this.setState({ voteCast: true });
  }

  render() {
    return (
      <div>
        <Segment>
          <Timer tallyVotes={this.props.tallyVotes} />

          {this.props.winningVote && (
            <div>
              <Item>
                <Item.Content>
                  <Item.Header style={{fontSize: '1.5em', textAlign: 'center', margin: '1em auto'}}>The winning question was:</Item.Header>
                  <Item.Description style={{margin: '0 auto'}}>
                    <p>
                      <strong style={{fontSize: '1.1em'}}>{this.props.winningVote.q.question}</strong>
                      
                    </p>
                    <p>Asked by {this.props.winningVote.q.user}
                    <span style={{ float: "right" }}>
                        <Icon name="heart" color="red" />
                        {this.props.winningVote.count}
                      </span>
                    </p>
                  </Item.Description>
                </Item.Content>
              </Item>
            </div>
          )}

          {!this.props.winningVote && (
            <UserQuestions
              castVote={this.castVote}
              queries={this.props.queries}
            />
          )}

          {this.state.voteCast &&
            !this.props.winningVote && (
              //show number of votes here
              <div>
                <Header style={{ textAlign: "center" }}>Vote Results</Header>
                <Item.Group>
                  {this.props.votes &&
                    Object.keys(this.props.votes).map((key, i) => (
                      <Item.Content key={i}>
                        <strong>{this.props.votes[key].q.question}</strong>
                        <span style={{ float: "right" }}>
                          <Icon name="heart" color="red" />
                          {this.props.votes[key].count}
                        </span>
                        <Item.Extra>
                          Asked by {this.props.votes[key].q.user}
                        </Item.Extra>
                      </Item.Content>
                    ))}
                </Item.Group>
              </div>
            )}
        </Segment>

        {this.props.queries.length <= 7 &&
          !this.state.voteCast && (
            <Form onSubmit={this.sendQuery}>
              <label>
                What would you like to ask our bot?
                <Input
                  fluid
                  type="text"
                  placeholder="Type your message and click enter.."
                  name="message"
                  onChange={e => this.setState({ message: e.target.value })}
                  value={this.state.message}
                />
              </label>
            </Form>
          )}
      </div>
    );
  }
}
